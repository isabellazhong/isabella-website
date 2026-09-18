import type { ComponentPropsWithoutRef } from "react";
import { resolveImage } from "../../lib/images";

export interface ResponsiveImageProps extends Omit<ComponentPropsWithoutRef<"img">, "src" | "srcSet" | "alt"> {
  src: string;
  alt: string;
  /**
   * How wide the image renders, in the `sizes` attribute's media-query syntax
   * (e.g. "(min-width: 768px) 50vw, 100vw"). The browser multiplies this by
   * device pixel ratio to pick the smallest sufficient srcset candidate, so
   * the closer it is to the real layout width the less gets downloaded.
   */
  sizes: string;
}

/**
 * Drop-in for <img> that serves build-time resized WebP variants for anything
 * under src/assets, plus width/height to reserve space before load. Lazy and
 * async-decoded by default; pass loading="eager" for above-the-fold images.
 * Sources that aren't optimised (remote URLs, files left in public/) render
 * as a plain <img> with the same props.
 */
export function ResponsiveImage({ src, alt, sizes, loading = "lazy", decoding = "async", ...rest }: ResponsiveImageProps) {
  const image = resolveImage(src);
  if (!image) return <img src={src} alt={alt} loading={loading} decoding={decoding} {...rest} />;
  return (
    <img
      src={image.src}
      srcSet={image.srcset}
      sizes={sizes}
      width={image.w}
      height={image.h}
      alt={alt}
      loading={loading}
      decoding={decoding}
      {...rest}
    />
  );
}
