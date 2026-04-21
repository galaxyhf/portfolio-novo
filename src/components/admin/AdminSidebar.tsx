"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { FolderKanban, LayoutDashboard, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { createSupabaseBrowserClient } from "@/lib/supabase/browser";
import { cn } from "@/lib/utils";

const links = [
  {
    href: "/admin/dashboard",
    label: "Dashboard",
    icon: LayoutDashboard,
  },
  {
    href: "/admin/projects",
    label: "Projetos",
    icon: FolderKanban,
  },
];

export const AdminSidebar = () => {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    const supabase = createSupabaseBrowserClient();
    await supabase.auth.signOut();
    router.push("/admin/login");
    router.refresh();
  };

  return (
    <aside className="sticky top-0 flex h-dvh w-full flex-col border-r border-border bg-bg-secondary/90 px-4 py-5 md:w-64">
      <div className="mb-8">
        <p className="font-syne text-xl font-bold text-text-primary">CS Admin</p>
        <p className="mt-1 text-xs text-text-secondary">Gerenciamento do portfólio</p>
      </div>

      <nav className="flex flex-1 flex-col gap-2">
        {links.map((link) => {
          const Icon = link.icon;
          const isActive = pathname.startsWith(link.href);

          return (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition",
                isActive
                  ? "bg-accent text-white"
                  : "text-text-secondary hover:bg-bg-card hover:text-text-primary",
              )}
            >
              <Icon size={18} />
              {link.label}
            </Link>
          );
        })}
      </nav>

      <Button variant="ghost" className="justify-start gap-3 px-3" onClick={handleLogout}>
        <LogOut size={18} />
        Sair
      </Button>
    </aside>
  );
};
