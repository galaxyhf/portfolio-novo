import { Suspense } from "react";
import { ResetPasswordForm } from "@/components/admin/ResetPasswordForm";

export default function ResetPasswordPage() {
  return (
    <main className="flex min-h-dvh items-center justify-center bg-bg-primary px-4 py-10">
      <Suspense>
        <ResetPasswordForm />
      </Suspense>
    </main>
  );
}
