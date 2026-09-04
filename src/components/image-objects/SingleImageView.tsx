import type { SingleImage } from "../../entities";

export function SingleImageView({ object, className }: { object: SingleImage; className?: string }) {
  return (
    <img
      src={object.image.src}
      alt={object.image.alt}
      loading="lazy"
      className={`aspect-[4/3] w-full rounded-2xl border border-line object-cover ${className ?? ""}`}
    />
  );
}
