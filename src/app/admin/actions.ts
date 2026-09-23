"use server";

import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { db } from "@/db";
import { projects } from "@/db/schema";
import { requireAdminSession } from "@/lib/neon/auth";
import { projectFormSchema } from "@/lib/project-schema";
import {
  createProjectImageUpload,
  getStoragePublicBaseUrl,
  type ProjectImageUpload,
} from "@/lib/neon/storage";

type ActionResult = { ok: true } | { ok: false; error: string };
type ImageUploadActionResult =
  | ({ ok: true } & ProjectImageUpload)
  | { ok: false; error: string };

const parseStringArray = (value: FormDataEntryValue | null, field: string) => {
  try {
    const parsed: unknown = JSON.parse(String(value ?? "[]"));
    if (!Array.isArray(parsed) || !parsed.every((item) => typeof item === "string")) {
      throw new Error();
    }
    return parsed;
  } catch {
    throw new Error(`O campo ${field} é inválido.`);
  }
};

export const saveProjectAction = async (formData: FormData): Promise<ActionResult> => {
  try {
    await requireAdminSession();

    const parsed = projectFormSchema.safeParse({
      title: formData.get("title"),
      slug: formData.get("slug"),
      shortDescription: formData.get("shortDescription"),
      fullDescription: formData.get("fullDescription"),
      githubUrl: formData.get("githubUrl"),
      liveUrl: formData.get("liveUrl"),
      featured: formData.get("featured") === "true",
      status: formData.get("status"),
      sortOrder: Number(formData.get("sortOrder")),
    });

    if (!parsed.success) {
      return { ok: false, error: parsed.error.issues[0]?.message ?? "Dados inválidos." };
    }

    const techs = parseStringArray(formData.get("techs"), "tecnologias");
    if (techs.length === 0) {
      return { ok: false, error: "Adicione pelo menos uma tecnologia." };
    }

    const galleryUrls = parseStringArray(formData.get("galleryUrls"), "galeria");
    const coverUrl = String(formData.get("coverUrl") ?? "") || null;
    const publicStorageUrl = `${getStoragePublicBaseUrl()}/`;
    const existingUrls = [...galleryUrls, ...(coverUrl ? [coverUrl] : [])];
    if (existingUrls.some((url) => !url.startsWith(publicStorageUrl))) {
      return { ok: false, error: "Uma das imagens existentes não pertence ao storage do projeto." };
    }

    if (galleryUrls.length > 12) {
      return { ok: false, error: "A galeria pode ter no máximo 12 imagens." };
    }

    const values = {
      title: parsed.data.title,
      slug: parsed.data.slug,
      shortDescription: parsed.data.shortDescription,
      fullDescription: parsed.data.fullDescription,
      techs,
      githubUrl: parsed.data.githubUrl || null,
      liveUrl: parsed.data.liveUrl || null,
      coverImage: coverUrl,
      images: galleryUrls,
      featured: parsed.data.featured,
      status: parsed.data.status,
      sortOrder: parsed.data.sortOrder,
    };

    const projectId = String(formData.get("projectId") ?? "");
    if (projectId) {
      await db.update(projects).set(values).where(eq(projects.id, projectId));
    } else {
      await db.insert(projects).values(values);
    }

    revalidatePath("/");
    revalidatePath("/admin/dashboard");
    revalidatePath("/admin/projects");
    return { ok: true };
  } catch (error) {
    return {
      ok: false,
      error: error instanceof Error ? error.message : "Erro ao salvar projeto.",
    };
  }
};

export const createProjectImageUploadAction = async (
  fileName: string,
  contentType: string,
  size: number,
  projectSlug: string,
): Promise<ImageUploadActionResult> => {
  try {
    await requireAdminSession();

    if (!projectSlug) {
      return { ok: false, error: "Informe um slug válido antes de enviar imagens." };
    }

    const result = await createProjectImageUpload(fileName, contentType, size, projectSlug);
    return { ok: true, ...result };
  } catch (error) {
    return {
      ok: false,
      error: error instanceof Error ? error.message : "Erro ao preparar o envio da imagem.",
    };
  }
};

export const deleteProjectAction = async (projectId: string): Promise<ActionResult> => {
  try {
    await requireAdminSession();
    await db.delete(projects).where(eq(projects.id, projectId));
    revalidatePath("/");
    revalidatePath("/admin/dashboard");
    revalidatePath("/admin/projects");
    return { ok: true };
  } catch (error) {
    return {
      ok: false,
      error: error instanceof Error ? error.message : "Erro ao excluir projeto.",
    };
  }
};
