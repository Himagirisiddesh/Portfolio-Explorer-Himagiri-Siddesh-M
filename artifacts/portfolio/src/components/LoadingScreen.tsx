import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const GLITCH_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%&";

const ROW_COLORS = [
  "rgba(29,78,216,0.12)",
  "rgba(109,40,217,0.12)",
  "rgba(6,182,212,0.10)",
  "rgba(220,38,38,0.09)",
  "rgba(217,119,6,0.11)",
  "rgba(22,163,74,0.10)",
  "rgba(219,39,119,0.11)",
  "rgba(99,102,241,0.12)",
];

function WatermarkRow({
  top,
  direction,
  speed,
  color,
}: {
  top: string;
  direction: "left" | "right";
  speed: number;
  color: string;
}) {
  const items = Array.from({ length: 12 }, () => "HIMAGIRI SIDDESH   ·   ");

  return (
    <div
      style={{
        position: "absolute",
        top,
        left: 0,
        right: 0,
        overflow: "hidden",
        pointerEvents: "none",
        lineHeight: 1,
      }}
    >
      <motion.div
        style={{ display: "flex", whiteSpace: "nowrap", width: "max-content" }}
        animate={{ x: direction === "left" ? ["0%", "-50%"] : ["-50%", "0%"] }}
        transition={{ duration: speed, repeat: Infinity, ease: "linear" }}
      >
        {[...items, ...items].map((txt, i) => (
          <span
            key={i}
            style={{
              fontSize: "clamp(16px, 2.6vw, 38px)",
              fontWeight: 800,
              color,
              letterSpacing: "0.12em",
              fontFamily: "'Geist', -apple-system, 'Helvetica Neue', sans-serif",
              userSelect: "none",
              paddingRight: "1.5em",
            }}
          >
            {txt}
          </span>
        ))}
      </motion.div>
    </div>
  );
}

function GlitchChar({ finalChar, delay }: { finalChar: string; delay: number }) {
  const [display, setDisplay] = useState(
    GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)]
  );
  const [settled, setSettled] = useState(false);

  useEffect(() => {
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
  }, [finalChar, delay]);

  return (
    <span
      style={{
        display: "inline-block",
        opacity: settled ? 1 : 0.45,
        color: settled ? "#111111" : "#999999",
        transition: "color 0.2s ease, opacity 0.2s ease",
        fontFamily: "'Geist', -apple-system, 'Helvetica Neue', sans-serif",
        letterSpacing: "0.18em",
        fontWeight: 300,
      }}
    >
      {display}
    </span>
  );
}

function ShineEffect({ active }: { active: boolean }) {
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
                "linear-gradient(105deg, transparent 20%, rgba(0,0,0,0.04) 50%, transparent 80%)",
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

function Particle({ index }: { index: number }) {
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
        background: `rgba(0,0,0,${0.12 + Math.random() * 0.2})`,
      }}
      animate={{
        opacity: [0, 0.7, 0],
        scale: [0.5, 1.2, 0.5],
        x: [x - size / 2, x - size / 2 + (Math.random() - 0.5) * 20, x - size / 2],
        y: [y - size / 2, y - size / 2 + (Math.random() - 0.5) * 20, y - size / 2],
      }}
      transition={{ duration, delay, repeat: Infinity, ease: "easeInOut" }}
    />
  );
}

function Capsule({ children, phase }: { children: React.ReactNode; phase: string }) {
  return (
    <motion.div
      style={{
        width: "clamp(320px, 55vw, 640px)",
        height: "clamp(90px, 12vh, 140px)",
        borderRadius: 9999,
        background: "rgba(255,255,255,0.72)",
        border: "1px solid rgba(0,0,0,0.10)",
        backdropFilter: "blur(24px)",
        WebkitBackdropFilter: "blur(24px)",
        boxShadow: "0 8px 40px rgba(0,0,0,0.07), 0 2px 12px rgba(0,0,0,0.05), inset 0 1px 0 rgba(255,255,255,0.9)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        position: "relative",
        zIndex: 10,
      }}
      animate={{
        y: phase === "dissolve" ? -40 : [0, -8, 0],
        scale: phase === "dissolve" ? 0.85 : 1,
        opacity: phase === "dissolve" ? 0 : 1,
        filter: phase === "dissolve" ? "blur(12px)" : "blur(0px)",
      }}
      transition={
        phase === "dissolve"
          ? { duration: 1.0, ease: [0.4, 0, 0.2, 1] }
          : {
              y: { duration: 3.2, repeat: Infinity, ease: "easeInOut" },
              scale: { duration: 0.6 },
              opacity: { duration: 0.6 },
              filter: { duration: 0.6 },
            }
      }
    >
      {children}
    </motion.div>
  );
}

export default function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const [phase, setPhase] = useState("loading");
  const [pct, setPct] = useState(0);
  const [showShine, setShowShine] = useState(false);

  const NAME = "HIMAGIRI SIDDESH";
  const nameChars = NAME.split("").map((ch, i) => ({ ch, i }));

  useEffect(() => {
    if (phase !== "loading") return;
    const start = performance.now();
    const totalMs = 3600;
    let raf: number;
    const tick = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / totalMs, 1);
      const eased =
        progress < 0.5
          ? 4 * progress * progress * progress
          : 1 - Math.pow(-2 * progress + 2, 3) / 2;
      setPct(Math.round(eased * 100));
      if (progress < 1) {
        raf = requestAnimationFrame(tick);
      } else {
        setTimeout(() => setPhase("glitch"), 280);
      }
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [phase]);

  useEffect(() => {
    if (phase !== "glitch") return;
    const t = setTimeout(() => { setPhase("name"); setShowShine(true); }, 900);
    return () => clearTimeout(t);
  }, [phase]);

  useEffect(() => {
    if (phase !== "name") return;
    const t = setTimeout(() => setPhase("dissolve"), 2000);
    return () => clearTimeout(t);
  }, [phase]);

  useEffect(() => {
    if (phase !== "dissolve") return;
    const t = setTimeout(() => { setPhase("done"); onComplete?.(); }, 1200);
    return () => clearTimeout(t);
  }, [phase, onComplete]);

  if (phase === "done") return null;

  const rows = [
    { top: "3%", direction: "left" as const, speed: 28 },
    { top: "14%", direction: "right" as const, speed: 34 },
    { top: "25%", direction: "left" as const, speed: 22 },
    { top: "36%", direction: "right" as const, speed: 30 },
    { top: "50%", direction: "left" as const, speed: 26 },
    { top: "62%", direction: "right" as const, speed: 32 },
    { top: "74%", direction: "left" as const, speed: 24 },
    { top: "85%", direction: "right" as const, speed: 36 },
  ];

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "#ffffff",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        zIndex: 9999,
        fontFamily: "'Geist', -apple-system, 'Helvetica Neue', sans-serif",
      }}
    >
      {/* Colored moving watermark rows */}
      {rows.map((row, i) => (
        <WatermarkRow
          key={i}
          top={row.top}
          direction={row.direction}
          speed={row.speed}
          color={ROW_COLORS[i % ROW_COLORS.length]}
        />
      ))}

      {/* Grid */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "linear-gradient(rgba(0,0,0,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.03) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
          pointerEvents: "none",
          zIndex: 1,
        }}
      />

      {/* Particles */}
      <AnimatePresence>
        {(phase === "loading" || phase === "glitch" || phase === "name") && (
          <motion.div
            className="absolute inset-0 pointer-events-none"
            style={{ zIndex: 2 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
          >
            {Array.from({ length: 20 }).map((_, i) => (
              <Particle key={i} index={i} />
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Capsule */}
      <Capsule phase={phase === "dissolve" ? "dissolve" : "idle"}>
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
              <div style={{ display: "flex", alignItems: "baseline", gap: "12px" }}>
                <span
                  style={{
                    fontSize: "clamp(12px, 1.5vw, 16px)",
                    fontWeight: 300,
                    letterSpacing: "0.32em",
                    color: "rgba(0,0,0,0.38)",
                    textTransform: "uppercase",
                  }}
                >
                  Loading
                </span>
                <span
                  style={{
                    fontSize: "clamp(12px, 1.5vw, 16px)",
                    fontWeight: 400,
                    letterSpacing: "0.12em",
                    color: "rgba(0,0,0,0.75)",
                    minWidth: "3.5ch",
                    textAlign: "right",
                    fontVariantNumeric: "tabular-nums",
                  }}
                >
                  {pct}%
                </span>
              </div>
              <div
                style={{
                  width: "clamp(160px, 28vw, 320px)",
                  height: 1,
                  background: "rgba(0,0,0,0.08)",
                  borderRadius: 1,
                  overflow: "hidden",
                }}
              >
                <motion.div
                  style={{
                    height: "100%",
                    background: "linear-gradient(90deg, rgba(29,78,216,0.5), rgba(109,40,217,0.7))",
                  }}
                  animate={{ width: `${pct}%` }}
                  transition={{ ease: "linear", duration: 0.08 }}
                />
              </div>
            </motion.div>
          )}

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
                  color: "#111111",
                  userSelect: "none",
                  whiteSpace: "nowrap",
                }}
              >
                {nameChars.map(({ ch, i }) =>
                  ch === " " ? (
                    <span key={i} style={{ display: "inline-block", width: "0.6em" }} />
                  ) : (
                    <GlitchChar key={i} finalChar={ch} delay={i * 38} />
                  )
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </Capsule>

      {/* Bottom label */}
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
              color: "rgba(0,0,0,0.2)",
              textTransform: "uppercase",
              whiteSpace: "nowrap",
              zIndex: 5,
            }}
          >
            Portfolio · 2026
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
