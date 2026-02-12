"use client";

import { motion } from "framer-motion";

interface SectionTitleProps {
  number: string;
  label: string;
  title: string;
}

export default function SectionTitle({ title }: SectionTitleProps) {
  return (
    <div className="relative mb-16">

      {/* Título */}
      <motion.h2
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1 }}
        className="font-syne text-4xl md:text-5xl font-bold text-text-primary"
      >
        {title}
      </motion.h2>
    </div>
  );
}
