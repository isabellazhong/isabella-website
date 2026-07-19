// placeholder entries, newest first; swap in your real history

export type Experience = {
  id: string;
  company: string;
  role: string;
  start: string;
  duration: string;
  tags: string[];
  description: string;
};

export const EXPERIENCE: Experience[] = [
  {
    id: "xp-one",
    company: "company name",
    role: "software engineer intern",
    start: "may 2026",
    duration: "4 months",
    tags: ["typescript", "react", "aws"],
    description:
      "placeholder description. a couple of sentences about the team you joined, what you built, and the difference it made.",
  },
  {
    id: "xp-two",
    company: "another company",
    role: "full stack developer intern",
    start: "may 2025",
    duration: "4 months",
    tags: ["python", "node.js"],
    description:
      "placeholder description. mention the product you worked on, the stack you touched, and one thing you shipped end to end.",
  },
  {
    id: "xp-three",
    company: "campus club or lab",
    role: "developer",
    start: "september 2024",
    duration: "8 months",
    tags: ["figma", "typescript"],
    description:
      "placeholder description. side projects, research, or club work all fit here. keep it to two or three sentences.",
  },
];
