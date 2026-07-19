import type { DoodleKind } from "../components/Doodle";

// everything below is placeholder content, swap freely

export type Polaroid = {
  id: string;
  src: string;
  title: string;
  date: string;
  rotate: number;
  x: number;
  y: number;
};

export const POLAROIDS: Polaroid[] = [
  {
    id: "pol-one",
    src: "https://picsum.photos/seed/isabella-polaroid-one/560/560",
    title: "a good day",
    date: "june 2025",
    rotate: -7,
    x: -58,
    y: -16,
  },
  {
    id: "pol-two",
    src: "https://picsum.photos/seed/isabella-polaroid-two/560/560",
    title: "somewhere sunny",
    date: "march 2025",
    rotate: 5,
    x: 46,
    y: 8,
  },
  {
    id: "pol-three",
    src: "https://picsum.photos/seed/isabella-polaroid-three/560/560",
    title: "little wins",
    date: "december 2024",
    rotate: -2,
    x: -6,
    y: 34,
  },
];

export type Hobby = {
  id: string;
  name: string;
  blurb: string;
  doodle: DoodleKind;
};

export const HOBBIES: Hobby[] = [
  {
    id: "hobby-drawing",
    name: "drawing",
    blurb:
      "most of the doodles on this site started in my sketchbook. a scan of a real drawing will live in this box soon.",
    doodle: "sun",
  },
  {
    id: "hobby-baking",
    name: "baking",
    blurb: "weekend experiments with mixed results and zero regrets. a drawing of my proudest bake goes here.",
    doodle: "heart",
  },
  {
    id: "hobby-coffee",
    name: "coffee hopping",
    blurb: "always hunting for the next favourite cafe. a drawing of my usual order goes here.",
    doodle: "squiggle",
  },
];
