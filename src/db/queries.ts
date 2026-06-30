import "server-only";
import { asc, desc, sql } from "drizzle-orm";
import { getDb } from "./index";
import {
  contactSubmissions,
  educationItems,
  experienceItems,
  projectItems,
  skillGroups,
} from "./schema";

/* ----------------------------- Public reads ----------------------------- */

export async function getExperience() {
  return getDb()
    .select()
    .from(experienceItems)
    .orderBy(asc(experienceItems.sortOrder));
}

export async function getProjects() {
  return getDb()
    .select()
    .from(projectItems)
    .orderBy(asc(projectItems.sortOrder));
}

export async function getSkills() {
  return getDb().select().from(skillGroups).orderBy(asc(skillGroups.sortOrder));
}

export async function getEducation() {
  return getDb()
    .select()
    .from(educationItems)
    .orderBy(asc(educationItems.sortOrder));
}

/* ----------------------------- Admin reads ------------------------------ */

export async function getSubmissions() {
  return getDb()
    .select()
    .from(contactSubmissions)
    .orderBy(desc(contactSubmissions.createdAt));
}

export async function getCounts() {
  const db = getDb();
  const [counts] = await db
    .select({
      submissions: sql<number>`(select count(*) from ${contactSubmissions})`,
      experience: sql<number>`(select count(*) from ${experienceItems})`,
      projects: sql<number>`(select count(*) from ${projectItems})`,
      skills: sql<number>`(select count(*) from ${skillGroups})`,
      education: sql<number>`(select count(*) from ${educationItems})`,
    })
    .from(sql`(select 1) as _`);
  return {
    submissions: Number(counts.submissions),
    experience: Number(counts.experience),
    projects: Number(counts.projects),
    skills: Number(counts.skills),
    education: Number(counts.education),
  };
}
