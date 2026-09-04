import { useEffect, useRef } from "react";
import { useReducedMotion } from "motion/react";
import type { FrameSequence } from "../../entities";
import { AnimationSlot } from "./AnimationSlot";

/**
 * Plays a PNG/JPG frame sequence on a canvas via requestAnimationFrame
 * (no React state per frame). Falls back to the first frame under reduced
 * motion, and to the AnimationSlot placeholder when no frames exist yet.
 */
export function FrameSequenceView({ object, className }: { object: FrameSequence; className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reduce = useReducedMotion();
  const { frames, fps = 12, loop = true } = object;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || frames.length === 0 || reduce) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const imgs = frames.map((src) => {
      const img = new Image();
      img.src = src;
      return img;
    });
    const interval = 1000 / fps;
    let raf = 0;
    let last = performance.now();
    let frame = 0;

    const tick = (now: number) => {
      if (now - last >= interval) {
        last = now;
        const img = imgs[frame];
        if (img.complete && img.naturalWidth > 0) {
          if (canvas.width !== img.naturalWidth || canvas.height !== img.naturalHeight) {
            canvas.width = img.naturalWidth;
            canvas.height = img.naturalHeight;
          }
          ctx.drawImage(img, 0, 0);
          const atEnd = frame === frames.length - 1;
          if (atEnd && !loop) return;
          frame = atEnd ? 0 : frame + 1;
        }
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [frames, fps, loop, reduce]);

  if (frames.length === 0) return <AnimationSlot className={className} />;
  if (reduce) return <img src={frames[0]} alt="" className={className} />;
  return <canvas ref={canvasRef} className={className} aria-hidden="true" />;
}
