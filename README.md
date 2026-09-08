# isabella-website

Personal website framework. React 19 + TypeScript + Vite + Tailwind v4 + Motion + React Router.

```bash
npm install
npm run dev      # local dev server
npm run build    # type-check + production build
```

## How it's organized

Content lives in `src/data/` as plain typed objects. The shapes of those objects (the entities) live in `src/types/`. Components in `src/components/` render whatever the data holds, so adding content never requires touching a component.

```
src/
  types/           # the types: ImageObject, ExperienceEntry, Project, BlogFolder, BlogPost, ContentBlock, ...
  data/            # your content: profile, experiences, projects, blogs (edit these)
  components/
    layout/        # NavBar, PageHeader
    blocks/        # TextImageBlock (text one side, any image object the other)
    image-objects/ # ImageObjectView + one view per variant (single, carousel, spring-stack, frame-sequence)
    content/       # ContentBlocks: renders ContentBlock[] for project details and blog posts
    home/          # LandingSection (snap page), AboutSection
    experience/    # Timeline
    projects/      # ProjectGraphCanvas + useProjectGraph, ProjectPanel, SkillList
    blogs/         # FolderBlock, BlogListItem
    motion/        # Reveal (scroll-in animation, reduced-motion aware)
  pages/           # one component per route
  lib/             # small utilities
    graph/         # the projects similarity graph: ProjectGraph, layout, projection, focus layout
```

Routes: `/`, `/experience`, `/projects`, `/projects/:projectId`, `/blogs`, `/blogs/:folderId`, `/blogs/:folderId/:postId`, `/contact`.

## Adding content

- **Experience**: prepend an `ExperienceEntry` to `src/data/experiences.ts`. `end: null` renders as "Present" with the accent timeline marker.
- **Project**: add a `Project` to `src/data/projects.ts`. The `id` becomes the URL, `date` orders the list, and `details` is the ordered list of content blocks on the subpage. `skills` is what the projects graph compares -- see below.
- **Blog folder / post**: edit `src/data/blogs.ts`. Folders group posts; every post's `content` is a `ContentBlock[]`.
- **Hobbies, contact links, landing text**: `src/data/profile.ts`.

## The projects graph

`/projects` is a whiteboard split in two: a rotatable 3-D graph of the projects on
one side, the selected project written up on the other.

**How the connections are decided.** Every project carries a `skills` set
(languages, frameworks, libraries, tools). `ProjectGraph`
(`src/lib/graph/ProjectGraph.ts`) scores every pair by Jaccard similarity --
shared skills over total distinct skills -- and keeps a pair as an edge only if
it clears `projectGraphSettings.threshold`, capped at `maxDegree` edges per
project so the cloud stays readable. Stronger overlap draws a heavier, solid
edge; weaker overlap a thin dashed one. Change a project's `skills` and the
constellation redraws itself.

**How the interaction works.** The page opens flattened on one project
(`defaultProjectId`, or the most recent by `date`). Dragging the board unflattens
it back into the 3-D cloud; while you turn it, whichever node is nearest the
centre of the pane is highlighted in `--accent`, and releasing commits to that
node. The view then flattens to 2-D with the chosen project at the centre and
its `focusNeighborCount` closest relatives around it. Tapping a node, clicking a
name in the panel's neighbour list, or the hidden screen-reader button list all
drive the same selection.

The tunables all live at the bottom of `src/data/projects.ts`:
`defaultProjectId`, `focusNeighborCount` (the k in "k nearest"), and
`projectGraphSettings` (`threshold`, `maxDegree`).

Rendering is plain SVG with hand-rolled projection -- no 3-D library. Edges are
drawn through a mask that punches out every node circle and name box, so a
connection never runs behind a project name, and names that collide as the cloud
turns fade out in favour of the nearer one.

## Image objects

`ImageObject` (in `src/types/image-object.ts`) is the parent type for anything visual inside a block. Current variants:

| kind             | renders as                                        |
| ---------------- | ------------------------------------------------- |
| `single`         | one static image                                  |
| `carousel`       | arrow-driven fading carousel                      |
| `spring-stack`   | fanned photo stack, click to cycle with a spring  |
| `frame-sequence` | PNG-sequence animation drawn to a canvas          |

To add a variant: define its interface and add it to the union in `image-object.ts`, build a view in `src/components/image-objects/`, and register it in `ImageObjectView.tsx`. TypeScript flags the switch until you do.

`TextImageBlock` takes any `ImageObject` plus `textSide: "left" | "right"`, so every split layout on the site shares one component.

## Landing animation

The landing background is `landing.background` in `src/data/profile.ts`. It's `null` right now, which renders a drifting-gradient placeholder. When your frames are ready, drop them in `public/animations/` and swap in a `frame-sequence` image object (frame URLs + fps).

## Snap scroll behavior

`HomePage` adds the `home-snap` class to `<html>` while mounted; `index.css` gives that class `scroll-snap-type: y proximity`. The landing and about sections carry `snap-start`, so the viewport snaps at the landing/about boundary but scrolls freely once you're past it. No other page snaps.

## Styling

All colors and fonts are CSS variables at the top of `src/index.css` (light and dark values). Change them there and the whole site follows. Custom fonts: add an `@font-face` and point `--font-display-stack` / `--font-body-stack` at it.

Corner-radius rule used throughout: interactive pills (buttons, chips) are fully rounded; containers (cards, blocks, images) are `rounded-2xl`.
