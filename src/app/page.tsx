import Navbar from "@/components/Navbar/Navbar";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Projects from "@/components/sections/Projects";
import Skills from "@/components/sections/Skills";
import Contact from "@/components/sections/Contact";
import { personalInfo } from "@/lib/data";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Projects />
        <Skills />
        <Contact />
      </main>

      {/* Footer */}
      <footer className="border-t border-border/50 py-10 bg-bg-secondary/30 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-text-secondary">
            © {new Date().getFullYear()}{" "}
            <span className="text-accent font-semibold">{personalInfo.name}</span>.
            Todos os direitos reservados.
          </p>
          <p className="text-sm text-text-secondary flex items-center gap-2">
            Desenvolvido com{" "}
            <span className="text-accent font-medium">Next.js</span>,{" "}
            <span className="text-accent font-medium">TypeScript</span> &{" "}
            <span className="text-accent font-medium">Tailwind</span>
          </p>
        </div>
      </footer>
    </>
  );
}
