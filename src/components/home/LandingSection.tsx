import { motion, useReducedMotion } from "motion/react";
import { landing } from "../../data/profile";
import { ImageObjectView } from "../image-objects/ImageObjectView";
import { AnimationSlot } from "../image-objects/AnimationSlot";

/**
 * Full-viewport snap section: animation fills the background, text sits on
 * the right at desktop widths.
 */
export function LandingSection() {
  const reduce = useReducedMotion();

  return (
    <section className="relative flex min-h-[calc(100dvh-4rem)] snap-start items-center overflow-hidden">
      <div className="absolute inset-0" aria-hidden="true">
        {landing.background ? (
          <ImageObjectView object={landing.background} className="h-full w-full translate-x-[20%]  object-contain md:translate-x-[-20%] md:scale-[0.7]" />
        ) : (
          <AnimationSlot className="h-full w-full" />
        )}
      </div>
      <div className="container-page relative grid gap-10 md:grid-cols-2">
        <div className="hidden md:block" />
        <motion.div
          className="flex max-w-xl flex-col items-start gap-6"
          initial={reduce ? false : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <h1 className="font-display text-5xl tracking-tight md:text-2xl text-accent-ink">{landing.headline}</h1>
          <h1 className="font-display text-9xl tracking-tight md:text-9xl text-accent-ink gradient-text">Isabella</h1>
          <p className="max-w-[40ch] text-6xl leading-relaxed text-ink-soft">{landing.subtext}</p>
        </motion.div>
      </div>
    </section>
  );
}
