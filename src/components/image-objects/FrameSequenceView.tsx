import { useEffect, useRef } from "react";
import { useReducedMotion } from "motion/react";
import type { FrameSequence } from "../../types";
import { AnimationSlot } from "./AnimationSlot";

/**
 * Plays a PNG/JPG frame sequence on a canvas via requestAnimationFrame
 * (no React state per frame). Falls back to the first frame under reduced
 * motion, and to the AnimationSlot placeholder when no frames exist yet.
 */
export function FrameSequenceView({ object, className }: { object: FrameSequence; className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reduce = useReducedMotion();
  const { frames, fps = 24, loop = true, holdFirstMs, holdLastMs } = object;

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
    const durationFor = (i: number) => {
      if (i === 0 && holdFirstMs !== undefined) return holdFirstMs;
      if (i === frames.length - 1 && holdLastMs !== undefined) return holdLastMs;
      return interval;
    };
    const draw = (i: number) => {
      const img = imgs[i];
      if (!img.complete || img.naturalWidth === 0) return false;
      if (canvas.width !== img.naturalWidth || canvas.height !== img.naturalHeight) {
        canvas.width = img.naturalWidth;
        canvas.height = img.naturalHeight;
      }
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0);
      return true;
    };

    let raf = 0;
    let frame = 0;
    let last = performance.now();
    let drawn = false;

    // Holds are counted against the frame currently on screen, so the draw
    // for frame N happens as soon as its predecessor's hold elapses, then we
    // wait durationFor(N) before advancing again.
    const tick = (now: number) => {
      if (!drawn) {
        if (draw(frame)) {
          drawn = true;
          last = now;
        }
        raf = requestAnimationFrame(tick);
        return;
      }
      if (now - last >= durationFor(frame)) {
        const atEnd = frame === frames.length - 1;
        if (atEnd && !loop) return;
        frame = atEnd ? 0 : frame + 1;
        if (draw(frame)) last = now;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [frames, fps, loop, reduce, holdFirstMs, holdLastMs]);

  if (frames.length === 0) return <AnimationSlot className={className} />;
  if (reduce) return <img src={frames[0]} alt="" className={className} />;
  return <canvas ref={canvasRef} className={className} aria-hidden="true" />;
}
