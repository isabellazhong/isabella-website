import type { Project } from "../types";
import type { ProjectGraphOptions } from "../lib/graph/ProjectGraph";

/**
 * Each project is a node on /projects. Its `skills` set is what the graph
 * compares: two projects are linked when the Jaccard similarity of their skill
 * sets clears `projectGraphSettings.threshold`, and the stronger the overlap
 * the heavier the edge. Adding or removing a skill re-draws the constellation,
 * so keep the sets honest.
 *
 * `details` still drives the long-form subpage at /projects/:id.
 */
export const projects: Project[] = [
  {
    id: "marker",
    title: "Marker",
    tagline: "Hack the 6ix",
    date: "2025-07-20",
    description:
      `Marker is a self-study appplication that can ingest multimodal (video & text) documents to help fast-track your learning environment.

       We made a RAG pipeline by using the Faiss library to store vector embeddings into an index. Vector embeddings are created using the Twelve labs
       API which ingests chunks of transcript (for video documents) and chunks of text (for written documents).

       The purpose of this is for users to be able to ask questions about their related documnets/work, and using the Google Cloud Vision API, it can
       direct users to the exact section of their documents relating to their question. If needed, users can also generate summaries of their work,
       which is generated with Gemini.`,
    skills: [
      { name: "TypeScript", category: "language" },
      { name: "React", category: "framework" },
      { name: "Vite", category: "tool" },
      { name: "Tailwind CSS", category: "framework" },
      { name: "Vercel", category: "tool" },
      { name: "faiss", category: "library"},
      { name: "Tweleve Labs API", category: "tool"},
      { name: "transformers", category: "library"}, 
      { name: "nltk", category: "library"},
      { name: "Gemini", category: "tool"},
      { name: "Google Cloud Vision API", category: "tool"}
    ],
    links: [{ label: "GitHub repo", url: "https://github.com/Williamwu277/marker" }],
    gallery: [
      { src: "/assets/projects/marker/marker_landing.png", alt: "Marker landing" },
    ],
    details: [
      {
        kind: "text-image",
        textSide: "left",
        text: `Unfortuantely, my API key for Twelve labs expired, so this is the extent of UI/UX you can see and you just have to trust me on what its capabilities are (or read the code as well... please brace yourselfs for the inconsistent design choices though. Granted, it was a hackathon and we were on few hours of sleep).`,
        image: {
          kind: "single",
          image: { src: "/assets/projects/marker/marker_landing.png", alt: "landing" }
        },
      },
      {
        kind:"paragraph",
        text:
        `When a project is submitted, there are different types of extractions that occur: Transcript from a video (which is fetched & chunked via Twelve labs API), and text from documents (i.e. pdfs, docx, etc.).`
      },
      {
        kind:"paragraph",
        text:
        `Now, the next process is the chunking and embedding. The video transcript gets chunked (fixed amount) automatically which gets embedded (along with its metadat i.e. timestamp) and 
         ingested into our vector store (index). As for the text of documents, this is done differently. First we use chunk the text of the document into pages and tokenize each chunk to make ensure we are 
         under the max amount of tokens per chunk. If it exceeds, we further divide it into smaller chunks. Likewise, we also merge chunks if they are under the max token size. Then, we embed the text (along with metadata i.e. bounding box, page, etc.) and ingest it into our store.
        `
      },
      {
        kind:"paragraph",
        text:
        `Thus, if a user decides to ingest their homework sheet, for example, they can ask about a certain question on the sheet (using Google Cloud Vision). The question on the document will get embedded and we preform a RAG search for the closet top k vectors relating to that question. 
         Because we store the metadata (ex. page number, bounding box, timestamp), it can easily guide the user to that section of notes / video that could potentially help answer the question. 
        `
      }
    ],
  },
  {
    id: "neighbourly",
    title: "Neighbourly",
    tagline: "Group Project",
    date: "2025-11-10",
    description:
      `An application made to strengthen communities by supporting citizen's desire to help provide services / give resources for their fellow neighbours. 
        It simulates an Facebook marketplace + Uber-like interface where neighbours are able to see requests made by other neighbours for services and resources, and 
        have the ability to accept those requests. 
      `,
    skills: [
      { name: "Java", category: "language" },
      { name: "React", category: "framework" },
      { name: "Node.js", category: "tool" },
      { name: "PostgreSQL", category: "tool" },
      { name: "Prisma", category: "library" },
      { name: "Docker", category: "tool" },
    ],
    gallery: [
      { src: "https://picsum.photos/seed/isabella-neighbourly-a/600/760", alt: "Neighbourly alert screen" },
      { src: "https://picsum.photos/seed/isabella-neighbourly-b/600/420", alt: "Neighbourly tide feed" },
      { src: "https://picsum.photos/seed/isabella-neighbourly-c/520/700", alt: "Neighbourly morning digest" },
    ],
    details: [
      {
        kind: "paragraph",
        text: "Open with a short overview: the problem, your role, and the outcome.",
      },
    ],
  },
  {
    id: "car",
    title: "Remote Control Car",
    tagline: "First hardware project!",
    date: "2025-07-30",
    description:
      "Wanted to try something new so I dabbled in a bit of hardware :) Took me a looong time figuring it all out but I managed to get it done (though it's a bit janky). Made this for my co-worker because he's really into cars!",
    skills: [
      {name: "Arduino", category: "language"}
    ],
    gallery: [
      { src: "/assets/projects/car/car_landing.png", alt: "Foldspace query results" },
    ],
    details: [
      {
        kind:"paragraph",
        text:"Here's a short video of it driving using a remote control! Drives perfectly haha..."
      }, 
      {
        kind: "video",
        video: {"src": "/assets/projects/car/car_video.MOV", "alt": "video", "poster": undefined}

      },
      {
        kind: "text-image",
        textSide: "left",
        image: { kind: "single", image: { src: "/assets/projects/car/car_landing.png", alt: "car" } },
        text: [
            {
              kind:"paragraph", 
              text: "If you ever want to replicate this, these are the steps I did: "
            },
           {
              kind:"list", 
              style: "number", 
              items: [
                `Purchase a motor driver, IR reciever, Adriuno, female / male wires, remote control, motors, battery holder, and two rechargable batteries (at least 3.7V).
                Do NOT make the same mistake I did and get a battery that has signifigantly less voltage or it will fail to generate enough power for the car tires to run`,
                "Make the outer car frame either via 3-D printing or (if you want a lower quality version that's harder to work with like I ended up doing) you can use cardboard",
                "Connect the motors to the motor driver", 
                "Connect your Ardiuno to the motor driver and IR reciever",
                "Connect the wires from your battery holder to the power and GND of the motor driver", 
                "Create a script in Ardiuno to control the signals you reiceve from the remote to the motor driver. The power from your laptop will be sufficent to test!",
                "Place the battery in the battery holder, and assemble the rest of the frame together"
              ]
            },
            {
              kind: "paragraph",
              text: "Seems honestly not that bad, but as a beginner to hardware, that was one of the most frustrating experiences of my life (no regrets though!)"
            }
        ],
      }
    ],
  },
  {
    id: "recruit",
    title: "Recruit",
    tagline: "Hack the Valley",
    date: "2025-05-30",
    description:
      "Scanned notebooks turned into a tidy time series: yields, rainfall, and every decision that sat between them. The ingestion pipeline is deliberately boring and the interesting work is in the reconciliation rules, which are all documented in the repo.",
    skills: [
      { name: "Python", category: "language" },
      { name: "FastAPI", category: "framework" },
      { name: "pandas", category: "library" },
      { name: "NumPy", category: "library" },
      { name: "PostgreSQL", category: "tool" },
      { name: "Docker", category: "tool" },
    ],
    gallery: [
      { src: "https://picsum.photos/seed/isabella-almanac-a/600/760", alt: "Almanac dashboard" },
      { src: "https://picsum.photos/seed/isabella-almanac-b/600/420", alt: "Almanac season view" },
    ],
    details: [
      {
        kind: "paragraph",
        text: "Open with a short overview: the problem, your role, and the outcome.",
      },
    ],
  },
  {
    id: "paperweight",
    title: "Paperweight",
    tagline: "An iOS reader that keeps your place across paper and screen.",
    date: "2024-11-12",
    description:
      "Scan a page with the camera, and the app finds where you are in the ebook and syncs from there. Offline first, with a small sync service behind it. Most of the effort went into making the scan feel instant rather than into the matching itself.",
    skills: [
      { name: "Swift", category: "language" },
      { name: "SwiftUI", category: "framework" },
      { name: "Xcode", category: "tool" },
      { name: "Figma", category: "tool" },
      { name: "PostgreSQL", category: "tool" },
      { name: "Docker", category: "tool" },
    ],
    gallery: [
      { src: "https://picsum.photos/seed/isabella-paperweight-a/600/760", alt: "Paperweight reader view" },
      { src: "https://picsum.photos/seed/isabella-paperweight-b/600/420", alt: "Paperweight annotation pane" },
    ],
    details: [
      {
        kind: "paragraph",
        text: "Open with a short overview: the problem, your role, and the outcome.",
      },
    ],
  }
];

/**
 * The project the graph opens on. Leave as null to open on the most recent
 * project by `date`, or set an id ("lanterns") to pin a specific one.
 */
export const defaultProjectId: string | null = null;

/** How many related projects the flattened view keeps beside the selection. */
export const focusNeighborCount = 2;

/** Tuning for the similarity graph. */
export const projectGraphSettings: ProjectGraphOptions = {
  /** Pairs below this Jaccard score are not related enough to draw. */
  threshold: 0.12,
  /** Strongest-first cap per project, so the cloud stays readable. */
  maxDegree: 4,
};
