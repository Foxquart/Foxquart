#!/usr/bin/env python3
"""Generate AVIF + WebP responsive variants for the rasters in public/images.

The original file is always kept untouched as the final <picture> fallback. For every
source we emit `<name>-<width>.avif` and `<name>-<width>.webp` next to it, capped at the
source's native width so nothing is ever upscaled.

By default only images still referenced from `src/` are processed, so orphaned assets do
not get a pile of derivatives generated for them. Pass `--all` to override.

Usage:
    scripts/optimize-images.py                # referenced images, skip up-to-date output
    scripts/optimize-images.py --all          # every source raster
    scripts/optimize-images.py --force        # re-encode even if variants are current
    scripts/optimize-images.py --check        # report only, write nothing (CI friendly)

Requires Pillow >= 12 (native AVIF support). See scripts/README.md.
"""

from __future__ import annotations

import argparse
import os
import re
import sys
from dataclasses import dataclass, field
from pathlib import Path

try:
    from PIL import Image, features
except ImportError:  # pragma: no cover - environment guard
    sys.exit(
        "Pillow is not importable with this interpreter.\n"
        "Run with an interpreter that has Pillow >= 12, e.g.\n"
        "  /home/roy/programs/test-friday/.venv/bin/python3 scripts/optimize-images.py"
    )

ROOT = Path(__file__).resolve().parent.parent
IMAGE_DIR = ROOT / "public" / "images"
SRC_DIR = ROOT / "src"
PICTURE_COMPONENT = ROOT / "src" / "components" / "ui" / "picture.tsx"

# Widths are filtered down to the source's native width; a source narrower than the
# largest rung contributes its own native width instead so the top variant is sharp.
WIDTH_LADDER = [640, 1024, 1600]
MAX_VARIANTS = 3

SOURCE_SUFFIXES = {".png", ".jpg", ".jpeg"}
AVIF_QUALITY = 52
WEBP_QUALITY = 78

# Matches `-640.avif` style names so generated files are never treated as sources.
VARIANT_RE = re.compile(r"-\d+\.(avif|webp)$")

GEN_START = "  /* AUTO-GENERATED VARIANTS START */"
GEN_END = "  /* AUTO-GENERATED VARIANTS END */"


@dataclass
class Result:
    path: Path
    native: tuple[int, int]
    real_format: str
    referenced_by: list[str]
    widths: list[int] = field(default_factory=list)
    written: list[Path] = field(default_factory=list)
    skipped: list[Path] = field(default_factory=list)


def public_url(path: Path) -> str:
    return "/" + path.relative_to(ROOT / "public").as_posix()


def find_sources() -> list[Path]:
    return sorted(
        p
        for p in IMAGE_DIR.iterdir()
        if p.is_file() and p.suffix.lower() in SOURCE_SUFFIXES and not VARIANT_RE.search(p.name)
    )


def find_references(sources: list[Path]) -> dict[Path, list[str]]:
    """Map each source to the src/ files that mention its public URL."""
    refs: dict[Path, list[str]] = {p: [] for p in sources}
    needles = {public_url(p): p for p in sources}
    for file in SRC_DIR.rglob("*"):
        if not file.is_file() or file.suffix not in {".ts", ".tsx", ".css", ".html"}:
            continue
        try:
            text = file.read_text(encoding="utf-8")
        except (UnicodeDecodeError, OSError):
            continue
        for url, source in needles.items():
            if url in text:
                refs[source].append(str(file.relative_to(ROOT)))
    return refs


def plan_widths(native_width: int) -> list[int]:
    widths = [w for w in WIDTH_LADDER if w <= native_width]
    if not widths:
        return [native_width]
    if native_width < WIDTH_LADDER[-1] and native_width not in widths:
        widths.append(native_width)
    return widths[:MAX_VARIANTS]


def variant_path(source: Path, width: int, ext: str) -> Path:
    return source.with_name(f"{source.stem}-{width}.{ext}")


def is_current(source: Path, target: Path) -> bool:
    return target.exists() and target.stat().st_mtime >= source.stat().st_mtime


def encode(source: Path, widths: list[int], force: bool, check: bool) -> tuple[list[Path], list[Path]]:
    written: list[Path] = []
    skipped: list[Path] = []
    with Image.open(source) as im:
        # Sources with real alpha (a logo on a transparent ground) keep it;
        # everything else flattens to RGB same as before. Converting an
        # opaque-looking RGBA/PNG-palette source to RGB unconditionally is
        # what silently matted transparent logos onto black.
        has_alpha = im.mode in ("RGBA", "LA") or (
            im.mode == "P" and "transparency" in im.info
        )
        im = im.convert("RGBA") if has_alpha else im.convert("RGB")
        native_w, native_h = im.size
        for width in widths:
            height = max(1, round(native_h * width / native_w))
            resized = im if (width, height) == (native_w, native_h) else im.resize(
                (width, height), Image.LANCZOS
            )
            for ext in ("avif", "webp"):
                target = variant_path(source, width, ext)
                if not force and is_current(source, target):
                    skipped.append(target)
                    continue
                if check:
                    written.append(target)
                    continue
                if ext == "avif":
                    resized.save(target, format="AVIF", quality=AVIF_QUALITY)
                else:
                    resized.save(target, format="WEBP", quality=WEBP_QUALITY, method=6)
                written.append(target)
    return written, skipped


def sync_component(results: list[Result]) -> bool:
    """Rewrite the generated variant map inside picture.tsx.

    The component only emits <source> elements for entries in this map, so a missing
    or stale entry degrades to a plain <img> rather than requesting a 404 variant.
    """
    if not PICTURE_COMPONENT.exists():
        return False
    text = PICTURE_COMPONENT.read_text(encoding="utf-8")
    if GEN_START not in text or GEN_END not in text:
        return False
    lines = [
        f'  "{public_url(r.path)}": {{ width: {r.native[0]}, height: {r.native[1]}, '
        f'widths: [{", ".join(str(w) for w in r.widths)}] }},'
        for r in results
        if r.widths
    ]
    block = "\n".join([GEN_START, *lines, GEN_END])
    start = text.index(GEN_START)
    end = text.index(GEN_END) + len(GEN_END)
    updated = text[:start] + block + text[end:]
    if updated != text:
        PICTURE_COMPONENT.write_text(updated, encoding="utf-8")
        return True
    return False


def human(n: int) -> str:
    return f"{n / 1024:.0f} KB" if n < 1024 * 1024 else f"{n / 1024 / 1024:.2f} MB"


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--all", action="store_true", help="include images not referenced in src/")
    parser.add_argument("--force", action="store_true", help="re-encode even if variants are current")
    parser.add_argument("--check", action="store_true", help="report what would change, write nothing")
    args = parser.parse_args()

    if not features.check("avif"):
        print("! AVIF is unavailable in this Pillow build - emitting WebP only.", file=sys.stderr)

    sources = find_sources()
    if not sources:
        print(f"No source images found in {IMAGE_DIR}")
        return 0

    refs = find_references(sources)
    results: list[Result] = []

    for source in sources:
        with Image.open(source) as im:
            native = im.size
            real_format = (im.format or "?").lower()
        result = Result(source, native, real_format, refs[source])
        if not result.referenced_by and not args.all:
            results.append(result)
            print(f"skip  {source.name:<24} unreferenced in src/ (use --all to include)")
            continue
        result.widths = plan_widths(native[0])
        result.written, result.skipped = encode(source, result.widths, args.force, args.check)
        results.append(result)

        note = ""
        if real_format != source.suffix.lstrip(".").lower().replace("jpg", "jpeg"):
            note = f"  [!] actually {real_format.upper()} despite {source.suffix} extension"
        verb = "would write" if args.check else "wrote"
        print(
            f"ok    {source.name:<24} {native[0]}x{native[1]}  {human(source.stat().st_size):>8}"
            f"  -> {len(result.widths)} widths {result.widths}"
            f"  ({verb} {len(result.written)}, current {len(result.skipped)}){note}"
        )

    processed = [r for r in results if r.widths]
    if not args.check and sync_component(processed):
        print(f"\nupdated variant map in {PICTURE_COMPONENT.relative_to(ROOT)}")

    orig = sum(r.path.stat().st_size for r in processed)
    best = 0
    for r in processed:
        smallest = variant_path(r.path, max(r.widths), "avif")
        if smallest.exists():
            best += smallest.stat().st_size
    if best:
        print(
            f"\n{len(processed)} images: originals {human(orig)} -> "
            f"largest AVIF variants {human(best)} ({100 - best * 100 / orig:.0f}% smaller)"
        )
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
