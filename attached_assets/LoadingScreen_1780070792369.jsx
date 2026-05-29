import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useAnimation } from "framer-motion";
import { gsap } from "gsap";

/* ─────────────────────────────────────────────
   PARTICLE  –  tiny floating dot
───────────────────────────────────────────── */
function Particle({ index }) {
  const angle = (index / 28) * 360;
  const radius = 140 + Math.random() * 80;
  const x = Math.cos((angle * Math.PI) / 180) * radius;
  const y = Math.sin((angle * Math.PI) / 180) * radius;
  const size = 1.5 + Math.random() * 2;
  const delay = Math.random() * 3;
  const duration = 2.5 + Math.random() * 2.5;

  return (
    <motion.div
      className="absolute rounded-full"
      style={{
        width: size,
        height: size,
        left: "50%",
        top: "50%",
        x: x - size / 2,
        y: y - size / 2,
        background: `rgba(255,255,255,${0.2 + Math.random() * 0.5})`,
        boxShadow: `0 0 ${size * 3}px rgba(255,255,255,0.6)`,
      }}
      animate={{
        opacity: [0, 0.8, 0],
        scale: [0.5, 1.2, 0.5],
        x: [x - size / 2, x - size / 2 + (Math.random() - 0.5) * 20, x - size / 2],
        y: [y - size / 2, y - size / 2 + (Math.random() - 0.5) * 20, y - size / 2],
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
  );
}

/* ─────────────────────────────────────────────
   GLITCH CHAR  –  morphing letter
───────────────────────────────────────────── */
const GLITCH_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%&";

function GlitchChar({ finalChar, delay, isSpace }) {
  const [display, setDisplay] = useState(
    isSpace ? " " : GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)]
  );
  const [settled, setSettled] = useState(false);

  useEffect(() => {
    if (isSpace) { setDisplay(" "); setSettled(true); return; }
    let frame = 0;
    const totalFrames = 18;
    const timer = setTimeout(() => {
      const interval = setInterval(() => {
        frame++;
        if (frame >= totalFrames) {
          setDisplay(finalChar);
          setSettled(true);
          clearInterval(interval);
        } else {
          setDisplay(GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)]);
        }
      }, 40);
      return () => clearInterval(interval);
    }, delay);
    return () => clearTimeout(timer);
  }, [finalChar, delay, isSpace]);

  return (
    <span
      style={{
        display: "inline-block",
        opacity: settled ? 1 : 0.7,
        color: settled ? "#ffffff" : "#aaaaaa",
        transition: "color 0.2s ease, opacity 0.2s ease",
        fontFamily: "'SF Pro Display', -apple-system, 'Helvetica Neue', sans-serif",
        letterSpacing: "0.18em",
        fontWeight: 300,
      }}
    >
      {display}
    </span>
  );
}

/* ─────────────────────────────────────────────
   SHINE OVERLAY
───────────────────────────────────────────── */
function ShineEffect({ active }) {
  return (
    <AnimatePresence>
      {active && (
        <motion.div
          className="absolute inset-0 pointer-events-none overflow-hidden rounded-[inherit]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            style={{
              position: "absolute",
              top: 0,
              left: "-100%",
              width: "60%",
              height: "100%",
              background:
                "linear-gradient(105deg, transparent 20%, rgba(255,255,255,0.08) 50%, transparent 80%)",
              transform: "skewX(-15deg)",
            }}
            animate={{ left: "200%" }}
            transition={{ duration: 1.4, ease: [0.4, 0, 0.2, 1], delay: 0.3 }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ─────────────────────────────────────────────
   CAPSULE  –  the glass container
───────────────────────────────────────────── */
function Capsule({ children, phase }) {
  return (
    <motion.div
      className="relative"
      style={{
        width: "clamp(320px, 55vw, 640px)",
        height: "clamp(90px, 12vh, 140px)",
        borderRadius: 9999,
        background:
          "linear-gradient(135deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 100%)",
        border: "1px solid rgba(255,255,255,0.10)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        boxShadow:
          "0 0 0 1px rgba(255,255,255,0.04), 0 8px 40px rgba(0,0,0,0.6), 0 0 80px rgba(255,255,255,0.03), inset 0 1px 0 rgba(255,255,255,0.08)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
      }}
      animate={{
        y: phase === "dissolve" ? -40 : [0, -8, 0],
        scale: phase === "dissolve" ? 0.85 : 1,
        opacity: phase === "dissolve" ? 0 : 1,
        filter:
          phase === "dissolve"
            ? "blur(12px)"
            : "blur(0px)",
      }}
      transition={
        phase === "dissolve"
          ? { duration: 1.2, ease: [0.4, 0, 0.2, 1] }
          : {
              y: { duration: 3.2, repeat: Infinity, ease: "easeInOut" },
              scale: { duration: 0.6 },
              opacity: { duration: 0.6 },
              filter: { duration: 0.6 },
            }
      }
    >
      {/* inner highlight ring */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          borderRadius: 9999,
          background:
            "radial-gradient(ellipse at 30% 20%, rgba(255,255,255,0.05) 0%, transparent 60%)",
          pointerEvents: "none",
        }}
      />
      {children}
    </motion.div>
  );
}

/* ─────────────────────────────────────────────
   AMBIENT GLOW
───────────────────────────────────────────── */
function AmbientGlow({ phase }) {
  return (
    <motion.div
      className="absolute pointer-events-none"
      style={{
        width: "clamp(400px, 70vw, 800px)",
        height: "clamp(400px, 70vw, 800px)",
        borderRadius: "50%",
        background:
          "radial-gradient(ellipse, rgba(255,255,255,0.035) 0%, transparent 65%)",
        filter: "blur(40px)",
      }}
      animate={{
        scale: phase === "dissolve" ? 2 : [1, 1.08, 1],
        opacity: phase === "dissolve" ? 0 : [0.6, 1, 0.6],
      }}
      transition={
        phase === "dissolve"
          ? { duration: 1.2, ease: "easeInOut" }
          : { duration: 3.6, repeat: Infinity, ease: "easeInOut" }
      }
    />
  );
}

/* ─────────────────────────────────────────────
   PROGRESS BAR
───────────────────────────────────────────── */
function ProgressBar({ pct }) {
  return (
    <div
      style={{
        position: "absolute",
        bottom: "22%",
        left: "50%",
        transform: "translateX(-50%)",
        width: "clamp(200px, 35vw, 380px)",
        height: 1,
        background: "rgba(255,255,255,0.08)",
        borderRadius: 1,
        overflow: "hidden",
      }}
    >
      <motion.div
        style={{
          height: "100%",
          background:
            "linear-gradient(90deg, rgba(255,255,255,0.4), rgba(255,255,255,0.9))",
          borderRadius: 1,
          boxShadow: "0 0 8px rgba(255,255,255,0.5)",
        }}
        animate={{ width: `${pct}%` }}
        transition={{ ease: "linear", duration: 0.1 }}
      />
    </div>
  );
}

/* ─────────────────────────────────────────────
   MAIN LOADING SCREEN
───────────────────────────────────────────── */
export default function LoadingScreen({ onComplete }) {
  // phases: "loading" | "glitch" | "name" | "dissolve" | "white" | "done"
  const [phase, setPhase] = useState("loading");
  const [pct, setPct] = useState(0);
  const [showShine, setShowShine] = useState(false);
  const containerRef = useRef(null);
  const whiteRef = useRef(null);
  const masterTL = useRef(null);

  const NAME = "HIMAGIRI SIDDESH";
  const nameChars = NAME.split("").map((ch, i) => ({ ch, i }));

  /* ── percentage counter ── */
  useEffect(() => {
    if (phase !== "loading") return;
    const start = performance.now();
    const totalMs = 4200;
    let raf;
    const tick = (now) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / totalMs, 1);
      // ease-in-out cubic
      const eased =
        progress < 0.5
          ? 4 * progress * progress * progress
          : 1 - Math.pow(-2 * progress + 2, 3) / 2;
      const newPct = Math.round(eased * 100);
      setPct(newPct);
      if (progress < 1) {
        raf = requestAnimationFrame(tick);
      } else {
        // loading done → brief pause then glitch
        setTimeout(() => setPhase("glitch"), 320);
      }
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [phase]);

  /* ── after glitch → name → dissolve → white → done ── */
  useEffect(() => {
    if (phase !== "glitch") return;
    // glitch duration ~ 800 ms (longest char delay 700 + 18*40=720)
    const nameTimer = setTimeout(() => {
      setPhase("name");
      setShowShine(true);
    }, 900);
    return () => clearTimeout(nameTimer);
  }, [phase]);

  useEffect(() => {
    if (phase !== "name") return;
    const dissolveTimer = setTimeout(() => setPhase("dissolve"), 2200);
    return () => clearTimeout(dissolveTimer);
  }, [phase]);

  /* ── GSAP white flash ── */
  useEffect(() => {
    if (phase !== "dissolve") return;
    // after capsule dissolve animation (1.2s), trigger white flash
    const gsapTimer = setTimeout(() => {
      if (!whiteRef.current) return;
      masterTL.current = gsap.timeline({
        onComplete: () => {
          setPhase("done");
          onComplete?.();
        },
      });
      masterTL.current
        .set(whiteRef.current, { display: "block", opacity: 0 })
        .to(whiteRef.current, {
          opacity: 1,
          duration: 0.9,
          ease: "power2.inOut",
        })
        .to(whiteRef.current, {
          opacity: 1,
          duration: 1.0, // hold white
        })
        .to(whiteRef.current, {
          opacity: 0,
          duration: 0.5,
          ease: "power2.inOut",
        });
    }, 1000);
    return () => clearTimeout(gsapTimer);
  }, [phase, onComplete]);

  if (phase === "done") return null;

  return (
    <div
      ref={containerRef}
      style={{
        position: "fixed",
        inset: 0,
        background: "#000000",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        zIndex: 9999,
        fontFamily: "'SF Pro Display', -apple-system, 'Helvetica Neue', sans-serif",
      }}
    >
      {/* GSAP white overlay */}
      <div
        ref={whiteRef}
        style={{
          position: "absolute",
          inset: 0,
          background: "#ffffff",
          display: "none",
          opacity: 0,
          zIndex: 100,
          pointerEvents: "none",
        }}
      />

      {/* Subtle grid texture */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.012) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.012) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
          pointerEvents: "none",
        }}
      />

      {/* Particles */}
      <AnimatePresence>
        {(phase === "loading" || phase === "glitch" || phase === "name") && (
          <motion.div
            className="absolute inset-0 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
          >
            {Array.from({ length: 28 }).map((_, i) => (
              <Particle key={i} index={i} />
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Ambient glow behind capsule */}
      <AmbientGlow phase={phase} />

      {/* CAPSULE */}
      <Capsule phase={phase === "dissolve" ? "dissolve" : "idle"}>
        {/* Loading phase */}
        <AnimatePresence mode="wait">
          {phase === "loading" && (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.4 }}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "10px",
                width: "100%",
                padding: "0 40px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "baseline",
                  gap: "12px",
                }}
              >
                <span
                  style={{
                    fontSize: "clamp(13px, 1.6vw, 17px)",
                    fontWeight: 300,
                    letterSpacing: "0.32em",
                    color: "rgba(255,255,255,0.55)",
                    textTransform: "uppercase",
                  }}
                >
                  Loading
                </span>
                <motion.span
                  style={{
                    fontSize: "clamp(13px, 1.6vw, 17px)",
                    fontWeight: 300,
                    letterSpacing: "0.12em",
                    color: "rgba(255,255,255,0.9)",
                    minWidth: "3.5ch",
                    textAlign: "right",
                    fontVariantNumeric: "tabular-nums",
                  }}
                >
                  {pct}%
                </motion.span>
              </div>

              {/* progress track inside capsule */}
              <div
                style={{
                  width: "clamp(160px, 28vw, 320px)",
                  height: 1,
                  background: "rgba(255,255,255,0.10)",
                  borderRadius: 1,
                  overflow: "hidden",
                }}
              >
                <motion.div
                  style={{
                    height: "100%",
                    background:
                      "linear-gradient(90deg, rgba(255,255,255,0.35), rgba(255,255,255,0.85))",
                    boxShadow: "0 0 6px rgba(255,255,255,0.45)",
                  }}
                  animate={{ width: `${pct}%` }}
                  transition={{ ease: "linear", duration: 0.08 }}
                />
              </div>
            </motion.div>
          )}

          {/* Glitch → name phase */}
          {(phase === "glitch" || phase === "name") && (
            <motion.div
              key="name"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.2 }}
              style={{
                position: "relative",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "100%",
                padding: "0 32px",
              }}
            >
              <ShineEffect active={showShine} />
              <div
                style={{
                  fontSize: "clamp(15px, 2.2vw, 26px)",
                  fontWeight: 200,
                  letterSpacing: "0.20em",
                  color: "#ffffff",
                  userSelect: "none",
                  whiteSpace: "nowrap",
                }}
              >
                {nameChars.map(({ ch, i }) =>
                  ch === " " ? (
                    <span key={i} style={{ display: "inline-block", width: "0.6em" }} />
                  ) : (
                    <GlitchChar
                      key={i}
                      finalChar={ch}
                      delay={i * 38}
                      isSpace={false}
                    />
                  )
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </Capsule>

      {/* Bottom micro label */}
      <AnimatePresence>
        {phase === "loading" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            style={{
              position: "absolute",
              bottom: "clamp(24px, 5vh, 48px)",
              left: "50%",
              transform: "translateX(-50%)",
              fontSize: "10px",
              letterSpacing: "0.42em",
              color: "rgba(255,255,255,0.2)",
              textTransform: "uppercase",
              whiteSpace: "nowrap",
            }}
          >
            Portfolio · 2025
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
