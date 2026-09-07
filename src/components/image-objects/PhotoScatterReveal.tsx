import { useRef } from "react";
import type { ReactNode } from "react";
import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from "motion/react";
import type { ImageAsset } from "../../types";

export interface PhotoScatterRevealProps {
  /** Exactly 5 photos: piled at the center, then scattered into a loose ring. */
  images: [ImageAsset, ImageAsset, ImageAsset, ImageAsset, ImageAsset];
  /** Revealed at the center once the photos finish scattering. */
  children: ReactNode;
  className?: string;
}

/**
 * Hand-placed pile and scatter positions for 5 photos, in cqw (percent of
 * the inner anchor box's own width - see the `@container` div in
 * PhotoScatterReveal). That anchor box is deliberately sized to a fraction
 * of the visible sticky area (`min(60cqmin, 38rem)`), so the scatter -
 * which reaches past the anchor's own edges by design - always lands
 * inside the visible, clipped sticky area instead of overflowing it on
 * narrow screens. Values were derived from the original pixel layout at
 * the anchor's max size (38rem / 608px), so full-size rendering is
 * essentially unchanged. Radius and rotation vary per photo on purpose so
 * the ring reads as tossed rather than measured out - a real circle would
 * look CAD-drawn.
 */
const LAYOUT: { pileX: number; pileY: number; pileRotate: number; x: number; y: number; rotate: number }[] = [
  { pileX: -1.3, pileY: -0.8, pileRotate: -9, x: -46.1, y: -31.3, rotate: -11 },
  { pileX: 1.0, pileY: 0.7, pileRotate: 7, x: 42.8, y: -39.5, rotate: 8 },
  { pileX: -0.7, pileY: 1.2, pileRotate: -15, x: -56.7, y: 14.0, rotate: 10 },
  { pileX: 1.3, pileY: -1.0, pileRotate: 12, x: 51.0, y: 19.7, rotate: -14 },
  { pileX: 0, pileY: 1.5, pileRotate: 3, x: 4.1, y: 47.7, rotate: 5 },
];

/** Photos finish scattering by this point in the scroll range; the text
    reveal starts a beat after, so it never appears mid-toss. */
const SCATTER_END = 0.1;
const TEXT_START = 0.1;

export function PhotoScatterReveal({ images, children, className }: PhotoScatterRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  return (
    <div ref={containerRef} className={`relative ${className ?? ""}`} style={{ height: "240vh" }}>
      <div className="@container-size sticky top-0 flex h-screen items-center justify-center overflow-hidden">
        <div className="@container relative flex h-[min(60cqmin,38rem)] w-[min(60cqmin,38rem)] items-center justify-center">
          {images.map((image, i) => (
            <Photo key={image.src} image={image} layout={LAYOUT[i]} zIndex={images.length - i} progress={scrollYProgress} reduce={reduce} />
          ))}
          <TextReveal progress={scrollYProgress} reduce={reduce}>
            {children}
          </TextReveal>
        </div>
      </div>
    </div>
  );
}

function Photo({
  image,
  layout,
  zIndex,
  progress,
  reduce,
}: {
  image: ImageAsset;
  layout: (typeof LAYOUT)[number];
  zIndex: number;
  progress: MotionValue<number>;
  reduce: boolean | null;
}) {
  const x = useTransform(progress, [0, SCATTER_END], [`${layout.pileX}cqw`, `${layout.x}cqw`]);
  const y = useTransform(progress, [0, SCATTER_END], [`${layout.pileY}cqw`, `${layout.y}cqw`]);
  const rotate = useTransform(progress, [0, SCATTER_END], [layout.pileRotate, layout.rotate]);
  const scale = useTransform(progress, [0, SCATTER_END], [0.5, 1]);

  const style = reduce
    ? { transform: `translate(${layout.x}cqw, ${layout.y}cqw) rotate(${layout.rotate}deg)`, zIndex }
    : { x, y, rotate, scale, zIndex };

  return (
    <motion.div className="polaroid-frame absolute w-[33cqw]" style={style}>
      <img src={image.src} alt={image.alt} loading="lazy" draggable={false} className="aspect-3/4 w-full object-cover" />
    </motion.div>
  );
}

function TextReveal({
  children,
  progress,
  reduce,
}: {
  children: ReactNode;
  progress: MotionValue<number>;
  reduce: boolean | null;
}) {
  const opacity = useTransform(progress, [TEXT_START, 1], [0, 1]);
  const y = useTransform(progress, [TEXT_START, 1], [12, 0]);
  const style = reduce ? { opacity: 1 } : { opacity, y };

  return (
    <motion.div className="relative z-10 max-w-xs px-6 text-center text-ink-soft" style={style}>
      {children}
    </motion.div>
  );
}
