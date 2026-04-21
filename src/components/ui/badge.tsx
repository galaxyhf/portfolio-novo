import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type BadgeVariant = "default" | "success" | "warning";

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
}

const variants: Record<BadgeVariant, string> = {
  default: "border-border bg-bg-secondary text-text-secondary",
  success: "border-emerald-500/30 bg-emerald-500/10 text-emerald-300",
  warning: "border-yellow-500/30 bg-yellow-500/10 text-yellow-300",
};

export const Badge = ({ className, variant = "default", ...props }: BadgeProps) => (
  <span
    className={cn(
      "inline-flex rounded-full border px-2.5 py-1 text-xs font-semibold",
      variants[variant],
      className,
    )}
    {...props}
  />
);
