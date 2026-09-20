"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
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
import { saveProjectAction } from "@/app/admin/actions";
import type { Project } from "@/db/schema";
import { projectFormSchema, type ProjectFormData, type ProjectStatus } from "@/lib/project-schema";

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
    project?.coverImage ? [project.coverImage] : [],
  );
  const [galleryUrls, setGalleryUrls] = useState<string[]>(
    project?.images ?? [],
  );
  const [isSlugDirty, setIsSlugDirty] = useState(Boolean(project));

  const defaultValues = useMemo<ProjectFormData>(
    () => ({
      title: project?.title ?? "",
      slug: project?.slug ?? "",
      shortDescription: project?.shortDescription ?? "",
      fullDescription: project?.fullDescription ?? "",
      githubUrl: project?.githubUrl ?? "",
      liveUrl: project?.liveUrl ?? "",
      featured: project?.featured ?? false,
      status: project?.status ?? "draft",
      sortOrder: project?.sortOrder ?? 0,
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
    resolver: zodResolver(projectFormSchema),
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
      const formData = new FormData();
      formData.set("title", data.title);
      formData.set("slug", data.slug);
      formData.set("shortDescription", data.shortDescription);
      formData.set("fullDescription", data.fullDescription);
      formData.set("githubUrl", data.githubUrl);
      formData.set("liveUrl", data.liveUrl);
      formData.set("featured", String(data.featured));
      formData.set("status", data.status);
      formData.set("sortOrder", String(data.sortOrder));
      formData.set("techs", JSON.stringify(techs));
      formData.set("coverUrl", coverUrls[0] ?? "");
      formData.set("galleryUrls", JSON.stringify(galleryUrls));

      if (project) {
        formData.set("projectId", project.id);
      }
      if (coverFiles[0]) {
        formData.set("coverFile", coverFiles[0]);
      }
      galleryFiles.forEach((file) => formData.append("galleryFiles", file));

      const result = await saveProjectAction(formData);
      if (!result.ok) {
        throw new Error(result.error);
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
