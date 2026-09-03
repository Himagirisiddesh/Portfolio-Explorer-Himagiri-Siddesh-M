import { useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { SiGithub } from "react-icons/si";
import { FaLinkedin } from "react-icons/fa";
import { MdEmail, MdLocationOn } from "react-icons/md";
import {
  FaGraduationCap, FaBriefcase, FaCode, FaCloud,
  FaArrowRight, FaDownload,
} from "react-icons/fa";

const PORTRAIT = "/himagiri.png";
const RESUME   = "/himagiri-resume.pdf";

/* ── Magnetic button ── */
function MagBtn({ children, style, onClick, href, download }: {
  children: React.ReactNode;
  style?: React.CSSProperties;
  onClick?: () => void;
  href?: string;
  download?: string;
}) {
  const aRef = useRef<HTMLAnchorElement>(null);
  const bRef = useRef<HTMLButtonElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 280, damping: 18 });
  const sy = useSpring(y, { stiffness: 280, damping: 18 });

  const onMove = (e: React.MouseEvent) => {
    const el = (aRef.current ?? bRef.current) as HTMLElement | null;
    if (!el) return;
    const r = el.getBoundingClientRect();
    x.set((e.clientX - r.left - r.width / 2) * 0.18);
    y.set((e.clientY - r.top - r.height / 2) * 0.18);
  };
  const onLeave = () => { x.set(0); y.set(0); };

  if (href) return (
    <motion.a
      ref={aRef}
      href={href}
      download={download}
      style={{ ...style, x: sx, y: sy, textDecoration: "none" }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.97 }}
    >
      {children}
    </motion.a>
  );
  return (
    <motion.button
      ref={bRef}
      onClick={onClick}
      style={{ ...style, x: sx, y: sy, border: "none", cursor: "pointer" }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.97 }}
    >
      {children}
    </motion.button>
  );
}

/* ── Decorative ring ── */
function Ring({ size, opacity, delay }: { size: number; opacity: number; delay: number }) {
  return (
    <motion.div
      style={{
        position: "absolute", width: size, height: size,
        borderRadius: "50%",
        border: "1px solid rgba(99,179,237,0.18)",
        top: "50%", left: "50%",
        transform: "translate(-50%,-50%)",
        pointerEvents: "none",
      }}
      animate={{ opacity: [opacity * 0.5, opacity, opacity * 0.5], scale: [1, 1.02, 1] }}
      transition={{ duration: 4 + delay, repeat: Infinity, delay, ease: "easeInOut" }}
    />
  );
}

export function Hero() {
  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <section
      id="hero"
      style={{
        position: "relative", minHeight: "100svh", overflow: "hidden",
        display: "flex", flexDirection: "column",
      }}
    >
      {/* ── Main two-column layout ── */}
      <div style={{
        flex: 1, display: "flex", alignItems: "center",
        padding: "clamp(100px, 12vh, 140px) clamp(24px, 5vw, 80px) 0",
        gap: "clamp(24px, 4vw, 60px)",
        position: "relative", zIndex: 6,
      }}>

        {/* ════════════ LEFT COLUMN ════════════ */}
        <div style={{ flex: "0 0 auto", width: "min(540px, 52vw)", display: "flex", flexDirection: "column" }}>

          {/* AI · ML · FULL STACK tag */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.6 }}
            style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}
          >
            <div style={{ width: 28, height: 1.5, background: "#3b82f6", borderRadius: 99 }} />
            <span style={{
              fontFamily: "monospace", fontSize: 10, letterSpacing: "0.42em",
              textTransform: "uppercase", color: "rgba(147,197,253,0.7)",
            }}>
              AI &nbsp;·&nbsp; ML &nbsp;·&nbsp; Full Stack
            </span>
          </motion.div>

          {/* Greeting and full name */}
          <motion.h1
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            style={{
              margin: "0 0 22px",
              display: "flex",
              flexDirection: "column",
              gap: 8,
              fontWeight: 300,
              lineHeight: 1,
            }}
          >
            <span style={{
              fontSize: "clamp(18px, 2.4vw, 28px)",
              color: "rgba(255,255,255,0.65)",
              letterSpacing: "-0.02em",
            }}>
              Hi, I'm
            </span>
            <span style={{
              fontSize: "clamp(42px, 6.5vw, 88px)",
              fontWeight: 800,
              letterSpacing: "-0.055em",
              color: "#ffffff",
            }}>
              Himagiri Siddesh M
            </span>
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1.2 }}
            style={{
              fontSize: "clamp(13px, 1.4vw, 16px)", color: "rgba(255,255,255,0.45)",
              lineHeight: 1.8, marginBottom: 32, maxWidth: 460,
            }}
          >
            I build intelligent systems and scalable web applications that solve real-world problems using modern technologies and cloud-driven architectures.
          </motion.p>

          {/* Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1.35 }}
            style={{ display: "flex", gap: 14, flexWrap: "wrap", marginBottom: 36 }}
          >
            {/* Explore My Work — filled blue */}
            <MagBtn
              onClick={() => scrollTo("projects")}
              style={{
                display: "inline-flex", alignItems: "center", gap: 10,
                background: "linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)",
                color: "#ffffff", padding: "13px 24px",
                fontFamily: "monospace", fontSize: 10.5, letterSpacing: "0.2em", textTransform: "uppercase",
                fontWeight: 700, borderRadius: 6,
                boxShadow: "0 4px 24px rgba(37,99,235,0.45), inset 0 1px 0 rgba(255,255,255,0.15)",
                position: "relative", overflow: "hidden",
              }}
            >
              {/* Shine */}
              <motion.div
                style={{
                  position: "absolute", top: 0, left: "-60%", width: "40%", height: "100%",
                  background: "linear-gradient(105deg, transparent, rgba(255,255,255,0.2), transparent)",
                  transform: "skewX(-15deg)",
                }}
                animate={{ left: ["−60%", "160%"] }}
                transition={{ duration: 2.5, repeat: Infinity, repeatDelay: 2 }}
              />
              <span style={{ position: "relative", zIndex: 1 }}>Explore My Work</span>
              <FaArrowRight size={10} style={{ position: "relative", zIndex: 1 }} />
            </MagBtn>

            {/* Download Resume — outline */}
            <MagBtn
              href={RESUME}
              download="HimagiriSiddesh_Resume.pdf"
              style={{
                display: "inline-flex", alignItems: "center", gap: 10,
                border: "1px solid rgba(255,255,255,0.22)",
                background: "rgba(255,255,255,0.04)",
                color: "rgba(255,255,255,0.78)", padding: "13px 24px",
                fontFamily: "monospace", fontSize: 10.5, letterSpacing: "0.2em", textTransform: "uppercase",
                fontWeight: 600, borderRadius: 6,
                transition: "border-color 0.25s, background 0.25s, color 0.25s",
              }}
            >
              Download Resume
              <FaDownload size={10} />
            </MagBtn>
          </motion.div>

          {/* Stats row */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.6 }}
            style={{
              display: "flex", gap: 0,
              borderTop: "1px solid rgba(255,255,255,0.07)",
              paddingTop: 24,
            }}
          >
            {[
              { icon: FaGraduationCap, v: "9.45", l: "CGPA" },
              { icon: FaBriefcase,     v: "2+",   l: "Internships" },
              { icon: FaCode,          v: "4+",   l: "Projects" },
              { icon: FaCloud,         v: "AI",   l: "Systems Built", sub: "End-to-end" },
            ].map((s, i) => (
              <div key={s.l} style={{
                flex: 1, display: "flex", flexDirection: "column", gap: 5,
                paddingRight: 16, paddingLeft: i > 0 ? 16 : 0,
                borderRight: i < 3 ? "1px solid rgba(255,255,255,0.07)" : "none",
              }}>
                <s.icon size={18} color="rgba(99,179,237,0.7)" />
                <span style={{ fontSize: "clamp(18px, 2.2vw, 24px)", fontWeight: 700, color: "#ffffff", letterSpacing: "-0.02em", lineHeight: 1 }}>
                  {s.v}
                </span>
                <div>
                  <div style={{ fontFamily: "monospace", fontSize: 9, letterSpacing: "0.3em", textTransform: "uppercase", color: "rgba(255,255,255,0.3)" }}>
                    {s.l}
                  </div>
                  {s.sub && (
                    <div style={{ fontFamily: "monospace", fontSize: 8, color: "rgba(255,255,255,0.18)", letterSpacing: "0.15em" }}>
                      {s.sub}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* ════════════ RIGHT COLUMN — Portrait ════════════ */}
        <div style={{ flex: 1, position: "relative", display: "flex", justifyContent: "center", alignItems: "flex-end", minHeight: "clamp(400px, 75vh, 750px)" }}>

          {/* Concentric glow rings */}
          <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", pointerEvents: "none" }}>
            <Ring size={560} opacity={0.18} delay={0} />
            <Ring size={440} opacity={0.22} delay={1.5} />
            <Ring size={330} opacity={0.28} delay={0.8} />
            <Ring size={220} opacity={0.35} delay={2.2} />

            {/* Blue core glow */}
            <motion.div
              style={{
                position: "absolute", width: 320, height: 320, borderRadius: "50%",
                background: "radial-gradient(circle, rgba(37,99,235,0.35) 0%, rgba(124,58,237,0.18) 45%, transparent 70%)",
                filter: "blur(30px)",
              }}
              animate={{ scale: [1, 1.08, 1], opacity: [0.6, 1, 0.6] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            />

            {/* Floating dots in background */}
            {[[-100,-120],[80,-80],[-60,100],[120,60],[-130,40],[90,-140]].map(([dx,dy], i) => (
              <motion.div
                key={i}
                style={{
                  position: "absolute",
                  width: i % 2 === 0 ? 3 : 2, height: i % 2 === 0 ? 3 : 2,
                  borderRadius: "50%",
                  background: i % 3 === 0 ? "rgba(99,179,237,0.8)" : "rgba(167,139,250,0.6)",
                  left: `calc(50% + ${dx}px)`,
                  top:  `calc(50% + ${dy}px)`,
                }}
                animate={{ opacity: [0.2, 1, 0.2], scale: [0.8, 1.5, 0.8] }}
                transition={{ duration: 2.5 + i * 0.4, repeat: Infinity, delay: i * 0.5 }}
              />
            ))}
          </div>

          {/* Portrait */}
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 1, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            style={{ position: "relative", zIndex: 4, width: "100%", display: "flex", justifyContent: "center", alignItems: "flex-end", height: "100%" }}
          >
            <motion.img
              src={PORTRAIT}
              alt="Himagiri Siddesh M"
              draggable={false}
              animate={{ y: [0, -12, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              style={{
                height: "clamp(420px, 82vh, 820px)",
                width: "auto",
                objectFit: "contain",
                objectPosition: "bottom center",
                filter: "drop-shadow(-16px 0 48px rgba(37,99,235,0.65)) drop-shadow(10px 0 28px rgba(124,58,237,0.38)) drop-shadow(0 -8px 32px rgba(37,99,235,0.22))",
                maxWidth: "100%",
              }}
            />

            {/* Bottom fade */}
            <div style={{
              position: "absolute", bottom: 0, left: 0, right: 0, height: "38%",
              background: "linear-gradient(to top, #050505 0%, rgba(5,5,5,0.7) 40%, transparent 100%)",
              pointerEvents: "none", zIndex: 5,
            }} />
          </motion.div>
        </div>
      </div>

      {/* ════════════ BOTTOM BAR ════════════ */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 2 }}
        style={{
          position: "relative", zIndex: 7,
          display: "flex", alignItems: "center", justifyContent: "space-between",
          padding: "16px clamp(24px, 5vw, 80px) 28px",
        }}
      >
        {/* Based in */}
        <div>
          <div style={{ fontFamily: "monospace", fontSize: 8.5, letterSpacing: "0.38em", textTransform: "uppercase", color: "#3b82f6", marginBottom: 4 }}>
            Based In
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
            <MdLocationOn size={13} color="rgba(255,255,255,0.45)" />
            <span style={{ fontSize: 13, color: "rgba(255,255,255,0.55)" }}>Bengaluru, India</span>
          </div>
        </div>

        {/* Scroll cue */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
          {/* Mouse icon */}
          <div style={{
            width: 20, height: 30, border: "1.5px solid rgba(255,255,255,0.25)",
            borderRadius: 10, display: "flex", justifyContent: "center", paddingTop: 5,
          }}>
            <motion.div
              style={{ width: 2, height: 6, background: "rgba(255,255,255,0.5)", borderRadius: 99 }}
              animate={{ y: [0, 8, 0], opacity: [1, 0, 1] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>
          <span style={{
            fontFamily: "monospace", fontSize: 8.5, letterSpacing: "0.38em",
            textTransform: "uppercase", color: "rgba(255,255,255,0.2)",
          }}>
            Scroll to Explore
          </span>
        </div>

        {/* Social icons */}
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          {[
            { href: "https://github.com/Himagirisiddesh", Icon: SiGithub,  label: "GitHub" },
            { href: "https://linkedin.com/in/himagiri-siddesh-m-532b102a3", Icon: FaLinkedin, label: "LinkedIn" },
            { href: "mailto:himagirisiddesh@gmail.com", Icon: MdEmail, label: "Email" },
          ].map(({ href, Icon, label }) => (
            <motion.a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              whileHover={{ scale: 1.18, y: -2 }}
              whileTap={{ scale: 0.92 }}
              style={{
                width: 36, height: 36, borderRadius: "50%",
                border: "1px solid rgba(255,255,255,0.12)",
                background: "rgba(255,255,255,0.04)",
                display: "flex", alignItems: "center", justifyContent: "center",
                color: "rgba(255,255,255,0.5)", textDecoration: "none",
                transition: "border-color 0.2s, background 0.2s, color 0.2s",
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLAnchorElement;
                el.style.borderColor = "rgba(99,179,237,0.5)";
                el.style.background  = "rgba(99,179,237,0.1)";
                el.style.color       = "#93c5fd";
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLAnchorElement;
                el.style.borderColor = "rgba(255,255,255,0.12)";
                el.style.background  = "rgba(255,255,255,0.04)";
                el.style.color       = "rgba(255,255,255,0.5)";
              }}
            >
              <Icon size={15} />
            </motion.a>
          ))}
        </div>
      </motion.div>

      {/* Edge vignette */}
      <div
        aria-hidden
        style={{
          position: "absolute", inset: 0, zIndex: 5, pointerEvents: "none",
          background: "radial-gradient(ellipse at center, transparent 50%, rgba(5,5,5,0.55) 100%)",
        }}
      />
    </section>
  );
}
