import { notFound } from "next/navigation";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { ProjectForm } from "@/components/admin/ProjectForm";
import { getProjectById } from "@/lib/projects";

export const dynamic = "force-dynamic";

interface EditProjectPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function EditProjectPage({ params }: EditProjectPageProps) {
  const { id } = await params;
  const project = await getProjectById(id);

  if (!project) {
    notFound();
  }

  return (
    <div className="space-y-8">
      <AdminPageHeader title="Editar projeto" description="Atualize as informações do projeto." />
      <ProjectForm project={project} />
    </div>
  );
}
