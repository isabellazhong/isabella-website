import { motion, type MotionValue } from "motion/react";

const PATH =
  "M4 8 C 110 3, 220 12, 330 7 C 440 2, 540 12, 650 7 C 760 3, 860 12, 970 7 C 1060 3, 1130 10, 1196 6";

/** hand-drawn scroll progress line, fixed to the bottom of the viewport */
export default function ProgressLine({ progress }: { progress: MotionValue<number> }) {
  return (
    <div className="progress-line" aria-hidden="true">
      <svg viewBox="0 0 1200 14" preserveAspectRatio="none">
        <path d={PATH} className="progress-track" />
        <motion.path d={PATH} className="progress-ink" style={{ pathLength: progress }} />
      </svg>
    </div>
  );
}
