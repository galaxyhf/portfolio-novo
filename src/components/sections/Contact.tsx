"use client";

import { useState, FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Linkedin, Github, CheckCircle, Loader2 } from "lucide-react";
import SectionTitle from "@/components/ui/SectionTitle";
import GlowButton from "@/components/ui/GlowButton";
import { personalInfo } from "@/lib/data";

const contactLinks = [
  {
    icon: <Mail size={20} />,
    label: "Email",
    value: personalInfo.email,
    href: `mailto:${personalInfo.email}`,
  },
  {
    icon: <Linkedin size={20} />,
    label: "LinkedIn",
    value: "linkedin.com/in/caio-silva-472498266",
    href: personalInfo.linkedin,
  },
  {
    icon: <Github size={20} />,
    label: "GitHub",
    value: "github.com/galaxyhf",
    href: personalInfo.github,
  },
];

export default function Contact() {
  const [formState, setFormState] = useState<"idle" | "loading" | "success">(
    "idle",
  );
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setFormState("loading");
    // Simula envio
    setTimeout(() => {
      setFormState("success");
      setFormData({ name: "", email: "", subject: "", message: "" });
      setTimeout(() => setFormState("idle"), 3000);
    }, 1500);
  };

  const inputStyles =
    "w-full bg-bg-card/30 backdrop-blur-sm border border-border/50 rounded-xl px-4 py-3.5 text-text-primary text-sm placeholder-text-secondary/50 transition-all duration-300 focus:outline-none focus:border-accent focus:shadow-[0_0_20px_rgba(51,110,187,0.15)] focus:bg-bg-card/50";

  return (
    <section id="contact" className="py-24 md:py-32 relative">
      {/* Grid pattern sutil */}
      <div className="absolute inset-0 dot-grid opacity-30 pointer-events-none" />

      <div className="relative max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.6 }}
        >
          <SectionTitle number="04" label="contato" title="Contato" />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Coluna esquerda - Info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-text-secondary leading-relaxed mb-8 max-w-md">
              Estou sempre aberto a novas oportunidades e projetos
              interessantes. Se você tem uma ideia ou precisa de um
              desenvolvedor, entre em contato!
            </p>

            <div className="space-y-4">
              {contactLinks.map((link, i) => (
                <motion.div
                  key={link.label}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: false, amount: 0.3 }}
                  transition={{ delay: i * 0.08 }}
                >
                  {link.href ? (
                    <a
                      href={link.href}
                      target={
                        link.href.startsWith("http") ? "_blank" : undefined
                      }
                      rel={
                        link.href.startsWith("http")
                          ? "noopener noreferrer"
                          : undefined
                      }
                      className="flex items-center gap-4 p-5 rounded-2xl bg-bg-card/30 backdrop-blur-sm border border-border/50 hover:border-accent/50 hover:bg-bg-card/50 transition-all duration-300 group"
                    >
                      <div className="p-3 rounded-xl bg-accent/10 border border-accent/20 group-hover:bg-accent/20 group-hover:scale-110 transition-all">
                        <span className="text-accent">{link.icon}</span>
                      </div>
                      <div>
                        <p className="text-xs text-text-secondary mb-0.5">
                          {link.label}
                        </p>
                        <p className="text-sm text-text-primary font-medium">
                          {link.value}
                        </p>
                      </div>
                    </a>
                  ) : (
                    <div className="flex items-center gap-4 p-5 rounded-2xl bg-bg-card/30 backdrop-blur-sm border border-border/50">
                      <div className="p-3 rounded-xl bg-accent/10 border border-accent/20">
                        <span className="text-accent">{link.icon}</span>
                      </div>
                      <div>
                        <p className="text-xs text-text-secondary mb-0.5">
                          {link.label}
                        </p>
                        <p className="text-sm text-text-primary font-medium">
                          {link.value}
                        </p>
                      </div>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Coluna direita - Formulário */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.6 }}
          >
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm text-text-secondary mb-1.5"
                  >
                    Nome
                  </label>
                  <input
                    id="name"
                    type="text"
                    required
                    placeholder="Seu nome"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className={inputStyles}
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm text-text-secondary mb-1.5"
                  >
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    required
                    placeholder="seu@email.com"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className={inputStyles}
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="subject"
                  className="block text-sm text-text-secondary mb-1.5"
                >
                  Assunto
                </label>
                <input
                  id="subject"
                  type="text"
                  required
                  placeholder="Qual o assunto?"
                  value={formData.subject}
                  onChange={(e) =>
                    setFormData({ ...formData, subject: e.target.value })
                  }
                  className={inputStyles}
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-sm text-text-secondary mb-1.5"
                >
                  Mensagem
                </label>
                <textarea
                  id="message"
                  required
                  rows={5}
                  placeholder="Conte-me sobre seu projeto..."
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  className={`${inputStyles} resize-none`}
                />
              </div>

              <AnimatePresence mode="wait">
                {formState === "success" ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex items-center justify-center gap-2 py-3.5 px-8 rounded-full bg-green-500/10 border border-green-500/30 text-green-400 text-sm font-medium"
                  >
                    <CheckCircle size={18} />
                    Mensagem enviada com sucesso!
                  </motion.div>
                ) : (
                  <motion.div
                    key="button"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <GlowButton
                      type="submit"
                      variant="primary"
                      className="w-full"
                      disabled={formState === "loading"}
                      icon={
                        formState === "loading" ? (
                          <Loader2 size={18} className="animate-spin" />
                        ) : undefined
                      }
                    >
                      {formState === "loading"
                        ? "Enviando..."
                        : "Enviar Mensagem"}
                    </GlowButton>
                  </motion.div>
                )}
              </AnimatePresence>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
