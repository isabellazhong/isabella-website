import type { ContactLink, Hobby, ImageObject, LandingContent } from "../types";

export const SITE_NAME = "Isabella Zhong";

export const landing: LandingContent = {
  headline: "Hello, I'm",
  subtext: "Replace this with one line about who you are and what you build.",
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
  kind: "spring-stack",
  images: [
    { src: "https://picsum.photos/seed/isabella-about-1/900/1200", alt: "Placeholder portrait photo" },
    { src: "https://picsum.photos/seed/isabella-about-2/900/1200", alt: "Placeholder photo two" },
    { src: "https://picsum.photos/seed/isabella-about-3/900/1200", alt: "Placeholder photo three" },
  ],
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
