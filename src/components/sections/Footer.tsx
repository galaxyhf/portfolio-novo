"use client";

import { motion } from "framer-motion";
import { SiGithub, SiLinkedin, SiInstagram } from "react-icons/si";
import { personalInfo } from "@/lib/data";
import { useLanguage } from "@/lib/LanguageContext";

export default function Footer() {
  const { t } = useLanguage();

  const socialLinks = [
    {
      icon: SiLinkedin,
      url: personalInfo.linkedin,
      label: "LinkedIn",
    },
    {
      icon: SiGithub,
      url: personalInfo.github,
      label: "GitHub",
    },
    {
      icon: SiInstagram,
      url: personalInfo.instagram,
      label: "Instagram",
    },
  ];

  const navigationItems = [
    { label: t("sobre"), href: "#about" },
    { label: t("projetos"), href: "#projects" },
    { label: t("habilidades"), href: "#habilidades" },
    { label: t("contato"), href: "#contact" },
  ];

  return (
    <footer className="relative py-6 px-4 sm:px-6 lg:px-8 bg-transparent">
      {/* Divider */}
      <div className="h-px bg-linear-to-r from-transparent via-accent/60 to-transparent mb-6" />
      <div className="max-w-7xl mx-auto">
        {/* Main Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          {/* Left - Personal Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h3 className="text-lg font-bold text-white mb-2">
              {personalInfo.name}
            </h3>
            <p className="text-sm text-gray-400 leading-relaxed">
              {t("descricaoFooter")}
            </p>
          </motion.div>

          {/* Center - Navigation */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <h3 className="text-xs font-bold text-white uppercase tracking-widest mb-4">
              {t("navegacao")}
            </h3>
            <ul className="space-y-2">
              {navigationItems.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    className="text-sm text-gray-400 hover:text-white transition-colors duration-200"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Right - Social Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h3 className="text-xs font-bold text-white uppercase tracking-widest mb-4">
              {t("social")}
            </h3>
            <div className="flex gap-4 mb-6">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <motion.a
                    key={social.label}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-white transition-colors duration-200"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    title={social.label}
                  >
                    <Icon className="w-5 h-5" />
                  </motion.a>
                );
              })}
            </div>

            {/* Copyright */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
              className="text-xs text-gray-500"
            >
              © {new Date().getFullYear()} {personalInfo.name}. {t("direitos")}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </footer>
  );
}
