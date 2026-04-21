import type { ReactNode } from "react";
import { Toaster } from "sonner";

interface AdminRootLayoutProps {
  children: ReactNode;
}

export default function AdminRootLayout({ children }: AdminRootLayoutProps) {
  return (
    <>
      {children}
      <Toaster richColors position="top-right" theme="dark" />
    </>
  );
}
