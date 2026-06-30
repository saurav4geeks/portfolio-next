import {
  pgTable,
  serial,
  text,
  integer,
  timestamp,
} from "drizzle-orm/pg-core";

/* ------------------------------------------------------------------ */
/* Contact form submissions                                            */
/* ------------------------------------------------------------------ */
export const contactSubmissions = pgTable("contact_submissions", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone"),
  message: text("message").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
});

/* ------------------------------------------------------------------ */
/* CMS content — managed from the admin portal                         */
/* `sortOrder` controls display order (ascending). Array columns hold   */
/* bullet highlights / skill items.                                     */
/* ------------------------------------------------------------------ */
export const experienceItems = pgTable("experience_items", {
  id: serial("id").primaryKey(),
  sortOrder: integer("sort_order").notNull().default(0),
  startDate: text("start_date").notNull(),
  endDate: text("end_date").notNull(),
  position: text("position").notNull(),
  company: text("company").notNull(),
  location: text("location").notNull(),
  highlights: text("highlights").array().notNull().default([]),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
});

export const projectItems = pgTable("project_items", {
  id: serial("id").primaryKey(),
  sortOrder: integer("sort_order").notNull().default(0),
  date: text("date").notNull(),
  title: text("title").notNull(),
  stack: text("stack").notNull(),
  highlights: text("highlights").array().notNull().default([]),
  link: text("link"),
  linkLabel: text("link_label"),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
});

export const skillGroups = pgTable("skill_groups", {
  id: serial("id").primaryKey(),
  sortOrder: integer("sort_order").notNull().default(0),
  label: text("label").notNull(),
  items: text("items").array().notNull().default([]),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
});

export const educationItems = pgTable("education_items", {
  id: serial("id").primaryKey(),
  sortOrder: integer("sort_order").notNull().default(0),
  startDate: text("start_date").notNull(),
  endDate: text("end_date").notNull(),
  title: text("title").notNull(),
  institution: text("institution").notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
});

export type ContactSubmission = typeof contactSubmissions.$inferSelect;
export type NewContactSubmission = typeof contactSubmissions.$inferInsert;

export type ExperienceRow = typeof experienceItems.$inferSelect;
export type ProjectRow = typeof projectItems.$inferSelect;
export type SkillGroupRow = typeof skillGroups.$inferSelect;
export type EducationRow = typeof educationItems.$inferSelect;
