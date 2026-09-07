import type { SingleImage } from "../../types";

export function SingleImageView({ object, className }: { object: SingleImage; className?: string }) {
  if (object.variant === "plain") {
    return (
      <img
        src={object.image.src}
        alt={object.image.alt}
        loading="lazy"
        className={`max-h-200 max-w-full object-contain ${className ?? ""}`}
      />
    );
  }

  return (
    <div className={`polaroid-frame inline-block ${className ?? ""}`}>
      <img
        src={object.image.src}
        alt={object.image.alt}
        loading="lazy"
        className="max-h-200 max-w-full object-contain"
      />
    </div>
  );
}
