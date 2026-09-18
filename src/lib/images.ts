/**
 * Build-time image optimisation, the Vite equivalent of Next's <Image>.
 *
 * Every still under src/assets is picked up by the glob below and emitted by
 * vite-imagetools as a set of resized WebP files (widths above the source's
 * are clamped to it, never upscaled), so the browser downloads the smallest
 * candidate that covers the rendered size (see ResponsiveImage).
 *
 * Content keeps referring to images by their public-style URL, e.g.
 * "/assets/about_me.png"; that maps to src/assets/about_me.png here. Anything
 * that doesn't resolve (remote URLs, videos, the canvas frame sequences left
 * in public/) is served as-is.
 */

/** Shape of an `?as=img` import from vite-imagetools. */
export interface OptimizedImage {
  /** Largest generated variant; the fallback `src`. */
  src: string;
  /** Intrinsic width of `src`, for the width/height attributes (avoids layout shift). */
  w: number;
  h: number;
  /** `srcset` candidate list with width descriptors, e.g. "a.webp 480w, b.webp 960w". */
  srcset?: string;
}

const ASSET_URL_PREFIX = "/assets/";
const SOURCE_DIR = "/src/assets/";

const optimized = import.meta.glob<OptimizedImage>("/src/assets/**/*.{png,jpg,jpeg,PNG,JPG,JPEG}", {
  eager: true,
  import: "default",
  query: { w: "480;960;1440;1920", format: "webp", as: "img" },
});

/**
 * Looks up the optimised variants for a content `src`. Returns undefined for
 * anything not under src/assets so callers can fall back to a plain <img>.
 */
export function resolveImage(src: string): OptimizedImage | undefined {
  if (!src.startsWith(ASSET_URL_PREFIX)) return undefined;
  return optimized[SOURCE_DIR + src.slice(ASSET_URL_PREFIX.length)];
}

/**
 * `sizes` values matching the site's layouts (container-page is max-w-6xl,
 * 1152px, with up to 32px gutters). Views default to `halfColumn` because
 * most stills sit in one half of a TextImageBlock; pass `fullColumn` when an
 * image spans the whole content column.
 */
export const IMAGE_SIZES = {
  halfColumn: "(min-width: 1152px) 520px, (min-width: 768px) 50vw, 100vw",
  fullColumn: "(min-width: 1152px) 1088px, 100vw",
} as const;
