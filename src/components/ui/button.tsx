import type { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "secondary" | "danger" | "ghost";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
}

const variants: Record<ButtonVariant, string> = {
  primary: "bg-accent text-white hover:bg-accent-light",
  secondary: "border border-border bg-bg-card text-text-primary hover:border-accent/60",
  danger: "bg-red-600 text-white hover:bg-red-500",
  ghost: "text-text-secondary hover:bg-bg-card hover:text-text-primary",
};

export const Button = ({
  className,
  variant = "primary",
  type = "button",
  ...props
}: ButtonProps) => (
  <button
    type={type}
    className={cn(
      "inline-flex h-10 items-center justify-center rounded-lg px-4 text-sm font-semibold transition disabled:pointer-events-none disabled:opacity-60",
      variants[variant],
      className,
    )}
    {...props}
  />
);
