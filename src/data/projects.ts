import type { Project } from "../types";
import type { ProjectGraphOptions } from "../lib/graph/ProjectGraph";

/**
 * Each project is a node on /projects. Its `skills` set is what the graph
 * compares: two projects are linked when the Jaccard similarity of their skill
 * sets clears `projectGraphSettings.threshold`, and the stronger the overlap
 * the heavier the edge. Adding or removing a skill re-draws the constellation,
 * so keep the sets honest.
 *
 * `details` still drives the long-form subpage at /projects/:id.
 */
export const projects: Project[] = [
  {
    id: "synapse",
    title: "Synapse",
    tagline: "A living map of everything I have read, drawn from my own notes.",
    date: "2026-04-18",
    description:
      "Synapse turns a folder of markdown notes into a browsable knowledge graph. It parses wiki-links at build time, lays the result out with a force simulation, and renders the whole thing as one canvas you can pan, zoom and search. The interesting problem was keeping 4,000 nodes at 60fps without giving up crisp text.",
    skills: [
      { name: "TypeScript", category: "language" },
      { name: "React", category: "framework" },
      { name: "Vite", category: "tool" },
      { name: "Tailwind CSS", category: "framework" },
      { name: "Motion", category: "library" },
      { name: "D3", category: "library" },
      { name: "Figma", category: "tool" },
      { name: "Vercel", category: "tool" },
    ],
    cover: {
      kind: "single",
      image: { src: "https://picsum.photos/seed/isabella-synapse/1200/900", alt: "Placeholder cover for Synapse" },
    },
    gallery: [
      { src: "https://picsum.photos/seed/isabella-synapse-a/600/760", alt: "Synapse graph view" },
      { src: "https://picsum.photos/seed/isabella-synapse-b/600/760", alt: "Synapse note detail" },
    ],
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
          image: { src: "https://picsum.photos/seed/isabella-synapse-c/1200/900", alt: "Placeholder screenshot" },
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
            { src: "https://picsum.photos/seed/isabella-synapse-d/1200/900", alt: "Placeholder screen one" },
            { src: "https://picsum.photos/seed/isabella-synapse-e/1200/900", alt: "Placeholder screen two" },
            { src: "https://picsum.photos/seed/isabella-synapse-f/1200/900", alt: "Placeholder screen three" },
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
    id: "tidewatch",
    title: "Tidewatch",
    tagline: "Coastal flood alerts for people who do not read tide tables.",
    date: "2026-01-22",
    description:
      "A scheduled job pulls tide and storm-surge readings from three public feeds, reconciles their disagreeing timestamps, and pushes a plain-language warning when a beach access road is about to go under. The hard part was not the model; it was making the alert readable at 6am.",
    skills: [
      { name: "TypeScript", category: "language" },
      { name: "React", category: "framework" },
      { name: "Node.js", category: "tool" },
      { name: "PostgreSQL", category: "tool" },
      { name: "Prisma", category: "library" },
      { name: "Docker", category: "tool" },
    ],
    cover: {
      kind: "single",
      image: { src: "https://picsum.photos/seed/isabella-tidewatch/1200/900", alt: "Placeholder cover for Tidewatch" },
    },
    gallery: [
      { src: "https://picsum.photos/seed/isabella-tidewatch-a/600/760", alt: "Tidewatch alert screen" },
    ],
    details: [
      {
        kind: "paragraph",
        text: "Open with a short overview: the problem, your role, and the outcome.",
      },
    ],
  },
  {
    id: "foldspace",
    title: "Foldspace",
    tagline: "Protein structure search that runs on a laptop.",
    date: "2025-09-05",
    description:
      "An embedding index over predicted structures, quantised hard enough to fit in memory on consumer hardware. Queries return in under a second where the reference implementation needed a cluster. Written up as a short methods note alongside the code.",
    skills: [
      { name: "Python", category: "language" },
      { name: "PyTorch", category: "framework" },
      { name: "NumPy", category: "library" },
      { name: "FastAPI", category: "framework" },
      { name: "Docker", category: "tool" },
    ],
    cover: {
      kind: "single",
      image: { src: "https://picsum.photos/seed/isabella-foldspace/1200/900", alt: "Placeholder cover for Foldspace" },
    },
    gallery: [
      { src: "https://picsum.photos/seed/isabella-foldspace-a/600/760", alt: "Foldspace query results" },
    ],
    details: [
      {
        kind: "paragraph",
        text: "Open with a short overview: the problem, your role, and the outcome.",
      },
    ],
  },
  {
    id: "almanac",
    title: "Almanac",
    tagline: "Twenty years of a family farm's records, finally queryable.",
    date: "2025-05-30",
    description:
      "Scanned notebooks turned into a tidy time series: yields, rainfall, and every decision that sat between them. The ingestion pipeline is deliberately boring and the interesting work is in the reconciliation rules, which are all documented in the repo.",
    skills: [
      { name: "Python", category: "language" },
      { name: "FastAPI", category: "framework" },
      { name: "pandas", category: "library" },
      { name: "NumPy", category: "library" },
      { name: "PostgreSQL", category: "tool" },
      { name: "Docker", category: "tool" },
    ],
    cover: {
      kind: "single",
      image: { src: "https://picsum.photos/seed/isabella-almanac/1200/900", alt: "Placeholder cover for Almanac" },
    },
    gallery: [{ src: "https://picsum.photos/seed/isabella-almanac-a/600/760", alt: "Almanac dashboard" }],
    details: [
      {
        kind: "paragraph",
        text: "Open with a short overview: the problem, your role, and the outcome.",
      },
    ],
  },
  {
    id: "paperweight",
    title: "Paperweight",
    tagline: "An iOS reader that keeps your place across paper and screen.",
    date: "2024-11-12",
    description:
      "Scan a page with the camera, and the app finds where you are in the ebook and syncs from there. Offline first, with a small sync service behind it. Most of the effort went into making the scan feel instant rather than into the matching itself.",
    skills: [
      { name: "Swift", category: "language" },
      { name: "SwiftUI", category: "framework" },
      { name: "Xcode", category: "tool" },
      { name: "Figma", category: "tool" },
      { name: "PostgreSQL", category: "tool" },
      { name: "Docker", category: "tool" },
    ],
    cover: {
      kind: "single",
      image: { src: "https://picsum.photos/seed/isabella-paperweight/1200/900", alt: "Placeholder cover for Paperweight" },
    },
    gallery: [{ src: "https://picsum.photos/seed/isabella-paperweight-a/600/760", alt: "Paperweight reader view" }],
    details: [
      {
        kind: "paragraph",
        text: "Open with a short overview: the problem, your role, and the outcome.",
      },
    ],
  },
  {
    id: "lanterns",
    title: "Lanterns",
    tagline: "A browser toy about light, drawn one shader at a time.",
    date: "2024-06-03",
    description:
      "A hundred paper lanterns drifting in a dark field, each one a single draw call. Built to learn how far a hand-written fragment shader can carry an interface before you reach for a real engine. It ships as one page and no build-time assets.",
    skills: [
      { name: "TypeScript", category: "language" },
      { name: "React", category: "framework" },
      { name: "Three.js", category: "library" },
      { name: "GLSL", category: "language" },
      { name: "Vite", category: "tool" },
      { name: "Figma", category: "tool" },
    ],
    cover: {
      kind: "single",
      image: { src: "https://picsum.photos/seed/isabella-lanterns/1200/900", alt: "Placeholder cover for Lanterns" },
    },
    gallery: [{ src: "https://picsum.photos/seed/isabella-lanterns-a/600/760", alt: "Lanterns scene" }],
    details: [
      {
        kind: "paragraph",
        text: "Open with a short overview: the problem, your role, and the outcome.",
      },
    ],
  },
];

/**
 * The project the graph opens on. Leave as null to open on the most recent
 * project by `date`, or set an id ("lanterns") to pin a specific one.
 */
export const defaultProjectId: string | null = null;

/** How many related projects the flattened view keeps beside the selection. */
export const focusNeighborCount = 2;

/** Tuning for the similarity graph. */
export const projectGraphSettings: ProjectGraphOptions = {
  /** Pairs below this Jaccard score are not related enough to draw. */
  threshold: 0.12,
  /** Strongest-first cap per project, so the cloud stays readable. */
  maxDegree: 4,
};
