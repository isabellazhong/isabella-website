import type { PhotoScatter } from "../../types";
import { PhotoScatterReveal } from "./PhotoScatterReveal";

export function PhotoScatterView({ object, className }: { object: PhotoScatter; className?: string }) {
  return (
    <PhotoScatterReveal images={object.images} className={className}>
      <h2 className="font-display text-2xl tracking-tight">{object.text}</h2>
    </PhotoScatterReveal>
  );
}
