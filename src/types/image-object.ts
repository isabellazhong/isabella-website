/**
 * ImageObject is the "parent type" for anything that displays imagery inside
 * a block. Each concrete variant extends ImageObjectBase and declares a
 * unique `kind` discriminator; the union at the bottom is what components
 * accept, so TypeScript narrows to the right variant automatically.
 *
 * To add a new image object type:
 *   1. Define an interface extending ImageObjectBase with a unique `kind`.
 *   2. Add it to the ImageObject union below.
 *   3. Build a view component in src/components/image-objects/.
 *   4. Register it in ImageObjectView's switch. TypeScript will flag the
 *      switch as non-exhaustive until the new case exists.
 */

/** A single image file plus its accessible description. */
export interface ImageAsset {
  src: string;
  alt: string;
}

export interface ImageObjectBase {
  kind: string;
}

/** One static image. */
export interface SingleImage extends ImageObjectBase {
  kind: "single";
  image: ImageAsset;
  /** "polaroid" (default) frames the photo; "plain" renders the image itself with no frame. */
  variant?: "polaroid" | "plain";
}

/** An arrow-driven carousel that fades between images. */
export interface Carousel extends ImageObjectBase {
  kind: "carousel";
  images: ImageAsset[];
}

/** A springy fanned stack of images; clicking cycles the top card to the back. */
export interface SpringStack extends ImageObjectBase {
  kind: "spring-stack";
  images: ImageAsset[];
}

/**
 * A frame-by-frame animation (e.g. an exported PNG sequence) drawn to a
 * canvas. Used for the landing page background once frames exist.
 */
export interface FrameSequence extends ImageObjectBase {
  kind: "frame-sequence";
  /** Frame image URLs in playback order. */
  frames: string[];
  /** Playback speed. Defaults to 12. */
  fps?: number;
  /** Restart from the first frame when finished. Defaults to true. */
  loop?: boolean;
  /** How long to hold the first frame, in ms. Defaults to the normal per-frame interval (1000 / fps). */
  holdFirstMs?: number;
  /** How long to hold the last frame, in ms. Defaults to the normal per-frame interval (1000 / fps). */
  holdLastMs?: number;
}

/**
 * Five photos that pile up, then scatter into a loose, asymmetric ring
 * around a headline as this object scrolls into view (see
 * PhotoScatterReveal). The headline is revealed only once the photos have
 * settled into place.
 */
export interface PhotoScatter extends ImageObjectBase {
  kind: "photo-scatter";
  images: [ImageAsset, ImageAsset, ImageAsset, ImageAsset, ImageAsset];
  /** Headline revealed at the center once the photos finish scattering. */
  text: string;
}

export type ImageObject = SingleImage | Carousel | SpringStack | FrameSequence | PhotoScatter;
