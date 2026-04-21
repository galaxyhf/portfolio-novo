import Link from "next/link";
import { Edit, Plus } from "lucide-react";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { DeleteProjectButton } from "@/components/admin/DeleteProjectButton";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

export default async function AdminProjectsPage() {
  const supabase = await createSupabaseServerClient();
  const { data: projects, error } = await supabase
    .from("projects")
    .select("*")
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: false });

  if (error) {
    throw new Error(error.message);
  }

  return (
    <div className="space-y-8">
      <AdminPageHeader
        title="Projetos"
        description="Crie, edite, publique e organize os projetos do portfólio."
        action={
          <Link href="/admin/projects/new">
            <Button className="gap-2 cursor-pointer">
              <Plus size={16} />
              Novo projeto
            </Button>
          </Link>
        }
      />

      <Card className="overflow-hidden p-0">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[760px] text-left text-sm">
            <thead className="border-b border-border bg-bg-secondary text-text-secondary">
              <tr>
                <th className="px-4 py-3 font-medium">Título</th>
                <th className="px-4 py-3 font-medium">Status</th>
                <th className="px-4 py-3 font-medium">Destaque</th>
                <th className="px-4 py-3 font-medium">Ordem</th>
                <th className="px-4 py-3 text-right font-medium">Ações</th>
              </tr>
            </thead>
            <tbody>
              {projects?.map((project) => (
                <tr key={project.id} className="border-b border-border last:border-0">
                  <td className="px-4 py-4">
                    <p className="font-semibold text-text-primary">{project.title}</p>
                    <p className="mt-1 text-xs text-text-secondary">{project.slug}</p>
                  </td>
                  <td className="px-4 py-4">
                    <Badge variant={project.status === "published" ? "success" : "warning"}>
                      {project.status === "published" ? "Publicado" : "Rascunho"}
                    </Badge>
                  </td>
                  <td className="px-4 py-4">
                    <Badge variant={project.featured ? "success" : "default"}>
                      {project.featured ? "Sim" : "Não"}
                    </Badge>
                  </td>
                  <td className="px-4 py-4 text-text-secondary">{project.sort_order}</td>
                  <td className="px-4 py-4">
                    <div className="flex justify-end gap-2">
                      <Link
                        href={`/admin/projects/${project.id}/edit`}
                        className="inline-flex h-9 items-center gap-2 rounded-lg border border-border bg-bg-secondary px-3 text-sm font-semibold text-text-primary transition hover:border-accent/60"
                      >
                        <Edit size={15} />
                        Editar
                      </Link>
                      <DeleteProjectButton projectId={project.id} />
                    </div>
                  </td>
                </tr>
              ))}

              {projects?.length === 0 && (
                <tr>
                  <td className="px-4 py-10 text-center text-text-secondary" colSpan={5}>
                    Nenhum projeto cadastrado.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
