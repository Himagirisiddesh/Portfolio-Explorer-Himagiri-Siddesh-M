import { useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { Scene3D } from "./Scene3D";

const PORTRAIT_SRC = "/himagiri.png";

/* Magnetic button hook */
function MagneticButton({
  children,
  className,
  href,
  onClick,
  "data-testid": testId,
}: {
  children: React.ReactNode;
  className?: string;
  href?: string;
  onClick?: () => void;
  "data-testid"?: string;
}) {
  const ref = useRef<HTMLAnchorElement & HTMLButtonElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 300, damping: 20 });
  const sy = useSpring(y, { stiffness: 300, damping: 20 });

  const handleMouse = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    x.set((e.clientX - rect.left - rect.width / 2) * 0.25);
    y.set((e.clientY - rect.top - rect.height / 2) * 0.25);
  };

  const handleLeave = () => { x.set(0); y.set(0); };

  const motionProps = {
    ref,
    style: { x: sx, y: sy },
    onMouseMove: handleMouse,
    onMouseLeave: handleLeave,
    className,
    "data-testid": testId,
  };

  if (href) {
    return (
      <motion.a {...motionProps} href={href}>
        {children}
      </motion.a>
    );
  }
  return (
    <motion.button {...motionProps} onClick={onClick}>
      {children}
    </motion.button>
  );
}

/* Animated character reveal */
function RevealText({
  text,
  delay = 0,
  className,
}: {
  text: string;
  delay?: number;
  className?: string;
}) {
  return (
    <span className={className} style={{ display: "inline-block", overflow: "hidden" }}>
      <motion.span
        display="block"
        initial={{ y: "110%", opacity: 0 }}
        animate={{ y: "0%", opacity: 1 }}
        transition={{ duration: 0.75, delay, ease: [0.22, 1, 0.36, 1] }}
        style={{ display: "block" }}
      >
        {text}
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
      className="relative min-h-screen overflow-hidden"
      style={{ background: "#050505" }}
    >
      {/* ── Layer 0: animated ambient glows ── */}
      <Scene3D />

      {/* ── Layer 1: grain/noise texture ── */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-[1]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E")`,
          backgroundSize: "200px 200px",
          opacity: 0.028,
          mixBlendMode: "overlay",
        }}
      />

      {/* ── Layer 2: oversized watermark typography (behind portrait) ── */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-[2] flex flex-col justify-center overflow-hidden select-none"
      >
        <motion.div
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.4, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          style={{
            fontSize: "clamp(80px, 16vw, 240px)",
            fontWeight: 800,
            letterSpacing: "-0.04em",
            lineHeight: 0.92,
            textAlign: "right",
            paddingRight: "4vw",
            userSelect: "none",
          }}
        >
          <div style={{ color: "rgba(255,255,255,0.045)" }}>HIMAGIRI</div>
          <div style={{ color: "rgba(255,255,255,0.028)" }}>SIDDESH</div>
        </motion.div>
      </div>

      {/* ── Layer 3: portrait + bottom fade ── */}
      <motion.div
        className="absolute z-[3] pointer-events-none"
        style={{ right: "2vw", bottom: 0, height: "100vh", display: "flex", alignItems: "flex-end" }}
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.1, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* Blue rim glow behind portrait */}
        <div
          aria-hidden
          style={{
            position: "absolute",
            inset: "-10% -8%",
            background:
              "radial-gradient(ellipse at 55% 40%, rgba(37,99,235,0.28) 0%, rgba(124,58,237,0.12) 45%, transparent 70%)",
            filter: "blur(32px)",
            zIndex: 0,
          }}
        />

        {/* Portrait image - floating */}
        <motion.img
          src={PORTRAIT_SRC}
          alt="Himagiri Siddesh"
          data-testid="img-profile"
          draggable={false}
          animate={{ y: [0, -14, 0] }}
          transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
          style={{
            position: "relative",
            zIndex: 1,
            height: "clamp(420px, 88vh, 860px)",
            width: "auto",
            objectFit: "contain",
            objectPosition: "bottom center",
            filter:
              "drop-shadow(-6px 0 28px rgba(37,99,235,0.5)) drop-shadow(6px 0 20px rgba(124,58,237,0.3)) drop-shadow(0 -8px 32px rgba(37,99,235,0.2))",
          }}
        />

        {/* Bottom-fade gradient: portrait fades into page bg */}
        <div
          aria-hidden
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: "38%",
            background: "linear-gradient(to top, #050505 0%, rgba(5,5,5,0.75) 40%, transparent 100%)",
            zIndex: 2,
            pointerEvents: "none",
          }}
        />
      </motion.div>

      {/* ── Layer 4: left content ── */}
      <div className="relative z-[4] container mx-auto px-8 min-h-screen flex items-center">
        <div className="max-w-[520px] pt-24 pb-16">

          {/* Label */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="flex items-center gap-3 mb-8"
          >
            <div className="w-5 h-[1px]" style={{ background: "rgba(99,130,246,0.7)" }} />
            <span
              className="font-mono text-[10px] tracking-[0.4em] uppercase"
              style={{ color: "rgba(147,197,253,0.65)" }}
            >
              AI&nbsp;•&nbsp;ML&nbsp;•&nbsp;Full Stack
            </span>
          </motion.div>

          {/* Heading */}
          <div className="mb-6 overflow-hidden">
            <div className="font-mono text-sm tracking-[0.25em] uppercase mb-3" style={{ color: "rgba(255,255,255,0.35)" }}>
              <RevealText text="Hello, I'm" delay={0.5} />
            </div>
            <h1
              className="font-light leading-[1.05] tracking-tight"
              style={{ fontSize: "clamp(40px, 6vw, 72px)", color: "#ffffff" }}
            >
              <RevealText text="Himagiri" delay={0.6} />
              <RevealText text="Siddesh" delay={0.72} />
            </h1>
          </div>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.9 }}
            className="font-mono text-xs tracking-widest uppercase mb-6"
            style={{ color: "rgba(255,255,255,0.38)" }}
          >
            MCA Student &nbsp;|&nbsp; AI/ML Engineer &nbsp;|&nbsp; Full Stack Developer
          </motion.p>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1.05 }}
            className="font-light leading-relaxed mb-10"
            style={{ fontSize: "clamp(15px, 1.6vw, 18px)", color: "rgba(255,255,255,0.48)", maxWidth: "420px" }}
          >
            Building intelligent systems, modern web applications,
            and scalable digital experiences.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1.22 }}
            className="flex flex-wrap gap-4"
          >
            <MagneticButton
              data-testid="button-projects"
              onClick={() => scrollTo("projects")}
              className="px-7 py-3.5 font-mono text-[11px] uppercase tracking-[0.2em] text-black transition-opacity hover:opacity-90"
              style={{
                background: "linear-gradient(135deg, #ffffff 0%, rgba(255,255,255,0.92) 100%)",
              } as React.CSSProperties}
            >
              View Projects
            </MagneticButton>

            <MagneticButton
              data-testid="button-resume"
              href="mailto:himagirisiddesh@gmail.com"
              className="px-7 py-3.5 font-mono text-[11px] uppercase tracking-[0.2em] transition-all"
              style={{
                border: "1px solid rgba(255,255,255,0.15)",
                color: "rgba(255,255,255,0.65)",
                background: "rgba(255,255,255,0.03)",
              } as React.CSSProperties}
            >
              Download Resume
            </MagneticButton>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.5 }}
            className="flex gap-10 mt-14 pt-10"
            style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
          >
            {[
              { value: "9.39", label: "CGPA" },
              { value: "2+", label: "Internships" },
              { value: "4+", label: "Projects" },
            ].map((s) => (
              <div key={s.label} className="flex flex-col gap-1">
                <span
                  className="font-light tracking-tight"
                  style={{ fontSize: "clamp(20px, 2.5vw, 28px)", color: "#ffffff" }}
                >
                  {s.value}
                </span>
                <span
                  className="font-mono text-[9px] tracking-[0.35em] uppercase"
                  style={{ color: "rgba(255,255,255,0.28)" }}
                >
                  {s.label}
                </span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* ── Vignette edges ── */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-[5]"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 50%, rgba(5,5,5,0.55) 100%)",
        }}
      />

      {/* ── Scroll hint ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 2 }}
        className="absolute bottom-8 left-8 z-[6] flex items-center gap-3"
      >
        <motion.div
          className="w-[1px]"
          style={{ background: "rgba(255,255,255,0.2)", height: "36px" }}
          animate={{ scaleY: [1, 0.5, 1], transformOrigin: "top" }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />
        <span
          className="font-mono text-[9px] tracking-[0.4em] uppercase"
          style={{ color: "rgba(255,255,255,0.2)" }}
        >
          Scroll
        </span>
      </motion.div>
    </section>
  );
}
