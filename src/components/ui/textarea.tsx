import type { TextareaHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export const Textarea = ({
  className,
  ...props
}: TextareaHTMLAttributes<HTMLTextAreaElement>) => (
  <textarea
    className={cn(
      "min-h-32 w-full rounded-lg border border-border bg-bg-secondary px-3 py-3 text-sm text-text-primary outline-none transition placeholder:text-text-secondary focus:border-accent",
      className,
    )}
    {...props}
  />
);
