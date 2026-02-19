"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, Github } from "lucide-react";
import SectionTitle from "@/components/ui/SectionTitle";
import { projects, Project } from "@/lib/data";
import { useLanguage } from "@/lib/LanguageContext";

const categories = ["Todos", "Frontend", "Fullstack", "APIs"] as const;

function ProjectCard({ project }: { project: Project }) {
  const { t } = useLanguage();
  
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      whileHover={{ y: -4 }}
      className="group bg-bg-card/20 border border-border/30 rounded-xl overflow-hidden transition-all duration-300 hover:border-accent/50 flex flex-col"
    >
      {/* Imagem */}
      <div className="relative aspect-video overflow-hidden bg-bg-secondary">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-bg-card via-bg-card/40 to-transparent opacity-80" />

        {/* Tags sobre a imagem */}
        <div className="absolute bottom-4 left-4 flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 rounded-lg bg-bg-primary/90 backdrop-blur-sm text-xs text-text-primary font-medium border border-border/30"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Conteúdo */}
      <div className="p-6 flex flex-col flex-1">
        <h3 className="font-[family-name:var(--font-syne)] text-xl font-bold text-text-primary mb-3 group-hover:text-accent transition-colors">
          {project.title}
        </h3>
        <p className="text-text-secondary text-sm leading-relaxed line-clamp-2 mb-5 flex-1">
          {project.description}
        </p>

        {/* Links */}
        <div className="flex items-center gap-4">
          <a
            href={project.demoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm text-text-secondary hover:text-accent transition-colors"
          >
            <ExternalLink size={16} />
            {t("demo")}
          </a>
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm text-text-secondary hover:text-accent transition-colors"
          >
            <Github size={16} />
            {t("codigo")}
          </a>
        </div>
      </div>
    </motion.div>
  );
}

export default function Projects() {
  const { t } = useLanguage();
  const [activeCategory, setActiveCategory] = useState<string>("Todos");

  const filteredProjects =
    activeCategory === "Todos"
      ? projects
      : projects.filter((p) => p.category === activeCategory);

  return (
    <section id="projects" className="py-24 md:py-32">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.6 }}
        >
          <SectionTitle number="02" label={t("projetos")} title={t("projetosSecao")} />
        </motion.div>

        {/* Filtros */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-wrap gap-2 mb-12"
        >
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`relative px-4 py-2 rounded-lg text-sm transition-all duration-300 cursor-pointer ${
                activeCategory === cat
                  ? "text-text-primary bg-bg-card border border-accent"
                  : "text-text-secondary bg-transparent border border-border hover:border-text-secondary"
              }`}
            >
              {cat === "Todos" ? t("todos") : cat}
              {activeCategory === cat && (
                <motion.span
                  layoutId="project-filter"
                  className="absolute inset-0 rounded-lg border border-accent"
                  transition={{ type: "spring", stiffness: 350, damping: 30 }}
                />
              )}
            </button>
          ))}
        </motion.div>

        {/* Grid de projetos */}
        <motion.div
          layout
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: false, amount: 0.1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
