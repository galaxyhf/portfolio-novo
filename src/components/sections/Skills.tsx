"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import SectionTitle from "@/components/ui/SectionTitle";
import { skillGroups, expertiseAreas } from "@/lib/data";
import { useLanguage } from "@/lib/LanguageContext";

function SkillTag({
  skill,
  index,
}: {
  skill: {
    name: string;
    icon: React.ComponentType<{ size?: number; className?: string }>;
  };
  index: number;
}) {
  const Icon = skill.icon;
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, amount: 0.3 }}
      whileHover={{
        borderColor: "#0EA5E9",
        y: -2,
      }}
      transition={{
        default: { delay: index * 0.05 },
        borderColor: { type: "spring", stiffness: 300, damping: 20 },
        y: { type: "spring", stiffness: 300, damping: 20 },
      }}
      className="inline-flex items-center gap-3 px-4 py-2.5 rounded-xl bg-bg-card/20 border border-border/30 cursor-default group"
    >
      <Icon
        size={18}
        className="text-accent group-hover:scale-110 transition-transform"
      />
      <span className="text-sm font-medium text-text-primary">
        {skill.name}
      </span>
    </motion.div>
  );
}

function ProgressBar({
  name,
  percentage,
}: {
  name: string;
  percentage: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: "-50px" });

  return (
    <div ref={ref} className="space-y-3">
      <div className="flex justify-between text-sm">
        <span className="text-text-primary font-semibold">{name}</span>
        <span className="text-accent font-medium">{percentage}%</span>
      </div>
      <div className="w-full h-2.5 bg-bg-card/30 rounded-full overflow-hidden border border-border/20">
        <motion.div
          initial={{ width: 0 }}
          animate={isInView ? { width: `${percentage}%` } : { width: 0 }}
          transition={{ duration: 1.2, ease: "easeOut", delay: 0.2 }}
          className="h-full bg-accent rounded-full"
        />
      </div>
    </div>
  );
}

export default function Skills() {
  const { t } = useLanguage();

  return (
    <section id="skills" className="py-24 md:py-32 bg-bg-secondary">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.6 }}
        >
          <SectionTitle
            number="03"
            label={t("skills")}
            title={t("skillsTitle")}
          />
        </motion.div>

        {/* Grupos de skills */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-16">
          {skillGroups.map((group, groupIndex) => (
            <motion.div
              key={group.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{ delay: groupIndex * 0.1 }}
            >
              <h3 className="font-syne text-xl font-bold text-text-primary mb-5">
                {group.title === "Frontend" ? t("frontendSkills") : group.title === "Backend" ? t("backendSkills") : t("ferramentasSkills")}
              </h3>
              <div className="flex flex-wrap gap-2.5">
                {group.skills.map((skill, i) => (
                  <SkillTag key={skill.name} skill={skill} index={i} />
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Barras de expertise */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="max-w-xl"
        >
          <h3 className="font-syne text-xl font-bold text-text-primary mb-6">
            {t("areasExpertise")}
          </h3>
          <div className="space-y-5">
            {expertiseAreas.map((area) => (
              <ProgressBar
                key={area.name}
                name={area.name}
                percentage={area.percentage}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
