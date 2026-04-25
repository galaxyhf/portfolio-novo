import type { ReactNode } from "react";
import { AdminSidebar } from "@/components/admin/AdminSidebar";

export const dynamic = "force-dynamic";

interface AdminPanelLayoutProps {
  children: ReactNode;
}

export default function AdminPanelLayout({ children }: AdminPanelLayoutProps) {
  return (
    <div className="min-h-dvh bg-bg-primary text-text-primary md:flex">
      <AdminSidebar />
      <main className="w-full px-4 py-6 md:px-8 lg:px-10">{children}</main>
    </div>
  );
}
