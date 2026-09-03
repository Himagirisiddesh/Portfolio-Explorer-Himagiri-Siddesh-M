import { useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import {
  FaArrowRight,
  FaBriefcase,
  FaCode,
  FaDownload,
  FaGraduationCap,
  FaLinkedinIn,
  FaTrophy,
} from "react-icons/fa";
import { MdLocationOn } from "react-icons/md";
import { SiGithub } from "react-icons/si";

const PORTRAIT = "/himagiri-ai.png";
const RESUME = "/himagiri-resume.pdf";

/* Buttons have a small magnetic pull so the hero feels responsive, not static. */
function MagneticButton({
  children,
  style,
  onClick,
  href,
  download,
}: {
  children: React.ReactNode;
  style?: React.CSSProperties;
  onClick?: () => void;
  href?: string;
  download?: string;
}) {
  const anchorRef = useRef<HTMLAnchorElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 280, damping: 18 });
  const springY = useSpring(y, { stiffness: 280, damping: 18 });

  const handleMove = (event: React.MouseEvent) => {
    const element = (anchorRef.current ?? buttonRef.current) as HTMLElement | null;
    if (!element) return;
    const bounds = element.getBoundingClientRect();
    x.set((event.clientX - bounds.left - bounds.width / 2) * 0.16);
    y.set((event.clientY - bounds.top - bounds.height / 2) * 0.16);
  };

  const handleLeave = () => {
    x.set(0);
    y.set(0);
  };

  if (href) {
    return (
      <motion.a
        ref={anchorRef}
        href={href}
        download={download}
        style={{ ...style, x: springX, y: springY, textDecoration: "none" }}
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.97 }}
      >
        {children}
      </motion.a>
    );
  }

  return (
    <motion.button
      ref={buttonRef}
      onClick={onClick}
      style={{ ...style, x: springX, y: springY, border: "none", cursor: "pointer" }}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.97 }}
    >
      {children}
    </motion.button>
  );
}

function GlowRing({
  size,
  opacity,
  delay,
}: {
  size: number;
  opacity: number;
  delay: number;
}) {
  return (
    <motion.div
      aria-hidden
      style={{
        position: "absolute",
        width: size,
        height: size,
        top: "50%",
        left: "50%",
        borderRadius: "50%",
        border: "1px solid rgba(70, 155, 255, 0.25)",
        transform: "translate(-50%, -50%)",
        pointerEvents: "none",
      }}
      animate={{
        opacity: [opacity * 0.45, opacity, opacity * 0.45],
        scale: [1, 1.025, 1],
      }}
      transition={{ duration: 4 + delay, repeat: Infinity, delay, ease: "easeInOut" }}
    />
  );
}

function Stat({
  icon: Icon,
  value,
  label,
  delay,
}: {
  icon: typeof FaGraduationCap;
  value: string;
  label: string;
  delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      className="hero-stat"
    >
      <Icon className="hero-stat-icon" aria-hidden />
      <div>
        <strong>{value}</strong>
        <span>{label}</span>
      </div>
    </motion.div>
  );
}

export function Hero() {
  const scrollToProjects = () =>
    document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });

  return (
    <section id="hero" className="hero-reference">
      <div className="hero-reference-wash" aria-hidden />

      <div className="hero-reference-grid">
        {/* Left: short, confident introduction */}
        <motion.div
          className="hero-reference-copy"
          initial={{ opacity: 0, x: -28 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.65, ease: [0.22, 1, 0.36, 1] }}
        >
          <h1>
            <small>Hi, I&apos;m</small>
            <span>Himagiri</span>
            <span>Siddesh M</span>
          </h1>
          <div className="hero-copy-rule">
            <motion.i
              animate={{ scaleX: [0.4, 1, 0.4], opacity: [0.35, 1, 0.35] }}
              transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>
          <p className="hero-copy-caption">
            Engineering intelligent experiences where technology, design, and
            human thinking meet.
          </p>
        </motion.div>

        {/* Center: portrait and light field */}
        <div className="hero-portrait-stage">
          <div className="hero-portrait-rings" aria-hidden>
            <GlowRing size={620} opacity={0.18} delay={0} />
            <GlowRing size={500} opacity={0.22} delay={1.4} />
            <GlowRing size={380} opacity={0.3} delay={0.8} />
            <GlowRing size={270} opacity={0.38} delay={2.1} />
            <motion.div
              className="hero-portrait-core"
              animate={{ scale: [1, 1.1, 1], opacity: [0.5, 0.9, 0.5] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>

          <motion.div
            className="hero-portrait-frame"
            initial={{ opacity: 0, y: 34, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 1, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            <img
              src={PORTRAIT}
              alt="Himagiri Siddesh M"
              draggable={false}
            />
          </motion.div>
        </div>

        {/* Right: value proposition and actions */}
        <motion.div
          className="hero-reference-side"
          initial={{ opacity: 0, x: 26 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.85, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="hero-side-description">
            I build intelligent systems and scalable web applications that solve
            real-world problems with modern technology and cloud-driven thinking.
          </p>
          <div className="hero-side-line" aria-hidden />

          <div className="hero-actions">
            <MagneticButton
              onClick={scrollToProjects}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 10,
                color: "#fff",
                background: "linear-gradient(135deg, #2563eb, #1559d4)",
                padding: "13px 18px",
                borderRadius: 6,
                fontFamily: "monospace",
                fontSize: 10,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                fontWeight: 700,
                boxShadow: "0 8px 28px rgba(37, 99, 235, 0.34)",
              }}
            >
              Explore Projects
              <FaArrowRight size={10} />
            </MagneticButton>
            <MagneticButton
              href={RESUME}
              download="HimagiriSiddesh_Resume.pdf"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 9,
                color: "rgba(255,255,255,0.8)",
                background: "rgba(255,255,255,0.045)",
                border: "1px solid rgba(255,255,255,0.2)",
                padding: "13px 18px",
                borderRadius: 6,
                fontFamily: "monospace",
                fontSize: 10,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                fontWeight: 600,
              }}
            >
              Download CV
              <FaDownload size={10} />
            </MagneticButton>
          </div>

          <div className="hero-socials" aria-label="Social profiles">
            <a
              href="https://www.linkedin.com/in/himagiri-siddesh-m-532b102a3"
              target="_blank"
              rel="noreferrer"
            >
              <FaLinkedinIn size={13} />
              LinkedIn
            </a>
            <a
              href="https://github.com/Himagirisiddesh"
              target="_blank"
              rel="noreferrer"
            >
              <SiGithub size={13} />
              GitHub
            </a>
          </div>

          <div className="hero-location">
            <MdLocationOn size={15} aria-hidden />
            <span>Based in Bengaluru, India</span>
          </div>
        </motion.div>
      </div>

      <motion.div
        className="hero-scroll-cue"
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 2 }}
      >
        <span className="hero-scroll-mouse"><i /></span>
        <span>Scroll to explore</span>
      </motion.div>

      {/* Reference-inspired metrics bar */}
      <motion.div
        className="hero-stats"
        initial={{ opacity: 0, y: 22 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.75, delay: 1.4 }}
      >
        <Stat icon={FaGraduationCap} value="9.45" label="CGPA" delay={1.55} />
        <Stat icon={FaBriefcase} value="2+" label="Years Experience" delay={1.65} />
        <Stat icon={FaCode} value="4+" label="Projects" delay={1.75} />
        <Stat icon={FaTrophy} value="1+" label="Awards" delay={1.85} />
      </motion.div>
    </section>
  );
}