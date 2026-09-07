import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from "motion/react";

/** Scroll fractions (within the scene's own transit through the viewport)
    that drive the slide. The transit is symmetric, so 0.5 always lands when
    this block is centered in the viewport - the roll-in plays just before
    that (ROLL_IN_START -> ROLL_IN_END) instead of the moment the section
    first touches the bottom of the screen, and the roll-out plays on the
    way back out (ROLL_OUT_START -> ROLL_OUT_END). Clouds sit off-screen
    outside these windows and hold at rest in between. */
const ROLL_IN_START = 0.25;
const ROLL_IN_END = 0.5;
const ROLL_OUT_START = 0.67;
const ROLL_OUT_END = 0.80;

interface CloudLayerConfig {
  src: string;
  side: "left" | "right";
  /** Tailwind classes for size + resting placement. Deliberately spills past
      the wrapper's own box (no clipping) - the bottom pair rests below the
      text, the top cloud rests above the portrait photo, so nothing that
      overlaps other content gets hidden behind it. */
  className: string;
  /** CSS drop-shadow() argument list, giving each cloud a 3D lift. */
  shadow: string;
  zIndex: number;
}

const LAYERS: CloudLayerConfig[] = [
  {
    src: "/animations/cloud_comp/btm_left_back.PNG",
    side: "left",
    className: "-bottom-[12%] -left-[3%] w-[clamp(190px,38%,380px)]",
    shadow: "0 14px 20px rgba(15,15,20,0.16)",
    zIndex: 1,
  },
  {
    src: "/animations/cloud_comp/btm_left_front.PNG",
    side: "left",
    className: "-bottom-[12%] -left-[8%] w-[clamp(210px,42%,420px)]",
    shadow: "0 24px 30px rgba(15,15,20,0.26)",
    zIndex: 2,
  },
  {
    src: "/animations/cloud_comp/top_right.PNG",
    side: "right",
    className: "-top-[1%] -right-[10%] w-[clamp(210px,42%,420px)]",
    shadow: "0 20px 28px rgba(15,15,20,0.22)",
    zIndex: 1,
  },
];

/**
 * Decorative cloud illustrations that roll in from off-screen along a
 * horizontal path as this area scrolls into view, and roll back out as it
 * scrolls away. Purely a background layer - render it as the first child of
 * a `relative` wrapper, with real content stacked above it. Deliberately
 * unclipped so the clouds can spill into the sections above/below instead of
 * being cut off at this block's own edges.
 *
 * Corner placement is tuned for the two-column desktop layout; the single-
 * column mobile stack changes the wrapper's aspect ratio enough to throw
 * the corner math off, so this only renders at `md` and up.
 */
export function CloudScene() {
  const sceneRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: sceneRef,
    offset: ["start end", "end start"],
  });

  return (
    <div ref={sceneRef} className="pointer-events-none absolute inset-0 z-0 hidden md:block" aria-hidden="true">
      {LAYERS.map((layer) => (
        <Cloud key={layer.src} layer={layer} progress={scrollYProgress} reduce={reduce} />
      ))}
    </div>
  );
}

function Cloud({
  layer,
  progress,
  reduce,
}: {
  layer: CloudLayerConfig;
  progress: MotionValue<number>;
  reduce: boolean | null;
}) {
  // Percentages are relative to the cloud's own width, so "off-screen" holds
  // regardless of how large the cloud renders at a given viewport size.
  const offscreen = layer.side === "left" ? "-160%" : "160%";
  const x = useTransform(
    progress,
    [0, ROLL_IN_START, ROLL_IN_END, ROLL_OUT_START, ROLL_OUT_END, 1],
    [offscreen, offscreen, "0%", "0%", offscreen, offscreen],
  );

  return (
    <motion.img
      src={layer.src}
      alt=""
      draggable={false}
      loading="lazy"
      className={`absolute select-none ${layer.className}`}
      style={{
        zIndex: layer.zIndex,
        filter: `drop-shadow(${layer.shadow})`,
        x: reduce ? "0%" : x,
      }}
    />
  );
}
