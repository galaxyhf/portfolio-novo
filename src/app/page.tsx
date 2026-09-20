import Navbar from "@/components/Navbar/Navbar";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Projects from "@/components/sections/Projects";
import Habilidades from "@/components/sections/Habilidades";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/sections/Footer";
import { getPublishedProjects } from "@/lib/projects";

export const dynamic = "force-dynamic";

export default async function Home() {
  const projects = await getPublishedProjects();

  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Projects projects={projects} />
        <Habilidades />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
