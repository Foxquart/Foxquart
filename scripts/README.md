# scripts

## `optimize-images.py`

Generates responsive **AVIF + WebP** variants for the rasters in `public/images/`. The
original file is never modified or deleted — it stays as the final `<picture>` fallback.

### Running it

Needs an interpreter with **Pillow >= 12**, which is where native AVIF encoding landed.
There is no Pillow in this repo's toolchain, so point at one that has it:

```bash
/home/roy/programs/test-friday/.venv/bin/python3 scripts/optimize-images.py
```

| Flag      | Effect                                                                                               |
| --------- | ---------------------------------------------------------------------------------------------------- |
| _(none)_  | Process every image still referenced from `src/`, skipping variants that are newer than their source |
| `--all`   | Include images that nothing in `src/` references                                                     |
| `--force` | Re-encode even when the existing variants are current                                                |
| `--check` | Print what would change and write nothing                                                            |

The script is idempotent — a second run with no source changes writes nothing.

### What it produces

For `public/images/foo.png` it writes `foo-<width>.avif` and `foo-<width>.webp` beside it.

Widths come from the ladder `640 / 1024 / 1600`, filtered to the source's native width so
**nothing is ever upscaled**. A source narrower than the top rung contributes its own native
width instead, keeping the largest variant sharp:

| Native width | Variants emitted |
| ------------ | ---------------- |
| 1920         | 640, 1024, 1600  |
| 1440         | 640, 1024, 1440  |
| 1024         | 640, 1024        |

Quality is AVIF `q=52` and WebP `q=78 method=6`, which measures 38–45 dB PSNR against the
originals on the current screenshots — visually transparent at the size these render.

### The generated variant map

After encoding, the script rewrites the block between the `AUTO-GENERATED VARIANTS`
markers in `src/components/ui/picture.tsx`. That map is how `<Picture>` knows which widths
exist for a given source.

Do not hand-edit that block. A source missing from the map renders as a plain `<img>`
against the original, so forgetting to run the script costs you the modern formats but
never produces a 404.

### Adding a new screenshot

1. Drop the PNG (or JPEG) into `public/images/`.
2. Reference it from a component so the script sees it as live.
3. Run the script. It encodes the variants and updates the map.
4. Run `npx prettier --write src/components/ui/picture.tsx`.

Orphaned images are skipped by design — delete them rather than generating variants for
them.

## `<Picture>` usage

```tsx
import { Picture } from "@/components/ui/picture";

<Picture
  src="/images/tattoo_studio.png"
  alt="Good Luck Tattoo Studio website preview"
  width={1920}
  height={894}
  sizes="(min-width: 768px) 50vw, 100vw"
  className="h-full w-full object-cover object-top"
/>;
```

`width`/`height` are the **intrinsic** dimensions of the original and are always emitted so
the box is reserved before decode (no layout shift). Pass `priority` for an above-the-fold
image to swap `loading="lazy"`/`decoding="async"` for eager, high-priority loading.

Current intrinsic sizes:

| Source                  | Intrinsic  |
| ----------------------- | ---------- |
| `clinic_portfolio.png`  | 1920 x 894 |
| `interior_studio.png`   | 1920 x 894 |
| `tattoo_studio.png`     | 1920 x 894 |
| `ember_oak.png`         | 1440 x 900 |
| `school_management.png` | 1440 x 900 |
