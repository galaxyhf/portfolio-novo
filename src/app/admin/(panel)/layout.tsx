import type { ReactNode } from "react";
import { notFound } from "next/navigation";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { requireAdminSession } from "@/lib/neon/auth";

export const dynamic = "force-dynamic";

interface AdminPanelLayoutProps {
  children: ReactNode;
}

export default async function AdminPanelLayout({ children }: AdminPanelLayoutProps) {
  try {
    await requireAdminSession();
  } catch {
    notFound();
  }

  return (
    <div className="min-h-dvh bg-bg-primary text-text-primary md:flex">
      <AdminSidebar />
      <main className="w-full px-4 py-6 md:px-8 lg:px-10">{children}</main>
    </div>
  );
}
