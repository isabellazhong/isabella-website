// placeholder blog posts; each body paragraph is plain text

export type Blog = {
  id: string;
  title: string;
  date: string;
  body: string[];
};

export const BLOGS: Blog[] = [
  {
    id: "how-i-built-this-website",
    title: "how i built this website",
    date: "july 2026",
    body: [
      "placeholder post. this is where the story of the shooting star animation, the paper grain, and the crumpled blog cards would go.",
      "replace this text in src/data/blogs.ts whenever the real post is ready.",
    ],
  },
  {
    id: "learning-to-draw-again",
    title: "learning to draw again",
    date: "may 2026",
    body: [
      "placeholder post about picking up a sketchbook after years away from it.",
      "replace this text in src/data/blogs.ts whenever the real post is ready.",
    ],
  },
  {
    id: "notes-from-my-first-internship",
    title: "notes from my first internship",
    date: "february 2026",
    body: [
      "placeholder post with the lessons that stuck after a first term in industry.",
      "replace this text in src/data/blogs.ts whenever the real post is ready.",
    ],
  },
  {
    id: "small-things-i-love-on-the-web",
    title: "small things i love on the web",
    date: "november 2025",
    body: [
      "placeholder post collecting favourite little interactions found around the internet.",
      "replace this text in src/data/blogs.ts whenever the real post is ready.",
    ],
  },
];
