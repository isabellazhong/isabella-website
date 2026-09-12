import type { ContactLink, Hobby, ImageObject, LandingContent } from "../types";

export const SITE_NAME = "Isabella Zhong";

export const landing: LandingContent = {
  headline: "Hello, I'm",
  subtext: "钟佳妮",
  background: {
    kind: "frame-sequence",
    frames: Array.from(
      { length: 15 },
      (_, i) => `/animations/landing/frame_${String(i + 1).padStart(2, "0")}.png`,
    ),
    fps: 12,
    holdFirstMs: 1000,
    holdLastMs: 1500,
  },
};

/** Plain strings; `[label](href)` becomes an inline link when rendered. */
export const aboutParagraphs = [
  `My name is Isabella and I am currently in my third year studying Computer Science and Cognitive Science double degree @ the University of Toronto. 
  I have been very interested into AI/ML as of late and have been going in depth on the fundamentals such as transformers, optimizers, weight decay functions, etc. 
  You can follow my progress [here](/blogs) :) 
  `, `Apart from work and academics, I love unleashing my creative side in forms of paintings, sketches, etc. In fact, the animation in the landing page is drawn by me!
   (which takes a lot longer than it looks... I hold a lot of respect for animators). I also enjoy cooking and watching tons of movies!! 
  `
];

/** Visual next to the about text. Swap the placeholder photos for your own. */
export const aboutPortrait: ImageObject = {
  kind: "single",
  image: 
    { src: "/assets/about_me.png", alt: "my photo" },
};

/** My cat, shown as a plain image with no polaroid frame. */
export const catPhoto: ImageObject = {
  kind: "single",
  variant: "plain",
  image: { src: "/assets/cat.png", alt: "my cat" },
};

export const catParagraph: string = "Her name is Luna! It took me forever to convince my parents to get her."

/**
 * Five photos that pile up, then scatter into a loose ring around the
 * headline as this section scrolls into view. Swap the placeholder photos
 * for your own.
 */
export const photoScatterShowcase: ImageObject = {
  kind: "photo-scatter",
  images: [
    { src: "/assets/art/joey.jpeg", alt: "Placeholder photo one" },
    { src: "/assets/art/koi.jpg", alt: "Placeholder photo two" },
    { src: "/assets/art/landscape.jpg", alt: "Placeholder photo three" },
    { src: "/assets/art/plate.jpg", alt: "Placeholder photo four" },
    { src: "/assets/art/sketch.jpg", alt: "Placeholder photo five" },
  ],
  text: "Some of my artworks!",
};



export const hobbies: Hobby[] = [
  { id: "hobby-1", name: "Hobby one", blurb: "One line on what it is and why you love it." },
  { id: "hobby-2", name: "Hobby two", blurb: "One line on what it is and why you love it." },
  { id: "hobby-3", name: "Hobby three", blurb: "One line on what it is and why you love it." },
  { id: "hobby-4", name: "Hobby four", blurb: "One line on what it is and why you love it." },
];

export const contactLinks: ContactLink[] = [
  {
    id: "email",
    label: "Email",
    value: "isabellazhong888@gmail.com",
    url: "mailto:isabellazhong888@gmail.com",
    icon: "email",
  },
  {
    id: "github",
    label: "GitHub",
    value: "@your-handle",
    url: "https://github.com/isabellazhong",
    icon: "github",
  },
  {
    id: "linkedin",
    label: "LinkedIn",
    value: "your-name",
    url: "www.linkedin.com/in/isabella-zhong",
    icon: "linkedin",
  },
];
