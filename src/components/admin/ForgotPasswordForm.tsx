"use client";

import type { FormEvent } from "react";
import { useState } from "react";
import Link from "next/link";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { authClient } from "@/lib/neon/auth-client";

export const ForgotPasswordForm = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [wasSent, setWasSent] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);

    try {
      const { error } = await authClient.requestPasswordReset({
        email,
        redirectTo: `${window.location.origin}/admin/reset-password`,
      });

      if (error) {
        throw error;
      }

      setWasSent(true);
      toast.success("Confira seu e-mail para definir uma nova senha.");
    } catch (error) {
      const message = error instanceof Error ? error.message : "Não foi possível enviar o e-mail.";
      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md">
      <form className="space-y-5" onSubmit={handleSubmit}>
        <div>
          <p className="font-syne text-2xl font-bold text-text-primary">Definir nova senha</p>
          <p className="mt-2 text-sm text-text-secondary">
            Informe o e-mail administrativo para receber um link seguro.
          </p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            value={email}
            autoComplete="email"
            required
            disabled={wasSent}
            onChange={(event) => setEmail(event.target.value)}
          />
        </div>

        <Button type="submit" className="w-full gap-2" disabled={isLoading || wasSent}>
          {isLoading && <Loader2 size={16} className="animate-spin" />}
          {wasSent ? "E-mail enviado" : "Enviar link"}
        </Button>

        <div className="text-center">
          <Link
            href="/admin/login"
            className="text-sm text-text-secondary underline-offset-4 transition-colors hover:text-text-primary hover:underline"
          >
            Voltar para o login
          </Link>
        </div>
      </form>
    </Card>
  );
};
