/**
 * Label widths for the graph. Node labels punch holes in an SVG mask so no
 * edge ever runs behind the text, and the hole has to match the glyphs, so the
 * widths are measured on a canvas with the real font rather than guessed.
 */
export interface LabelFont {
  size: number;
  weight: number;
  family: string;
  /** Extra tracking, in px per gap, applied on top of the measured width. */
  letterSpacing?: number;
}

const cache = new Map<string, number>();
let context: CanvasRenderingContext2D | null | undefined;

function getContext(): CanvasRenderingContext2D | null {
  if (context === undefined) {
    context = typeof document === "undefined" ? null : document.createElement("canvas").getContext("2d");
  }
  return context;
}

export function measureLabel(text: string, font: LabelFont): number {
  const key = `${font.weight}/${font.size}/${font.family}/${font.letterSpacing ?? 0}|${text}`;
  const cached = cache.get(key);
  if (cached !== undefined) return cached;

  const ctx = getContext();
  let width: number;
  if (ctx) {
    ctx.font = `${font.weight} ${font.size}px ${font.family}`;
    width = ctx.measureText(text).width;
  } else {
    // Server / no-canvas fallback: a reasonable average glyph width.
    width = text.length * font.size * 0.56;
  }
  width += (font.letterSpacing ?? 0) * Math.max(0, text.length - 1);

  cache.set(key, width);
  return width;
}

/** Called once webfonts finish loading, since fallback metrics differ. */
export function clearLabelMetrics(): void {
  cache.clear();
}
