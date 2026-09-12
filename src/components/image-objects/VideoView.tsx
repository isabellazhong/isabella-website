import type { Video } from "../../types";

/**
 * Plays a video file, mirroring SingleImageView's sizing so a video drops into
 * any block an image fits. Unlike photos it defaults to no polaroid frame --
 * a framed player looks like a photo that refuses to sit still -- but data can
 * ask for one with variant: "polaroid".
 */
export function VideoView({ object, className }: { object: Video; className?: string }) {
  const { video, controls = true, autoPlay = false, loop = false } = object;
  // Browsers block sound-on autoplay, so an autoplaying video is muted unless
  // the data insists otherwise.
  const muted = object.muted ?? autoPlay;

  const player = (
    <video
      src={video.src}
      poster={video.poster}
      controls={controls}
      autoPlay={autoPlay}
      loop={loop}
      muted={muted}
      playsInline
      preload={video.poster ? "none" : "metadata"}
      aria-label={video.alt}
      className={
        object.variant === "polaroid"
          ? "max-h-200 max-w-full object-contain"
          : `max-h-200 max-w-full object-contain ${className ?? ""}`
      }
    >
      {video.alt}
    </video>
  );

  if (object.variant === "polaroid") {
    return <div className={`polaroid-frame inline-block ${className ?? ""}`}>{player}</div>;
  }

  return player;
}
