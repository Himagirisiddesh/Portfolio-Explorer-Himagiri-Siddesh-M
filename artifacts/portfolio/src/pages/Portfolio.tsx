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
import { Scene3D } from "@/components/Scene3D";

export default function Portfolio() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="min-h-screen text-white selection:bg-white selection:text-black"
      style={{ background: "#050505" }}
    >
      {/* ── Global fixed background: ambient glows + grain ── */}
      <div
        aria-hidden
        style={{ position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none" }}
      >
        <Scene3D />
      </div>

      {/* ── Global grain texture ── */}
      <div
        aria-hidden
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 1,
          pointerEvents: "none",
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E")`,
          backgroundSize: "200px 200px",
          opacity: 0.028,
          mixBlendMode: "overlay",
        }}
      />

      {/* ── All content scrolls above the fixed background ── */}
      <div style={{ position: "relative", zIndex: 2 }}>
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
      </div>
    </motion.div>
  );
}
