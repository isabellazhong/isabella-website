import type { Project } from "../types";
import type { ProjectGraphOptions } from "../lib/graph/ProjectGraph";

/**
 * Each project is a node on /projects. Its `skills` set is what the graph
 * compares: two projects are linked when the Jaccard similarity of their skill
 * sets clears `projectGraphSettings.threshold`, and the stronger the overlap
 * the heavier the edge. Adding or removing a skill re-draws the constellation,
 * so keep the sets honest.
 *
 * `details` is optional: when present it drives the long-form subpage at
 * /projects/:id; leave it out for projects that don't need a write-up.
 */
export const projects: Project[] = [
  {
    id: "marker",
    title: "Marker",
    tagline: "Hack the 6ix",
    date: "2025-07-20",
    description:
      `Marker is a self-study application that can ingest multimodal (video & text) documents to help fast-track your learning.

       We built a RAG pipeline using the Faiss library to store vector embeddings in an index. The vector embeddings are created with the Twelve Labs
       API, which ingests chunks of transcript (for video documents) and chunks of text (for written documents).

       The purpose of this is to let users ask questions about their related documents/work; using the Google Cloud Vision API, it can
       direct users to the exact section of their documents relating to their question. If needed, users can also generate summaries of their work,
       which are produced with Gemini.`,
    skills: [
      { name: "TypeScript", category: "language" },
      { name: "Python", category: "language" },
      { name: "React", category: "framework" },
      { name: "Vite", category: "tool" },
      { name: "Tailwind CSS", category: "framework" },
      { name: "Vercel", category: "tool" },
      { name: "faiss", category: "library" },
      { name: "Twelve Labs API", category: "tool" },
      { name: "transformers", category: "library" },
      { name: "sentence-transformers", category: "library" },
      { name: "nltk", category: "library" },
      { name: "Gemini", category: "tool" },
      { name: "Google Cloud Vision API", category: "tool" },
      { name: "Flask", category: "framework" },
    ],
    github: "https://github.com/Williamwu277/marker",
    gallery: [
      { src: "/assets/projects/marker/marker_landing.png", alt: "Marker landing" },
    ],
    details: [
      {
        kind: "text-image",
        textSide: "left",
        text: `Unfortunately, my API key for Twelve Labs expired, so this is the extent of the UI/UX you can see, and you'll just have to trust me on what its capabilities are (or read the code as well... please brace yourselves for the inconsistent design choices though. Granted, it was a hackathon and we were running on a few hours of sleep).`,
        image: {
          kind: "single",
          image: { src: "/assets/projects/marker/marker_landing.png", alt: "landing" }
        },
      },
      {
        kind: "paragraph",
        text:
        `When a project is submitted, different types of extraction occur: the transcript from a video (which is fetched and chunked via the Twelve Labs API), and the text from documents (i.e. PDFs, DOCX files, etc.).`
      },
      {
        kind: "paragraph",
        text:
        `Next comes chunking and embedding. The video transcript is automatically chunked into fixed-size pieces, and each chunk is embedded (along with its metadata, i.e. the timestamp) and
         ingested into our vector store (index). The text of documents is handled differently. First, we chunk the document's text into pages and tokenize each chunk to ensure we are
         under the maximum number of tokens per chunk. If a chunk exceeds it, we further divide it into smaller chunks. Likewise, we merge chunks if they are under the maximum token size. Then, we embed the text (along with metadata, i.e. bounding box, page, etc.) and ingest it into our store.
        `
      },
      {
        kind: "paragraph",
        text:
        `Thus, if a user decides to ingest their homework sheet, for example, they can ask about a certain question on the sheet (using Google Cloud Vision). The question on the document gets embedded, and we perform a RAG search for the closest top-k vectors relating to that question.
         Because we store the metadata (e.g. page number, bounding box, timestamp), it can easily guide the user to the section of the notes or video that could help answer the question.
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
      `An application made to strengthen communities by supporting citizens' desire to provide services and resources for their fellow neighbours.
        It simulates a Facebook Marketplace + Uber-like interface where neighbours can see requests made by other neighbours for services and resources, and
        have the ability to accept those requests. In this project, we made sure to follow SOLID principles extensively.
      `,
    skills: [
      { name: "Java", category: "language" },
      { name: "Gemini", category: "tool" },
      { name: "MongoDB", category: "database" },
      { name: "Sendbird Platform API", category: "tool" },
    ],
    github: "https://github.com/isabellazhong/neighbourly"
  },
  {
    id: "car",
    title: "Remote Control Car",
    tagline: "First hardware project!",
    date: "2025-07-30",
    description:
      "Wanted to try something new, so I dabbled in a bit of hardware :) It took me a looong time to figure it all out, but I managed to get it done (though it's a bit janky). Made this for my co-worker because he's really into cars!",
    skills: [
      { name: "C++", category: "language" },
      { name: "Arduino", category: "tool" },
    ],
    gallery: [
      { src: "/assets/projects/car/car_landing.png", alt: "Remote control car" },
    ],
    details: [
      {
        kind: "paragraph",
        text: "Here's a short video of it driving using a remote control! Drives perfectly... "
      },
      {
        kind: "video",
        video: { "src": "/assets/projects/car/car_video.MOV", "alt": "video", "poster": undefined }

      },
      {
        kind: "text-image",
        textSide: "left",
        image: { kind: "single", image: { src: "/assets/projects/car/car_landing.png", alt: "car" } },
        text: [
            {
              kind: "paragraph",
              text: "If you ever want to replicate this, these are the steps I took: "
            },
           {
              kind: "list",
              style: "number",
              items: [
                `Purchase a motor driver, IR receiver, Arduino, female/male wires, remote control, motors, battery holder, and two rechargeable batteries (at least 3.7V).
                Do NOT make the same mistake I did and get a battery with significantly less voltage, or it will fail to generate enough power for the car's tires to run.`,
                "Make the outer car frame either via 3D printing or (if you want a cheap and fast way, like I ended up doing) with cardboard.",
                "Connect the motors to the motor driver.",
                "Connect your Arduino to the motor driver and IR receiver.",
                "Connect the wires from your battery holder to the power and GND of the motor driver.",
                "Write an Arduino sketch to translate the signals you receive from the remote into commands for the motor driver. The power from your laptop will be sufficient for testing!",
                "Place the batteries in the battery holder and assemble the rest of the frame."
              ]
            },
            {
              kind: "paragraph",
              text: "This was extremely frustrating to complete, but I'm quite proud that I finished it (and that it worked)!"
            }
        ],
      }
    ],
  },
  {
    id: "justastartup",
    title: "justastartup",
    tagline: "Hack the Valley",
    date: "2025-11-05",
    description:
      `Sometimes you don't entirely know if your startup idea is good enough to succeed. Realistically, this is figured out through trial and error - you attempt it, and if it fails, you continue to iterate.
      But if you want an objective lens on how feasible an idea is, this application is meant to give you different perspectives from an economic point of view. It fast-tracks the research you would otherwise
      have to do manually and adds insight to your judgement. Here, we use the AlphaVantage API to get information on stocks and other economic data to give as context to the LLM.
      `,
    skills: [
      { name: "TypeScript", category: "language" },
      { name: "React", category: "framework" },
      { name: "OAuth", category: "tool" },
      { name: "Gemini", category: "tool" },
      { name: "AlphaVantage API", category: "tool" },
      { name: "Supabase", category: "database" },
      { name: "Vercel", category: "tool" },
    ],
    gallery: [
      { src: "/assets/projects/justastartup/landing.png", alt: "Landing" },
      { src: "/assets/projects/justastartup/create.png", alt: "Create" },
    ],
    devpost: "https://devpost.com/software/justastartup",
    github: "https://github.com/isabellazhong/justastartup"
  },
  {
    id: "recruit",
    title: "Recruit",
    tagline: "Hack Western",
    date: "2025-11-21",
    description:
      `As getting a job becomes increasingly difficult, we built Recruit to help candidates better understand what they should prepare for and give them opportunities to practice their skills.
      Users can enter the title and description of a desired job, upload their resume, receive personalized technical and behavioural interview questions, and convert their resume into a tailored LaTeX format.
      Google Gemini generates the resume suggestions and behavioural questions. Simultaneously, Sentence Transformers compares job descriptions with LeetCode problems to recommend relevant technical practice.
       `,
    skills: [
      { name: "Python", category: "language" },
      { name: "React", category: "framework" },
      { name: "Three.js", category: "library" },
      { name: "Gemini", category: "tool" },
      { name: "Flask", category: "framework" },
      { name: "pandas", category: "library" },
      { name: "sentence-transformers", category: "library" },
    ],
    devpost: "https://devpost.com/software/recruit-659l7j",
    github: "https://github.com/isabellazhong/Recruit"
  },
  {
    id: "returnx",
    title: "ReturnX",
    tagline: "Hack the Future (Case Competition)",
    date: "2025-03-01",
    description:
      `We were finalists (fourth place) and got the opportunity to present at Google's headquarters. Our challenge was to mitigate the consequences that businesses and the environment face as a result of e-commerce returns.
      To address this issue, we built ReturnX, a solution to inaccurate product descriptions, misleading sizing information, and poor quality control processes. How does it do this?

      Using AI-powered verification, it streamlines customer returns and reduces the risk of inaccurate and fraudulent returns. We also integrated a business analytics dashboard that leverages customer data to make informed decisions and
      produce actionable items to reduce return rates.
      `,
    skills: [
      { name: "Figma", category: "tool" },
      { name: "Python", category: "language" },
      { name: "React", category: "framework" },
      { name: "Vercel", category: "tool" },
      { name: "Gemini", category: "tool" },
      { name: "Flask", category: "framework" },
    ],
    gallery: [
      { src: "/assets/projects/returnx/presentation.JPG", alt: "Presenting Photo" },
    ],
    details: [
      {
        kind: "text-image",
        text: "Speaking in front of large crowds is definitely something that I'm gradually getting better at, so I'm quite thankful to have gotten the opportunity to do this in such an intimidating setting - it gave me experience that will help me improve for next time.",
        image: { kind: "single", image: { src: "/assets/projects/returnx/speak.JPG", alt: "presentation" } },
        textSide: "top"
      },
      {
        kind: "text-image",
        text: "This case competition consisted of a lot of research and ideation into which solutions would be the most unique and impactful for our challenge, so it was extremely fun navigating what to consider in all aspects, including the financials, design, and the product itself. My experience was made even better because I had such amazing teammates.",
        image: { kind: "single", image: { src: "/assets/projects/returnx/google.JPG", alt: "presentation" } },
        textSide: "left"
      },
    ],
    devpost: "https://devpost.com/software/returnx",
    github: "https://github.com/alangrewco/returnX"
  }
];


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
