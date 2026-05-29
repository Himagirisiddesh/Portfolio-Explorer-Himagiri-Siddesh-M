import { motion } from "framer-motion";
import { Scene3D } from "./Scene3D";
const himagiriPhoto = "/himagiri.png";

export function Hero() {
  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center overflow-hidden"
    >
      {/* Animated background */}
      <Scene3D />

      {/* Subtle vignette */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/60 pointer-events-none z-[1]" />

      {/* Main two-column layout */}
      <div className="container mx-auto px-6 pt-24 pb-16 relative z-10 w-full">
        <div className="flex flex-col-reverse lg:flex-row items-center justify-between gap-12 lg:gap-20">

          {/* ── LEFT: text ── */}
          <div className="flex-1 max-w-2xl">
            {/* Hi, I am */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="text-white/50 font-mono text-sm tracking-[0.35em] uppercase mb-3"
            >
              Hi, I am
            </motion.p>

            {/* Name */}
            <motion.h1
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.45, ease: [0.25, 0.4, 0.25, 1] }}
              className="text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] font-light tracking-tighter text-white leading-[1.0] mb-6"
            >
              HIMAGIRI
              <br />
              <span
                style={{
                  background: "linear-gradient(135deg, rgba(255,255,255,0.55) 0%, rgba(255,255,255,0.25) 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                SIDDESH
              </span>
            </motion.h1>

            {/* Role badge */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.65 }}
              className="flex items-center gap-3 mb-6"
            >
              <div className="w-6 h-[1px] bg-white/40" />
              <span className="text-white/60 font-mono text-xs tracking-widest uppercase">
                MCA · AI/ML & Full Stack Developer
              </span>
            </motion.div>

            {/* Bio */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="text-white/50 font-light text-base md:text-lg leading-relaxed mb-10 max-w-lg"
            >
              High-performing MCA student (CGPA{" "}
              <span className="text-white/80 font-normal">9.39</span>) with deep expertise in AI/ML
              and Full Stack Development. Building intelligent systems — from CNN-based medical imaging
              to scalable web applications.
            </motion.p>

            {/* CTA row */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 1.0 }}
              className="flex flex-wrap gap-4 items-center"
            >
              <a
                href="mailto:himagirisiddesh@gmail.com"
                data-testid="button-contact"
                className="px-7 py-3.5 bg-white text-black font-mono text-xs uppercase tracking-widest hover:bg-white/90 active:bg-white/80 transition-all"
              >
                Get in Touch
              </a>
              <button
                onClick={() => scrollTo("projects")}
                data-testid="button-projects"
                className="px-7 py-3.5 border border-white/20 text-white/70 font-mono text-xs uppercase tracking-widest hover:border-white/50 hover:text-white transition-all"
              >
                See Work
              </button>
            </motion.div>

            {/* Stats row */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 1.3 }}
              className="flex gap-10 mt-12 pt-10 border-t border-white/8"
            >
              {[
                { value: "9.39", label: "CGPA" },
                { value: "2+", label: "Internships" },
                { value: "4+", label: "Projects" },
              ].map((stat) => (
                <div key={stat.label} className="flex flex-col gap-1">
                  <span className="text-2xl font-light text-white tracking-tight">{stat.value}</span>
                  <span className="text-white/30 font-mono text-[10px] tracking-widest uppercase">{stat.label}</span>
                </div>
              ))}
            </motion.div>
          </div>

          {/* ── RIGHT: photo ── */}
          <motion.div
            initial={{ opacity: 0, x: 40, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 1.0, delay: 0.5, ease: [0.25, 0.4, 0.25, 1] }}
            className="relative flex-shrink-0 flex items-end justify-center"
          >
            {/* Glow behind photo */}
            <motion.div
              className="absolute bottom-0 left-1/2 -translate-x-1/2 w-72 h-72 rounded-full pointer-events-none"
              style={{
                background: "radial-gradient(ellipse, rgba(99,102,241,0.18) 0%, rgba(109,40,217,0.10) 40%, transparent 70%)",
                filter: "blur(40px)",
              }}
              animate={{ scale: [1, 1.1, 1], opacity: [0.7, 1, 0.7] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            />

            {/* Second accent glow */}
            <motion.div
              className="absolute top-1/4 right-0 w-48 h-48 rounded-full pointer-events-none"
              style={{
                background: "radial-gradient(ellipse, rgba(6,182,212,0.12) 0%, transparent 70%)",
                filter: "blur(30px)",
              }}
              animate={{ scale: [1, 1.15, 1], opacity: [0.5, 0.9, 0.5] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            />

            {/* Photo */}
            <motion.div
              className="relative"
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            >
              <img
                src={himagiriPhoto}
                alt="Himagiri Siddesh"
                data-testid="img-profile"
                className="relative z-10 select-none"
                style={{
                  width: "clamp(240px, 28vw, 400px)",
                  height: "auto",
                  objectFit: "contain",
                  objectPosition: "bottom",
                  filter: "drop-shadow(0 24px 48px rgba(0,0,0,0.6)) drop-shadow(0 8px 16px rgba(99,102,241,0.25))",
                }}
                draggable={false}
              />
            </motion.div>

            {/* Decorative label card */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.4 }}
              className="absolute -bottom-2 -left-4 bg-white/5 backdrop-blur-sm border border-white/10 px-4 py-2.5"
            >
              <p className="text-white/70 font-mono text-[10px] tracking-widest uppercase">RNS Institute</p>
              <p className="text-white text-sm font-light mt-0.5">MCA · 2025–2027</p>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10"
      >
        <span className="text-white/20 text-[9px] uppercase font-mono tracking-widest">Scroll</span>
        <motion.div
          className="w-[1px] bg-gradient-to-b from-white/30 to-transparent"
          animate={{ height: ["28px", "44px", "28px"] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>
    </section>
  );
}
