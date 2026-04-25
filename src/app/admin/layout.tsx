import type { ReactNode } from "react";
import { Toaster } from "sonner";
import { AdminShortcutListener } from "@/components/admin/AdminShortcutListener";

interface AdminRootLayoutProps {
  children: ReactNode;
}

export default function AdminRootLayout({ children }: AdminRootLayoutProps) {
  return (
    <>
      <AdminShortcutListener />
      {children}
      <Toaster richColors position="top-right" theme="dark" />
    </>
  );
}
