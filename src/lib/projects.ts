import "server-only";

import { and, asc, count, desc, eq, type SQL } from "drizzle-orm";
import { db } from "@/db";
import { projects } from "@/db/schema";

export const getPublishedProjects = () =>
  db
    .select()
    .from(projects)
    .where(eq(projects.status, "published"))
    .orderBy(asc(projects.sortOrder), desc(projects.createdAt));

export const getAllProjects = () =>
  db.select().from(projects).orderBy(asc(projects.sortOrder), desc(projects.createdAt));

export const getProjectById = async (id: string) => {
  const [project] = await db.select().from(projects).where(eq(projects.id, id)).limit(1);
  return project;
};

const countProjects = async (condition?: SQL) => {
  const query = db.select({ value: count() }).from(projects);
  const [result] = condition ? await query.where(condition) : await query;
  return result?.value ?? 0;
};

export const getProjectStats = async () => {
  const [total, published, draft, featured] = await Promise.all([
    countProjects(),
    countProjects(eq(projects.status, "published")),
    countProjects(eq(projects.status, "draft")),
    countProjects(and(eq(projects.featured, true), eq(projects.status, "published"))),
  ]);

  return { total, published, draft, featured };
};
