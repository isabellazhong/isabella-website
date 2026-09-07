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

export const aboutParagraphs = [
  "Replace this paragraph with a short introduction: where you study or work, what you care about, and what you are building right now.",
  "A second paragraph can go deeper: how you got into your field, and what you are exploring outside of it.",
];

/** Visual next to the about text. Swap the placeholder photos for your own. */
export const aboutPortrait: ImageObject = {
  kind: "single",
  image: 
    { src: "/photos/about_me.png", alt: "my photo" },
};

/** My cat, shown as a plain image with no polaroid frame. */
export const catPhoto: ImageObject = {
  kind: "single",
  variant: "plain",
  image: { src: "/photos/cat.png", alt: "my cat" },
};

/**
 * Five photos that pile up, then scatter into a loose ring around the
 * headline as this section scrolls into view. Swap the placeholder photos
 * for your own.
 */
export const photoScatterShowcase: ImageObject = {
  kind: "photo-scatter",
  images: [
    { src: "https://picsum.photos/seed/isabella-scatter-1/600/750", alt: "Placeholder photo one" },
    { src: "https://picsum.photos/seed/isabella-scatter-2/600/750", alt: "Placeholder photo two" },
    { src: "https://picsum.photos/seed/isabella-scatter-3/600/750", alt: "Placeholder photo three" },
    { src: "https://picsum.photos/seed/isabella-scatter-4/600/750", alt: "Placeholder photo four" },
    { src: "https://picsum.photos/seed/isabella-scatter-5/600/750", alt: "Placeholder photo five" },
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
    url: "https://github.com",
    icon: "github",
  },
  {
    id: "linkedin",
    label: "LinkedIn",
    value: "your-name",
    url: "https://linkedin.com",
    icon: "linkedin",
  },
];
