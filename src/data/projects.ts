// placeholder projects; images are picsum placeholders, swap for real screenshots

export type ProjectSection = {
  heading: string;
  body: string;
  image: string;
  caption?: string;
  layout: "split" | "full";
};

export type Project = {
  id: string;
  title: string;
  date: string;
  tags: string[];
  short: string;
  sections: ProjectSection[];
};

export const PROJECTS: Project[] = [
  {
    id: "this-website",
    title: "this website",
    date: "july 2026",
    tags: ["typescript", "react"],
    short:
      "the site you are looking at right now: a hand-drawn portfolio with a scroll-driven opening animation and far too many doodles.",
    sections: [
      {
        heading: "the opening animation",
        body: "placeholder writeup. explain how the shooting star sequence was drawn frame by frame and scrubbed with the scroll position.",
        image: "https://picsum.photos/seed/this-website-shot-one/1200/800",
        caption: "placeholder image, swap for a real screenshot",
        layout: "split",
      },
      {
        heading: "little details",
        body: "placeholder writeup. the shaking star, the crumpled blog paper, the coffee you can pour. list the touches you are proud of.",
        image: "https://picsum.photos/seed/this-website-shot-two/1200/800",
        layout: "split",
      },
      {
        heading: "what is next",
        body: "placeholder writeup. a short note on what you would add with more time.",
        image: "https://picsum.photos/seed/this-website-shot-three/1600/700",
        caption: "placeholder image",
        layout: "full",
      },
    ],
  },
  {
    id: "school-capstone",
    title: "school capstone",
    date: "april 2026",
    tags: ["python", "react"],
    short: "placeholder summary. one or two sentences on the problem this project solved and who it was for.",
    sections: [
      {
        heading: "the idea",
        body: "placeholder writeup about the problem and the approach.",
        image: "https://picsum.photos/seed/capstone-shot-one/1200/800",
        layout: "split",
      },
      {
        heading: "under the hood",
        body: "placeholder writeup about the backend, the data model, or whatever made it tick.",
        image: "https://picsum.photos/seed/capstone-shot-two/1200/800",
        layout: "split",
      },
    ],
  },
  {
    id: "hackathon-build",
    title: "hackathon build",
    date: "january 2026",
    tags: ["typescript", "node.js"],
    short: "placeholder summary. what you hacked together in a weekend and how it went.",
    sections: [
      {
        heading: "36 hours later",
        body: "placeholder writeup about the build, the demo, and what broke five minutes before judging.",
        image: "https://picsum.photos/seed/hackathon-shot-one/1600/700",
        caption: "placeholder image",
        layout: "full",
      },
    ],
  },
  {
    id: "tiny-experiment",
    title: "tiny experiment",
    date: "october 2025",
    tags: ["go"],
    short: "placeholder summary. a small tool or toy that taught you something new.",
    sections: [
      {
        heading: "why it exists",
        body: "placeholder writeup. small projects deserve pages too.",
        image: "https://picsum.photos/seed/experiment-shot-one/1200/800",
        layout: "split",
      },
    ],
  },
];
