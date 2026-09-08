/** Minimal immutable 3-D vector used by the projects graph layout. */
export class Vec3 {
  constructor(
    readonly x: number,
    readonly y: number,
    readonly z: number,
  ) {}

  static readonly zero = new Vec3(0, 0, 0);
  /** Facing the camera. The projector puts smaller z nearer the viewer. */
  static readonly front = new Vec3(0, 0, -1);

  add(other: Vec3): Vec3 {
    return new Vec3(this.x + other.x, this.y + other.y, this.z + other.z);
  }

  subtract(other: Vec3): Vec3 {
    return new Vec3(this.x - other.x, this.y - other.y, this.z - other.z);
  }

  scale(factor: number): Vec3 {
    return new Vec3(this.x * factor, this.y * factor, this.z * factor);
  }

  dot(other: Vec3): number {
    return this.x * other.x + this.y * other.y + this.z * other.z;
  }

  cross(other: Vec3): Vec3 {
    return new Vec3(
      this.y * other.z - this.z * other.y,
      this.z * other.x - this.x * other.z,
      this.x * other.y - this.y * other.x,
    );
  }

  get length(): number {
    return Math.sqrt(this.dot(this));
  }

  /** Unit vector, or the zero vector if this has no length. */
  normalized(): Vec3 {
    const length = this.length;
    return length < 1e-9 ? Vec3.zero : this.scale(1 / length);
  }
}
