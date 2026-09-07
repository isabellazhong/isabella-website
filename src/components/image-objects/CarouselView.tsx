import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { CaretLeft, CaretRight } from "@phosphor-icons/react";
import type { Carousel } from "../../types";

export function CarouselView({ object, className }: { object: Carousel; className?: string }) {
  const [index, setIndex] = useState(0);
  const reduce = useReducedMotion();
  const { images } = object;

  if (images.length === 0) return null;
  const current = images[index];
  const step = (delta: number) => setIndex((i) => (i + delta + images.length) % images.length);

  return (
    <div className={`polaroid-frame ${className ?? ""}`}>
      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg">
        <AnimatePresence mode="wait" initial={false}>
          <motion.img
            key={current.src}
            src={current.src}
            alt={current.alt}
            className="absolute inset-0 h-full w-full object-cover"
            initial={{ opacity: reduce ? 1 : 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: reduce ? 1 : 0 }}
            transition={{ duration: 0.25 }}
          />
        </AnimatePresence>
        {images.length > 1 && (
          <>
            <button
              type="button"
              aria-label="Previous image"
              onClick={() => step(-1)}
              className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-surface/80 p-2 text-ink backdrop-blur transition-transform active:scale-95"
            >
              <CaretLeft size={16} weight="bold" />
            </button>
            <button
              type="button"
              aria-label="Next image"
              onClick={() => step(1)}
              className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-surface/80 p-2 text-ink backdrop-blur transition-transform active:scale-95"
            >
              <CaretRight size={16} weight="bold" />
            </button>
          </>
        )}
      </div>
    </div>
  );
}
