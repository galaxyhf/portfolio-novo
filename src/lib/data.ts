import {
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiJavascript,
  SiTailwindcss,
  SiHtml5,
  SiCss3,
  SiNodedotjs,
  SiPostgresql,
  SiGit,
  SiDocker,
  SiFigma,
  SiGithub,
  SiMysql,
  SiSupabase,
  SiExpress,
  SiPython,
  SiVite,
  SiShadcnui,
} from "react-icons/si";
import { IconType } from "react-icons";

export const personalInfo = {
  name: "Caio Silva",
  initials: "CS",
  role: "Desenvolvedor Web",
  email: "caiogsilva2005@gmail.com",
  github: "https://github.com/galaxyhf",
  linkedin: "https://linkedin.com/in/caio-silva-472498266",
  instagram: "https://www.instagram.com/cai0_gs",
};

export const typewriterPhrases = [
  "Criando experiencias digitais memoraveis.",
  "Codigo limpo, design impecavel.",
  "Do conceito ao deploy.",
  "Performance e estetica em harmonia.",
];

export const aboutText = [
  "Sou um desenvolvedor web apaixonado por criar experiencias digitais que fazem a diferenca. Minha jornada comecou ha alguns anos, quando descobri que codigo pode ser uma forma de arte, combinando logica e criatividade para construir algo que as pessoas realmente usam e amam.",
  "Trabalho principalmente com o ecossistema React e TypeScript, criando interfaces modernas, acessiveis e performaticas. Gosto de entender o problema de ponta a ponta e entregar solucoes que nao sao apenas bonitas, mas tambem escalaveis e bem arquitetadas.",
  "Quando nao estou codando, voce me encontra explorando novas tecnologias, contribuindo para projetos open source ou aprendendo sobre design e UX para expandir minha visao como desenvolvedor.",
];

export const aboutHighlights = [
  "Experiencia com React, Next.js e TypeScript",
  "Foco em performance e acessibilidade",
  "Mentalidade de produto, nao so de codigo",
  "Sempre aprendendo e evoluindo",
];

export interface Habilidade {
  name: string;
  icon: IconType;
}

export const habilidadeGroups: { title: string; habilidades: Habilidade[] }[] = [
  {
    title: "Frontend",
    habilidades: [
      { name: "HTML5", icon: SiHtml5 },
      { name: "CSS3", icon: SiCss3 },
      { name: "React", icon: SiReact },
      { name: "Next.js", icon: SiNextdotjs },
      { name: "TypeScript", icon: SiTypescript },
      { name: "JavaScript", icon: SiJavascript },
      { name: "Tailwind CSS", icon: SiTailwindcss },
      { name: "Shadcn UI", icon: SiShadcnui },
    ],
  },
  {
    title: "Backend",
    habilidades: [
      { name: "Python", icon: SiPython },
      { name: "Node.js", icon: SiNodedotjs },
      { name: "Express", icon: SiExpress },
      { name: "PostgreSQL", icon: SiPostgresql },
      { name: "MySQL", icon: SiMysql },
      { name: "Supabase", icon: SiSupabase },
    ],
  },
  {
    title: "Ferramentas",
    habilidades: [
      { name: "GitHub", icon: SiGithub },
      { name: "Git", icon: SiGit },
      { name: "Vite", icon: SiVite },
      { name: "Docker", icon: SiDocker },
      { name: "Figma", icon: SiFigma },
    ],
  },
];

export const expertiseAreas = [
  { name: "Frontend", percentage: 90 },
  { name: "Backend", percentage: 65 },
  { name: "UI/UX", percentage: 75 },
];

export const navLinks = [
  { label: "Inicio", href: "#hero" },
  { label: "Sobre", href: "#about" },
  { label: "Projetos", href: "#projects" },
  { label: "Habilidades", href: "#habilidades" },
  { label: "Contato", href: "#contact" },
];
