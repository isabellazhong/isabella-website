import type { ProjectGraph } from "./ProjectGraph";

/** A node's slot in the flattened view, in units of the projector radius. */
export interface FocusPlacement {
  x: number;
  y: number;
}

/** Farthest and nearest a neighbor sits from the selected node. */
const FAR_ORBIT = 1.05;
const NEAR_ORBIT = 0.72;
/** Radians of arc each neighbor is given before the ring wraps. */
const ARC_PER_NEIGHBOR = 1.15;
const JITTER = 0.42;

/**
 * Where each node sits once the graph flattens: the selected project at dead
 * center, its neighbors on an arc around it, closer when more similar.
 *
 * The arc's rotation and a small per-node jitter are hashed from the ids, so
 * the arrangement is stable for a given project but different from project to
 * project -- the flattened views never look like the same rubber stamp.
 */
export function buildFocusLayout(
  graph: ProjectGraph,
  selectedId: string,
  neighborCount: number,
): Map<string, FocusPlacement> {
  const layout = new Map<string, FocusPlacement>();
  if (!graph.node(selectedId)) return layout;

  layout.set(selectedId, { x: 0, y: 0 });

  const neighbors = graph.neighbors(selectedId, neighborCount);
  if (neighbors.length === 0) return layout;

  const base = hashUnit(selectedId) * Math.PI * 2;
  const arc = Math.min(Math.PI * 2, neighbors.length * ARC_PER_NEIGHBOR);

  neighbors.forEach((neighbor, index) => {
    const offset = neighbors.length === 1 ? 0 : index / (neighbors.length - 1) - 0.5;
    const jitter = (hashUnit(`${selectedId}:${neighbor.node.id}`) - 0.5) * JITTER;
    const angle = base + offset * arc + jitter;
    const orbit = FAR_ORBIT - (FAR_ORBIT - NEAR_ORBIT) * neighbor.strength;
    layout.set(neighbor.node.id, { x: Math.cos(angle) * orbit, y: Math.sin(angle) * orbit });
  });

  return layout;
}

/** FNV-1a hash folded into 0..1, so ids map to stable pseudo-random angles. */
function hashUnit(value: string): number {
  let hash = 2166136261;
  for (let i = 0; i < value.length; i++) {
    hash ^= value.charCodeAt(i);
    hash = Math.imul(hash, 16777619);
  }
  return ((hash >>> 0) % 100000) / 100000;
}
