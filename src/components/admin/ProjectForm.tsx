"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { ImageUploader } from "@/components/admin/ImageUploader";
import { TagsInput } from "@/components/admin/TagsInput";
import { createSupabaseBrowserClient } from "@/lib/supabase/browser";
import {
  uploadProjectImage,
  uploadProjectImages,
} from "@/lib/supabase/storage";
import type { Project, ProjectStatus } from "@/lib/supabase/types";

const projectSchema = z.object({
  title: z.string().min(2, "Informe um título válido."),
  slug: z.string().min(2, "Informe um slug válido."),
  shortDescription: z.string().min(10, "Informe uma descrição curta."),
  fullDescription: z.string().min(20, "Informe uma descrição completa."),
  githubUrl: z.string().url("URL inválida.").or(z.literal("")),
  liveUrl: z.string().url("URL inválida.").or(z.literal("")),
  featured: z.boolean(),
  status: z.enum(["draft", "published"]),
  sortOrder: z.number().int().min(0),
});

type ProjectFormData = z.infer<typeof projectSchema>;

interface ProjectFormProps {
  project?: Project;
}

const createSlug = (value: string) =>
  value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

export const ProjectForm = ({ project }: ProjectFormProps) => {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [tagInput, setTagInput] = useState("");
  const [techs, setTechs] = useState<string[]>(project?.techs ?? []);
  const [coverFiles, setCoverFiles] = useState<File[]>([]);
  const [galleryFiles, setGalleryFiles] = useState<File[]>([]);
  const [coverUrls, setCoverUrls] = useState(
    project?.cover_image ? [project.cover_image] : [],
  );
  const [galleryUrls, setGalleryUrls] = useState<string[]>(
    project?.images ?? [],
  );
  const [isSlugDirty, setIsSlugDirty] = useState(Boolean(project));

  const defaultValues = useMemo<ProjectFormData>(
    () => ({
      title: project?.title ?? "",
      slug: project?.slug ?? "",
      shortDescription: project?.short_description ?? "",
      fullDescription: project?.full_description ?? "",
      githubUrl: project?.github_url ?? "",
      liveUrl: project?.live_url ?? "",
      featured: project?.featured ?? false,
      status: project?.status ?? "draft",
      sortOrder: project?.sort_order ?? 0,
    }),
    [project],
  );

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<ProjectFormData>({
    resolver: zodResolver(projectSchema),
    defaultValues,
  });

  useEffect(() => {
    register("status");
    register("featured");
  }, [register]);

  const onSubmit = async (data: ProjectFormData) => {
    if (techs.length === 0) {
      toast.error("Adicione pelo menos uma tecnologia.");
      return;
    }

    setIsSubmitting(true);

    try {
      const supabase = createSupabaseBrowserClient();
      const coverImage =
        coverFiles.length > 0
          ? await uploadProjectImage(supabase, coverFiles[0], data.slug)
          : (coverUrls[0] ?? null);
      const uploadedGallery = await uploadProjectImages(
        supabase,
        galleryFiles,
        data.slug,
      );

      const payload = {
        title: data.title,
        slug: data.slug,
        short_description: data.shortDescription,
        full_description: data.fullDescription,
        techs,
        github_url: data.githubUrl || null,
        live_url: data.liveUrl || null,
        cover_image: coverImage,
        images: [...galleryUrls, ...uploadedGallery],
        featured: data.featured,
        status: data.status as ProjectStatus,
        sort_order: data.sortOrder,
      };

      const request = project
        ? supabase.from("projects").update(payload).eq("id", project.id)
        : supabase.from("projects").insert(payload);

      const { error } = await request;

      if (error) {
        throw error;
      }

      toast.success(project ? "Projeto atualizado." : "Projeto criado.");
      router.push("/admin/projects");
      router.refresh();
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Erro ao salvar projeto.";
      toast.error(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const status = watch("status");
  const featured = watch("featured");

  return (
    <Card>
      <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
        <div className="grid gap-5 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="title">Título</Label>
            <Input
              id="title"
              {...register("title", {
                onChange: (event) => {
                  if (!isSlugDirty) {
                    setValue("slug", createSlug(event.target.value), {
                      shouldValidate: true,
                    });
                  }
                },
              })}
            />
            {errors.title && (
              <p className="text-sm text-red-300">{errors.title.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="slug">Slug</Label>
            <Input
              id="slug"
              {...register("slug", {
                onChange: () => setIsSlugDirty(true),
              })}
            />
            {errors.slug && (
              <p className="text-sm text-red-300">{errors.slug.message}</p>
            )}
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="shortDescription">Descrição curta</Label>
          <Textarea
            id="shortDescription"
            className="min-h-24"
            {...register("shortDescription")}
          />
          {errors.shortDescription && (
            <p className="text-sm text-red-300">
              {errors.shortDescription.message}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="fullDescription">Descrição completa</Label>
          <Textarea id="fullDescription" {...register("fullDescription")} />
          {errors.fullDescription && (
            <p className="text-sm text-red-300">
              {errors.fullDescription.message}
            </p>
          )}
        </div>

        <TagsInput
          label="Tecnologias"
          tags={techs}
          value={tagInput}
          onValueChange={setTagInput}
          onTagsChange={setTechs}
        />

        <div className="grid gap-5 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="githubUrl">GitHub</Label>
            <Input
              id="githubUrl"
              placeholder="https://github.com/..."
              {...register("githubUrl")}
            />
            {errors.githubUrl && (
              <p className="text-sm text-red-300">{errors.githubUrl.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="liveUrl">Projeto online</Label>
            <Input
              id="liveUrl"
              placeholder="https://..."
              {...register("liveUrl")}
            />
            {errors.liveUrl && (
              <p className="text-sm text-red-300">{errors.liveUrl.message}</p>
            )}
          </div>
        </div>

        <ImageUploader
          label="Imagem de capa"
          existingUrls={coverUrls}
          files={coverFiles}
          onFilesChange={setCoverFiles}
          onExistingUrlsChange={setCoverUrls}
        />

        <ImageUploader
          label="Galeria do projeto"
          multiple
          existingUrls={galleryUrls}
          files={galleryFiles}
          onFilesChange={setGalleryFiles}
          onExistingUrlsChange={setGalleryUrls}
        />

        <div className="grid gap-5 md:grid-cols-3">
          <div className="space-y-2">
            <Label htmlFor="status">Status</Label>
            <Select
              value={status}
              onValueChange={(value) =>
                setValue("status", value as ProjectStatus, {
                  shouldValidate: true,
                })
              }
            >
              <SelectTrigger id="status">
                <SelectValue placeholder="Selecione o status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="draft">Rascunho</SelectItem>
                <SelectItem value="published">Publicado</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="sortOrder">Ordem</Label>
            <Input
              id="sortOrder"
              type="number"
              min={0}
              {...register("sortOrder", { valueAsNumber: true })}
            />
            {errors.sortOrder && (
              <p className="text-sm text-red-300">{errors.sortOrder.message}</p>
            )}
          </div>

          <label className="flex h-11 items-center gap-3 self-end rounded-lg border border-border bg-bg-secondary px-3 text-sm text-text-primary">
            <Checkbox
              checked={featured}
              onCheckedChange={(checked) =>
                setValue("featured", checked === true, { shouldValidate: true })
              }
            />
            Destacar projeto
          </label>
        </div>

        <div className="flex justify-end gap-3 border-t border-border pt-6">
          <Button className="cursor-pointer"
            type="button"
            variant="secondary"
            onClick={() => router.push("/admin/projects")}
          >
            Cancelar
          </Button>
          <Button type="submit" disabled={isSubmitting} className="gap-2 cursor-pointer">
            {isSubmitting && <Loader2 size={16} className="animate-spin" />}
            {project ? "Salvar alterações" : "Criar projeto"}
          </Button>
        </div>
      </form>
    </Card>
  );
};
