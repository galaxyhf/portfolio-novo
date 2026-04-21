import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { ProjectForm } from "@/components/admin/ProjectForm";

export default function NewProjectPage() {
  return (
    <div className="space-y-8">
      <AdminPageHeader title="Novo projeto" description="Cadastre um novo projeto no portfólio." />
      <ProjectForm />
    </div>
  );
}
