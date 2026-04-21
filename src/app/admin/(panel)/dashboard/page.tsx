import { FolderKanban, Star, UploadCloud, FileText } from "lucide-react";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { StatCard } from "@/components/admin/StatCard";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  const supabase = await createSupabaseServerClient();

  const [
    { count: totalProjects },
    { count: publishedProjects },
    { count: draftProjects },
    { count: featuredProjects },
  ] = await Promise.all([
    supabase.from("projects").select("id", { count: "exact", head: true }),
    supabase.from("projects").select("id", { count: "exact", head: true }).eq("status", "published"),
    supabase.from("projects").select("id", { count: "exact", head: true }).eq("status", "draft"),
    supabase.from("projects").select("id", { count: "exact", head: true }).eq("featured", true),
  ]);

  return (
    <div className="space-y-8">
      <AdminPageHeader
        title="Dashboard"
        description="Resumo dos projetos cadastrados no portfólio."
      />

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <StatCard title="Total de projetos" value={totalProjects ?? 0} icon={<FolderKanban />} />
        <StatCard title="Publicados" value={publishedProjects ?? 0} icon={<UploadCloud />} />
        <StatCard title="Rascunhos" value={draftProjects ?? 0} icon={<FileText />} />
        <StatCard title="Em destaque" value={featuredProjects ?? 0} icon={<Star />} />
      </div>
    </div>
  );
}
