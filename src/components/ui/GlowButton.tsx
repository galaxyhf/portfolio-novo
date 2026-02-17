"use client";

import { motion } from "framer-motion";
import { ReactNode, useState } from "react";

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
  const [isHovered, setIsHovered] = useState(false);

  const baseStyles =
    "relative inline-flex items-center justify-center px-8 py-3.5 rounded-full font-medium text-sm transition-all duration-300 cursor-pointer";

  const variants = {
    primary:
      "bg-accent text-bg-primary border border-accent/20",
    outline:
      "border-2 border-accent/40 text-white hover:text-accent bg-transparent transition-colors duration-300",
  };

  const content = (
    <span className={`flex items-center ${icon ? "gap-2" : ""}`}>
      {children}
      {icon && <span className="text-lg">{icon}</span>}
    </span>
  );

  const sharedProps = {
    onMouseEnter: () => setIsHovered(true),
    onMouseLeave: () => setIsHovered(false),
    onTouchStart: () => setIsHovered(true),
    onTouchEnd: () => setIsHovered(false),
  };

  if (href) {
    return (
      <motion.a
        href={href}
        whileTap={{ scale: 0.95 }}
        className={`${baseStyles} ${variants[variant]} ${className} group relative`}
        target={href.startsWith("http") ? "_blank" : undefined}
        rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
        {...sharedProps}
      >
        {variant === "primary" && (
          <motion.div
            className="absolute -inset-2 rounded-full bg-accent/50 blur-2xl opacity-0 -z-10"
            animate={{ opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.3 }}
          />
        )}
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
      className={`${baseStyles} ${variants[variant]} ${className} group relative ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
      {...sharedProps}
    >
      {variant === "primary" && (
        <motion.div
          className="absolute -inset-6 rounded-full bg-accent/50 blur-2xl opacity-0 -z-10"
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        />
      )}
      <span className="relative z-10">{content}</span>
    </motion.button>
  );
}