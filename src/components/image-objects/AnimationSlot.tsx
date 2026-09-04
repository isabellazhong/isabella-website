/**
 * Gently drifting gradient shown wherever an animation will eventually live
 * (styles in index.css). Static under prefers-reduced-motion.
 */
export function AnimationSlot({ className }: { className?: string }) {
  return <div className={`animation-slot ${className ?? ""}`} aria-hidden="true" />;
}
