import type { CSSProperties } from "react";

// placeholder pen doodles, drawn as wobbly strokes; swap for scanned drawings any time
const PATHS: Record<string, string[]> = {
  star: [
    "M20 4.6 L24.8 14.6 L35.4 16.2 L27.2 23.4 L30.2 34.4 L19.8 28.2 L9.8 34.8 L12.6 23.6 L4.4 15.8 L15.2 14.9 Z",
  ],
  sparkle: [
    "M20 5 C20.5 12 20.4 13 20 17",
    "M20 23 C19.6 27 19.8 30 20.2 35",
    "M5 20 C10 19.6 13 19.8 17 20",
    "M23 20 C27 20.3 31 20.1 35 19.8",
  ],
  squiggle: ["M4 24 C 8 14, 14 14, 18 22 C 22 30, 28 30, 32 22 C 34 18, 36 16, 37 15"],
  arrow: ["M5 30 C 14 26, 24 18, 33 10", "M33 10 L26 11.5", "M33 10 L31 17"],
  arrowDown: ["M20 5 C 19.2 13, 20.6 21, 20 32", "M20 32 L14.6 26.2", "M20 32 L25.4 25.6"],
  heart: [
    "M20 33 C 8 24, 5 14, 11.5 9.5 C 16 6.5, 19.5 9.5, 20 12 C 20.7 9.3, 24.5 6.6, 28.7 9.8 C 35 14.5, 31 24, 20 33 Z",
  ],
  sun: [
    "M20 13 C 24 13, 27 16, 27 20 C 27 24, 24 27, 20 27 C 16 27, 13 24, 13 20 C 13 16, 16 13, 20 13 Z",
    "M20 3 L20 8",
    "M20 32 L20 37",
    "M3 20 L8 20",
    "M32 20 L37 20",
    "M8 8 L11.5 11.5",
    "M28.5 28.5 L32 32",
    "M32 8 L28.5 11.5",
    "M11.5 28.5 L8 32",
  ],
  loop: ["M4 28 C 10 16, 16 12, 18 17 C 20 22, 14 26, 12 21 C 10 16, 20 10, 26 12 C 32 14, 34 20, 36 26"],
};

export type DoodleKind = keyof typeof PATHS;

type Props = {
  kind: DoodleKind;
  size?: number;
  rotate?: number;
  className?: string;
  style?: CSSProperties;
};

export default function Doodle({ kind, size = 40, rotate = 0, className, style }: Props) {
  return (
    <svg
      className={`doodle ${className ?? ""}`}
      style={{ width: size, height: size, transform: `rotate(${rotate}deg)`, ...style }}
      viewBox="0 0 40 40"
      aria-hidden="true"
    >
      {PATHS[kind].map((d, i) => (
        <path key={i} d={d} />
      ))}
    </svg>
  );
}
