import Hero from "@/components/Hero";
import About from "@/components/About";
import Projects from "@/components/Projects";
import Process from "@/components/Process";
import Signature from "../components/Signature";
import Contact from "../components/Contact";

export default function Page() {
  return (
    <main>
      <Hero />
      <About />
      <Projects />
      <Process />
      <Signature />
      <Contact />
    </main>
  );
}
