import type { Project } from "../../types";

/** How the graph pane is behaving right now. */
export type GraphViewMode = "graph" | "focus";

/**
 * Idle       - a node in the rotating cloud, or one fading out of the focused view.
 * highlighted - nearest to the center of the pane while the cloud is being turned.
 * selected   - the focused project, at the center of the flattened view.
 * neighbor   - one of the k related projects kept in the flattened view.
 */
export type NodeState = "idle" | "highlighted" | "selected" | "neighbor";

export interface SceneLabel {
  text: string;
  /** Measured width in px; the mask hole is cut to match. */
  width: number;
  size: number;
  /** Baseline offset from the node's center. */
  offsetY: number;
}

export interface SceneNode {
  id: string;
  project: Project;
  x: number;
  y: number;
  radius: number;
  opacity: number;
  state: NodeState;
  /**
   * Fades a name that a nearer node's name is sitting on top of. Two projects
   * can project onto the same spot from some angles; without this their labels
   * overprint into an unreadable smudge.
   */
  labelOpacity: number;
  label: SceneLabel;
  caption: SceneLabel;
}

export interface SceneEdgeBadge {
  x: number;
  y: number;
  radius: number;
  text: string;
  opacity: number;
}

export interface SceneEdge {
  id: string;
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  width: number;
  opacity: number;
  /** Weaker relationships are drawn as a dashed hairline. */
  dashed: boolean;
  accented: boolean;
  badge?: SceneEdgeBadge;
}

export interface GraphScene {
  width: number;
  height: number;
  /** Painter's order, farthest first. */
  nodes: SceneNode[];
  edges: SceneEdge[];
  mode: GraphViewMode;
  dragging: boolean;
  /** 0 = fully 3-D cloud, 1 = fully flattened focused view. */
  flatten: number;
  highlightId: string | null;
}
