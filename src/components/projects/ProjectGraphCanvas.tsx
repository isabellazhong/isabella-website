import { useId } from "react";
import type { ProjectGraph } from "../../lib/graph/ProjectGraph";
import type { SceneEdge, SceneNode } from "../../lib/graph/scene";
import { useProjectGraph } from "./useProjectGraph";

export interface ProjectGraphCanvasProps {
  graph: ProjectGraph;
  selectedId: string;
  onSelect: (id: string) => void;
  /** Related projects kept beside the selection once the graph flattens. */
  neighborCount?: number;
}

/** Default k: the selected project plus its two closest relatives. */
const DEFAULT_NEIGHBOUR_COUNT = 2;

const NODE_STROKE: Record<SceneNode["state"], string> = {
  idle: "var(--ink-soft)",
  neighbor: "var(--ink)",
  highlighted: "var(--accent)",
  selected: "var(--accent)",
};

/**
 * The left half of the whiteboard: a rotatable 3-D cloud of projects that
 * flattens onto whichever node the visitor releases over.
 *
 * Edges are drawn through a mask that punches out every label box and node
 * circle, so no connection ever runs behind a project name.
 */
export function ProjectGraphCanvas({
  graph,
  selectedId,
  onSelect,
  neighborCount = DEFAULT_NEIGHBOUR_COUNT,
}: ProjectGraphCanvasProps) {
  const maskId = useId();
  const { containerRef, scene, exploreAll, ...pointer } = useProjectGraph({
    graph,
    selectedId,
    onSelect,
    neighborCount,
  });

  const highlighted = scene?.highlightId ? graph.node(scene.highlightId)?.project : undefined;
  const isSpatial = (scene?.flatten ?? 1) < 0.85;

  return (
    <div ref={containerRef} className="absolute inset-0 overflow-hidden">
      {scene && (
        <svg
          className={`absolute inset-0 h-full w-full touch-none select-none ${
            scene.dragging ? "cursor-grabbing" : "cursor-grab"
          }`}
          viewBox={`0 0 ${scene.width} ${scene.height}`}
          aria-hidden="true"
          {...pointer}
        >
          <defs>
            <mask id={maskId} maskUnits="userSpaceOnUse" x={0} y={0} width={scene.width} height={scene.height}>
              <rect x={0} y={0} width={scene.width} height={scene.height} fill="#fff" />
              {scene.nodes.map((node) => (
                <NodeCutout key={node.id} node={node} />
              ))}
              {scene.edges.map((edge) =>
                edge.badge ? (
                  <circle
                    key={`badge-${edge.id}`}
                    cx={edge.badge.x}
                    cy={edge.badge.y}
                    r={edge.badge.radius}
                    fill="#000"
                    fillOpacity={edge.badge.opacity}
                  />
                ) : null,
              )}
            </mask>
          </defs>

          {/* Target reticle: what a release would commit to. */}
          <g opacity={(1 - scene.flatten) * 0.5} pointerEvents="none">
            <circle
              cx={scene.width / 2}
              cy={scene.height / 2}
              r={Math.min(scene.width, scene.height) * 0.11}
              fill="none"
              stroke="var(--ink-soft)"
              strokeWidth={1}
              strokeDasharray="2 7"
            />
            <path
              d={`M ${scene.width / 2 - 9} ${scene.height / 2} h 18 M ${scene.width / 2} ${scene.height / 2 - 9} v 18`}
              stroke="var(--ink-soft)"
              strokeWidth={1}
            />
          </g>

          <g mask={`url(#${maskId})`} pointerEvents="none">
            {scene.edges.map((edge) => (
              <Edge key={edge.id} edge={edge} />
            ))}
          </g>

          <g pointerEvents="none">
            {scene.edges.map((edge) =>
              edge.badge ? (
                <text
                  key={`badge-text-${edge.id}`}
                  x={edge.badge.x}
                  y={edge.badge.y + 3}
                  textAnchor="middle"
                  fill="var(--ink-soft)"
                  fontSize={8.5}
                  opacity={edge.badge.opacity * 0.85}
                  style={{ letterSpacing: "0.5px" }}
                >
                  {edge.badge.text}
                </text>
              ) : null,
            )}
          </g>

          <g pointerEvents="none">
            {scene.nodes.map((node) => (
              <Node key={node.id} node={node} />
            ))}
          </g>
        </svg>
      )}

      <GraphChrome
        total={graph.size}
        isSpatial={isSpatial}
        dragging={scene?.dragging ?? false}
        highlightedTitle={isSpatial ? highlighted?.title : undefined}
        onExplore={exploreAll}
      />

      {/* Keyboard and screen-reader path into the same selection the graph drives. */}
      <ul className="sr-only">
        {graph.nodes.map((node) => (
          <li key={node.id}>
            <button
              type="button"
              aria-current={node.id === selectedId}
              onClick={() => onSelect(node.id)}
            >
              {node.project.title}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

function NodeCutout({ node }: { node: SceneNode }) {
  if (node.opacity < 0.05) return null;
  const padX = 6;
  const padY = 3;
  // A faded label needs no hole, so the edges stay continuous behind it.
  const textCut = node.opacity * node.labelOpacity;
  return (
    <g fill="#000">
      <circle cx={node.x} cy={node.y} r={node.radius + 3} fillOpacity={node.opacity} />
      <rect
        fillOpacity={textCut}
        x={node.x - node.label.width / 2 - padX}
        y={node.y + node.label.offsetY - node.label.size * 0.82 - padY}
        width={node.label.width + padX * 2}
        height={node.label.size * 1.06 + padY * 2}
        rx={3}
      />
      <rect
        fillOpacity={textCut}
        x={node.x - node.caption.width / 2 - padX}
        y={node.y + node.caption.offsetY - node.caption.size * 0.82 - padY}
        width={node.caption.width + padX * 2}
        height={node.caption.size * 1.06 + padY * 2}
        rx={3}
      />
    </g>
  );
}

function Edge({ edge }: { edge: SceneEdge }) {
  return (
    <line
      x1={edge.x1}
      y1={edge.y1}
      x2={edge.x2}
      y2={edge.y2}
      stroke={edge.accented ? "var(--accent)" : "var(--ink-soft)"}
      strokeOpacity={edge.opacity * (edge.accented ? 0.85 : 0.65)}
      strokeWidth={edge.width}
      strokeLinecap="round"
      strokeDasharray={edge.dashed ? "3 6" : undefined}
    />
  );
}

function Node({ node }: { node: SceneNode }) {
  if (node.opacity < 0.02) return null;
  const accented = node.state === "highlighted" || node.state === "selected";

  return (
    <g opacity={node.opacity}>
      {accented && (
        <circle
          cx={node.x}
          cy={node.y}
          r={node.radius + 7}
          fill="none"
          stroke="var(--accent)"
          strokeOpacity={0.28}
          strokeWidth={1}
        />
      )}
      <circle
        cx={node.x}
        cy={node.y}
        r={node.radius}
        fill={accented ? "var(--accent)" : "var(--surface)"}
        fillOpacity={accented ? 0.14 : 1}
        stroke={NODE_STROKE[node.state]}
        strokeWidth={accented ? 1.9 : node.state === "neighbor" ? 1.5 : 1.2}
      />
      {accented && <circle cx={node.x} cy={node.y} r={node.radius * 0.34} fill="var(--accent)" />}

      <g opacity={node.labelOpacity}>
        <text
          x={node.x}
          y={node.y + node.label.offsetY}
          textAnchor="middle"
          fontSize={node.label.size}
          fontWeight={500}
          fill={accented ? "var(--accent)" : "var(--ink)"}
        >
          {node.label.text}
        </text>
        <text
          x={node.x}
          y={node.y + node.caption.offsetY}
          textAnchor="middle"
          fontSize={node.caption.size}
          fill="var(--ink-soft)"
          opacity={0.8}
          style={{ letterSpacing: "1.1px" }}
        >
          {node.caption.text}
        </text>
      </g>
    </g>
  );
}

interface GraphChromeProps {
  total: number;
  isSpatial: boolean;
  dragging: boolean;
  highlightedTitle?: string;
  onExplore: () => void;
}

/** The margin notes drawn over the board: title, state, and the way back to 3-D. */
function GraphChrome({ total, isSpatial, dragging, highlightedTitle, onExplore }: GraphChromeProps) {
  return (
    <>
      <div className="pointer-events-none absolute inset-x-5 top-5 flex items-start justify-between gap-4 sm:inset-x-7 sm:top-7">
        <div>
          <p className="font-display text-[0.6rem] tracking-[0.22em] text-ink-soft uppercase">
            Project index
          </p>
          <h1 className="font-display mt-1 text-2xl tracking-tight">Projects</h1>
        </div>
        <button
          type="button"
          onClick={onExplore}
          className={`pointer-events-auto rounded-full border px-3.5 py-1.5 font-display text-[0.6rem] tracking-[0.18em] uppercase transition-colors ${
            isSpatial
              ? "border-accent/60 text-accent"
              : "border-line text-ink-soft hover:border-ink-soft hover:text-ink"
          }`}
        >
          {isSpatial ? `${total} projects` : "Explore all"}
        </button>
      </div>

      <div className="pointer-events-none absolute inset-x-5 bottom-5 sm:inset-x-7 sm:bottom-7">
        <p className="max-w-[26ch] text-[0.68rem] leading-relaxed text-ink-soft">
          {isSpatial ? (
            <>
              <span className="text-ink">
                {dragging ? "Release to open" : "View"}
              </span>
              {highlightedTitle ? ` · ${highlightedTitle}` : " · drag to rotate"}
            </>
          ) : (
            <>Explore my projects! Edges are connected via Jaccard similairty :)</>
          )}
        </p>
      </div>
    </>
  );
}
