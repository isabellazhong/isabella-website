import { Vec3 } from "./Vec3";

/** Evenly spaced seed points on the unit sphere, deterministic for a given n. */
export function fibonacciSphere(count: number): Vec3[] {
  if (count === 1) return [new Vec3(0, 0, 0)];

  const goldenAngle = Math.PI * (3 - Math.sqrt(5));
  const points: Vec3[] = [];
  for (let i = 0; i < count; i++) {
    const y = 1 - (i / (count - 1)) * 2;
    const ring = Math.sqrt(Math.max(0, 1 - y * y));
    const theta = goldenAngle * i;
    points.push(new Vec3(Math.cos(theta) * ring, y, Math.sin(theta) * ring));
  }
  return points;
}

const ITERATIONS = 400;
const TIME_STEP = 0.035;
const DAMPING = 0.82;
const REPULSION = 0.4;
const ATTRACTION = 2.2;
const CENTERING = 0.35;
/** Spring rest length at similarity 1 and at similarity 0. */
const NEAR_REST = 0.75;
const FAR_REST = 2.1;

/**
 * Relaxes the seed points into a 3-D cloud where similar projects sit close
 * together: every pair repels, connected pairs pull toward a rest length that
 * shortens as their similarity rises, and a weak pull to the origin keeps the
 * whole thing bounded.
 *
 * Fully deterministic (Fibonacci seeding, fixed iteration count) so the graph
 * looks identical on every load and across renders.
 */
export function relaxLayout(count: number, similarity: (a: number, b: number) => number): Vec3[] {
  const positions = fibonacciSphere(count).map((p) => p.scale(1.2));
  if (count < 2) return positions;

  const velocities: Vec3[] = new Array(count).fill(Vec3.zero);

  for (let step = 0; step < ITERATIONS; step++) {
    const forces: Vec3[] = new Array(count).fill(Vec3.zero);

    for (let i = 0; i < count; i++) {
      for (let j = i + 1; j < count; j++) {
        const delta = positions[j].subtract(positions[i]);
        const distance = Math.max(0.08, delta.length);
        const direction = delta.scale(1 / distance);

        // Repulsion, so nodes never stack on top of each other.
        let magnitude = -REPULSION / (distance * distance);

        // Attraction along a spring whose rest length encodes similarity.
        const sim = similarity(i, j);
        if (sim > 0) {
          const rest = FAR_REST - (FAR_REST - NEAR_REST) * sim;
          magnitude += (distance - rest) * ATTRACTION * sim;
        }

        const force = direction.scale(magnitude);
        forces[i] = forces[i].add(force);
        forces[j] = forces[j].subtract(force);
      }

      forces[i] = forces[i].subtract(positions[i].scale(CENTERING));
    }

    for (let i = 0; i < count; i++) {
      velocities[i] = velocities[i].add(forces[i].scale(TIME_STEP)).scale(DAMPING);
      positions[i] = positions[i].add(velocities[i].scale(TIME_STEP));
    }
  }

  return normalize(positions);
}

/** Recenters on the centroid and scales the cloud to unit radius. */
function normalize(positions: Vec3[]): Vec3[] {
  const centroid = positions.reduce((sum, p) => sum.add(p), Vec3.zero).scale(1 / positions.length);
  const centered = positions.map((p) => p.subtract(centroid));
  const maxRadius = centered.reduce((max, p) => Math.max(max, p.length), 0);
  return maxRadius < 1e-6 ? centered : centered.map((p) => p.scale(1 / maxRadius));
}
