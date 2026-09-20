import { sql } from "drizzle-orm";
import { boolean, check, index, integer, jsonb, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";

export const projects = pgTable(
  "projects",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    title: text("title").notNull(),
    slug: text("slug").notNull().unique(),
    shortDescription: text("short_description").notNull(),
    fullDescription: text("full_description").notNull(),
    techs: text("techs").array().notNull().default([]),
    githubUrl: text("github_url"),
    liveUrl: text("live_url"),
    coverImage: text("cover_image"),
    images: jsonb("images").$type<string[]>().notNull().default([]),
    featured: boolean("featured").notNull().default(false),
    status: text("status", { enum: ["draft", "published"] }).notNull().default("draft"),
    sortOrder: integer("sort_order").notNull().default(0),
    createdAt: timestamp("created_at", { withTimezone: true, mode: "string" }).notNull().defaultNow(),
  },
  (table) => [
    index("projects_status_idx").on(table.status),
    index("projects_featured_idx").on(table.featured),
    index("projects_sort_order_idx").on(table.sortOrder),
    check("projects_status_check", sql`${table.status} in ('draft', 'published')`),
  ],
);

export type Project = typeof projects.$inferSelect;
export type NewProject = typeof projects.$inferInsert;
