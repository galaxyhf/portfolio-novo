"use client";

import { useEffect, useState, useCallback } from "react";
import { motion } from "framer-motion";

import GlowButton from "@/components/ui/GlowButton";
import { personalInfo } from "@/lib/data";

const roles = ["Desenvolvedor Web", "Frontend Developer"];

function useTypewriter(
  phrases: string[],
  typingSpeed = 80,
  deletingSpeed = 40,
  pauseTime = 2000,
) {
  const [text, setText] = useState("");
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  const tick = useCallback(() => {
    const currentPhrase = phrases[phraseIndex];

    if (!isDeleting) {
      setText(currentPhrase.substring(0, text.length + 1));
      if (text.length + 1 === currentPhrase.length) {
        setTimeout(() => setIsDeleting(true), pauseTime);
        return;
      }
    } else {
      setText(currentPhrase.substring(0, text.length - 1));
      if (text.length === 0) {
        setIsDeleting(false);
        setPhraseIndex((prev: number) => (prev + 1) % phrases.length);
        return;
      }
    }
  }, [text, phraseIndex, isDeleting, phrases, pauseTime]);

  useEffect(() => {
    const speed = isDeleting ? deletingSpeed : typingSpeed;
    const timer = setTimeout(tick, speed);
    return () => clearTimeout(timer);
  }, [tick, isDeleting, typingSpeed, deletingSpeed]);

  return text;
}

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.3 },
  },
};

const item = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" as const },
  },
};

export default function Hero() {
  const typedRole = useTypewriter(roles);

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-bg-primary"
    >
      {/* Conteúdo */}
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: false, amount: 0.3 }}
        className="relative z-10 max-w-5xl mx-auto px-6 text-center"
      >
        {/* Tag acima */}
        <motion.div variants={item} className="mb-4">
          <span className="text-text-secondary text-sm tracking-[0.2em] uppercase font-light">
            Olá, eu sou
          </span>
        </motion.div>

        {/* Nome */}
        <motion.h1
          variants={item}
          className="font-syne font-bold text-[clamp(4rem,12vw,9rem)] leading-[0.9] mb-6 text-text-primary tracking-tight"
        >
          {personalInfo.name}
        </motion.h1>

        {/* Subtítulo/Cargo com Typewriter */}
        <motion.div
          variants={item}
          className="font-syne font-semibold text-[clamp(1.75rem,4vw,3.5rem)] leading-tight mb-8 text-accent h-16 flex items-center justify-center"
        >
          {typedRole}
          <span className="typewriter-cursor" />
        </motion.div>

        {/* Descrição */}
        <motion.p
          variants={item}
          className="text-base md:text-lg text-text-secondary max-w-3xl mx-auto mb-12 leading-relaxed"
        >
          Construo sistemas web end-to-end com{" "}
          <span className="text-text-primary font-semibold">Next.js</span>,{" "}
          <span className="text-text-primary font-semibold">TypeScript</span> e{" "}
          <span className="text-text-primary font-semibold">React</span> — do
          conceito à entrega em produção.
        </motion.p>

        {/* Botões */}
        <motion.div
          variants={item}
          className="flex flex-col sm:flex-row items-center gap-5 justify-center mb-16"
        >
          <GlowButton
            variant="primary"
            href="#contact"
            className="min-w-50 text-base"
          >
            Contate-me
          </GlowButton>
          <GlowButton variant="outline" className="min-w-50 text-base">
            Baixar Currículo
          </GlowButton>
        </motion.div>
      </motion.div>
    </section>
  );
}
