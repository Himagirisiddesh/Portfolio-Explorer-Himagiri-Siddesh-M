import { motion } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Education } from "@/components/Education";
import { Skills } from "@/components/Skills";
import { Projects } from "@/components/Projects";
import { Experience } from "@/components/Experience";
import { Achievements } from "@/components/Achievements";
import { Certifications } from "@/components/Certifications";
import { Contact } from "@/components/Contact";

export default function Portfolio() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="bg-black min-h-screen text-white selection:bg-white selection:text-black"
    >
      <Navbar />
      <main>
        <Hero />
        <Education />
        <Skills />
        <Projects />
        <Experience />
        <Achievements />
        <Certifications />
        <Contact />
      </main>
    </motion.div>
  );
}
