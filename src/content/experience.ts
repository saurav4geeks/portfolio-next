import type { ExperienceItem } from "@/types/content";

export const experience: ExperienceItem[] = [
  {
    id: "syfe",
    startDate: "Dec 2025",
    endDate: "Present",
    position: "Software Development Engineer (SDE-1)",
    company: "Syfe — Wealth Management",
    location: "Gurugram, IN",
    highlights: [
      "Own the Income Max HK product backend end-to-end (Kotlin/Spring Boot microservices) — portfolio-type creation, custom security allocation, multi-currency FX handling (HKD/USD), ex-date dividend accrual, iFile generation, payout reconciliation and reinvestment. Income Max HK USD has become the fastest-growing portfolio by AUM in the HK market.",
      "Architected the SRS (Singapore) price-ingestion pipeline from scratch with an event-driven PSPL file ingestion job, Slack alerting and a reconciliation service — eliminating manual price uploads and ops intervention.",
      "Led backend for Cash+ Fixed Portfolio Operations covering the full lifecycle: maturity, subscription, spread accounting and a configurable bank/client-rate approval workflow.",
      "Designed and shipped a Structured Change Logs framework (fluent builder API, AOP @TrackChanges aspect, Strategy-pattern sink) — collapsing 6-line audit call sites to 1 across 50+ sites (85% less boilerplate) with full backward compatibility.",
      "Built AI-powered engineering workflows with Claude Skills — an automated code-review agent and an on-call debugging assistant integrating Datadog, Metabase and Sentry — cutting production incident triage time by 50%.",
    ],
  },
  {
    id: "spyne",
    startDate: "Apr 2025",
    endDate: "Oct 2025",
    position: "Software Development Engineer (SDE-1)",
    company: "Spyne.ai",
    location: "Gurugram, IN",
    highlights: [
      "Designed dynamic substage workflows in the Enterprise Contracting Console using Kafka-based asynchronous pipelines with automated email triggers and real-time status tracking — reducing manual contract-stage transitions by 70% for enterprise dealers.",
      "Built a credit-management system for resellers and dealerships with configurable limits, balance tracking and analytics — powering credit decisions for 1000+ dealerships and unlocking a new revenue stream.",
      "Developed DealerGPT, an AI chatbot using the OpenAI API integrated with a centralized knowledge base, deflecting 40% of dealer support queries.",
    ],
  },
  {
    id: "growth-jockey",
    startDate: "Jul 2023",
    endDate: "Apr 2025",
    position: "Software Development Engineer (SDE-1)",
    company: "Growth Jockey — Marketing Data Platform",
    location: "Gurugram, IN",
    highlights: [
      "Architected scalable backend systems and REST APIs handling 100,000+ daily transactions; cut latency by 35% via Redis caching and async processing.",
      "Designed multi-level data systems using Directed Acyclic Graphs (DAGs) for scalable cross-source data flow, reducing operational overhead by 25%.",
      "Engineered resilient ingestion pipelines with concurrent-safe operations and dynamic JSON schema validation; integrated OAuth-based auth for Google and Meta APIs.",
    ],
  },
  {
    id: "gaia",
    startDate: "Feb 2023",
    endDate: "Jun 2023",
    position: "Backend Developer Intern",
    company: "GAIA Smart Cities",
    location: "Mumbai, IN",
    highlights: [
      "Built Node.js backend APIs for the CITIIS project enabling project-endorsement and approval workflows with role-based permissions.",
      "Modularized the codebase to improve system efficiency by 10%.",
    ],
  },
];
