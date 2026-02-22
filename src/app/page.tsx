import Navbar from "@/components/Navbar/Navbar";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Projects from "@/components/sections/Projects";
import Habilidades from "@/components/sections/Habilidades";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/sections/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Projects />
        <Habilidades />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
