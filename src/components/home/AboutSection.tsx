import { Reveal } from "../motion/Reveal";
import { TextImageBlock } from "../blocks/TextImageBlock";
import { ImageObjectView } from "../image-objects/ImageObjectView";
import { aboutParagraphs, aboutPortrait, catPhoto, photoScatterShowcase } from "../../data/profile";

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
          <ImageObjectView object={photoScatterShowcase} />
        </Reveal>
        <Reveal>
          <TextImageBlock textSide="right" image={catPhoto} title="I also have a cat" 
          titleSize="text-5xl" align="text-right" position="top" imageClassName="aspect-[4/5]">
            <p className="leading-relaxed text-ink-soft text-right">
              Replace this with a short intro to your cat: name, personality, favorite mischief.
            </p>
          </TextImageBlock>
        </Reveal>
      </div>
    </section>
  );
}
