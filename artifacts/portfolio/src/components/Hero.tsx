import { useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

const PORTRAIT = "/himagiri.png";

/* Magnetic hover button */
function MagBtn({
  children,
  className,
  style,
  onClick,
  href,
}: {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
  href?: string;
}) {
  const ref = useRef<HTMLElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 280, damping: 18 });
  const sy = useSpring(y, { stiffness: 280, damping: 18 });

  const onMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    x.set((e.clientX - r.left - r.width / 2) * 0.22);
    y.set((e.clientY - r.top - r.height / 2) * 0.22);
  };
  const onLeave = () => { x.set(0); y.set(0); };

  const shared = { ref, style: { ...style, x: sx, y: sy }, onMouseMove: onMove, onMouseLeave: onLeave, className };
  if (href) return <motion.a {...shared} href={href}>{children}</motion.a>;
  return <motion.button {...shared} onClick={onClick}>{children}</motion.button>;
}

/* Single-line text slide-up reveal */
function Reveal({ children, delay = 0, className }: { children: React.ReactNode; delay?: number; className?: string }) {
  return (
    <span className={className} style={{ display: "inline-block", overflow: "hidden", verticalAlign: "top" }}>
      <motion.span
        style={{ display: "block" }}
        initial={{ y: "105%", opacity: 0 }}
        animate={{ y: "0%", opacity: 1 }}
        transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
      >
        {children}
      </motion.span>
    </span>
  );
}

export function Hero() {
  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <section
      id="hero"
      className="relative overflow-hidden"
      style={{ minHeight: "100svh" }}
    >
      {/* ── Giant "HIMAGIRI" — behind portrait ── */}
      <div
        aria-hidden
        className="pointer-events-none select-none absolute inset-0 z-[2] overflow-hidden flex items-center"
      >
        <motion.div
          initial={{ opacity: 0, x: 80 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          style={{
            fontSize: "clamp(88px, 21.5vw, 330px)",
            fontWeight: 800,
            color: "rgba(255,255,255,0.042)",
            letterSpacing: "-0.045em",
            lineHeight: 0.88,
            paddingLeft: "3vw",
            whiteSpace: "nowrap",
          }}
        >
          HIMAGIRI
        </motion.div>
      </div>

      {/* ── Portrait — dominant center-right ── */}
      <motion.div
        className="absolute z-[3] bottom-0"
        style={{ right: "5vw" }}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.1, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* Ambient blue/purple glow behind portrait */}
        <div
          aria-hidden
          style={{
            position: "absolute",
            inset: "-8% -10%",
            background:
              "radial-gradient(ellipse at 50% 38%, rgba(37,99,235,0.32) 0%, rgba(124,58,237,0.15) 42%, transparent 68%)",
            filter: "blur(40px)",
            zIndex: 0,
            pointerEvents: "none",
          }}
        />

        {/* Portrait with slow float */}
        <motion.img
          src={PORTRAIT}
          alt="Himagiri Siddesh"
          draggable={false}
          animate={{ y: [0, -16, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          style={{
            position: "relative",
            zIndex: 1,
            height: "clamp(480px, 92vh, 920px)",
            width: "auto",
            objectFit: "contain",
            objectPosition: "bottom center",
            filter:
              "drop-shadow(-10px 0 36px rgba(37,99,235,0.55)) drop-shadow(8px 0 24px rgba(124,58,237,0.32)) drop-shadow(0 -12px 40px rgba(37,99,235,0.18))",
          }}
        />

        {/* Fade portrait into page at the bottom */}
        <div
          aria-hidden
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: "42%",
            background:
              "linear-gradient(to top, #050505 0%, rgba(5,5,5,0.8) 35%, transparent 100%)",
            zIndex: 2,
            pointerEvents: "none",
          }}
        />
      </motion.div>

      {/* ── "SIDDESH" — in front of portrait (lower / faded area) ── */}
      <div
        aria-hidden
        className="pointer-events-none select-none absolute z-[4] overflow-hidden"
        style={{ bottom: "1.5vh", left: 0, right: 0 }}
      >
        <motion.div
          initial={{ opacity: 0, x: -80 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          style={{
            fontSize: "clamp(88px, 21.5vw, 330px)",
            fontWeight: 800,
            color: "rgba(255,255,255,0.062)",
            letterSpacing: "-0.045em",
            lineHeight: 0.88,
            textAlign: "right",
            paddingRight: "3vw",
            whiteSpace: "nowrap",
          }}
        >
          SIDDESH
        </motion.div>
      </div>

      {/* ── Left content block ── */}
      <div
        className="absolute z-[6]"
        style={{
          left: "clamp(24px, 5vw, 80px)",
          top: "50%",
          transform: "translateY(-50%)",
          maxWidth: "min(400px, 36vw)",
        }}
      >
        {/* Label */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.55 }}
          className="flex items-center gap-3 mb-8"
        >
          <div style={{ width: 20, height: 1, background: "rgba(99,130,246,0.65)" }} />
          <span
            className="font-mono uppercase"
            style={{ fontSize: 10, letterSpacing: "0.38em", color: "rgba(147,197,253,0.6)" }}
          >
            AI&nbsp;•&nbsp;ML&nbsp;•&nbsp;Full Stack
          </span>
        </motion.div>

        {/* Hello, I'm */}
        <div className="mb-1" style={{ overflow: "hidden" }}>
          <span
            className="font-mono uppercase"
            style={{ fontSize: 11, letterSpacing: "0.28em", color: "rgba(255,255,255,0.3)" }}
          >
            <Reveal delay={0.65}>Hello, I'm</Reveal>
          </span>
        </div>

        {/* Name */}
        <h1
          className="font-light leading-[1.04] tracking-tight mb-6 text-white"
          style={{ fontSize: "clamp(32px, 4.2vw, 58px)" }}
        >
          <Reveal delay={0.75}>Himagiri</Reveal>
          <br />
          <Reveal delay={0.88}>Siddesh</Reveal>
        </h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1.05 }}
          className="font-mono uppercase mb-5"
          style={{ fontSize: 10, letterSpacing: "0.22em", color: "rgba(255,255,255,0.32)", lineHeight: 1.8 }}
        >
          MCA Student &nbsp;|&nbsp; AI/ML Engineer
          <br />
          Full Stack Developer
        </motion.p>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1.18 }}
          className="font-light leading-relaxed mb-10"
          style={{ fontSize: "clamp(13px, 1.3vw, 16px)", color: "rgba(255,255,255,0.42)" }}
        >
          Building intelligent systems, modern web
          applications, and scalable digital experiences.
        </motion.p>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1.35 }}
          className="flex gap-4 flex-wrap"
        >
          <MagBtn
            onClick={() => scrollTo("projects")}
            className="px-6 py-3 font-mono uppercase text-black transition-opacity hover:opacity-90"
            style={{
              fontSize: 10,
              letterSpacing: "0.2em",
              background: "linear-gradient(135deg,#ffffff,rgba(255,255,255,0.93))",
              cursor: "pointer",
            }}
          >
            View Projects
          </MagBtn>

          <MagBtn
            href="mailto:himagirisiddesh@gmail.com"
            className="px-6 py-3 font-mono uppercase transition-all hover:border-white/35"
            style={{
              fontSize: 10,
              letterSpacing: "0.2em",
              border: "1px solid rgba(255,255,255,0.14)",
              color: "rgba(255,255,255,0.58)",
              background: "rgba(255,255,255,0.025)",
              cursor: "pointer",
            }}
          >
            Download Resume
          </MagBtn>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.6 }}
          className="flex gap-8 mt-12 pt-8"
          style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
        >
          {[
            { v: "9.39", l: "CGPA" },
            { v: "2+", l: "Internships" },
            { v: "4+", l: "Projects" },
          ].map((s) => (
            <div key={s.l} className="flex flex-col gap-1">
              <span
                className="font-light tracking-tight text-white"
                style={{ fontSize: "clamp(18px, 2vw, 26px)" }}
              >
                {s.v}
              </span>
              <span
                className="font-mono uppercase"
                style={{ fontSize: 9, letterSpacing: "0.35em", color: "rgba(255,255,255,0.25)" }}
              >
                {s.l}
              </span>
            </div>
          ))}
        </motion.div>
      </div>

      {/* ── Edge vignette ── */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-[5]"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 48%, rgba(5,5,5,0.6) 100%)",
        }}
      />

      {/* ── Scroll cue ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 2.2 }}
        className="absolute bottom-8 left-8 z-[7] flex items-center gap-3"
      >
        <motion.div
          style={{ width: 1, height: 32, background: "rgba(255,255,255,0.18)" }}
          animate={{ scaleY: [1, 0.45, 1], transformOrigin: "top" }}
          transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
        />
        <span
          className="font-mono uppercase"
          style={{ fontSize: 9, letterSpacing: "0.42em", color: "rgba(255,255,255,0.18)" }}
        >
          Scroll
        </span>
      </motion.div>
    </section>
  );
}
