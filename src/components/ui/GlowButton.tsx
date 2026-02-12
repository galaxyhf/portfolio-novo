"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface GlowButtonProps {
  children: ReactNode;
  variant?: "primary" | "outline";
  href?: string;
  onClick?: () => void;
  icon?: ReactNode;
  className?: string;
  type?: "button" | "submit";
  disabled?: boolean;
}

export default function GlowButton({
  children,
  variant = "primary",
  href,
  onClick,
  icon,
  className = "",
  type = "button",
  disabled = false,
}: GlowButtonProps) {
  const baseStyles =
    "inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full font-medium text-sm transition-all duration-300 cursor-pointer";

  const variants = {
    primary:
      "bg-accent text-bg-primary hover:bg-accent-light shadow-lg hover:shadow-xl",
    outline:
      "border-2 border-text-secondary/30 text-text-primary hover:border-text-primary bg-transparent",
  };

  const content = (
    <>
      {icon && <span className="text-lg">{icon}</span>}
      {children}
    </>
  );

  if (href) {
    return (
      <motion.a
        href={href}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className={`${baseStyles} ${variants[variant]} ${className}`}
        target={href.startsWith("http") ? "_blank" : undefined}
        rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
      >
        {content}
      </motion.a>
    );
  }

  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`${baseStyles} ${variants[variant]} ${className} ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
    >
      {content}
    </motion.button>
  );
}
