import { Loader2 } from "lucide-react";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { Card } from "@/components/ui/card";

export default function LoadingProjects() {
  return (
    <div className="space-y-8 animate-pulse">
      <AdminPageHeader title="Projetos" description="Carregando projetos..." />

      <Card className="overflow-hidden p-0">
        <div className="overflow-x-auto">
          <table className="min-w-150 w-full text-left text-sm opacity-50">
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
              {[...Array(5)].map((_, i) => (
                <tr key={i} className="border-b border-border">
                  <td className="px-4 py-4 space-y-2">
                    <div className="h-4 w-48 rounded bg-bg-secondary"></div>
                    <div className="h-3 w-24 rounded bg-bg-secondary"></div>
                  </td>
                  <td className="px-4 py-4">
                    <div className="h-6 w-20 rounded bg-bg-secondary"></div>
                  </td>
                  <td className="px-4 py-4">
                    <div className="h-6 w-12 rounded bg-bg-secondary"></div>
                  </td>
                  <td className="px-4 py-4">
                    <div className="h-4 w-4 rounded bg-bg-secondary"></div>
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex justify-end gap-2">
                      <div className="h-9 w-20 rounded bg-bg-secondary"></div>
                      <div className="h-9 w-9 rounded bg-bg-secondary"></div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="flex w-full justify-center p-6 text-text-secondary">
            <Loader2 className="animate-spin text-text-secondary" />
          </div>
        </div>
      </Card>
    </div>
  );
}
