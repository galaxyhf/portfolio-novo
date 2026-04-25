import { Loader2 } from "lucide-react";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";

export default function LoadingDashboard() {
  return (
    <div className="space-y-8 animate-pulse">
      <AdminPageHeader
        title="Dashboard"
        description="Carregando resumo do portfólio..."
      />
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {[...Array(4)].map((_, i) => (
          <div
            key={i}
            className="flex h-24 items-center justify-between rounded-xl border border-border bg-bg-card p-6"
          >
            <div className="space-y-2">
              <div className="h-4 w-24 rounded bg-bg-secondary"></div>
              <div className="h-6 w-12 rounded bg-bg-secondary"></div>
            </div>
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-bg-secondary">
              <Loader2 className="animate-spin text-text-secondary" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}