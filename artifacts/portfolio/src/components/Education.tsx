import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useInView,
  useSpring,
} from "framer-motion";

/* ─── Data ─────────────────────────────────────────────── */
const milestones = [
  {
    num: "01",
    year: "2025 – 2027",
    short: "MCA",
    degree: "Master of Computer Applications",
    institution: "RNS Institute of Technology, Bengaluru",
    score: "CGPA: 9.39",
    side: "right" as const,
    dotX: 620,
    dotY: 280,
    color: "#22d3ee",
  },
  {
    num: "02",
    year: "2022 – 2025",
    short: "BCA",
    degree: "Bachelor of Computer Applications",
    institution: "KLE Society's Degree College",
    score: "CGPA: 8.4",
    side: "left" as const,
    dotX: 380,
    dotY: 560,
    color: "#38bdf8",
  },
  {
    num: "03",
    year: "2020 – 2022",
    short: "PUC",
    degree: "Pre-University Course",
    institution: "",
    score: "87%",
    side: "right" as const,
    dotX: 620,
    dotY: 840,
    color: "#67e8f9",
  },
  {
    num: "04",
    year: "2019 – 2020",
    short: "SSLC",
    degree: "Secondary School Leaving Certificate",
    institution: "",
    score: "73.2%",
    side: "left" as const,
    dotX: 380,
    dotY: 1120,
    color: "#a5f3fc",
  },
];

/* SVG viewBox dimensions */
const VW = 1000;
const VH = 1400;

/* Winding S-curve path through all 4 dots */
const ROAD_PATH = `
  M 500 30
  C 500 80,  600 180, 620 280
  C 640 380, 540 450, 500 470
  C 460 490, 380 520, 380 560
  C 380 600, 460 700, 500 720
  C 540 740, 600 790, 620 840
  C 640 890, 560 960, 500 980
  C 440 1000, 380 1055, 380 1120
  C 380 1185, 500 1340, 500 1400
`.trim();

/* ─── Floating particle ─────────────────────────────────── */
function Particle({ x, y, delay }: { x: number; y: number; delay: number }) {
  return (
    <motion.div
      aria-hidden
      style={{
        position: "absolute",
        left: `${x}%`,
        top: `${y}%`,
        width: 2,
        height: 2,
        borderRadius: "50%",
        background: "rgba(34,211,238,0.55)",
        pointerEvents: "none",
      }}
      animate={{
        y: [0, -30, 0],
        opacity: [0.2, 0.8, 0.2],
        scale: [1, 1.5, 1],
      }}
      transition={{
        duration: 4 + delay,
        delay,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
  );
}

/* ─── Mobile card (hooks-safe, extracted from map) ──────── */
function MobileCard({ m, index }: { m: (typeof milestones)[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -30 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.1 }}
      style={{ paddingLeft: 48, position: "relative" }}
    >
      <div
        style={{
          position: "absolute",
          left: 14,
          top: 22,
          width: 12,
          height: 12,
          borderRadius: "50%",
          background: m.color,
          boxShadow: `0 0 12px ${m.color}`,
        }}
      />
      <div
        style={{
          background: "rgba(6,182,212,0.04)",
          border: "1px solid rgba(34,211,238,0.2)",
          borderRadius: 14,
          padding: "18px 20px",
          backdropFilter: "blur(12px)",
        }}
      >
        <div style={{ fontFamily: "monospace", fontSize: 10, color: m.color, opacity: 0.7, letterSpacing: "0.3em", marginBottom: 4 }}>{m.num}</div>
        <div style={{ fontSize: 26, fontWeight: 700, color: "#fff", letterSpacing: "-0.03em", marginBottom: 2 }}>{m.short}</div>
        <div style={{ fontFamily: "monospace", fontSize: 10, color: "rgba(255,255,255,0.3)", letterSpacing: "0.2em", marginBottom: 8 }}>{m.year}</div>
        <div style={{ fontSize: 12, color: "rgba(255,255,255,0.55)", marginBottom: m.institution ? 4 : 8 }}>{m.degree}</div>
        {m.institution && (
          <div style={{ fontFamily: "monospace", fontSize: 10, color: "rgba(255,255,255,0.28)", marginBottom: 8 }}>{m.institution}</div>
        )}
        <span style={{ display: "inline-flex", alignItems: "center", gap: 5, background: "rgba(34,211,238,0.1)", border: "1px solid rgba(34,211,238,0.2)", borderRadius: 99, padding: "2px 10px", fontSize: 10, fontFamily: "monospace", color: m.color }}>
          <span style={{ width: 4, height: 4, borderRadius: "50%", background: m.color, display: "inline-block" }} />
          {m.score}
        </span>
      </div>
    </motion.div>
  );
}

/* ─── Desktop milestone card ─────────────────────────────── */
function Card({ m }: { m: (typeof milestones)[0] }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px 0px" });

  const topPct = `${(m.dotY / VH) * 100}%`;
  const isRight = m.side === "right";

  /* Horizontal connector line width (from dot to card edge) */
  const connectorPct = "3%";

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: isRight ? 60 : -60 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="absolute"
      style={{
        top: topPct,
        ...(isRight
          ? { left: `${(m.dotX / VW) * 100 + 4}%`, maxWidth: "33%" }
          : { right: `${((VW - m.dotX) / VW) * 100 + 4}%`, maxWidth: "33%" }),
        transform: "translateY(-50%)",
        zIndex: 10,
      }}
    >
      {/* Connector line */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={inView ? { scaleX: 1 } : {}}
        transition={{ duration: 0.5, delay: 0.3, ease: "easeOut" }}
        style={{
          position: "absolute",
          top: "50%",
          width: 32,
          height: 1,
          background: `linear-gradient(${isRight ? "90deg" : "270deg"}, ${m.color}, transparent)`,
          transformOrigin: isRight ? "left" : "right",
          ...(isRight ? { right: "100%" } : { left: "100%" }),
        }}
      />

      {/* Card */}
      <motion.div
        whileHover={{ scale: 1.025, y: -4 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        style={{
          background: "rgba(6,182,212,0.04)",
          border: `1px solid rgba(34,211,238,0.28)`,
          borderRadius: 16,
          padding: "20px 24px",
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
          boxShadow: `0 0 24px rgba(34,211,238,0.08), 0 0 0 1px rgba(34,211,238,0.06), inset 0 1px 0 rgba(255,255,255,0.06)`,
          cursor: "default",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Hover shimmer */}
        <motion.div
          aria-hidden
          initial={{ x: "-100%", opacity: 0 }}
          whileHover={{ x: "100%", opacity: 1 }}
          transition={{ duration: 0.6 }}
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(90deg, transparent, rgba(34,211,238,0.04), transparent)",
            pointerEvents: "none",
          }}
        />

        {/* Number */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.4, duration: 0.5 }}
          style={{
            fontFamily: "monospace",
            fontSize: 11,
            letterSpacing: "0.3em",
            color: m.color,
            opacity: 0.7,
            marginBottom: 8,
          }}
        >
          {m.num}
        </motion.div>

        {/* Short name */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.45, duration: 0.5 }}
          style={{
            fontSize: "clamp(22px, 2.5vw, 34px)",
            fontWeight: 700,
            color: "#ffffff",
            letterSpacing: "-0.03em",
            lineHeight: 1,
            marginBottom: 6,
          }}
        >
          {m.short}
        </motion.div>

        {/* Year */}
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5, duration: 0.5 }}
          style={{
            fontFamily: "monospace",
            fontSize: 10,
            letterSpacing: "0.25em",
            color: "rgba(255,255,255,0.35)",
            marginBottom: 10,
          }}
        >
          {m.year}
        </motion.div>

        {/* Divider */}
        <div
          style={{
            width: 28,
            height: 1,
            background: `rgba(34,211,238,0.35)`,
            marginBottom: 10,
          }}
        />

        {/* Full degree name */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.55, duration: 0.5 }}
          style={{
            fontSize: "clamp(10px, 1.1vw, 13px)",
            color: "rgba(255,255,255,0.55)",
            fontWeight: 400,
            lineHeight: 1.5,
            marginBottom: m.institution ? 4 : 8,
          }}
        >
          {m.degree}
        </motion.div>

        {/* Institution */}
        {m.institution && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.6, duration: 0.5 }}
            style={{
              fontSize: "clamp(9px, 0.9vw, 11px)",
              color: "rgba(255,255,255,0.3)",
              fontFamily: "monospace",
              marginBottom: 8,
              lineHeight: 1.4,
            }}
          >
            {m.institution}
          </motion.div>
        )}

        {/* Score pill */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ delay: 0.65, duration: 0.45 }}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 6,
            background: `rgba(34,211,238,0.1)`,
            border: `1px solid rgba(34,211,238,0.25)`,
            borderRadius: 99,
            padding: "3px 10px",
            fontSize: 10,
            fontFamily: "monospace",
            color: m.color,
            letterSpacing: "0.1em",
          }}
        >
          <span
            style={{
              width: 5,
              height: 5,
              borderRadius: "50%",
              background: m.color,
              display: "inline-block",
              boxShadow: `0 0 6px ${m.color}`,
            }}
          />
          {m.score}
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

/* ─── Main component ────────────────────────────────────── */
export function Education() {
  const sectionRef = useRef<HTMLElement>(null);

  /* Scroll-driven path draw */
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 85%", "end 30%"],
  });
  const rawPath = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const pathLength = useSpring(rawPath, { stiffness: 60, damping: 20 });

  /* Glow opacity pulses as path draws */
  const glowOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.3, 1, 0.8]);

  /* Particles */
  const particles = [
    { x: 8, y: 15, delay: 0 }, { x: 90, y: 20, delay: 1.2 },
    { x: 25, y: 45, delay: 2 }, { x: 75, y: 55, delay: 0.7 },
    { x: 12, y: 70, delay: 1.8 }, { x: 88, y: 75, delay: 3 },
    { x: 50, y: 90, delay: 0.5 }, { x: 35, y: 30, delay: 2.5 },
    { x: 65, y: 85, delay: 1.5 }, { x: 5, y: 50, delay: 0.3 },
    { x: 95, y: 40, delay: 2.8 }, { x: 45, y: 10, delay: 1.1 },
  ];

  return (
    <section
      id="education"
      ref={sectionRef}
      style={{
        background: "#0a0f1e",
        position: "relative",
        overflow: "hidden",
        paddingTop: 120,
        paddingBottom: 120,
      }}
    >
      {/* Top bleed from global bg */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 80,
          background: "linear-gradient(to bottom, #050505, transparent)",
          zIndex: 1,
          pointerEvents: "none",
        }}
      />
      {/* Bottom bleed */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: 80,
          background: "linear-gradient(to top, #050505, transparent)",
          zIndex: 1,
          pointerEvents: "none",
        }}
      />

      {/* Ambient blue background glow */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse at 50% 30%, rgba(6,182,212,0.08) 0%, transparent 65%), radial-gradient(ellipse at 20% 70%, rgba(59,130,246,0.06) 0%, transparent 50%)",
          pointerEvents: "none",
        }}
      />

      {/* Floating particles */}
      {particles.map((p, i) => (
        <Particle key={i} {...p} />
      ))}

      {/* ── Section heading ── */}
      <div style={{ position: "relative", zIndex: 5, textAlign: "center", marginBottom: 80 }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <div
            style={{
              fontFamily: "monospace",
              fontSize: 11,
              letterSpacing: "0.5em",
              color: "#22d3ee",
              opacity: 0.65,
              marginBottom: 16,
              textTransform: "uppercase",
            }}
          >
            Academic Journey
          </div>
          <h2
            style={{
              fontSize: "clamp(48px, 8vw, 110px)",
              fontWeight: 800,
              letterSpacing: "-0.04em",
              lineHeight: 0.92,
              color: "#ffffff",
              margin: 0,
            }}
          >
            Education
          </h2>
          <div
            style={{
              width: 48,
              height: 2,
              background: "linear-gradient(90deg, transparent, #22d3ee, transparent)",
              margin: "20px auto 0",
              borderRadius: 1,
            }}
          />
        </motion.div>
      </div>

      {/* ── Timeline ── */}
      <div
        className="container mx-auto"
        style={{ position: "relative", padding: "0 24px" }}
      >
        {/* Desktop winding road */}
        <div
          className="hidden md:block"
          style={{ position: "relative", height: VH, maxWidth: 1100, margin: "0 auto" }}
        >
          {/* SVG road */}
          <svg
            viewBox={`0 0 ${VW} ${VH}`}
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              overflow: "visible",
            }}
            preserveAspectRatio="xMidYMid meet"
          >
            <defs>
              <filter id="pathGlow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="8" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
              <filter id="dotGlow" x="-200%" y="-200%" width="500%" height="500%">
                <feGaussianBlur stdDeviation="5" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
              <linearGradient id="cyanGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.9" />
                <stop offset="100%" stopColor="#0ea5e9" stopOpacity="0.6" />
              </linearGradient>
            </defs>

            {/* Ghost road (faint static) */}
            <path
              d={ROAD_PATH}
              fill="none"
              stroke="rgba(34,211,238,0.10)"
              strokeWidth="2.5"
              strokeDasharray="6 10"
            />

            {/* Animated glowing road */}
            <motion.path
              d={ROAD_PATH}
              fill="none"
              stroke="url(#cyanGrad)"
              strokeWidth="3"
              strokeLinecap="round"
              filter="url(#pathGlow)"
              style={{ pathLength, opacity: glowOpacity }}
            />

            {/* Milestone dots */}
            {milestones.map((m) => (
              <g key={m.num} filter="url(#dotGlow)">
                {/* Outer pulsing ring — fixed r, animate opacity only */}
                <motion.circle
                  cx={m.dotX}
                  cy={m.dotY}
                  r={18}
                  fill="none"
                  stroke={m.color}
                  strokeWidth="1.5"
                  animate={{ opacity: [0.7, 0.05, 0.7] }}
                  transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                />
                {/* Middle ring */}
                <motion.circle
                  cx={m.dotX}
                  cy={m.dotY}
                  r={10}
                  fill="none"
                  stroke={m.color}
                  strokeWidth="1"
                  animate={{ opacity: [0.4, 0.8, 0.4] }}
                  transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: 0.4 }}
                />
                {/* Inner filled dot */}
                <circle cx={m.dotX} cy={m.dotY} r={6} fill={m.color} opacity={0.95} />
                <circle cx={m.dotX} cy={m.dotY} r={3} fill="#ffffff" />
              </g>
            ))}
          </svg>

          {/* Cards */}
          {milestones.map((m) => (
            <Card key={m.num} m={m} />
          ))}
        </div>

        {/* Mobile: vertical stack */}
        <div className="md:hidden flex flex-col gap-6 relative">
          <div
            aria-hidden
            style={{
              position: "absolute",
              left: 20,
              top: 0,
              bottom: 0,
              width: 1,
              background: "linear-gradient(to bottom, transparent, rgba(34,211,238,0.4), transparent)",
            }}
          />
          {milestones.map((m, i) => (
            <MobileCard key={m.num} m={m} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
