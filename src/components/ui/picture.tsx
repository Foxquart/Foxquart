import type { ImgHTMLAttributes } from "react";

import { cn } from "@/lib/utils";

type Variant = { width: number; height: number; widths: number[] };

/**
 * Intrinsic size and available responsive widths per source, keyed by public URL.
 *
 * Maintained by `scripts/optimize-images.py`. Do not edit by hand. A source that is
 * absent here renders as a plain <img> against the original file, so adding an image
 * without running the script degrades gracefully instead of requesting a 404 variant.
 */
const VARIANTS: Record<string, Variant> = {
  /* AUTO-GENERATED VARIANTS START */
  "/images/clinic_portfolio.png": { width: 1920, height: 894, widths: [640, 1024, 1600] },
  "/images/ember_oak.png": { width: 1440, height: 900, widths: [640, 1024, 1440] },
  "/images/hero.png": { width: 1535, height: 1024, widths: [640, 1024, 1535] },
  "/images/interior_studio.png": { width: 1920, height: 894, widths: [640, 1024, 1600] },
  "/images/logohero.png": { width: 577, height: 433, widths: [577] },
  "/images/school_management.png": { width: 1440, height: 900, widths: [640, 1024, 1440] },
  "/images/spares_control.png": { width: 1920, height: 894, widths: [640, 1024, 1600] },
  "/images/tattoo_studio.png": { width: 1920, height: 894, widths: [640, 1024, 1600] },
  /* AUTO-GENERATED VARIANTS END */
};

type PictureProps = {
  /** Public path of the original raster, e.g. `/images/tattoo_studio.png`. */
  src: string;
  alt: string;
  /**
   * Intrinsic size of the original. Optional for a known source (the generated map
   * supplies it), so callers do not have to track dimensions alongside the path.
   */
  width?: number;
  height?: number;
  /** Layout hint for the browser's variant pick. Defaults to full viewport width. */
  sizes?: string;
  className?: string;
  /** Above-the-fold images load eagerly at high priority; everything else stays lazy. */
  priority?: boolean;
} & Omit<
  ImgHTMLAttributes<HTMLImageElement>,
  "src" | "srcSet" | "alt" | "width" | "height" | "sizes" | "loading" | "decoding" | "fetchPriority"
>;

function srcSet(src: string, widths: number[], ext: "avif" | "webp") {
  const base = src.replace(/\.[^./]+$/, "");
  return widths.map((w) => `${base}-${w}.${ext} ${w}w`).join(", ");
}

/**
 * `<picture>` wrapper emitting AVIF -> WebP -> original fallback.
 *
 * Width and height are always set when known so the layout box is reserved and the image
 * cannot shift content as it decodes.
 *
 * The wrapper carries `display: contents`, so the <img> lays out as a direct child of
 * whatever contained it before. That keeps `h-full`, `absolute inset-0` and flex/grid
 * placement working, making this a drop-in replacement for a plain <img>.
 */
export function Picture({
  src,
  alt,
  width,
  height,
  sizes = "100vw",
  className,
  priority = false,
  ...imgProps
}: PictureProps) {
  const variant = VARIANTS[src];
  const intrinsicWidth = width ?? variant?.width;
  const intrinsicHeight = height ?? variant?.height;

  return (
    <picture className="contents">
      {variant ? (
        <>
          <source type="image/avif" srcSet={srcSet(src, variant.widths, "avif")} sizes={sizes} />
          <source type="image/webp" srcSet={srcSet(src, variant.widths, "webp")} sizes={sizes} />
        </>
      ) : null}
      <img
        {...imgProps}
        src={src}
        alt={alt}
        width={intrinsicWidth}
        height={intrinsicHeight}
        sizes={variant ? sizes : undefined}
        loading={priority ? "eager" : "lazy"}
        decoding={priority ? "sync" : "async"}
        fetchPriority={priority ? "high" : "auto"}
        className={cn(className) || undefined}
      />
    </picture>
  );
}

export default Picture;
