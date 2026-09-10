import { Reveal } from "../motion/Reveal";
import { CloudScene } from "../motion/CloudScene";
import { TextImageBlock } from "../blocks/TextImageBlock";
import { ImageObjectView } from "../image-objects/ImageObjectView";
import { RichText } from "../content/RichText";
import { aboutParagraphs, aboutPortrait, catPhoto, photoScatterShowcase, catParagraph } from "../../data/profile";

/** Scrolls normally below the snap landing section. */
export function AboutSection() {
  return (
    <section id="about" className="snap-start py-24">
      <div className="container-page flex flex-col gap-20">
        <div className="relative">
          <CloudScene />
          <Reveal className="relative z-10">
            <TextImageBlock textSide="left" image={aboutPortrait} title="About me">
              {aboutParagraphs.map((paragraph, i) => (
                <p key={i} className="leading-relaxed text-ink-soft">
                  <RichText text={paragraph} />
                </p>
              ))}
            </TextImageBlock>
          </Reveal>
        </div>
        <Reveal>
          <ImageObjectView object={photoScatterShowcase} />
        </Reveal>
        <Reveal>
          <TextImageBlock textSide="right" image={catPhoto} title="I also have a cat" 
          titleSize="text-5xl" align="text-right" position="top" imageClassName="aspect-[4/5]">
            <p className="leading-relaxed text-ink-soft text-right">
              {catParagraph}
            </p>
          </TextImageBlock>
        </Reveal>
      </div>
    </section>
  );
}
