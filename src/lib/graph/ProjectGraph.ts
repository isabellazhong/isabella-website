import type { Project } from "../../types";
import { relaxLayout } from "./layout";
import { jaccard, toSkillSet } from "./similarity";
import type { Vec3 } from "./Vec3";

export interface GraphNode {
  id: string;
  project: Project;
  /** Position in the unit-radius 3-D cloud. */
  position: Vec3;
  /** Normalized skill keys, kept for similarity lookups. */
  skills: Set<string>;
}

export interface GraphEdge {
  id: string;
  source: string;
  target: string;
  /** Raw Jaccard similarity, 0..1. Shown as a percentage on the focused view. */
  similarity: number;
  /**
   * Similarity rescaled across the edges the graph actually keeps, 0..1.
   * Drives stroke weight, so the spread stays legible even when every pair
   * scores in a narrow band.
   */
  strength: number;
}

export interface Neighbor {
  node: GraphNode;
  similarity: number;
  strength: number;
}

export interface ProjectGraphOptions {
  /**
   * Pairs scoring below this are treated as unrelated and never drawn. Keeps
   * the cloud from collapsing into a hairball of near-meaningless links.
   */
  threshold?: number;
  /** Most edges any one node may keep, strongest first. */
  maxDegree?: number;
}

const DEFAULT_THRESHOLD = 0.12;
const DEFAULT_MAX_DEGREE = 4;

/**
 * The projects, their pairwise skill-set similarity, and the 3-D layout the
 * /projects page renders.
 *
 * Everything here is computed once from the project data and is immutable:
 * the view layer only reads from it, so the same graph instance can back both
 * the rotating 3-D cloud and the flattened focused view.
 */
export class ProjectGraph {
  readonly nodes: readonly GraphNode[];
  readonly edges: readonly GraphEdge[];
  readonly threshold: number;

  private readonly nodesById: Map<string, GraphNode>;
  private readonly similarities: Map<string, number>;
  private readonly adjacency: Map<string, Neighbor[]>;

  constructor(projects: Project[], options: ProjectGraphOptions = {}) {
    this.threshold = options.threshold ?? DEFAULT_THRESHOLD;
    const maxDegree = options.maxDegree ?? DEFAULT_MAX_DEGREE;

    const skillSets = projects.map((project) => toSkillSet(project.skills));

    // Full similarity matrix first: the layout needs every pair, not just the
    // pairs that survive the threshold.
    const matrix: number[][] = projects.map(() => new Array<number>(projects.length).fill(0));
    this.similarities = new Map();
    for (let i = 0; i < projects.length; i++) {
      for (let j = i + 1; j < projects.length; j++) {
        const score = jaccard(skillSets[i], skillSets[j]);
        matrix[i][j] = score;
        matrix[j][i] = score;
        this.similarities.set(pairKey(projects[i].id, projects[j].id), score);
      }
    }

    const positions = relaxLayout(projects.length, (a, b) => matrix[a][b]);
    this.nodes = projects.map((project, index) => ({
      id: project.id,
      project,
      position: positions[index],
      skills: skillSets[index],
    }));
    this.nodesById = new Map(this.nodes.map((node) => [node.id, node]));

    this.edges = buildEdges(projects, matrix, this.threshold, maxDegree);
    this.adjacency = buildAdjacency(this.edges, this.nodesById);
  }

  get size(): number {
    return this.nodes.length;
  }

  node(id: string): GraphNode | undefined {
    return this.nodesById.get(id);
  }

  /** Raw Jaccard similarity between two projects, whether or not it is drawn. */
  similarityBetween(a: string, b: string): number {
    if (a === b) return 1;
    return this.similarities.get(pairKey(a, b)) ?? 0;
  }

  /** The `count` most related projects that clear the threshold, strongest first. */
  neighbors(id: string, count: number): Neighbor[] {
    return (this.adjacency.get(id) ?? []).slice(0, Math.max(0, count));
  }

  /** The node plus its `count` closest neighbors: everything the focused view shows. */
  focusSet(id: string, count: number): Set<string> {
    const ids = new Set<string>();
    if (this.nodesById.has(id)) ids.add(id);
    for (const neighbor of this.neighbors(id, count)) ids.add(neighbor.node.id);
    return ids;
  }

  /** Edges with both ends inside `ids`. */
  edgesWithin(ids: Set<string>): GraphEdge[] {
    return this.edges.filter((edge) => ids.has(edge.source) && ids.has(edge.target));
  }

  /** The project the page opens on when data/projects.ts names no default. */
  mostRecentId(): string | undefined {
    let newest: GraphNode | undefined;
    for (const node of this.nodes) {
      if (!newest || node.project.date > newest.project.date) newest = node;
    }
    return newest?.id;
  }
}

function pairKey(a: string, b: string): string {
  return a < b ? `${a}|${b}` : `${b}|${a}`;
}

/**
 * Keeps every pair above the threshold, then prunes to the strongest
 * `maxDegree` per node. An edge survives if either end still wants it, so a
 * project is never left orphaned by its more popular neighbor's pruning.
 */
function buildEdges(
  projects: Project[],
  matrix: number[][],
  threshold: number,
  maxDegree: number,
): GraphEdge[] {
  const candidates: GraphEdge[] = [];
  for (let i = 0; i < projects.length; i++) {
    for (let j = i + 1; j < projects.length; j++) {
      const similarity = matrix[i][j];
      if (similarity < threshold) continue;
      candidates.push({
        id: `${projects[i].id}--${projects[j].id}`,
        source: projects[i].id,
        target: projects[j].id,
        similarity,
        strength: 0,
      });
    }
  }

  const ranked = [...candidates].sort((a, b) => b.similarity - a.similarity || a.id.localeCompare(b.id));
  const degree = new Map<string, number>();
  const kept = new Set<string>();
  for (const edge of ranked) {
    const sourceDegree = degree.get(edge.source) ?? 0;
    const targetDegree = degree.get(edge.target) ?? 0;
    if (sourceDegree >= maxDegree && targetDegree >= maxDegree) continue;
    kept.add(edge.id);
    degree.set(edge.source, sourceDegree + 1);
    degree.set(edge.target, targetDegree + 1);
  }

  const edges = candidates.filter((edge) => kept.has(edge.id));

  // Rescale the surviving similarities to 0..1 so stroke weights use the full
  // range even when every score sits between, say, 0.2 and 0.4. The square
  // root lifts the low end: without it a single dominant pair flattens every
  // other edge into the same indistinguishable hairline.
  const lowest = edges.reduce((min, edge) => Math.min(min, edge.similarity), 1);
  const highest = edges.reduce((max, edge) => Math.max(max, edge.similarity), 0);
  const span = highest - lowest;
  return edges.map((edge) => ({
    ...edge,
    strength: span < 1e-6 ? 1 : Math.sqrt((edge.similarity - lowest) / span),
  }));
}

function buildAdjacency(
  edges: readonly GraphEdge[],
  nodesById: Map<string, GraphNode>,
): Map<string, Neighbor[]> {
  const adjacency = new Map<string, Neighbor[]>();

  const push = (from: string, to: string, edge: GraphEdge) => {
    const node = nodesById.get(to);
    if (!node) return;
    const list = adjacency.get(from) ?? [];
    list.push({ node, similarity: edge.similarity, strength: edge.strength });
    adjacency.set(from, list);
  };

  for (const edge of edges) {
    push(edge.source, edge.target, edge);
    push(edge.target, edge.source, edge);
  }

  for (const list of adjacency.values()) {
    // Deterministic ordering: strongest first, id as the tie-break.
    list.sort((a, b) => b.similarity - a.similarity || a.node.id.localeCompare(b.node.id));
  }

  return adjacency;
}
