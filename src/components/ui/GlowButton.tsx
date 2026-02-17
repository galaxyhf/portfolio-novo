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
    "relative inline-flex items-center justify-center px-8 py-3.5 rounded-full font-medium text-sm transition-all duration-300 cursor-pointer overflow-hidden group";

  const variants = {
    primary:
      "bg-accent text-bg-primary shadow-lg shadow-accent/40 hover:shadow-xl hover:shadow-accent/60 border border-accent/20",
    outline:
      "border-2 border-accent/40 text-accent hover:border-accent/80 bg-transparent hover:bg-accent/5 shadow-md shadow-accent/10 hover:shadow-lg hover:shadow-accent/20",
  };

  const content = (
    <span className={`flex items-center ${icon ? "gap-2" : ""}`}>
      {children}
      {icon && <span className="text-lg">{icon}</span>}
    </span>
  );

  const glowElement = (
    <motion.div
      className="absolute inset-0 bg-linear-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100"
      initial={{ x: "-100%" }}
      whileHover={{ x: "100%" }}
      transition={{ duration: 0.5 }}
    />
  );

  if (href) {
    return (
      <motion.a
        href={href}
        whileTap={{ scale: 0.95 }}
        className={`${baseStyles} ${variants[variant]} ${className}`}
        target={href.startsWith("http") ? "_blank" : undefined}
        rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
      >
        {glowElement}
        <span className="relative z-10">{content}</span>
      </motion.a>
    );
  }

  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled}
      whileTap={{ scale: 0.95 }}
      className={`${baseStyles} ${variants[variant]} ${className} ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
    >
      {glowElement}
      <span className="relative z-10">{content}</span>
    </motion.button>
  );
}
