"use client";

import { motion } from "framer-motion";

interface TagProps {
  children: React.ReactNode;
  icon?: React.ReactNode;
  className?: string;
}

export default function Tag({ children, icon, className = "" }: TagProps) {
  return (
    <motion.span
      whileHover={{
        borderColor: "#336EBB",
        boxShadow: "0 0 15px rgba(51,110,187,0.15)",
      }}
      className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-bg-card border border-border text-sm text-text-secondary transition-all duration-300 ${className}`}
    >
      {icon && <span className="text-accent text-base">{icon}</span>}
      {children}
    </motion.span>
  );
}
