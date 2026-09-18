import { useRef } from "react";
import type { CSSProperties, ReactNode } from "react";
import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from "motion/react";
import type { ImageAsset } from "../../types";
import { ResponsiveImage } from "./ResponsiveImage";

export interface PhotoScatterRevealProps {
  /** Exactly 5 photos: piled at the center, then scattered into a loose ring. */
  images: [ImageAsset, ImageAsset, ImageAsset, ImageAsset, ImageAsset];
  /** Revealed at the center once the photos finish scattering. */
  children: ReactNode;
  className?: string;
}

/** Each photo is capped at 33cqw of an anchor box that is itself at most
    38rem wide, so it never renders wider than ~200px. */
const PHOTO_SIZES = "200px";

const LAYOUT: { pileX: number; pileY: number; pileRotate: number; x: number; y: number; rotate: number }[] = [
  { pileX: -1.3, pileY: -0.8, pileRotate: -9, x: -55.1, y: -31.3, rotate: -11 },
  { pileX: 1.0, pileY: 0.7, pileRotate: 7, x: 42.8, y: -39.5, rotate: 8 },
  { pileX: -0.7, pileY: 1.2, pileRotate: -15, x: -60.7, y: 14.0, rotate: 10 },
  { pileX: 1.3, pileY: -1.0, pileRotate: 12, x: 56.0, y: 19.7, rotate: -14 },
  { pileX: 0, pileY: 1.5, pileRotate: 3, x: 4.1, y: 47.7, rotate: 5 },
];

const SCATTER_END = 0.35;
const TEXT_START = 0.4;
const TEXT_END = 0.7;

const FRAME_BASE: CSSProperties = { fontSize: "4.8cqw" };

export function PhotoScatterReveal({ images, children, className }: PhotoScatterRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  return (
    <div ref={containerRef} className={`relative ${className ?? ""}`} style={{ height: "140vh" }}>
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
    ? { ...FRAME_BASE, transform: `translate(${layout.x}cqw, ${layout.y}cqw) rotate(${layout.rotate}deg)`, zIndex }
    : { ...FRAME_BASE, x, y, rotate, scale, zIndex };

  return (
    <motion.div className="polaroid-frame absolute" style={style}>
      <ResponsiveImage
        src={image.src}
        alt={image.alt}
        sizes={PHOTO_SIZES}
        draggable={false}
        className="h-auto w-auto max-w-[33cqw] max-h-[44cqw]"
      />
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
  const opacity = useTransform(progress, [TEXT_START, TEXT_END], [0, 1]);
  const y = useTransform(progress, [TEXT_START, TEXT_END], [12, 0]);
  const style = reduce ? { opacity: 1 } : { opacity, y };

  return (
    <motion.div className="relative z-10 max-w-xs px-6 text-center text-ink-soft" style={style}>
      {children}
    </motion.div>
  );
}
