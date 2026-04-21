"use client";

import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { Check } from "lucide-react";
import type { ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/utils";

export const Checkbox = ({
  className,
  ...props
}: ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>) => (
  <CheckboxPrimitive.Root
    className={cn(
      "peer flex h-4 w-4 shrink-0 items-center justify-center rounded border border-border bg-bg-secondary outline-none transition focus-visible:border-accent disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:border-accent data-[state=checked]:bg-accent",
      className,
    )}
    {...props}
  >
    <CheckboxPrimitive.Indicator>
      <Check className="h-3.5 w-3.5 text-white" />
    </CheckboxPrimitive.Indicator>
  </CheckboxPrimitive.Root>
);
