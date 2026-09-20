"use client";

import type { FormEvent } from "react";
import { useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { authClient } from "@/lib/neon/auth-client";

export const ResetPasswordForm = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const hasInvalidToken = !token || searchParams.has("error");
  const [password, setPassword] = useState("");
  const [confirmation, setConfirmation] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (password !== confirmation) {
      toast.error("As senhas não coincidem.");
      return;
    }

    setIsLoading(true);

    try {
      const { error } = await authClient.resetPassword({
        newPassword: password,
        token: token ?? undefined,
      });

      if (error) {
        throw error;
      }

      toast.success("Senha definida. Agora você já pode entrar.");
      router.replace("/admin/login");
    } catch (error) {
      const message = error instanceof Error ? error.message : "Não foi possível definir a senha.";
      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md">
      {hasInvalidToken ? (
        <div className="space-y-5">
          <div>
            <p className="font-syne text-2xl font-bold text-text-primary">Link inválido ou expirado</p>
            <p className="mt-2 text-sm text-text-secondary">Solicite um novo link para definir sua senha.</p>
          </div>
          <Link
            href="/admin/forgot-password"
            className="inline-flex h-10 w-full items-center justify-center rounded-lg bg-accent px-4 text-sm font-semibold text-white transition hover:bg-accent-light"
          >
            Solicitar novo link
          </Link>
        </div>
      ) : (
        <form className="space-y-5" onSubmit={handleSubmit}>
          <div>
            <p className="font-syne text-2xl font-bold text-text-primary">Criar nova senha</p>
            <p className="mt-2 text-sm text-text-secondary">Use pelo menos 8 caracteres.</p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Nova senha</Label>
            <Input
              id="password"
              type="password"
              value={password}
              autoComplete="new-password"
              required
              minLength={8}
              onChange={(event) => setPassword(event.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirmation">Confirmar senha</Label>
            <Input
              id="confirmation"
              type="password"
              value={confirmation}
              autoComplete="new-password"
              required
              minLength={8}
              onChange={(event) => setConfirmation(event.target.value)}
            />
          </div>

          <Button type="submit" className="w-full gap-2" disabled={isLoading}>
            {isLoading && <Loader2 size={16} className="animate-spin" />}
            Salvar nova senha
          </Button>
        </form>
      )}
    </Card>
  );
};
