"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { createSupabaseBrowserClient } from "@/lib/supabase/browser";

interface DeleteProjectButtonProps {
  projectId: string;
}

export const DeleteProjectButton = ({ projectId }: DeleteProjectButtonProps) => {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    const confirmed = window.confirm("Tem certeza que deseja excluir este projeto?");

    if (!confirmed) {
      return;
    }

    setIsDeleting(true);

    try {
      const supabase = createSupabaseBrowserClient();
      const { error } = await supabase.from("projects").delete().eq("id", projectId);

      if (error) {
        throw error;
      }

      toast.success("Projeto excluído.");
      router.refresh();
    } catch (error) {
      const message = error instanceof Error ? error.message : "Erro ao excluir projeto.";
      toast.error(message);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <Button
      variant="danger"
      className="h-9 gap-2 px-3"
      disabled={isDeleting}
      onClick={handleDelete}
    >
      {isDeleting ? <Loader2 size={15} className="animate-spin" /> : <Trash2 size={15} />}
      Excluir
    </Button>
  );
};
