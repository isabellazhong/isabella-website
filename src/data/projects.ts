import type { Project } from "../entities";

/**
 * Each project renders as a half-screen block on /projects (alternating text
 * side) and a detail subpage at /projects/:id built from its `details`
 * content blocks.
 */
export const projects: Project[] = [
  {
    id: "project-one",
    title: "Project One",
    tagline: "One sentence on what this project does and why it exists.",
    year: "2026",
    tech: ["React", "TypeScript", "Vite"],
    cover: {
      kind: "single",
      image: { src: "https://picsum.photos/seed/isabella-project-one/1200/900", alt: "Placeholder cover for Project One" },
    },
    links: [{ label: "GitHub repo", url: "https://github.com" }],
    details: [
      {
        kind: "paragraph",
        text: "Open with a short overview: the problem, your role, and the outcome. Two or three sentences is plenty.",
      },
      {
        kind: "text-image",
        textSide: "left",
        title: "How it works",
        text: "Use text-image blocks to walk through the interesting parts. Set textSide to control which side the text sits on at desktop widths.",
        image: {
          kind: "single",
          image: { src: "https://picsum.photos/seed/isabella-project-one-a/1200/900", alt: "Placeholder screenshot" },
        },
      },
      {
        kind: "text-image",
        textSide: "right",
        title: "What it looks like",
        text: "This block pairs text with a carousel image object. Any ImageObject variant can slot into the same position.",
        image: {
          kind: "carousel",
          images: [
            { src: "https://picsum.photos/seed/isabella-project-one-b/1200/900", alt: "Placeholder screen one" },
            { src: "https://picsum.photos/seed/isabella-project-one-c/1200/900", alt: "Placeholder screen two" },
            { src: "https://picsum.photos/seed/isabella-project-one-d/1200/900", alt: "Placeholder screen three" },
          ],
        },
      },
      { kind: "heading", text: "What I learned" },
      {
        kind: "paragraph",
        text: "Close with reflections or next steps. Add, remove, or reorder blocks freely; the page renders whatever the details array holds.",
      },
    ],
  },
  {
    id: "project-two",
    title: "Project Two",
    tagline: "One sentence on what this project does and why it exists.",
    year: "2025",
    tech: ["Python", "FastAPI"],
    cover: {
      kind: "single",
      image: { src: "https://picsum.photos/seed/isabella-project-two/1200/900", alt: "Placeholder cover for Project Two" },
    },
    details: [
      {
        kind: "paragraph",
        text: "Open with a short overview: the problem, your role, and the outcome.",
      },
    ],
  },
  {
    id: "project-three",
    title: "Project Three",
    tagline: "One sentence on what this project does and why it exists.",
    year: "2025",
    tech: ["Swift"],
    cover: {
      kind: "single",
      image: { src: "https://picsum.photos/seed/isabella-project-three/1200/900", alt: "Placeholder cover for Project Three" },
    },
    details: [
      {
        kind: "paragraph",
        text: "Open with a short overview: the problem, your role, and the outcome.",
      },
    ],
  },
];
