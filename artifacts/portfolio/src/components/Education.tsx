import { useRef, useEffect, useState, useCallback } from "react";
import { motion, useScroll, useTransform, useSpring, useInView } from "framer-motion";

/* ─── Data ───────────────────────────────────────────────── */
const MILESTONES = [
  {
    num: "01", side: "left" as const,
    short: "SSLC", degree: "Secondary School Leaving Certificate",
    institution: "", year: "2019 – 2020", score: "73.2%", isCurrent: false, isFuture: false,
  },
  {
    num: "02", side: "right" as const,
    short: "PUC", degree: "Pre-University Course",
    institution: "", year: "2020 – 2022", score: "87%", isCurrent: false, isFuture: false,
  },
  {
    num: "03", side: "left" as const,
    short: "BCA", degree: "Bachelor of Computer Applications",
    institution: "KLE Society's Degree College", year: "2022 – 2025", score: "CGPA: 8.4",
    isCurrent: false, isFuture: false,
  },
  {
    num: "04", side: "right" as const,
    short: "MCA", degree: "Master of Computer Applications",
    institution: "RNS Institute of Technology", year: "2025 – 2027", score: "CGPA: 9.39",
    isCurrent: true, isFuture: false,
  },
];

/* ─── SVG layout constants (viewBox = 0 0 680 800) ──────── */
const VW = 680;
const VH = 800;
const PILL_W = 510;           // 75% of 680
const PILL_H = 120;
const PILL_RX = 60;           // half-height cap
const GAP = 80;               // vertical gap between pills

/* Pill vertical centers — 4 milestones */
const CY = [0, 1, 2, 3].map((i) => PILL_RX + i * (PILL_H + GAP));
// = [60, 260, 460, 660]

/* Left pill: x=0..510, Right pill: x=170..680 */
const LEFT_CAP_L  = PILL_RX;                    // 60
const LEFT_CAP_R  = PILL_W - PILL_RX;           // 450
const RIGHT_CAP_L = (VW - PILL_W) + PILL_RX;   // 230
const RIGHT_CAP_R = VW - PILL_RX;              // 620

/*
  Center-line path:
  Top → Pill1(left) → right hairpin → Pill2(right) →
  left hairpin → Pill3(left) → right hairpin → Pill4(right) → exit
*/
const DOT_PATH = [
  `M ${VW / 2} -10`,
  `C ${VW / 2} 25, ${LEFT_CAP_L} 25, ${LEFT_CAP_L} ${CY[0]}`,
  `L ${LEFT_CAP_R} ${CY[0]}`,
  `C ${VW} ${CY[0]}, ${VW} ${CY[1]}, ${RIGHT_CAP_R} ${CY[1]}`,
  `L ${RIGHT_CAP_L} ${CY[1]}`,
  `C 0 ${CY[1]}, 0 ${CY[2]}, ${LEFT_CAP_L} ${CY[2]}`,
  `L ${LEFT_CAP_R} ${CY[2]}`,
  `C ${VW} ${CY[2]}, ${VW} ${CY[3]}, ${RIGHT_CAP_R} ${CY[3]}`,
  `L ${RIGHT_CAP_L} ${CY[3]}`,
  `C ${PILL_W - 40} ${CY[3]}, ${VW / 2} ${CY[3] + 70}, ${VW / 2} ${VH - 10}`,
].join(" ");

/* Pill rects in SVG space */
const PILL_RECTS = MILESTONES.map((m, i) => ({
  x: m.side === "left" ? 0 : VW - PILL_W,
  y: i * (PILL_H + GAP),
  w: PILL_W,
  h: PILL_H,
  rx: PILL_RX,
}));

/* ─── Single pill card ───────────────────────────────────── */
function PillCard({
  m, rect, isActive, index,
}: {
  m: (typeof MILESTONES)[0];
  rect: { x: number; y: number; w: number; h: number };
  isActive: boolean;
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px 0px" });
  const isLeft = m.side === "left";

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: isLeft ? -30 : 30 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      style={{
        position: "absolute",
        left: `${(rect.x / VW) * 100}%`,
        top: `${(rect.y / VH) * 100}%`,
        width: `${(rect.w / VW) * 100}%`,
        height: `${(rect.h / VH) * 100}%`,
        borderRadius: 999,
        border: `1px solid ${isActive
          ? m.isCurrent
            ? "rgba(255,255,255,0.32)"
            : "rgba(255,255,255,0.22)"
          : "rgba(255,255,255,0.10)"}`,
        background: isActive
          ? m.isCurrent
            ? "rgba(255,255,255,0.05)"
            : "rgba(255,255,255,0.03)"
          : "rgba(255,255,255,0.015)",
        backdropFilter: "blur(8px)",
        WebkitBackdropFilter: "blur(8px)",
        transition: "border-color 0.6s, background 0.6s",
        display: "flex",
        alignItems: "center",
        padding: "0 2.5%",
        gap: "3%",
        overflow: "hidden",
        boxSizing: "border-box",
        boxShadow: isActive && m.isCurrent
          ? "0 0 40px rgba(255,255,255,0.04)"
          : "none",
      }}
    >
      {/* Number badge */}
      <div
        style={{
          flexShrink: 0,
          width: "12%",
          aspectRatio: "1",
          borderRadius: "50%",
          border: `1px solid ${isActive ? "rgba(255,255,255,0.3)" : "rgba(255,255,255,0.1)"}`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "monospace",
          fontSize: "min(1.8vw, 13px)",
          color: isActive ? "rgba(255,255,255,0.85)" : "rgba(255,255,255,0.3)",
          transition: "all 0.6s",
          position: "relative",
        }}
      >
        {m.num}
        {/* Current pulsing ring */}
        {m.isCurrent && isActive && (
          <motion.div
            style={{
              position: "absolute",
              inset: -4,
              borderRadius: "50%",
              border: "1px solid rgba(255,255,255,0.35)",
            }}
            animate={{ scale: [1, 1.35, 1], opacity: [0.5, 0, 0.5] }}
            transition={{ duration: 2.2, repeat: Infinity }}
          />
        )}
      </div>

      {/* Content */}
      <div style={{ flex: 1, minWidth: 0 }}>
        {/* Year + badges row */}
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: "1.5%" }}>
          <span
            style={{
              fontFamily: "monospace",
              fontSize: "min(1.5vw, 10px)",
              letterSpacing: "0.25em",
              color: "rgba(255,255,255,0.3)",
              textTransform: "uppercase",
              whiteSpace: "nowrap",
            }}
          >
            {m.year}
          </span>
          {m.isCurrent && (
            <span
              style={{
                fontFamily: "monospace",
                fontSize: "min(1.2vw, 9px)",
                letterSpacing: "0.2em",
                color: "rgba(255,255,255,0.7)",
                border: "1px solid rgba(255,255,255,0.25)",
                padding: "1px 6px",
                borderRadius: 99,
                textTransform: "uppercase",
                whiteSpace: "nowrap",
              }}
            >
              Current
            </span>
          )}
        </div>

        {/* Short name */}
        <div
          style={{
            fontSize: "min(3vw, 20px)",
            fontWeight: 600,
            color: isActive ? "rgba(255,255,255,0.92)" : "rgba(255,255,255,0.35)",
            letterSpacing: "-0.02em",
            lineHeight: 1,
            marginBottom: "1.5%",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
            transition: "color 0.6s",
          }}
        >
          {m.short}
        </div>

        {/* Institution or degree */}
        <div
          style={{
            fontSize: "min(1.6vw, 11px)",
            color: "rgba(255,255,255,0.35)",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {m.institution || m.degree}
        </div>
      </div>

      {/* Score */}
      {m.score && (
        <div
          style={{
            flexShrink: 0,
            fontFamily: "monospace",
            fontSize: "min(1.6vw, 11px)",
            color: isActive ? "rgba(255,255,255,0.65)" : "rgba(255,255,255,0.2)",
            letterSpacing: "0.05em",
            textAlign: "right",
            transition: "color 0.6s",
            whiteSpace: "nowrap",
            paddingRight: "2%",
          }}
        >
          {m.score}
        </div>
      )}
    </motion.div>
  );
}

/* ─── Main component ─────────────────────────────────────── */
export function Education() {
  const sectionRef = useRef<HTMLElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const [dotPos, setDotPos] = useState({ x: VW / 2, y: -10 });
  const [activeIndex, setActiveIndex] = useState(-1);
  const [pathProgress, setPathProgress] = useState(0);

  /* Milestone "trigger" lengths along the path (0-1) */
  const TRIGGER_FRACTIONS = [0.12, 0.34, 0.58, 0.80];

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 85%", "end 20%"],
  });

  const smoothProgress = useSpring(scrollYProgress, { stiffness: 80, damping: 25, restDelta: 0.001 });

  useEffect(() => {
    return smoothProgress.on("change", (p) => {
      setPathProgress(p);

      const path = pathRef.current;
      if (!path) return;

      const totalLen = path.getTotalLength();
      const pt = path.getPointAtLength(Math.min(p, 0.999) * totalLen);

      // Convert SVG coords to %-based (for the positioned overlay)
      setDotPos({ x: pt.x, y: pt.y });

      // Activate milestones as dot passes each trigger fraction
      let active = -1;
      for (let i = 0; i < TRIGGER_FRACTIONS.length; i++) {
        if (p >= TRIGGER_FRACTIONS[i]) active = i;
      }
      setActiveIndex(active);
    });
  }, [smoothProgress]);

  /* Scroll-driven path draw */
  const pathLength = useTransform(smoothProgress, [0, 1], [0, 1]);

  return (
    <section
      id="education"
      ref={sectionRef}
      style={{ position: "relative", overflow: "hidden", paddingTop: 128, paddingBottom: 128 }}
    >
      {/* ── Heading ── */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        style={{ textAlign: "center", marginBottom: 72 }}
      >
        <p
          style={{
            fontFamily: "monospace",
            fontSize: 11,
            letterSpacing: "0.45em",
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.28)",
            marginBottom: 14,
          }}
        >
          Academic Journey
        </p>
        <h2
          style={{
            fontSize: "clamp(42px, 7vw, 96px)",
            fontWeight: 700,
            letterSpacing: "-0.04em",
            color: "#ffffff",
            lineHeight: 0.93,
          }}
        >
          Education
        </h2>
        <div
          style={{
            width: 40,
            height: 1,
            background: "rgba(255,255,255,0.2)",
            margin: "18px auto 0",
          }}
        />
      </motion.div>

      {/* ── Highway container ── */}
      <div className="container mx-auto" style={{ maxWidth: 680, padding: "0 16px" }}>
        {/* Intrinsic-ratio box: height = VH/VW × 100% of container width */}
        <div
          ref={containerRef}
          style={{
            position: "relative",
            paddingBottom: `${(VH / VW) * 100}%`,
          }}
        >
          {/* ── SVG: road outlines + dot path + animated dot ── */}
          <svg
            ref={svgRef}
            viewBox={`0 0 ${VW} ${VH}`}
            style={{ position: "absolute", inset: 0, width: "100%", height: "100%", overflow: "visible" }}
            aria-hidden
          >
            <defs>
              <filter id="eduDotGlow" x="-100%" y="-100%" width="300%" height="300%">
                <feGaussianBlur stdDeviation="6" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>

              {/* Gradient for active path */}
              <linearGradient id="activePathGrad" gradientUnits="userSpaceOnUse"
                x1="0" y1="0" x2={VW} y2={VH}>
                <stop offset="0%" stopColor="rgba(255,255,255,0.65)" />
                <stop offset="100%" stopColor="rgba(255,255,255,0.35)" />
              </linearGradient>
            </defs>

            {/* Pill outlines (static highway lanes) */}
            {PILL_RECTS.map((r, i) => (
              <rect
                key={i}
                x={r.x}
                y={r.y}
                width={r.w}
                height={r.h}
                rx={r.rx}
                fill="none"
                stroke={i <= activeIndex ? "rgba(255,255,255,0.18)" : "rgba(255,255,255,0.07)"}
                strokeWidth="1.5"
                style={{ transition: "stroke 0.6s" }}
              />
            ))}

            {/* Ghost center-line path (always visible, very faint) */}
            <path
              d={DOT_PATH}
              fill="none"
              stroke="rgba(255,255,255,0.07)"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeDasharray="4 8"
            />

            {/* Animated active path */}
            <motion.path
              ref={pathRef}
              d={DOT_PATH}
              fill="none"
              stroke="url(#activePathGrad)"
              strokeWidth="2"
              strokeLinecap="round"
              style={{ pathLength }}
              filter="url(#eduDotGlow)"
            />

            {/* Milestone dots on the path */}
            {TRIGGER_FRACTIONS.map((_, i) => {
              const cy = CY[i];
              const isLeft = MILESTONES[i].side === "left";
              const cx = isLeft ? LEFT_CAP_R : RIGHT_CAP_L;
              const active = i <= activeIndex;
              return (
                <g key={i}>
                  {active && MILESTONES[i].isCurrent && (
                    <motion.circle
                      cx={cx} cy={cy} r={14}
                      fill="none"
                      stroke="rgba(255,255,255,0.3)"
                      strokeWidth="1"
                      animate={{ opacity: [0.5, 0, 0.5] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                  )}
                  <circle
                    cx={cx} cy={cy} r={5}
                    fill={active ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.15)"}
                    style={{ transition: "fill 0.5s" }}
                  />
                  <circle cx={cx} cy={cy} r={2.5} fill="rgba(0,0,0,0.6)" />
                </g>
              );
            })}

            {/* Moving dot */}
            <circle
              cx={dotPos.x}
              cy={dotPos.y}
              r={7}
              fill="rgba(255,255,255,0.95)"
              filter="url(#eduDotGlow)"
            />
            <circle
              cx={dotPos.x}
              cy={dotPos.y}
              r={3.5}
              fill="rgba(0,0,0,0.5)"
            />
          </svg>

          {/* ── Pill content (absolutely positioned to match SVG) ── */}
          {MILESTONES.map((m, i) => (
            <PillCard
              key={m.num}
              m={m}
              rect={PILL_RECTS[i]}
              isActive={i <= activeIndex}
              index={i}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
