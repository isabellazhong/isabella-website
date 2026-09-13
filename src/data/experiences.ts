import type { ExperienceEntry } from "../types";

/** Most recent first. Add a new internship by prepending an entry. */
export const experiences: ExperienceEntry[] = [
  {
    id: "internship-2",
    role: "Software Engineering Intern",
    company: "Second company",
    location: "City, Country",
    start: "May 2025",
    end: "Aug 2025",
    summary:
      "Describe what you owned and shipped during this internship in one or two sentences.",
    skills: ["Python", "SQL"],
  },
  {
    id: "internship-1",
    role: "Software Engineering Intern",
    company: "First company",
    location: "City, Country",
    start: "May 2024",
    end: "Aug 2024",
    summary:
      "Describe what you owned and shipped during this internship in one or two sentences.",
    skills: ["Java"],
  },
];
