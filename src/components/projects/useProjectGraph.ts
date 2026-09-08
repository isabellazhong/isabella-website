import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useReducedMotion } from "motion/react";
import { buildFocusLayout, type FocusPlacement } from "../../lib/graph/focus-layout";
import type { ProjectGraph } from "../../lib/graph/ProjectGraph";
import { PerspectiveProjector, type Viewport } from "../../lib/graph/projection";
import { Rotation3D } from "../../lib/graph/Rotation3D";
import type { GraphScene, GraphViewMode, NodeState, SceneEdge, SceneNode } from "../../lib/graph/scene";
import { clearLabelMetrics, measureLabel } from "../../lib/graph/text-metrics";
import { Vec3 } from "../../lib/graph/Vec3";

const LABEL_FAMILY = '"Satoshi", system-ui, "Segoe UI", sans-serif';
/** Widths are measured once at this size and scaled; width is linear in font size. */
const BASE_LABEL_SIZE = 13;
const BASE_CAPTION_SIZE = 10;
const CAPTION_TRACKING = 1.1;

const NODE_RADIUS = 8;
const SELECTED_RADIUS = 14;
const NEIGHBOR_RADIUS = 9.5;
const LABEL_GAP = 15;
const CAPTION_GAP = 12;

/** Pointer travel, in px, that turns a press into a rotation rather than a tap. */
const DRAG_THRESHOLD = 4;
const HIT_RADIUS = 26;
const ROTATE_SPEED = 0.0072;
/** Radians per ms of the idle drift while the cloud is on screen untouched. */
const IDLE_SPIN = 0.00012;

const FLATTEN_TAU = 150;
const DRAG_FOLLOW_TAU = 40;
const GLIDE_TAU = 110;
const ALIGN_TAU = 220;

export interface UseProjectGraphOptions {
  graph: ProjectGraph;
  selectedId: string;
  /** Fired when a release or a tap commits to a project. */
  onSelect: (id: string) => void;
  /** How many related projects the flattened view keeps around the selection. */
  neighborCount: number;
}

export interface ProjectGraphController {
  containerRef: React.RefObject<HTMLDivElement | null>;
  scene: GraphScene | null;
  /** Drops back to the rotatable 3-D cloud without changing the selection. */
  exploreAll: () => void;
  onPointerDown: (event: React.PointerEvent<SVGSVGElement>) => void;
  onPointerMove: (event: React.PointerEvent<SVGSVGElement>) => void;
  onPointerUp: (event: React.PointerEvent<SVGSVGElement>) => void;
  onPointerCancel: (event: React.PointerEvent<SVGSVGElement>) => void;
}

interface Point {
  x: number;
  y: number;
}

/** Everything the animation loop mutates, kept out of React state. */
interface InteractionState {
  rotation: Rotation3D;
  /** Orientation the cloud eases toward so the selection ends up facing front. */
  targetRotation: Rotation3D | null;
  /** Smoothed on-screen position per node, so every transition eases. */
  positions: Map<string, Point>;
  radii: Map<string, number>;
  flatten: number;
  mode: GraphViewMode;
  pressing: boolean;
  dragging: boolean;
  lastX: number;
  lastY: number;
  travel: number;
  highlightId: string | null;
  /** Largest gap, in px, between a node's eased position and its target. */
  residual: number;
}

/**
 * Drives the projects graph: rotation, the 3-D to 2-D flatten, the
 * nearest-to-center highlight, and the per-frame scene the SVG renders.
 *
 * The loop runs only while something is moving. Once the flattened view has
 * settled it stops entirely, so an idle page costs nothing.
 */
export function useProjectGraph({
  graph,
  selectedId,
  onSelect,
  neighborCount,
}: UseProjectGraphOptions): ProjectGraphController {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [scene, setScene] = useState<GraphScene | null>(null);
  const reduceMotion = useReducedMotion();

  const focusLayout = useMemo(
    () => buildFocusLayout(graph, selectedId, neighborCount),
    [graph, selectedId, neighborCount],
  );

  const stateRef = useRef<InteractionState | null>(null);
  if (stateRef.current === null) {
    stateRef.current = {
      rotation: alignmentFor(graph, selectedId),
      targetRotation: null,
      positions: new Map(),
      radii: new Map(),
      // The page opens on a project, so the graph starts already flattened.
      flatten: 1,
      mode: "focus",
      pressing: false,
      dragging: false,
      lastX: 0,
      lastY: 0,
      travel: 0,
      highlightId: selectedId,
      residual: 0,
    };
  }

  const viewportRef = useRef<Viewport>({ width: 0, height: 0 });
  const rafRef = useRef<number | null>(null);
  const lastTimeRef = useRef(0);
  const stepRef = useRef<(delta: number) => boolean>(() => false);

  const requestFrame = useCallback(() => {
    if (rafRef.current !== null) return;
    lastTimeRef.current = performance.now();
    const tick = (time: number) => {
      const delta = Math.min(64, Math.max(1, time - lastTimeRef.current));
      lastTimeRef.current = time;
      const running = stepRef.current(delta);
      rafRef.current = running ? requestAnimationFrame(tick) : null;
    };
    rafRef.current = requestAnimationFrame(tick);
  }, []);

  stepRef.current = (delta: number): boolean => {
    const state = stateRef.current;
    if (!state) return false;

    const viewport = viewportRef.current;
    if (viewport.width < 1 || viewport.height < 1) return false;

    const flattenTarget = state.mode === "focus" ? 1 : 0;
    state.flatten += (flattenTarget - state.flatten) * settle(delta, FLATTEN_TAU);
    if (Math.abs(flattenTarget - state.flatten) < 0.001) state.flatten = flattenTarget;

    if (state.mode === "graph" && !state.dragging && !reduceMotion) {
      state.rotation.dragBy(IDLE_SPIN * delta, 0);
    }

    // The selection is eased to face front while the view flattens, so the
    // cloud is already looking at it if the visitor drags back into 3-D.
    if (state.targetRotation) {
      if (state.flatten >= 1) {
        state.rotation = state.targetRotation;
        state.targetRotation = null;
      } else {
        state.rotation.blendToward(state.targetRotation, settle(delta, ALIGN_TAU));
      }
    }

    const next = buildScene({
      graph,
      state,
      viewport,
      focusLayout,
      selectedId,
      delta,
    });
    setScene(next);

    return (
      state.dragging ||
      state.flatten !== flattenTarget ||
      state.targetRotation !== null ||
      (state.mode === "graph" && !reduceMotion) ||
      // Keep going until the eased positions have actually reached their
      // targets, or nodes settle a few pixels short of where they belong.
      state.residual > 0.05
    );
  };

  // Measure the pane, and redraw whenever it changes size.
  useEffect(() => {
    const element = containerRef.current;
    if (!element) return;

    const observer = new ResizeObserver((entries) => {
      const box = entries[0]?.contentRect;
      if (!box) return;
      viewportRef.current = { width: box.width, height: box.height };
      requestFrame();
    });
    observer.observe(element);

    const rect = element.getBoundingClientRect();
    viewportRef.current = { width: rect.width, height: rect.height };
    requestFrame();

    return () => observer.disconnect();
  }, [requestFrame]);

  // Webfont metrics differ from the fallback's, so remeasure once it lands.
  useEffect(() => {
    let cancelled = false;
    document.fonts?.ready.then(() => {
      if (cancelled) return;
      clearLabelMetrics();
      requestFrame();
    });
    return () => {
      cancelled = true;
    };
  }, [requestFrame]);

  // A selection made anywhere (a node, the panel, the neighbor list) flattens
  // the view onto that project.
  useEffect(() => {
    const state = stateRef.current;
    if (!state) return;
    state.mode = "focus";
    state.highlightId = selectedId;
    state.targetRotation = alignmentFor(graph, selectedId);
    requestFrame();
  }, [graph, selectedId, requestFrame]);

  useEffect(
    () => () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    },
    [],
  );

  const localPoint = (event: React.PointerEvent<SVGSVGElement>): Point => {
    const rect = event.currentTarget.getBoundingClientRect();
    return { x: event.clientX - rect.left, y: event.clientY - rect.top };
  };

  const onPointerDown = useCallback(
    (event: React.PointerEvent<SVGSVGElement>) => {
      const state = stateRef.current;
      if (!state) return;
      event.currentTarget.setPointerCapture(event.pointerId);
      state.pressing = true;
      state.dragging = false;
      state.travel = 0;
      state.lastX = event.clientX;
      state.lastY = event.clientY;
      requestFrame();
    },
    [requestFrame],
  );

  const onPointerMove = useCallback(
    (event: React.PointerEvent<SVGSVGElement>) => {
      const state = stateRef.current;
      if (!state?.pressing) return;

      const dx = event.clientX - state.lastX;
      const dy = event.clientY - state.lastY;
      state.lastX = event.clientX;
      state.lastY = event.clientY;
      state.travel += Math.hypot(dx, dy);

      if (!state.dragging && state.travel > DRAG_THRESHOLD) {
        // Past the threshold this is a rotation, so unflatten back to 3-D.
        state.dragging = true;
        state.mode = "graph";
        state.targetRotation = null;
      }
      if (state.dragging) state.rotation.dragBy(dx * ROTATE_SPEED, dy * ROTATE_SPEED);
      requestFrame();
    },
    [requestFrame],
  );

  const endPointer = useCallback(
    (event: React.PointerEvent<SVGSVGElement>, commit: boolean) => {
      const state = stateRef.current;
      if (!state) return;
      if (event.currentTarget.hasPointerCapture(event.pointerId)) {
        event.currentTarget.releasePointerCapture(event.pointerId);
      }

      const wasDragging = state.dragging;
      state.pressing = false;
      state.dragging = false;

      if (commit) {
        // Release after a rotation commits to whatever sits nearest the
        // center; a tap commits to the node under the finger.
        const tapped = wasDragging ? null : nodeAt(state, localPoint(event));
        const committed = wasDragging ? state.highlightId : (tapped ?? (state.mode === "graph" ? state.highlightId : null));
        if (committed) {
          state.mode = "focus";
          state.highlightId = committed;
          if (committed !== selectedId) onSelect(committed);
          else state.targetRotation = alignmentFor(graph, committed);
        }
      }
      requestFrame();
    },
    [graph, onSelect, requestFrame, selectedId],
  );

  const onPointerUp = useCallback(
    (event: React.PointerEvent<SVGSVGElement>) => endPointer(event, true),
    [endPointer],
  );

  const onPointerCancel = useCallback(
    (event: React.PointerEvent<SVGSVGElement>) => endPointer(event, false),
    [endPointer],
  );

  const exploreAll = useCallback(() => {
    const state = stateRef.current;
    if (!state) return;
    state.mode = "graph";
    state.targetRotation = null;
    requestFrame();
  }, [requestFrame]);

  return { containerRef, scene, exploreAll, onPointerDown, onPointerMove, onPointerUp, onPointerCancel };
}

/* -------------------------------------------------------------------------- */

/** Fraction of the remaining distance to cover in `delta` ms, framerate independent. */
function settle(delta: number, tau: number): number {
  return 1 - Math.exp(-delta / tau);
}

function lerp(from: number, to: number, t: number): number {
  return from + (to - from) * t;
}

/** Ease-in-out used for the flatten, so it starts and lands gently. */
function smoothstep(t: number): number {
  const clamped = Math.min(1, Math.max(0, t));
  return clamped * clamped * (3 - 2 * clamped);
}

/** The orientation that brings a project to the front of the cloud. */
function alignmentFor(graph: ProjectGraph, id: string): Rotation3D {
  const node = graph.node(id);
  if (!node || node.position.length < 1e-6) return Rotation3D.identity();
  return Rotation3D.aligning(node.position, Vec3.front);
}

function nodeAt(state: InteractionState, point: Point): string | null {
  let closest: string | null = null;
  let best = HIT_RADIUS;
  for (const [id, position] of state.positions) {
    const distance = Math.hypot(position.x - point.x, position.y - point.y);
    const reach = Math.max(HIT_RADIUS, (state.radii.get(id) ?? 0) + 12);
    if (distance < reach && distance < best) {
      best = distance;
      closest = id;
    }
  }
  return closest;
}

interface BuildSceneArgs {
  graph: ProjectGraph;
  state: InteractionState;
  viewport: Viewport;
  focusLayout: Map<string, FocusPlacement>;
  selectedId: string;
  delta: number;
}

function buildScene({ graph, state, viewport, focusLayout, selectedId, delta }: BuildSceneArgs): GraphScene {
  const projector = new PerspectiveProjector(viewport);
  const flat = smoothstep(state.flatten);
  const follow = settle(delta, state.dragging ? DRAG_FOLLOW_TAU : GLIDE_TAU);

  interface Resolved {
    node: Omit<SceneNode, "state" | "labelOpacity">;
    depth: number;
    focused: boolean;
  }
  const resolved: Resolved[] = [];
  let residual = 0;

  for (const node of graph.nodes) {
    const projected = projector.project(state.rotation.apply(node.position));
    const placement = focusLayout.get(node.id);

    let targetX: number;
    let targetY: number;
    if (placement) {
      targetX = lerp(projected.x, projector.centerX + placement.x * projector.radius, flat);
      targetY = lerp(projected.y, projector.centerY + placement.y * projector.radius, flat);
    } else {
      // Not part of the focused set: drift outward as it fades away.
      const offsetX = projected.x - projector.centerX;
      const offsetY = projected.y - projector.centerY;
      targetX = projector.centerX + offsetX * lerp(1, 1.45, flat);
      targetY = projector.centerY + offsetY * lerp(1, 1.45, flat);
    }

    const current = state.positions.get(node.id);
    const point = current
      ? { x: current.x + (targetX - current.x) * follow, y: current.y + (targetY - current.y) * follow }
      : { x: targetX, y: targetY };
    state.positions.set(node.id, point);
    residual = Math.max(residual, Math.abs(targetX - point.x), Math.abs(targetY - point.y));

    // Perspective scale runs ~0.8 (back) to ~1.33 (front); remap to 0..1.
    const nearness = Math.min(1, Math.max(0, (projected.scale - 0.8) / 0.53));
    const depthFade = 0.4 + 0.6 * nearness;

    const isSelected = node.id === selectedId;
    const flatRadius = isSelected ? SELECTED_RADIUS : NEIGHBOR_RADIUS;
    const radius = lerp(NODE_RADIUS * projected.scale, placement ? flatRadius : NODE_RADIUS, flat);
    state.radii.set(node.id, radius);

    const presence = placement ? 1 : 1 - flat;
    const opacity = presence * lerp(depthFade, 1, flat);

    const labelSize = lerp(12, isSelected ? 16 : 12.5, placement ? flat : 0);
    const captionSize = lerp(8.5, 9.5, placement ? flat : 0);

    resolved.push({
      depth: projected.depth,
      focused: placement !== undefined,
      node: {
        id: node.id,
        project: node.project,
        x: point.x,
        y: point.y,
        radius,
        opacity,
        label: {
          text: node.project.title,
          size: labelSize,
          width: labelWidth(node.project.title, labelSize),
          offsetY: radius + LABEL_GAP,
        },
        caption: {
          text: yearOf(node.project.date),
          size: captionSize,
          width: captionWidth(yearOf(node.project.date), captionSize),
          offsetY: radius + LABEL_GAP + CAPTION_GAP,
        },
      },
    });
  }

  // Nearest to the center of the pane is what a release commits to.
  if (state.mode === "graph") {
    let best = Number.POSITIVE_INFINITY;
    let bestId: string | null = null;
    for (const { node } of resolved) {
      const distance = Math.hypot(node.x - projector.centerX, node.y - projector.centerY);
      if (distance < best) {
        best = distance;
        bestId = node.id;
      }
    }
    if (bestId) state.highlightId = bestId;
  }

  // States are assigned only now, once the highlight is settled: while the
  // cloud is being turned the highlight is the *only* accented node, so the
  // previous selection never competes with it for attention.
  const highlightId = state.highlightId;
  const nodes: SceneNode[] = resolved
    .sort((a, b) => b.depth - a.depth)
    .map(({ node, focused }) => {
      const inFocusView = state.mode === "focus" && focused;
      const nodeState: NodeState =
        state.mode === "graph" && node.id === highlightId
          ? "highlighted"
          : inFocusView && node.id === selectedId
            ? "selected"
            : inFocusView
              ? "neighbor"
              : "idle";
      return { ...node, state: nodeState, labelOpacity: 1 };
    });
  resolveLabelCollisions(nodes);

  const edges = buildEdges({ graph, state, focusLayout, flat, selectedId, highlightId });
  state.residual = residual;

  return {
    width: viewport.width,
    height: viewport.height,
    nodes,
    edges,
    mode: state.mode,
    dragging: state.dragging,
    flatten: state.flatten,
    highlightId,
  };
}

interface BuildEdgesArgs {
  graph: ProjectGraph;
  state: InteractionState;
  focusLayout: Map<string, FocusPlacement>;
  flat: number;
  selectedId: string;
  highlightId: string | null;
}

function buildEdges({ graph, state, focusLayout, flat, selectedId, highlightId }: BuildEdgesArgs): SceneEdge[] {
  const edges: SceneEdge[] = [];

  for (const edge of graph.edges) {
    const from = state.positions.get(edge.source);
    const to = state.positions.get(edge.target);
    if (!from || !to) continue;

    const bothFocused = focusLayout.has(edge.source) && focusLayout.has(edge.target);
    const presence = bothFocused ? 1 : 1 - flat;
    const opacity = presence * (0.3 + 0.6 * edge.strength);
    if (opacity < 0.012) continue;

    const dx = to.x - from.x;
    const dy = to.y - from.y;
    const length = Math.hypot(dx, dy) || 1;
    const ux = dx / length;
    const uy = dy / length;
    const startGap = (state.radii.get(edge.source) ?? NODE_RADIUS) + 5;
    const endGap = (state.radii.get(edge.target) ?? NODE_RADIUS) + 5;
    if (length <= startGap + endGap) continue;

    const x1 = from.x + ux * startGap;
    const y1 = from.y + uy * startGap;
    const x2 = to.x - ux * endGap;
    const y2 = to.y - uy * endGap;

    const touchesFocus =
      bothFocused && (edge.source === selectedId || edge.target === selectedId);
    const touchesHighlight =
      state.mode === "graph" && (edge.source === highlightId || edge.target === highlightId);

    const badgeOpacity = bothFocused ? Math.max(0, (flat - 0.25) / 0.75) : 0;

    edges.push({
      id: edge.id,
      x1,
      y1,
      x2,
      y2,
      width: lerp(0.6 + edge.strength * 1.7, 0.8 + edge.strength * 2.6, bothFocused ? flat : 0),
      opacity,
      dashed: edge.strength < 0.45,
      accented: touchesFocus || touchesHighlight,
      badge:
        badgeOpacity > 0.02
          ? {
              x: (x1 + x2) / 2,
              y: (y1 + y2) / 2,
              radius: 12,
              text: `${Math.round(edge.similarity * 100)}%`,
              opacity: badgeOpacity,
            }
          : undefined,
    });
  }

  return edges;
}

/** The rectangle a node's name and year occupy together. */
function labelBox(node: SceneNode) {
  const width = Math.max(node.label.width, node.caption.width) + 12;
  const top = node.y + node.label.offsetY - node.label.size * 0.82 - 3;
  const bottom = node.y + node.caption.offsetY + node.caption.size * 0.24 + 3;
  return { x: node.x - width / 2, y: top, width, height: bottom - top };
}

/**
 * Fades any name that a more important node's name is overlapping. Nodes are
 * considered in priority order -- the selected and highlighted names always
 * win, then nearest to the viewer -- and the fade is proportional to how much
 * of the box is covered, so names dissolve smoothly as the cloud turns rather
 * than blinking out.
 */
function resolveLabelCollisions(nodes: SceneNode[]): void {
  const priority = (node: SceneNode) =>
    node.state === "selected" || node.state === "highlighted" ? 0 : 1;
  // `nodes` is back-to-front for painting, so reverse for nearest-first.
  const order = nodes
    .map((node, index) => ({ node, index }))
    .sort((a, b) => priority(a.node) - priority(b.node) || b.index - a.index);

  const claimed: ReturnType<typeof labelBox>[] = [];
  for (const { node } of order) {
    const box = labelBox(node);
    let covered = 0;
    for (const other of claimed) {
      const overlapX = Math.max(0, Math.min(box.x + box.width, other.x + other.width) - Math.max(box.x, other.x));
      const overlapY = Math.max(0, Math.min(box.y + box.height, other.y + other.height) - Math.max(box.y, other.y));
      covered = Math.max(covered, (overlapX * overlapY) / (box.width * box.height));
    }
    node.labelOpacity = Math.max(0, Math.min(1, 1 - covered * 2.2));
    // Only a label that stays legible reserves space against the ones behind.
    if (node.labelOpacity > 0.4) claimed.push(box);
  }
}

function labelWidth(text: string, size: number): number {
  const base = measureLabel(text, { size: BASE_LABEL_SIZE, weight: 500, family: LABEL_FAMILY });
  return (base * size) / BASE_LABEL_SIZE;
}

function captionWidth(text: string, size: number): number {
  const base = measureLabel(text, {
    size: BASE_CAPTION_SIZE,
    weight: 400,
    family: LABEL_FAMILY,
    letterSpacing: CAPTION_TRACKING,
  });
  return (base * size) / BASE_CAPTION_SIZE;
}

function yearOf(iso: string): string {
  return iso.slice(0, 4);
}
