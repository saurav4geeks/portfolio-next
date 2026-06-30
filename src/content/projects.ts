import type { ProjectItem } from "@/types/content";

export const projects: ProjectItem[] = [
  {
    id: "metis",
    date: "May 2026",
    title: "Metis — Knowledge Graph Context Layer",
    stack: "TypeScript, Go, Next.js, Fastify, SQLite, PostgreSQL, Turborepo",
    highlights: [
      "Built a context layer for AI coding tools (Claude Code, Cursor, Windsurf) that captures architectural decisions, conventions and gotchas into a structured knowledge graph, then compiles relevant subsets into the native context files each tool reads automatically (CLAUDE.md, .cursor/rules) — no manual copy-paste across tools.",
      "A local daemon (Node + Fastify + SQLite) watches files, compiles context and syncs to a Postgres-backed cloud API for multi-machine consistency, fronted by a sub-5ms Go CLI client.",
      "Shipped as a pnpm + Turborepo monorepo spanning the agent, CLI, a VS Code/Cursor/Windsurf extension, cloud API and a Next.js docs site over a shared typed core.",
    ],
    link: "https://github.com/saurav4geeks/metis",
    linkLabel: "View on GitHub",
  },
  {
    id: "aegis",
    date: "May 2026",
    title: "Aegis — Security Spine for AI Agents",
    stack: "TypeScript, Go, Python, Next.js, PostgreSQL",
    highlights: [
      "Designed a single security platform for AI agents with two products on one account, dashboard and versioned event schema: Sentinel (prompt-injection prevention) and Blackbox (action recording & rewind).",
      "Sentinel guards each agent run with a honeypot, a mitmproxy-based firewall and an output scanner, returning a SAFE / COMPROMISED verdict per run.",
      "Blackbox records every action an agent takes as reversible inverses, enabling rewind(to_step=N) to roll execution back to any prior step. Go engine + Next.js dashboard + Python SDK in a pnpm monorepo.",
    ],
    link: "https://github.com/saurav4geeks/aegis",
    linkLabel: "View on GitHub",
  },
];
