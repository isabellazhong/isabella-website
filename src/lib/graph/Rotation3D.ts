import { Vec3 } from "./Vec3";

/**
 * A 3x3 rotation matrix, mutated in place by the drag handler so the render
 * loop can spin the graph without allocating per frame.
 *
 * Drag rotations are pre-multiplied, which makes them read as camera-space
 * (trackball) moves: dragging right always spins the cloud right, whatever
 * orientation it is already in.
 */
export class Rotation3D {
  /** Row-major 3x3. */
  private m: number[];

  private constructor(m: number[]) {
    this.m = m;
  }

  static identity(): Rotation3D {
    return new Rotation3D([1, 0, 0, 0, 1, 0, 0, 0, 1]);
  }

  /** The shortest rotation carrying `from` onto `to`. */
  static aligning(from: Vec3, to: Vec3): Rotation3D {
    const a = from.normalized();
    const b = to.normalized();
    if (a.length < 0.5 || b.length < 0.5) return Rotation3D.identity();

    const axis = a.cross(b);
    const sin = axis.length;
    const cos = Math.min(1, Math.max(-1, a.dot(b)));

    // Antiparallel: any perpendicular axis gives the same half turn.
    if (sin < 1e-6) {
      if (cos > 0) return Rotation3D.identity();
      const fallback = Math.abs(a.x) < 0.9 ? new Vec3(1, 0, 0) : new Vec3(0, 1, 0);
      return Rotation3D.aroundAxis(a.cross(fallback).normalized(), Math.PI);
    }

    return Rotation3D.aroundAxis(axis.scale(1 / sin), Math.atan2(sin, cos));
  }

  static aroundAxis(axis: Vec3, angle: number): Rotation3D {
    const { x, y, z } = axis.normalized();
    const c = Math.cos(angle);
    const s = Math.sin(angle);
    const t = 1 - c;
    return new Rotation3D([
      t * x * x + c, t * x * y - s * z, t * x * z + s * y,
      t * x * y + s * z, t * y * y + c, t * y * z - s * x,
      t * x * z - s * y, t * y * z + s * x, t * z * z + c,
    ]);
  }

  clone(): Rotation3D {
    return new Rotation3D([...this.m]);
  }

  apply(v: Vec3): Vec3 {
    const m = this.m;
    return new Vec3(
      m[0] * v.x + m[1] * v.y + m[2] * v.z,
      m[3] * v.x + m[4] * v.y + m[5] * v.z,
      m[6] * v.x + m[7] * v.y + m[8] * v.z,
    );
  }

  /**
   * Spin by a drag, in radians of screen movement: positive `dx` drags the
   * near face of the cloud to the right, positive `dy` drags it downward.
   */
  dragBy(dx: number, dy: number): void {
    // Negated because a rotation that carries the near face right is a
    // negative turn about each screen axis.
    const yaw = -dx;
    const pitch = -dy;
    const cy = Math.cos(yaw);
    const sy = Math.sin(yaw);
    const cp = Math.cos(pitch);
    const sp = Math.sin(pitch);

    // Ry(yaw) * Rx(pitch), pre-multiplied onto the current orientation.
    this.premultiply([
      cy, sy * sp, sy * cp,
      0, cp, -sp,
      -sy, cy * sp, cy * cp,
    ]);
    this.orthonormalize();
  }

  /** Eases this orientation a fraction `t` of the way toward `target`. */
  blendToward(target: Rotation3D, t: number): void {
    if (t <= 0) return;
    for (let i = 0; i < 9; i++) this.m[i] += (target.m[i] - this.m[i]) * t;
    this.orthonormalize();
  }

  /** How far this orientation still is from `target`, as a 0..1-ish error. */
  distanceTo(target: Rotation3D): number {
    let sum = 0;
    for (let i = 0; i < 9; i++) sum += Math.abs(target.m[i] - this.m[i]);
    return sum;
  }

  private premultiply(r: number[]): void {
    const m = this.m;
    const out = new Array<number>(9);
    for (let row = 0; row < 3; row++) {
      for (let col = 0; col < 3; col++) {
        out[row * 3 + col] =
          r[row * 3] * m[col] + r[row * 3 + 1] * m[3 + col] + r[row * 3 + 2] * m[6 + col];
      }
    }
    this.m = out;
  }

  /** Gram-Schmidt, so repeated small rotations and blends can't drift into a shear. */
  private orthonormalize(): void {
    const m = this.m;
    const r0 = new Vec3(m[0], m[1], m[2]).normalized();
    const r1raw = new Vec3(m[3], m[4], m[5]);
    const r1 = r1raw.subtract(r0.scale(r0.dot(r1raw))).normalized();
    const r2 = r0.cross(r1);
    this.m = [r0.x, r0.y, r0.z, r1.x, r1.y, r1.z, r2.x, r2.y, r2.z];
  }
}
