"use client";

import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";
import SectionTitle from "@/components/ui/SectionTitle";
import { personalInfo, aboutText, aboutHighlights } from "@/lib/data";
import { useLanguage } from "@/lib/LanguageContext";
import Image from "next/image";

export default function About() {
  const { t } = useLanguage();

  return (
    <section id="about" className="py-24 md:py-32 bg-bg-secondary">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16 items-start">
          {/* Coluna esquerda - Texto (60%) */}
          <div className="lg:col-span-3">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{ duration: 0.6 }}
            >
              <SectionTitle
                number="01"
                label={t("sobre")}
                title={t("sobreTitle")}
              />
            </motion.div>

            <div className="space-y-4 mb-8">
              {aboutText.map((paragraph, i) => (
                <motion.p
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: false, amount: 0.3 }}
                  transition={{ delay: i * 0.1 }}
                  className="text-text-secondary leading-relaxed"
                >
                  {paragraph}
                </motion.p>
              ))}
            </div>

            {/* Highlights */}
            <motion.ul
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: false, amount: 0.3 }}
              className="space-y-3 mb-8"
            >
              {aboutHighlights.map((highlight, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: false, amount: 0.3 }}
                  transition={{ delay: 0.3 + i * 0.08 }}
                  className="flex items-center gap-3 text-text-secondary"
                >
                  <CheckCircle size={18} className="text-accent shrink-0" />
                  {highlight}
                </motion.li>
              ))}
            </motion.ul>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{ delay: 0.5 }}
            ></motion.div>
          </div>

          {/* Coluna direita - Visual (40%) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="lg:col-span-2"
          >
            <div className="bg-bg-card/30 border border-border/30 rounded-2xl p-8 flex flex-col items-center">
              {/* Foto */}
              <div className="relative mb-6">
                <Image
                  src="/Caio.jpg"
                  alt={`Foto de ${personalInfo.name}`}
                  width={320}
                  height={320}
                  className="w-70 h-70 rounded-2xl object-cover"
                />
              </div>

              {/* Tag com nome e cargo */}
              <div className="mt-2 text-center bg-bg-card border border-border/30 rounded-xl px-4 py-2 shadow-sm">
                <span className="font-syne font-semibold text-text-primary block">
                  Caio Silva
                </span>
                <span className="text-xs text-accent font-medium">
                  {t("desenvolvedor")}
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
