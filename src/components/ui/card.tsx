import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export const Card = ({ className, ...props }: HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn("rounded-lg border border-border bg-bg-card p-5 shadow-xl shadow-black/10", className)}
    {...props}
  />
);
