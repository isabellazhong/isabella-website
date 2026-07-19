const COLORS: Record<string, string> = {
  typescript: "#5b7fb8",
  javascript: "#d0a63d",
  react: "#56a8b5",
  python: "#7d9d5c",
  "node.js": "#9a86bd",
  figma: "#bf6a55",
  go: "#58a49a",
  aws: "#c98d3f",
  swift: "#c47854",
  sql: "#8a8f6a",
  "c++": "#a0688f",
  tailwind: "#6a9ac2",
  default: "#8b8378",
};

// three slightly different wobbly blobs so the dots don't look stamped
const BLOBS = [
  "M10 3.4 C13.6 2.7 16.8 5.2 16.9 9.3 C17 13.6 13.9 16.9 9.9 16.7 C6 16.5 3.1 13.7 3.2 9.9 C3.3 6.1 6.5 4 10 3.4 Z",
  "M9.6 3.1 C13.9 2.4 17.2 5.8 16.6 9.9 C16.1 13.8 13.2 17 9.4 16.6 C5.8 16.2 2.8 13.4 3.1 9.5 C3.4 5.9 5.9 3.7 9.6 3.1 Z",
  "M10.3 3.6 C14 3.3 16.6 6 16.4 9.7 C16.2 13.7 13.5 16.5 9.7 16.4 C6.1 16.3 3.4 13.9 3.5 10.1 C3.6 6.3 6.7 3.9 10.3 3.6 Z",
];

function hash(s: string) {
  let h = 0;
  for (const c of s) h = (h * 31 + c.charCodeAt(0)) | 0;
  return Math.abs(h);
}

export default function Tag({ label }: { label: string }) {
  const color = COLORS[label.toLowerCase()] ?? COLORS.default;
  const h = hash(label.toLowerCase());
  const blob = BLOBS[h % BLOBS.length];
  const tilt = ((h % 5) - 2) * 18;

  return (
    <span className="tag">
      <svg className="tag-dot" viewBox="0 0 20 20" style={{ transform: `rotate(${tilt}deg)` }} aria-hidden="true">
        <path d={blob} fill={color} />
      </svg>
      {label}
    </span>
  );
}
