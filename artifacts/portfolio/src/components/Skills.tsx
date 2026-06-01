import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  SiReact, SiNextdotjs, SiNodedotjs, SiExpress, SiPython,
  SiJavascript, SiTypescript, SiHtml5, SiCss, SiTailwindcss, SiBootstrap,
  SiMysql, SiPostgresql, SiMongodb, SiRedis, SiFirebase, SiSupabase,
  SiGit, SiGithub, SiDocker, SiPostman, SiLinux, SiJupyter,
  SiTensorflow, SiPytorch, SiScikitlearn, SiFlask, SiSpringboot,
} from "react-icons/si";
import { FaJava } from "react-icons/fa";
import { VscVscode } from "react-icons/vsc";
import type { IconType } from "react-icons";

interface Tech { name: string; Icon: IconType; color: string }

const ROWS: { label: string; items: Tech[] }[] = [
  {
    label: "Frontend",
    items: [
      { name: "React",        Icon: SiReact,       color: "#61DAFB" },
      { name: "Next.js",      Icon: SiNextdotjs,   color: "#ffffff" },
      { name: "JavaScript",   Icon: SiJavascript,  color: "#F7DF1E" },
      { name: "TypeScript",   Icon: SiTypescript,  color: "#3178C6" },
      { name: "HTML5",        Icon: SiHtml5,       color: "#E34F26" },
      { name: "CSS3",         Icon: SiCss,         color: "#1572B6" },
      { name: "Tailwind CSS", Icon: SiTailwindcss, color: "#06B6D4" },
      { name: "Bootstrap",    Icon: SiBootstrap,   color: "#7952B3" },
    ],
  },
  {
    label: "Backend",
    items: [
      { name: "Node.js",      Icon: SiNodedotjs,   color: "#339933" },
      { name: "Express.js",   Icon: SiExpress,     color: "#cccccc" },
      { name: "Python",       Icon: SiPython,      color: "#3776AB" },
      { name: "Flask",        Icon: SiFlask,       color: "#cccccc" },
      { name: "Spring Boot",  Icon: SiSpringboot,  color: "#6DB33F" },
      { name: "Java",         Icon: FaJava,        color: "#ED8B00" },
    ],
  },
  {
    label: "Databases",
    items: [
      { name: "MySQL",        Icon: SiMysql,       color: "#4479A1" },
      { name: "PostgreSQL",   Icon: SiPostgresql,  color: "#4169E1" },
      { name: "MongoDB",      Icon: SiMongodb,     color: "#47A248" },
      { name: "Redis",        Icon: SiRedis,       color: "#DC382D" },
      { name: "Firebase",     Icon: SiFirebase,    color: "#FFCA28" },
      { name: "Supabase",     Icon: SiSupabase,    color: "#3ECF8E" },
    ],
  },
  {
    label: "AI / ML",
    items: [
      { name: "TensorFlow",   Icon: SiTensorflow,  color: "#FF6F00" },
      { name: "PyTorch",      Icon: SiPytorch,     color: "#EE4C2C" },
      { name: "Scikit-learn", Icon: SiScikitlearn, color: "#F7931E" },
    ],
  },
  {
    label: "Tools",
    items: [
      { name: "Git",          Icon: SiGit,         color: "#F05032" },
      { name: "GitHub",       Icon: SiGithub,      color: "#ffffff" },
      { name: "VS Code",      Icon: VscVscode,     color: "#007ACC" },
      { name: "Docker",       Icon: SiDocker,      color: "#2496ED" },
      { name: "Postman",      Icon: SiPostman,     color: "#FF6C37" },
      { name: "Linux",        Icon: SiLinux,       color: "#FCC624" },
      { name: "Jupyter",      Icon: SiJupyter,     color: "#F37726" },
    ],
  },
];

/* ─── Badge ──────────────────────────────────────────────── */
function TechBadge({
  tech, delay, floatDelay, floatAmp,
}: {
  tech: Tech; delay: number; floatDelay: number; floatAmp: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px 0px" });

  return (
    /* Outer: entrance */
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.7, y: 22, rotate: -4 }}
      animate={inView ? { opacity: 1, scale: 1, y: 0, rotate: 0 } : {}}
      transition={{ duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Inner: continuous float */}
      <motion.div
        animate={{ y: [0, -floatAmp, 0, -floatAmp * 0.5, 0] }}
        transition={{
          duration: 3.5 + floatDelay * 0.4,
          repeat: Infinity,
          ease: "easeInOut",
          delay: floatDelay,
        }}
        whileHover={{ scale: 1.1, y: -5 }}
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          padding: "9px 18px",
          borderRadius: 999,
          border: `1px solid ${tech.color}35`,
          background: `${tech.color}0d`,
          cursor: "default",
          position: "relative",
          overflow: "hidden",
          transition: "border-color 0.25s, background 0.25s, box-shadow 0.25s",
          whiteSpace: "nowrap",
        }}
        onMouseEnter={(e) => {
          const el = e.currentTarget as HTMLDivElement;
          el.style.borderColor = `${tech.color}90`;
          el.style.background = `${tech.color}1c`;
          el.style.boxShadow = `0 0 28px ${tech.color}30, 0 0 8px ${tech.color}20, 0 6px 20px rgba(0,0,0,0.5)`;
        }}
        onMouseLeave={(e) => {
          const el = e.currentTarget as HTMLDivElement;
          el.style.borderColor = `${tech.color}35`;
          el.style.background = `${tech.color}0d`;
          el.style.boxShadow = "none";
        }}
      >
        {/* Shimmer sweep */}
        <motion.div
          style={{
            position: "absolute",
            inset: 0,
            background: `linear-gradient(105deg, transparent 30%, ${tech.color}20 50%, transparent 70%)`,
            backgroundSize: "200% 100%",
            pointerEvents: "none",
          }}
          animate={{ backgroundPositionX: ["200%", "-200%"] }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear", delay: floatDelay * 0.5 }}
        />

        {/* Pulse ring on badge (subtle, always on) */}
        <motion.div
          style={{
            position: "absolute",
            inset: -1,
            borderRadius: 999,
            border: `1px solid ${tech.color}`,
            pointerEvents: "none",
          }}
          animate={{ opacity: [0, 0.25, 0], scale: [1, 1.06, 1] }}
          transition={{ duration: 3 + floatDelay * 0.3, repeat: Infinity, delay: floatDelay * 0.7 }}
        />

        <tech.Icon size={15} color={tech.color} style={{ flexShrink: 0, position: "relative", zIndex: 1 }} />
        <span
          style={{
            fontSize: 13,
            fontWeight: 500,
            color: "rgba(255,255,255,0.82)",
            letterSpacing: "0.015em",
            position: "relative",
            zIndex: 1,
          }}
        >
          {tech.name}
        </span>
      </motion.div>
    </motion.div>
  );
}

/* ─── Orb ────────────────────────────────────────────────── */
function Orb({ x, y, size, color, delay }: { x: string; y: string; size: number; color: string; delay: number }) {
  return (
    <motion.div
      aria-hidden
      style={{
        position: "absolute", left: x, top: y,
        width: size, height: size, borderRadius: "50%",
        background: `radial-gradient(circle, ${color}18 0%, transparent 70%)`,
        filter: "blur(55px)", pointerEvents: "none",
      }}
      animate={{ scale: [1, 1.4, 0.9, 1.2, 1], opacity: [0.3, 0.7, 0.4, 0.65, 0.3] }}
      transition={{ duration: 7 + delay, repeat: Infinity, ease: "easeInOut", delay }}
    />
  );
}

/* ─── Main ───────────────────────────────────────────────── */
export function Skills() {
  const headingRef = useRef<HTMLDivElement>(null);
  const headingInView = useInView(headingRef, { once: true });

  return (
    <section
      id="skills"
      style={{ position: "relative", paddingTop: 128, paddingBottom: 128, overflow: "hidden" }}
    >
      <Orb x="5%"  y="10%" size={540} color="#61DAFB" delay={0}   />
      <Orb x="58%" y="3%"  size={440} color="#7952B3" delay={1.5} />
      <Orb x="32%" y="52%" size={480} color="#47A248" delay={2.8} />
      <Orb x="76%" y="48%" size={400} color="#3178C6" delay={3.5} />
      <Orb x="20%" y="80%" size={360} color="#FF6F00" delay={1.2} />

      {/* Dot grid */}
      <div
        aria-hidden
        style={{
          position: "absolute", inset: 0,
          backgroundImage: "radial-gradient(rgba(255,255,255,0.045) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
          pointerEvents: "none",
        }}
      />

      <div className="container mx-auto" style={{ maxWidth: 960, padding: "0 24px", position: "relative" }}>

        {/* Heading */}
        <motion.div
          ref={headingRef}
          initial={{ opacity: 0, y: 32 }}
          animate={headingInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          style={{ textAlign: "center", marginBottom: 72 }}
        >
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 14, marginBottom: 18 }}>
            <motion.div
              style={{ height: 1, background: "rgba(255,255,255,0.18)", flex: 1, maxWidth: 80 }}
              animate={{ opacity: [0.3, 0.8, 0.3], scaleX: [0.8, 1, 0.8] }}
              transition={{ duration: 3, repeat: Infinity }}
            />
            <motion.div
              style={{ width: 6, height: 6, borderRadius: "50%", background: "rgba(255,255,255,0.7)" }}
              animate={{ scale: [1, 1.8, 1], opacity: [0.5, 1, 0.5], boxShadow: ["0 0 0px transparent", "0 0 12px rgba(255,255,255,0.5)", "0 0 0px transparent"] }}
              transition={{ duration: 2.2, repeat: Infinity }}
            />
            <motion.div
              style={{ height: 1, background: "rgba(255,255,255,0.18)", flex: 1, maxWidth: 80 }}
              animate={{ opacity: [0.3, 0.8, 0.3], scaleX: [0.8, 1, 0.8] }}
              transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
            />
          </div>

          <motion.h2
            style={{ fontSize: "clamp(42px, 7vw, 96px)", fontWeight: 700, letterSpacing: "-0.04em", color: "#ffffff", lineHeight: 0.93 }}
            animate={{ textShadow: ["0 0 0px transparent", "0 0 40px rgba(255,255,255,0.08)", "0 0 0px transparent"] }}
            transition={{ duration: 4, repeat: Infinity }}
          >
            Skills
          </motion.h2>

          <motion.p
            style={{ fontFamily: "monospace", fontSize: 11, letterSpacing: "0.42em", textTransform: "uppercase", color: "rgba(255,255,255,0.28)", marginTop: 16 }}
            animate={{ opacity: [0.5, 0.9, 0.5] }}
            transition={{ duration: 3.5, repeat: Infinity }}
          >
            Technologies &amp; Tools
          </motion.p>
        </motion.div>

        {/* Category rows */}
        <div style={{ display: "flex", flexDirection: "column", gap: 38 }}>
          {ROWS.map((row, rowIdx) => (
            <div key={row.label}>
              <motion.p
                initial={{ opacity: 0, x: -14 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: rowIdx * 0.06 }}
                style={{
                  fontFamily: "monospace", fontSize: 10, letterSpacing: "0.38em",
                  textTransform: "uppercase", color: "rgba(255,255,255,0.22)",
                  marginBottom: 14, textAlign: "center",
                }}
              >
                {row.label}
              </motion.p>

              <div style={{ display: "flex", flexWrap: "wrap", gap: 10, justifyContent: "center" }}>
                {row.items.map((tech, itemIdx) => (
                  <TechBadge
                    key={tech.name}
                    tech={tech}
                    delay={rowIdx * 0.07 + itemIdx * 0.055}
                    floatDelay={itemIdx * 0.38 + rowIdx * 0.5}
                    floatAmp={3 + (itemIdx % 3)}
                  />
                ))}
              </div>

              {rowIdx < ROWS.length - 1 && (
                <motion.div
                  initial={{ scaleX: 0, opacity: 0 }}
                  whileInView={{ scaleX: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.75, delay: rowIdx * 0.07 + 0.25 }}
                  style={{
                    height: 1,
                    background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.07) 30%, rgba(255,255,255,0.07) 70%, transparent)",
                    marginTop: 28, transformOrigin: "center",
                  }}
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
