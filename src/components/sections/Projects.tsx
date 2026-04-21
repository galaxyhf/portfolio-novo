"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ExternalLink, Github } from "lucide-react";
import SectionTitle from "@/components/ui/SectionTitle";
import { useLanguage } from "@/lib/LanguageContext";
import { createSupabaseBrowserClient } from "@/lib/supabase/browser";
import type { Project } from "@/lib/supabase/types";

const ProjectCard = ({ project }: { project: Project }) => {
  const { t } = useLanguage();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4 }}
      className="group flex flex-col overflow-hidden rounded-lg border border-border/30 bg-bg-card/20 transition-all duration-300 hover:border-accent/50"
    >
      <div className="relative aspect-video overflow-hidden bg-bg-secondary">
        <Image
          src={project.cover_image || "/vercel.svg"}
          alt={project.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-bg-card via-bg-card/40 to-transparent opacity-80" />

        <div className="absolute bottom-4 left-4 flex flex-wrap gap-2">
          {project.techs.slice(0, 4).map((tag) => (
            <span
              key={tag}
              className="rounded-lg border border-border/30 bg-bg-primary/90 px-3 py-1 text-xs font-medium text-text-primary backdrop-blur-sm"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      <div className="flex flex-1 flex-col p-6">
        <h3 className="mb-3 text-xl font-bold text-text-primary transition-colors group-hover:text-accent">
          {project.title}
        </h3>
        <p className="mb-5 flex-1 line-clamp-2 text-sm leading-relaxed text-text-secondary">
          {project.short_description}
        </p>

        <div className="flex items-center gap-4">
          {project.live_url && (
            <a
              href={project.live_url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-text-secondary transition-colors hover:text-accent"
            >
              <ExternalLink size={16} />
              {t("demo")}
            </a>
          )}
          {project.github_url && (
            <a
              href={project.github_url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-text-secondary transition-colors hover:text-accent"
            >
              <Github size={16} />
              {t("codigo")}
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default function Projects() {
  const { t } = useLanguage();
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadProjects = async () => {
      try {
        const supabase = createSupabaseBrowserClient();
        const { data, error } = await supabase
          .from("projects")
          .select("*")
          .eq("status", "published")
          .order("sort_order", { ascending: true })
          .order("created_at", { ascending: false });

        if (error) {
          throw error;
        }

        setProjects(data ?? []);
      } catch {
        setProjects([]);
      } finally {
        setIsLoading(false);
      }
    };

    loadProjects();
  }, []);

  return (
    <section id="projects" className="py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.6 }}
        >
          <SectionTitle number="02" label={t("projetos")} title={t("projetosSecao")} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: false, amount: 0.1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
        >
          {isLoading && (
            <div className="col-span-full rounded-lg border border-border/30 bg-bg-card/20 p-8 text-center text-text-secondary">
              {t("carregandoProjetos")}
            </div>
          )}

          {!isLoading &&
            projects.map((project) => <ProjectCard key={project.id} project={project} />)}

          {!isLoading && projects.length === 0 && (
            <div className="col-span-full rounded-lg border border-border/30 bg-bg-card/20 p-8 text-center text-text-secondary">
              {t("nenhumProjetoPublicado")}
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
