import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export function CustomCursor() {
  const [enabled, setEnabled] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [visible, setVisible] = useState(false);
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const ringX = useSpring(x, { stiffness: 520, damping: 32, mass: 0.35 });
  const ringY = useSpring(y, { stiffness: 520, damping: 32, mass: 0.35 });
  const trailX = useSpring(x, { stiffness: 180, damping: 22, mass: 0.8 });
  const trailY = useSpring(y, { stiffness: 180, damping: 22, mass: 0.8 });

  useEffect(() => {
    const media = window.matchMedia("(hover: hover) and (pointer: fine)");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const syncEnabled = () => {
      const nextEnabled = media.matches && !reducedMotion.matches;
      setEnabled(nextEnabled);
      document.body.classList.toggle("custom-cursor", nextEnabled);
    };
    const onMove = (event: PointerEvent) => {
      x.set(event.clientX);
      y.set(event.clientY);
      setVisible(true);
    };
    const onOver = (event: PointerEvent) => {
      const target = event.target as HTMLElement | null;
      setHovered(Boolean(target?.closest("a, button, [role='button'], input, textarea, [data-cursor-hover]")));
    };
    const onOut = () => setHovered(false);

    syncEnabled();
    window.addEventListener("resize", syncEnabled);
    media.addEventListener?.("change", syncEnabled);
    reducedMotion.addEventListener?.("change", syncEnabled);
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerover", onOver, { passive: true });
    window.addEventListener("pointerout", onOut, { passive: true });

    return () => {
      document.body.classList.remove("custom-cursor");
      window.removeEventListener("resize", syncEnabled);
      media.removeEventListener?.("change", syncEnabled);
      reducedMotion.removeEventListener?.("change", syncEnabled);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerover", onOver);
      window.removeEventListener("pointerout", onOut);
    };
  }, [x, y]);

  if (!enabled) return null;

  return (
    <>
      <motion.div
        aria-hidden
        animate={{
          opacity: visible ? 1 : 0,
          scale: hovered ? 0.7 : 1,
          borderColor: hovered ? "rgba(251, 146, 60, 0.98)" : "rgba(125,211,252,0.68)",
          boxShadow: hovered
            ? "0 0 26px rgba(249,115,22,0.58), inset 0 0 15px rgba(236,72,153,0.28)"
            : "0 0 22px rgba(59,130,246,0.34), inset 0 0 12px rgba(139,92,246,0.16)",
        }}
        transition={{ duration: 0.2 }}
        style={{
          position: "fixed",
          zIndex: 10000,
          left: 0,
          top: 0,
          width: 42,
          height: 42,
          marginLeft: -21,
          marginTop: -21,
          borderRadius: "50%",
          border: "1px solid rgba(125,211,252,0.68)",
          boxShadow: "0 0 22px rgba(59,130,246,0.34), inset 0 0 12px rgba(139,92,246,0.16)",
          pointerEvents: "none",
          x: ringX,
          y: ringY,
        }}
      >
        <motion.span
          style={{
            position: "absolute",
            inset: 6,
            borderRadius: "50%",
            border: "1px dashed rgba(167,139,250,0.65)",
          }}
          animate={{
            rotate: 360,
            borderColor: hovered ? "rgba(34, 211, 238, 0.95)" : "rgba(167,139,250,0.65)",
          }}
          transition={{ duration: hovered ? 1.6 : 4.5, repeat: Infinity, ease: "linear" }}
        />
        <span style={{
          position: "absolute",
          left: "50%",
          top: -4,
          width: 1,
          height: 8,
           background: hovered ? "#fb7185" : "#7dd3fc",
           boxShadow: hovered ? "0 0 12px #fb7185" : "0 0 8px #38bdf8",
        }} />
        <span style={{
          position: "absolute",
          left: "50%",
          bottom: -4,
          width: 1,
          height: 8,
           background: hovered ? "#facc15" : "#a78bfa",
           boxShadow: hovered ? "0 0 12px #facc15" : "0 0 8px #8b5cf6",
        }} />
        <motion.span
          style={{
            position: "absolute",
            inset: -9,
            borderRadius: "50%",
            border: "1px dotted rgba(45, 212, 191, 0.7)",
            pointerEvents: "none",
          }}
          animate={{
            opacity: hovered ? 1 : 0.22,
            rotate: -360,
            borderColor: hovered ? "rgba(244, 114, 182, 0.95)" : "rgba(45, 212, 191, 0.7)",
          }}
          transition={{ rotate: { duration: hovered ? 2.2 : 8, repeat: Infinity, ease: "linear" }, opacity: { duration: 0.18 } }}
        />
        <motion.span
          aria-hidden
          style={{
            position: "absolute",
            top: -13,
            left: "50%",
            width: 5,
            height: 5,
            borderRadius: "50%",
            background: hovered ? "#facc15" : "#22d3ee",
            boxShadow: hovered ? "0 0 13px #facc15" : "0 0 9px #22d3ee",
            transform: "translateX(-50%)",
          }}
          animate={{ scale: hovered ? [1, 1.8, 1] : 1, opacity: hovered ? [0.65, 1, 0.65] : 0.6 }}
          transition={{ duration: hovered ? 0.9 : 1.8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.span
          aria-hidden
          style={{
            position: "absolute",
            right: -13,
            top: "50%",
            width: 5,
            height: 5,
            borderRadius: "50%",
            background: hovered ? "#fb7185" : "#a78bfa",
            boxShadow: hovered ? "0 0 13px #fb7185" : "0 0 9px #a78bfa",
            transform: "translateY(-50%)",
          }}
          animate={{ scale: hovered ? [1.8, 1, 1.8] : 1, opacity: hovered ? [1, 0.65, 1] : 0.6 }}
          transition={{ duration: hovered ? 1.1 : 2.1, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.span
          aria-hidden
          style={{
            position: "absolute",
            bottom: -13,
            left: "50%",
            width: 5,
            height: 5,
            borderRadius: "50%",
            background: hovered ? "#34d399" : "#60a5fa",
            boxShadow: hovered ? "0 0 13px #34d399" : "0 0 9px #60a5fa",
            transform: "translateX(-50%)",
          }}
          animate={{ scale: hovered ? [1, 1.7, 1] : 1, opacity: hovered ? [0.7, 1, 0.7] : 0.6 }}
          transition={{ duration: hovered ? 1.3 : 2.4, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>

      <motion.div
        aria-hidden
        animate={{ opacity: visible ? 1 : 0, scale: hovered ? 1.35 : 1 }}
        transition={{ duration: 0.18 }}
        style={{
          position: "fixed",
          zIndex: 10001,
          left: 0,
          top: 0,
          width: 7,
          height: 7,
          marginLeft: -3.5,
          marginTop: -3.5,
          borderRadius: "50%",
          background: "#e0f2fe",
          boxShadow: "0 0 6px #fff, 0 0 18px #38bdf8",
          pointerEvents: "none",
          x,
          y,
        }}
      />

      <motion.div
        aria-hidden
        animate={{ opacity: visible ? 0.42 : 0, rotate: -360 }}
        transition={{ rotate: { duration: 12, repeat: Infinity, ease: "linear" }, opacity: { duration: 0.2 } }}
        style={{
          position: "fixed",
          zIndex: 9999,
          left: 0,
          top: 0,
          width: 78,
          height: 78,
          marginLeft: -39,
          marginTop: -39,
          borderRadius: "50%",
          border: "1px solid rgba(59,130,246,0.18)",
          borderTopColor: "rgba(34,211,238,0.7)",
          borderRightColor: "rgba(139,92,246,0.5)",
          pointerEvents: "none",
          x: trailX,
          y: trailY,
        }}
      />
    </>
  );
}