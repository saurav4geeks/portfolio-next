import { config } from "dotenv";
config({ path: ".env.local" });

import { getDb } from "./index";
import {
  experienceItems,
  projectItems,
  skillGroups,
  educationItems,
} from "./schema";
import { experience } from "../content/experience";
import { projects } from "../content/projects";
import { skills } from "../content/skills";
import { education } from "../content/education";

/**
 * Seed CMS tables from the original code-based content. Idempotent: clears
 * each table first. Run with `npm run db:seed`.
 */
async function seed() {
  const db = getDb();

  await db.delete(experienceItems);
  await db.delete(projectItems);
  await db.delete(skillGroups);
  await db.delete(educationItems);

  await db.insert(experienceItems).values(
    experience.map((e, i) => ({
      sortOrder: i,
      startDate: e.startDate,
      endDate: e.endDate,
      position: e.position,
      company: e.company,
      location: e.location,
      highlights: e.highlights,
    })),
  );

  await db.insert(projectItems).values(
    projects.map((p, i) => ({
      sortOrder: i,
      date: p.date,
      title: p.title,
      stack: p.stack,
      highlights: p.highlights,
      link: p.link ?? null,
      linkLabel: p.linkLabel ?? null,
    })),
  );

  await db.insert(skillGroups).values(
    skills.map((s, i) => ({
      sortOrder: i,
      label: s.label,
      items: s.items,
    })),
  );

  await db.insert(educationItems).values(
    education.map((ed, i) => ({
      sortOrder: i,
      startDate: ed.startDate,
      endDate: ed.endDate,
      title: ed.title,
      institution: ed.institution,
    })),
  );

  console.log("Seeded: ", {
    experience: experience.length,
    projects: projects.length,
    skills: skills.length,
    education: education.length,
  });
  process.exit(0);
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
