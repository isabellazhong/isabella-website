import { Reveal } from "../motion/Reveal";
import { TextImageBlock } from "../blocks/TextImageBlock";
import { aboutParagraphs, aboutPortrait, hobbies } from "../../data/profile";

/** Scrolls normally below the snap landing section. */
export function AboutSection() {
  return (
    <section id="about" className="snap-start py-24">
      <div className="container-page flex flex-col gap-20">
        <Reveal>
          <TextImageBlock textSide="left" image={aboutPortrait} title="About me">
            {aboutParagraphs.map((paragraph, i) => (
              <p key={i} className="leading-relaxed text-ink-soft">
                {paragraph}
              </p>
            ))}
          </TextImageBlock>
        </Reveal>
        <Reveal>
          <div className="flex flex-col gap-6">
            <h2 className="font-display text-2xl tracking-tight">Hobbies and interests</h2>
            {hobbies.length === 0 ? (
              <p className="text-ink-soft">Add hobbies in src/data/profile.ts and they will show up here.</p>
            ) : (
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {hobbies.map((hobby) => (
                  <div key={hobby.id} className="rounded-2xl border border-line bg-surface-raised p-5">
                    <h3 className="font-medium">{hobby.name}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-ink-soft">{hobby.blurb}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
