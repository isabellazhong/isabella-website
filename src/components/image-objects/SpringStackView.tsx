import { useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import type { SpringStack } from "../../entities";

/** Fanned stack of images; clicking springs the top card to the back. */
export function SpringStackView({ object, className }: { object: SpringStack; className?: string }) {
  const { images } = object;
  const [order, setOrder] = useState<number[]>(() => images.map((_, i) => i));
  const reduce = useReducedMotion();

  if (images.length === 0) return null;

  const cycle = () => setOrder(([first, ...rest]) => [...rest, first]);

  return (
    <button
      type="button"
      onClick={cycle}
      aria-label="Show next image in the stack"
      className={`relative block aspect-[3/4] w-full ${className ?? ""}`}
    >
      {order.map((imageIndex, position) => {
        const image = images[imageIndex];
        return (
          <motion.span
            key={imageIndex}
            className="absolute inset-0 block overflow-hidden rounded-2xl border border-line bg-surface-raised"
            style={{ zIndex: images.length - position }}
            animate={{
              rotate: position * 3 - 2,
              x: position * 14,
              scale: 1 - position * 0.05,
              opacity: position > 2 ? 0 : 1,
            }}
            transition={reduce ? { duration: 0 } : { type: "spring", stiffness: 200, damping: 22 }}
          >
            <img src={image.src} alt={image.alt} loading="lazy" draggable={false} className="h-full w-full object-cover" />
          </motion.span>
        );
      })}
    </button>
  );
}
