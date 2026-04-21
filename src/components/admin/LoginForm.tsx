"use client";

import type { FormEvent } from "react";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createSupabaseBrowserClient } from "@/lib/supabase/browser";

export const LoginForm = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);

    try {
      const supabase = createSupabaseBrowserClient();
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        throw error;
      }

      toast.success("Login realizado.");
      router.push(searchParams.get("next") ?? "/admin/dashboard");
      router.refresh();
    } catch (error) {
      const message = error instanceof Error ? error.message : "Erro ao entrar.";
      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md">
      <form className="space-y-5" onSubmit={handleSubmit}>
        <div>
          <p className="font-syne text-2xl font-bold text-text-primary">Acessar painel</p>
          <p className="mt-2 text-sm text-text-secondary">Entre com sua conta Supabase.</p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            value={email}
            autoComplete="email"
            required
            onChange={(event) => setEmail(event.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="password">Senha</Label>
          <Input
            id="password"
            type="password"
            value={password}
            autoComplete="current-password"
            required
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>

        <Button type="submit" className="w-full gap-2" disabled={isLoading}>
          {isLoading && <Loader2 size={16} className="animate-spin" />}
          Entrar
        </Button>
      </form>
    </Card>
  );
};
