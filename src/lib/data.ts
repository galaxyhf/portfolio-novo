import {
  SiReact,
  SiNextdotjs,
  SiTypescript,
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
} from "react-icons/si";
import { IconType } from "react-icons";

// ======= INFO PESSOAL =======
export const personalInfo = {
  name: "Caio Silva",
  initials: "CS",
  role: "Desenvolvedor Web",
  bio: "Construo interfaces que as pessoas amam.",
  email: "caiogsilva2005@gmail.com",
  github: "https://github.com/galaxyhf",
  linkedin: "https://linkedin.com/in/caio-silva-472498266",
};

// ======= FRASES TYPEWRITER =======
export const typewriterPhrases = [
  "Criando experiências digitais memoráveis.",
  "Código limpo, design impecável.",
  "Do conceito ao deploy.",
  "Performance e estética em harmonia.",
];

// ======= SOBRE =======
export const aboutText = [
  "Sou um desenvolvedor web apaixonado por criar experiências digitais que fazem a diferença. Minha jornada começou há alguns anos, quando descobri que código pode ser uma forma de arte — combinar lógica e criatividade para construir algo que as pessoas realmente usam e amam.",
  "Trabalho principalmente com o ecossistema React e TypeScript, criando interfaces modernas, acessíveis e performáticas. Gosto de entender o problema de ponta a ponta e entregar soluções que não são apenas bonitas, mas também escaláveis e bem arquitetadas.",
  "Quando não estou codando, você me encontra explorando novas tecnologias, contribuindo para projetos open source ou aprendendo sobre design e UX para expandir minha visão como desenvolvedor.",
];

export const aboutHighlights = [
  "Experiência com React, Next.js e TypeScript",
  "Foco em performance e acessibilidade",
  "Mentalidade de produto, não só de código",
  "Sempre aprendendo e evoluindo",
];

// ======= PROJETOS =======
export interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  tags: string[];
  category: "Frontend" | "Fullstack" | "APIs";
  demoUrl: string;
  githubUrl: string;
}

export const projects: Project[] = [
  {
    id: 1,
    title: "E-Commerce Dashboard",
    description:
      "Dashboard administrativa completa para gerenciamento de e-commerce com gráficos interativos, gestão de produtos e análise de vendas em tempo real.",
    image: "https://picsum.photos/seed/project1/800/450",
    tags: ["Next.js", "TypeScript", "Prisma", "PostgreSQL"],
    category: "Fullstack",
    demoUrl: "#",
    githubUrl: "#",
  },
  {
    id: 2,
    title: "Weather App",
    description:
      "Aplicativo de clima moderno com geolocalização, previsão de 7 dias e animações dinâmicas que mudam de acordo com as condições meteorológicas.",
    image: "https://picsum.photos/seed/project2/800/450",
    tags: ["React", "Tailwind CSS", "API REST"],
    category: "Frontend",
    demoUrl: "#",
    githubUrl: "#",
  },
  {
    id: 3,
    title: "Task Manager API",
    description:
      "API RESTful robusta para gerenciamento de tarefas com autenticação JWT, CRUD completo, filtros avançados e documentação Swagger.",
    image: "https://picsum.photos/seed/project3/800/450",
    tags: ["Node.js", "Express", "PostgreSQL", "JWT"],
    category: "APIs",
    demoUrl: "#",
    githubUrl: "#",
  },
  {
    id: 4,
    title: "Social Media Feed",
    description:
      "Clone de feed de rede social com infinite scroll, sistema de likes, comentários em tempo real e upload de imagens.",
    image: "https://picsum.photos/seed/project4/800/450",
    tags: ["Next.js", "TypeScript", "Prisma", "WebSocket"],
    category: "Fullstack",
    demoUrl: "#",
    githubUrl: "#",
  },
  {
    id: 5,
    title: "Portfolio Template",
    description:
      "Template de portfólio moderno e responsivo com animações suaves, tema dark e componentes reutilizáveis.",
    image: "https://picsum.photos/seed/project5/800/450",
    tags: ["React", "Framer Motion", "Tailwind CSS"],
    category: "Frontend",
    demoUrl: "#",
    githubUrl: "#",
  },
  {
    id: 6,
    title: "GraphQL Blog API",
    description:
      "API GraphQL para blog com sistema de autores, categorias, comentários, busca full-text e cache inteligente.",
    image: "https://picsum.photos/seed/project6/800/450",
    tags: ["Node.js", "GraphQL", "Prisma", "Redis"],
    category: "APIs",
    demoUrl: "#",
    githubUrl: "#",
  },
];

// ======= SKILLS =======
export interface Skill {
  name: string;
  icon: IconType;
}

export const skillGroups: { title: string; skills: Skill[] }[] = [
  {
    title: "Frontend",
    skills: [
      { name: "React", icon: SiReact },
      { name: "Next.js", icon: SiNextdotjs },
      { name: "TypeScript", icon: SiTypescript },
      { name: "Tailwind CSS", icon: SiTailwindcss },
      { name: "HTML5", icon: SiHtml5 },
      { name: "CSS3", icon: SiCss3 },
    ],
  },
  {
    title: "Backend",
    skills: [
      { name: "Node.js", icon: SiNodedotjs },
      { name: "PostgreSQL", icon: SiPostgresql },
      { name: "MySQL", icon: SiMysql },
    ],
  },
  {
    title: "Ferramentas",
    skills: [
      { name: "GitHub", icon: SiGithub },
      { name: "Git", icon: SiGit },
      { name: "Docker", icon: SiDocker },
      { name: "Figma", icon: SiFigma },
    ],
  },
];

export const expertiseAreas = [
  { name: "Frontend", percentage: 80 },
  { name: "Backend", percentage: 50 },
  { name: "UI/UX", percentage: 75 },
];

// ======= NAV LINKS =======
export const navLinks = [
  { label: "Início", href: "#hero" },
  { label: "Sobre", href: "#about" },
  { label: "Projetos", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Contato", href: "#contact" },
];
