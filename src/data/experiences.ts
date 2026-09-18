import type { ExperienceEntry } from "../types";

/ Most recent first. Add a new internship by prepending an entry. */
export const experiences: ExperienceEntry[] = [
  {
    id: "rbc-amplify-2026",
    role: "Software Developer Intern",
    company: "RBC Amplify (Royal Bank of Canada)",
    location: "Toronto, Canada",
    start: "May 2026",
    end: "Aug 2026",
    summary:
      "Engineered a patent-pending multi-agent automation platform in Python that collects and validates enterprise control evidence, cutting an estimated 2-3 hours of manual review per control and selected for production adoption. Built table-detection tooling that extracts headers, data regions, and metadata from unstructured Excel sheets, and designed an algorithims resolve entity-matching of inconsistent file names via Jaccard similarity of attributes.",
    skills: ["Python", "Multi-Agent Systems", "LLMs", "Data Extraction", "LangGraph", "React", "PostgreSQL"],
  },
  {
    id: "bmo-2025",
    role: "Software Developer Intern",
    company: "BMO (Bank of Montreal)",
    location: "Toronto, Canada",
    start: "Apr 2025",
    end: "Aug 2025",
    summary:
      "Engineered an LLM-powered RAG system on AWS Bedrock that surfaced contextual code and documentation insights to accelerate the SDLC across agile teams. Designed and deployed scalable AWS CDK stacks (Lambda, IAM, S3, SQS, API Gateway) in TypeScript to standardize infrastructure provisioning, prototyped an MCP-based developer chatbot in Next.js, and boosted language parser accuracy from 70% to over 90% with new unit tests.",
    skills: ["TypeScript", "AWS Bedrock", "AWS CDK", "RAG", "MCP", "Next.js", "React"],
  },
];
