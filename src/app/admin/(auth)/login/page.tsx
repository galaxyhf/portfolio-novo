import { Suspense } from "react";
import { LoginForm } from "@/components/admin/LoginForm";

export default function AdminLoginPage() {
  return (
    <main className="flex min-h-dvh items-center justify-center bg-bg-primary px-4 py-10">
      <Suspense>
        <LoginForm />
      </Suspense>
    </main>
  );
}
