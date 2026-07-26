import "server-only";
import { and, asc, desc, eq, sql } from "drizzle-orm";
import { getDb } from "./index";
import {
  blogPosts,
  contactSubmissions,
  educationItems,
  experienceItems,
  projectItems,
  skillGroups,
  type BlogPostRow,
  type EducationRow,
  type ExperienceRow,
  type ProjectRow,
  type SkillGroupRow,
} from "./schema";
import { experience as experienceContent } from "@/content/experience";
import { projects as projectsContent } from "@/content/projects";
import { skills as skillsContent } from "@/content/skills";
import { education as educationContent } from "@/content/education";

/**
 * Run a read, but if the database is unreachable (e.g. a paused free-tier
 * project, or a transient pooler blip) fall back to a safe default instead of
 * throwing — so public pages degrade gracefully rather than returning a 500.
 */
async function safeRead<T>(
  fn: () => Promise<T>,
  fallback: T,
  label: string,
): Promise<T> {
  try {
    return await fn();
  } catch (err) {
    console.error(`[queries] ${label} failed; serving fallback.`, err);
    return fallback;
  }
}

/* Static fallbacks mirror the seed content in src/content/*. */
const FALLBACK_TS = new Date("2026-01-01T00:00:00Z");

const experienceFallback: ExperienceRow[] = experienceContent.map((e, i) => ({
  id: i + 1,
  sortOrder: i,
  startDate: e.startDate,
  endDate: e.endDate,
  position: e.position,
  company: e.company,
  location: e.location,
  highlights: e.highlights,
  updatedAt: FALLBACK_TS,
}));

const projectsFallback: ProjectRow[] = projectsContent.map((p, i) => ({
  id: i + 1,
  sortOrder: i,
  date: p.date,
  title: p.title,
  stack: p.stack,
  highlights: p.highlights,
  link: p.link ?? null,
  linkLabel: p.linkLabel ?? null,
  updatedAt: FALLBACK_TS,
}));

const skillsFallback: SkillGroupRow[] = skillsContent.map((s, i) => ({
  id: i + 1,
  sortOrder: i,
  label: s.label,
  items: s.items,
  updatedAt: FALLBACK_TS,
}));

const educationFallback: EducationRow[] = educationContent.map((e, i) => ({
  id: i + 1,
  sortOrder: i,
  startDate: e.startDate,
  endDate: e.endDate,
  title: e.title,
  institution: e.institution,
  updatedAt: FALLBACK_TS,
}));

/* ----------------------------- Public reads ----------------------------- */

export async function getExperience() {
  return safeRead(
    () =>
      getDb()
        .select()
        .from(experienceItems)
        .orderBy(asc(experienceItems.sortOrder)),
    experienceFallback,
    "getExperience",
  );
}

export async function getProjects() {
  return safeRead(
    () =>
      getDb().select().from(projectItems).orderBy(asc(projectItems.sortOrder)),
    projectsFallback,
    "getProjects",
  );
}

export async function getSkills() {
  return safeRead(
    () =>
      getDb().select().from(skillGroups).orderBy(asc(skillGroups.sortOrder)),
    skillsFallback,
    "getSkills",
  );
}

export async function getEducation() {
  return safeRead(
    () =>
      getDb()
        .select()
        .from(educationItems)
        .orderBy(asc(educationItems.sortOrder)),
    educationFallback,
    "getEducation",
  );
}

/* ------------------------------- Blog ----------------------------------- */

export async function getPublishedPosts() {
  return safeRead(
    () =>
      getDb()
        .select()
        .from(blogPosts)
        .where(eq(blogPosts.published, true))
        .orderBy(desc(blogPosts.publishedAt)),
    [] as BlogPostRow[],
    "getPublishedPosts",
  );
}

export async function getPublishedPostBySlug(slug: string) {
  return safeRead(
    async () => {
      const [post] = await getDb()
        .select()
        .from(blogPosts)
        .where(and(eq(blogPosts.slug, slug), eq(blogPosts.published, true)))
        .limit(1);
      return post ?? null;
    },
    null as BlogPostRow | null,
    "getPublishedPostBySlug",
  );
}

/* ------------------------------- Admin ---------------------------------- */

export async function getAllPostsAdmin() {
  return getDb().select().from(blogPosts).orderBy(desc(blogPosts.updatedAt));
}

export async function getPostById(id: number) {
  const [post] = await getDb()
    .select()
    .from(blogPosts)
    .where(eq(blogPosts.id, id))
    .limit(1);
  return post ?? null;
}

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
      posts: sql<number>`(select count(*) from ${blogPosts})`,
    })
    .from(sql`(select 1) as _`);
  return {
    submissions: Number(counts.submissions),
    experience: Number(counts.experience),
    projects: Number(counts.projects),
    skills: Number(counts.skills),
    education: Number(counts.education),
    posts: Number(counts.posts),
  };
}
