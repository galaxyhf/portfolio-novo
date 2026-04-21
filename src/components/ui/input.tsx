import type { InputHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export const Input = ({ className, ...props }: InputHTMLAttributes<HTMLInputElement>) => (
  <input
    className={cn(
      "h-11 w-full rounded-lg border border-border bg-bg-secondary px-3 text-sm text-text-primary outline-none transition placeholder:text-text-secondary focus:border-accent",
      className,
    )}
    {...props}
  />
);
