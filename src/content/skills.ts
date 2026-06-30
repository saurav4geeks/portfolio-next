import type { SkillGroup } from "@/types/content";

export const skills: SkillGroup[] = [
  {
    label: "Languages",
    items: ["Java", "Kotlin", "Python", "GoLang", "TypeScript", "C++", "SQL"],
  },
  {
    label: "Frameworks",
    items: ["Spring Boot", "Django", "Gin", "Express", "ReactJS", "Tailwind"],
  },
  {
    label: "Data",
    items: ["PostgreSQL", "MySQL", "MongoDB", "ClickHouse", "Redis"],
  },
  {
    label: "Systems",
    items: [
      "Kafka",
      "Microservices",
      "Event-Driven Architecture",
      "Async Pipelines",
      "DAGs",
      "Distributed Locks",
    ],
  },
  {
    label: "Cloud & Observability",
    items: ["AWS", "Docker", "CI/CD", "Datadog", "Sentry", "Metabase"],
  },
];
