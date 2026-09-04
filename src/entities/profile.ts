import type { ImageObject } from "./image-object";

/** A hobby or interest card in the about section. */
export interface Hobby {
  id: string;
  name: string;
  blurb: string;
  /** Optional visual if a hobby deserves more than a text card. */
  image?: ImageObject;
}

/** One way to reach you, rendered as a card on the contact page. */
export interface ContactLink {
  id: string;
  label: string;
  /** The visible handle or address, e.g. "@isabella" or an email. */
  value: string;
  url: string;
  icon: "email" | "github" | "linkedin" | "resume" | "other";
}

/** Content for the snap landing section at the top of the home page. */
export interface LandingContent {
  headline: string;
  subtext: string;
  /**
   * Full-bleed background of the landing section. null renders the
   * animation-slot placeholder; swap in a FrameSequence once frames exist.
   */
  background: ImageObject | null;
}
