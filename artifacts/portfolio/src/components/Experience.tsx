import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useSpring, useInView } from "framer-motion";
import { SiTensorflow } from "react-icons/si";
import { FaCode, FaLaptopCode } from "react-icons/fa";
import type { IconType } from "react-icons";

/* ─── Data ───────────────────────────────────────────────── */
interface Exp {
  num: string;
  side: "left" | "right";
  title: string;
  company: string;
  badge: string;
  badgeColor: string;
  period: string;
  location?: string;
  bullets: string[];
  tech: { name: string; color: string }[];
  Icon: IconType;
  iconColor: string;
}

const EXPERIENCES: Exp[] = [
  {
    num: "01", side: "left",
    title: "AI/ML Intern",
    company: "ADVI Group",
    badge: "Remote", badgeColor: "#3178C6",
    period: "Nov 2024 – Feb 2025",
    Icon: SiTensorflow, iconColor: "#FF6F00",
    bullets: [
      "Built and evaluated ML models including Random Forest Regressor achieving RMSE of 1.2 for vehicle speed prediction.",
      "Automated data preprocessing pipelines with Pandas & NumPy, reducing cleanup time by 25%.",
      "Applied supervised and unsupervised learning — Decision Trees, Random Forests, Clustering.",
      "Worked with TensorFlow, PyTorch, Scikit-learn, and CNNs for deep learning tasks.",
    ],
    tech: [
      { name: "Python",       color: "#3776AB" },
      { name: "TensorFlow",   color: "#FF6F00" },
      { name: "PyTorch",      color: "#EE4C2C" },
      { name: "Scikit-learn", color: "#F7931E" },
      { name: "Pandas",       color: "#4DABCF" },
      { name: "NumPy",        color: "#4DABCF" },
      { name: "CNN",          color: "#999" },
    ],
  },
  {
    num: "02", side: "right",
    title: "Full Stack Developer Intern",
    company: "Adversity Solutions",
    badge: "Online", badgeColor: "#47A248",
    period: "Dec 2025 – Mar 2026",
    Icon: FaCode, iconColor: "#61DAFB",
    bullets: [
      "Developed real-world web applications using modern technologies in a production environment.",
      "Led the frontend team and managed the full UI development lifecycle.",
      "Built responsive interfaces and ensured seamless API integration across all features.",
      "Collaborated using Git, GitHub and followed best coding practices.",
      "Implemented reusable UI components with Tailwind CSS.",
    ],
    tech: [
      { name: "React",        color: "#61DAFB" },
      { name: "JavaScript",   color: "#F7DF1E" },
      { name: "REST APIs",    color: "#999" },
      { name: "Tailwind CSS", color: "#06B6D4" },
      { name: "CSS3",         color: "#1572B6" },
      { name: "Git",          color: "#F05032" },
      { name: "GitHub",       color: "#ccc" },
    ],
  },
  {
    num: "03", side: "left",
    title: "Software Developer Intern",
    company: "Nxtfrontier Technologies",
    badge: "Current", badgeColor: "#3ECF8E",
    period: "Apr 2026 – Present",
    location: "Bangalore",
    Icon: FaLaptopCode, iconColor: "#06B6D4",
    bullets: [
      "Working on the Orbitt System — a B2B Contract & Escrow Management Platform.",
      "Developing responsive frontend interfaces using Next.js and TypeScript.",
      "Connecting frontend with Spring Boot backend via secure REST APIs.",
      "Building dashboard modules, contract workflows, and milestone features.",
      "Working with Docker, Git, GitHub Actions and CI/CD pipelines.",
      "Supporting AWS deployment workflows and production environments.",
    ],
    tech: [
      { name: "Next.js",        color: "#ccc" },
      { name: "TypeScript",     color: "#3178C6" },
      { name: "Spring Boot",    color: "#6DB33F" },
      { name: "PostgreSQL",     color: "#4169E1" },
      { name: "Node.js",        color: "#339933" },
      { name: "Docker",         color: "#2496ED" },
      { name: "AWS",            color: "#FF9900" },
      { name: "Git",            color: "#F05032" },
      { name: "GitHub",         color: "#ccc" },
      { name: "GitHub Actions", color: "#2088FF" },
      { name: "Figma",          color: "#F24E1E" },
    ],
  },
];

/* ─── Experience card ────────────────────────────────────── */
function ExpCard({ exp, active, index }: { exp: Exp; active: boolean; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px 0px" });
  const isLeft = exp.side === "left";

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: isLeft ? -50 : 50, y: 16 }}
      animate={inView ? { opacity: 1, x: 0, y: 0 } : {}}
      transition={{ duration: 0.75, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      style={{
        position: "relative",
        borderRadius: 16,
        border: `1px solid ${active ? "rgba(255,255,255,0.16)" : "rgba(255,255,255,0.07)"}`,
        background: active ? "rgba(255,255,255,0.038)" : "rgba(255,255,255,0.018)",
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        padding: "22px 24px",
        transition: "border-color 0.55s, background 0.55s, box-shadow 0.55s",
        boxShadow: active
          ? `0 0 50px rgba(0,0,0,0.25), 0 0 1px ${exp.iconColor}20`
          : "0 4px 20px rgba(0,0,0,0.15)",
        overflow: "hidden",
      }}
    >
      {/* Top-edge accent line */}
      <div
        style={{
          position: "absolute", top: 0, left: "10%", right: "10%", height: 1,
          background: active
            ? `linear-gradient(90deg, transparent, ${exp.iconColor}55, transparent)`
            : "transparent",
          transition: "background 0.6s",
        }}
      />

      {/* Inner radial glow */}
      {active && (
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.7 }}
          style={{
            position: "absolute", inset: 0, borderRadius: 16, pointerEvents: "none",
            background: `radial-gradient(ellipse at ${isLeft ? "90% 0%" : "10% 0%"}, ${exp.iconColor}09 0%, transparent 55%)`,
          }}
        />
      )}

      {/* Header */}
      <div style={{ display: "flex", gap: 14, alignItems: "flex-start", marginBottom: 14, position: "relative" }}>
        {/* Icon box */}
        <motion.div
          animate={active
            ? { boxShadow: [`0 0 0px ${exp.iconColor}00`, `0 0 18px ${exp.iconColor}50`, `0 0 0px ${exp.iconColor}00`] }
            : {}}
          transition={{ duration: 2.5, repeat: Infinity }}
          style={{
            flexShrink: 0, width: 44, height: 44, borderRadius: 10,
            border: `1px solid ${exp.iconColor}40`,
            background: `${exp.iconColor}12`,
            display: "flex", alignItems: "center", justifyContent: "center",
          }}
        >
          <exp.Icon size={20} color={exp.iconColor} />
        </motion.div>

        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap", marginBottom: 4 }}>
            <h3 style={{ fontSize: "clamp(14px, 1.8vw, 17px)", fontWeight: 600, color: "rgba(255,255,255,0.92)", letterSpacing: "-0.01em", lineHeight: 1.2 }}>
              {exp.title}
            </h3>
            <motion.span
              animate={exp.badge === "Current" ? { opacity: [0.6, 1, 0.6] } : {}}
              transition={{ duration: 2.2, repeat: Infinity }}
              style={{
                fontFamily: "monospace", fontSize: 9, letterSpacing: "0.22em",
                textTransform: "uppercase", padding: "2px 8px", borderRadius: 99,
                border: `1px solid ${exp.badgeColor}55`, color: exp.badgeColor,
                background: `${exp.badgeColor}15`, whiteSpace: "nowrap",
              }}
            >
              {exp.badge}
            </motion.span>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
            <span style={{ fontSize: 13, color: "rgba(255,255,255,0.5)", fontWeight: 500 }}>{exp.company}</span>
            <span style={{ fontFamily: "monospace", fontSize: 11, color: "rgba(255,255,255,0.22)", letterSpacing: "0.04em" }}>{exp.period}</span>
            {exp.location && (
              <span style={{ fontFamily: "monospace", fontSize: 10, color: "rgba(255,255,255,0.18)" }}>
                {exp.location}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Divider */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={inView ? { scaleX: 1 } : {}}
        transition={{ duration: 0.65, delay: index * 0.08 + 0.3 }}
        style={{ height: 1, background: "rgba(255,255,255,0.07)", marginBottom: 14, transformOrigin: "left" }}
      />

      {/* Bullets */}
      <ul style={{ display: "flex", flexDirection: "column", gap: 7, marginBottom: 18 }}>
        {exp.bullets.map((b, i) => (
          <motion.li
            key={i}
            initial={{ opacity: 0, x: -8 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.4, delay: index * 0.08 + 0.4 + i * 0.065 }}
            style={{ display: "flex", gap: 9, fontSize: 12.5, color: "rgba(255,255,255,0.48)", lineHeight: 1.6 }}
          >
            <span style={{ color: exp.iconColor, opacity: 0.75, marginTop: 4, flexShrink: 0, fontSize: 7 }}>◆</span>
            {b}
          </motion.li>
        ))}
      </ul>

      {/* Tech tags */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
        {exp.tech.map((t, i) => (
          <motion.span
            key={t.name}
            initial={{ opacity: 0, scale: 0.82 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.32, delay: index * 0.08 + 0.52 + i * 0.038 }}
            whileHover={{ scale: 1.1, y: -2 }}
            style={{
              fontSize: 10.5, fontFamily: "monospace", letterSpacing: "0.04em",
              color: "rgba(255,255,255,0.5)",
              border: `1px solid ${t.color}35`,
              background: `${t.color}0d`,
              padding: "3px 9px", borderRadius: 999,
              transition: "border-color 0.2s, color 0.2s",
              cursor: "default",
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget as HTMLSpanElement;
              el.style.borderColor = `${t.color}80`;
              el.style.color = "rgba(255,255,255,0.85)";
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget as HTMLSpanElement;
              el.style.borderColor = `${t.color}35`;
              el.style.color = "rgba(255,255,255,0.5)";
            }}
          >
            {t.name}
          </motion.span>
        ))}
      </div>
    </motion.div>
  );
}

/* ─── Floating particle dot ──────────────────────────────── */
function Particle({ x, y, delay }: { x: number; y: number; delay: number }) {
  return (
    <motion.div
      aria-hidden
      style={{
        position: "absolute", left: `${x}%`, top: `${y}%`,
        width: 2, height: 2, borderRadius: "50%",
        background: "rgba(255,255,255,0.25)", pointerEvents: "none",
      }}
      animate={{ y: [0, -28, 0], opacity: [0, 0.55, 0] }}
      transition={{ duration: 4 + delay * 0.5, repeat: Infinity, ease: "easeInOut", delay: delay * 0.65 }}
    />
  );
}

/* ─── Main component ─────────────────────────────────────── */
export function Experience() {
  const sectionRef   = useRef<HTMLElement>(null);
  const timelineRef  = useRef<HTMLDivElement>(null);
  const rowRefs      = useRef<(HTMLDivElement | null)[]>([]);

  const [milestoneYs, setMilestoneYs] = useState<number[]>([]);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [dotY, setDotY]               = useState(0);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 80%", "end 15%"],
  });
  const smooth = useSpring(scrollYProgress, { stiffness: 70, damping: 22, restDelta: 0.001 });

  /* Measure row midpoints relative to timeline container */
  useEffect(() => {
    const measure = () => {
      const container = timelineRef.current;
      if (!container) return;
      const cTop = container.getBoundingClientRect().top;
      const positions = rowRefs.current.map((ref) => {
        if (!ref) return 0;
        const r = ref.getBoundingClientRect();
        return r.top - cTop + r.height * 0.15;
      });
      setMilestoneYs(positions);
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  /* Drive dot position from scroll */
  useEffect(() => {
    return smooth.on("change", (p) => {
      const container = timelineRef.current;
      if (!container) return;
      const h = container.offsetHeight;
      const dy = Math.max(0, Math.min(h, p * h));
      setDotY(dy);
      let active = -1;
      for (let i = 0; i < milestoneYs.length; i++) {
        if (dy >= milestoneYs[i] - 12) active = i;
      }
      setActiveIndex(active);
    });
  }, [smooth, milestoneYs]);

  const headingRef    = useRef<HTMLDivElement>(null);
  const headingInView = useInView(headingRef, { once: true });

  const particles = Array.from({ length: 16 }, (_, i) => ({
    x: 3 + (i * 6.3) % 94,
    y: 4 + (i * 11.8) % 90,
    delay: i * 0.4,
  }));

  return (
    <section
      id="experience"
      ref={sectionRef}
      style={{ position: "relative", paddingTop: 128, paddingBottom: 128, overflow: "hidden" }}
    >
      {/* Floating particles */}
      {particles.map((p, i) => <Particle key={i} {...p} />)}

      {/* Fine dot grid */}
      <div
        aria-hidden
        style={{
          position: "absolute", inset: 0,
          backgroundImage: "radial-gradient(rgba(255,255,255,0.03) 1px, transparent 1px)",
          backgroundSize: "30px 30px", pointerEvents: "none",
        }}
      />

      {/* Radial glow at center */}
      <div
        aria-hidden
        style={{
          position: "absolute", inset: 0, pointerEvents: "none",
          background: "radial-gradient(ellipse 70% 50% at 50% 45%, rgba(97,218,251,0.028) 0%, transparent 70%)",
        }}
      />

      <div className="container mx-auto" style={{ maxWidth: 1020, padding: "0 24px", position: "relative" }}>

        {/* ── Heading ── */}
        <motion.div
          ref={headingRef}
          initial={{ opacity: 0, y: 32 }}
          animate={headingInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          style={{ textAlign: "center", marginBottom: 80 }}
        >
          <h2 style={{ fontSize: "clamp(42px, 8vw, 96px)", fontWeight: 700, letterSpacing: "-0.04em", color: "#ffffff", lineHeight: 0.9 }}>
            Experience
          </h2>
          <p style={{
            fontFamily: "monospace", fontSize: 11, letterSpacing: "0.38em",
            textTransform: "uppercase", color: "rgba(255,255,255,0.25)", marginTop: 18,
          }}>
            My Journey Through Internships and Professional Work
          </p>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={headingInView ? { scaleX: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            style={{ width: 48, height: 1, background: "rgba(255,255,255,0.2)", margin: "16px auto 0", transformOrigin: "left" }}
          />
        </motion.div>

        {/* ── Timeline container ── */}
        <div ref={timelineRef} style={{ position: "relative" }}>

          {/* Vertical line */}
          <motion.div
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.6, ease: [0.25, 0.4, 0.25, 1] }}
            style={{
              position: "absolute", left: "50%", top: 0, bottom: 0, width: 1,
              background: "linear-gradient(to bottom, transparent 0%, rgba(255,255,255,0.14) 8%, rgba(255,255,255,0.12) 92%, transparent 100%)",
              transformOrigin: "top",
            }}
          />

          {/* Moving dot (scroll-driven) */}
          <div
            style={{
              position: "absolute",
              left: "calc(50% - 9px)",
              top: dotY - 9,
              width: 18, height: 18,
              borderRadius: "50%",
              background: "rgba(255,255,255,0.92)",
              boxShadow: "0 0 0 3px rgba(255,255,255,0.18), 0 0 20px rgba(255,255,255,0.45), 0 0 48px rgba(255,255,255,0.12)",
              zIndex: 10,
              pointerEvents: "none",
            }}
          >
            <motion.div
              style={{ position: "absolute", inset: -5, borderRadius: "50%", border: "1px solid rgba(255,255,255,0.4)" }}
              animate={{ scale: [1, 1.6, 1], opacity: [0.5, 0, 0.5] }}
              transition={{ duration: 1.4, repeat: Infinity }}
            />
          </div>

          {/* Experience rows */}
          <div style={{ display: "flex", flexDirection: "column", gap: 72 }}>
            {EXPERIENCES.map((exp, i) => {
              const isLeft = exp.side === "left";
              const active = i <= activeIndex;

              return (
                <div
                  key={exp.num}
                  ref={(el) => { rowRefs.current[i] = el; }}
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 80px 1fr",
                    alignItems: "start",
                  }}
                >
                  {/* Left slot */}
                  <div style={{ paddingRight: 36 }}>
                    {isLeft && <ExpCard exp={exp} active={active} index={i} />}
                  </div>

                  {/* Center: milestone dot + number */}
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "center", paddingTop: 22, gap: 8 }}>
                    <motion.div
                      animate={active ? {
                        boxShadow: [`0 0 0px ${exp.iconColor}00`, `0 0 18px ${exp.iconColor}70`, `0 0 0px ${exp.iconColor}00`],
                        scale: [1, 1.2, 1],
                      } : {}}
                      transition={{ duration: 2.2, repeat: Infinity }}
                      style={{
                        width: 12, height: 12, borderRadius: "50%",
                        border: `2px solid ${active ? "rgba(255,255,255,0.75)" : "rgba(255,255,255,0.18)"}`,
                        background: active ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.04)",
                        transition: "border-color 0.5s, background 0.5s",
                        flexShrink: 0, zIndex: 5,
                      }}
                    />
                    <motion.span
                      initial={{ opacity: 0, scale: 0.65 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: i * 0.12 }}
                      style={{
                        fontFamily: "monospace",
                        fontSize: 20,
                        fontWeight: 700,
                        letterSpacing: "0.04em",
                        lineHeight: 1,
                        color: active ? "rgba(255,255,255,0.8)" : "rgba(255,255,255,0.14)",
                        transition: "color 0.5s",
                      }}
                    >
                      {exp.num}
                    </motion.span>
                  </div>

                  {/* Right slot */}
                  <div style={{ paddingLeft: 36 }}>
                    {!isLeft && <ExpCard exp={exp} active={active} index={i} />}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
