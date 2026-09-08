import type { Vec3 } from "./Vec3";

export interface Viewport {
  width: number;
  height: number;
}

export interface ProjectedPoint {
  x: number;
  y: number;
  /** Rotated z. Larger is further from the viewer. */
  depth: number;
  /** Perspective foreshortening, ~0.8 (back) to ~1.3 (front). */
  scale: number;
}

/** How much of the shorter viewport axis the unit-radius cloud fills. */
const RADIUS_RATIO = 0.32;

/**
 * Pinhole projection of the unit-radius node cloud onto the graph pane.
 * Screen y is flipped so +y in the layout reads as up.
 */
export class PerspectiveProjector {
  readonly centerX: number;
  readonly centerY: number;
  readonly radius: number;

  constructor(
    viewport: Viewport,
    private readonly focalLength = 4,
  ) {
    this.centerX = viewport.width / 2;
    this.centerY = viewport.height / 2;
    this.radius = Math.min(viewport.width, viewport.height) * RADIUS_RATIO;
  }

  project(v: Vec3): ProjectedPoint {
    const scale = this.focalLength / (this.focalLength + v.z);
    return {
      x: this.centerX + v.x * this.radius * scale,
      y: this.centerY - v.y * this.radius * scale,
      depth: v.z,
      scale,
    };
  }
}
