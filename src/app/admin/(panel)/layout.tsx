import type { ReactNode } from "react";
import { redirect } from "next/navigation";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

interface AdminPanelLayoutProps {
  children: ReactNode;
}

export default async function AdminPanelLayout({ children }: AdminPanelLayoutProps) {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/admin/login");
  }

  return (
    <div className="min-h-dvh bg-bg-primary text-text-primary md:flex">
      <AdminSidebar />
      <main className="w-full px-4 py-6 md:px-8 lg:px-10">{children}</main>
    </div>
  );
}
