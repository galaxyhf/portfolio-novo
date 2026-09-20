import { FolderKanban, Star, UploadCloud, FileText } from "lucide-react";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { StatCard } from "@/components/admin/StatCard";
import { getProjectStats } from "@/lib/projects";

export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  const stats = await getProjectStats();

  return (
    <div className="space-y-8">
      <AdminPageHeader
        title="Dashboard"
        description="Resumo dos projetos cadastrados no portfólio."
      />

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <StatCard title="Total de projetos" value={stats.total} icon={<FolderKanban />} />
        <StatCard title="Publicados" value={stats.published} icon={<UploadCloud />} />
        <StatCard title="Rascunhos" value={stats.draft} icon={<FileText />} />
        <StatCard title="Em destaque" value={stats.featured} icon={<Star />} />
      </div>
    </div>
  );
}
