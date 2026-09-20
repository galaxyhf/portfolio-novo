import { z } from "zod";

export const projectFormSchema = z.object({
  title: z.string().min(2, "Informe um título válido."),
  slug: z.string().min(2, "Informe um slug válido.").regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Use um slug válido."),
  shortDescription: z.string().min(10, "Informe uma descrição curta."),
  fullDescription: z.string().min(20, "Informe uma descrição completa."),
  githubUrl: z.string().url("URL inválida.").or(z.literal("")),
  liveUrl: z.string().url("URL inválida.").or(z.literal("")),
  featured: z.boolean(),
  status: z.enum(["draft", "published"]),
  sortOrder: z.number().int().min(0),
});

export type ProjectFormData = z.infer<typeof projectFormSchema>;
export type ProjectStatus = ProjectFormData["status"];
