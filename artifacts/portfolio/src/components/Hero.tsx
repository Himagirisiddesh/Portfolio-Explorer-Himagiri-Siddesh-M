import { motion } from "framer-motion";
import { Scene3D } from "./Scene3D";

export function Hero() {
  return (
    <section id="hero" className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      <Scene3D />

      <div className="container mx-auto px-6 relative z-10 pointer-events-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.3, ease: [0.25, 0.4, 0.25, 1] }}
          className="max-w-3xl"
        >
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-white/45 font-mono text-xs tracking-widest uppercase mb-6"
          >
            MCA · AI/ML & Full Stack Developer
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.6 }}
            className="text-5xl md:text-7xl lg:text-8xl font-light tracking-tighter text-white mb-8"
          >
            HIMAGIRI
            <br />
            <span className="text-white/35">SIDDESH</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="text-base md:text-lg text-white/55 font-light max-w-xl leading-relaxed mb-10"
          >
            High-performing MCA student (CGPA 9.39) with deep expertise in AI/ML and Full Stack Development.
            Building intelligent systems that solve real problems — from CNN-based medical imaging to scalable web applications.
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.0 }}
            className="flex gap-6"
          >
            <a
              href="mailto:himagirisiddesh@gmail.com"
              className="text-white/60 hover:text-white font-mono text-xs uppercase tracking-widest border-b border-white/20 hover:border-white/60 pb-0.5 transition-all"
            >
              Get in Touch
            </a>
            <button
              onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}
              className="text-white/40 hover:text-white/70 font-mono text-xs uppercase tracking-widest transition-colors"
            >
              See Work ↓
            </button>
          </motion.div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.6 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-white/25 text-[9px] uppercase font-mono tracking-widest">Scroll</span>
        <motion.div
          className="w-[1px] bg-gradient-to-b from-white/30 to-transparent"
          animate={{ height: ["32px", "48px", "32px"] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>
    </section>
  );
}
