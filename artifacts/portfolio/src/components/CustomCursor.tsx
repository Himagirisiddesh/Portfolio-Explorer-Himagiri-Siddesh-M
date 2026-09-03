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
      setHovered(Boolean(target?.closest("a, button, [role='button'], input, textarea")));
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
        animate={{ opacity: visible ? 1 : 0, scale: hovered ? 0.7 : 1 }}
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
          animate={{ rotate: 360 }}
          transition={{ duration: 4.5, repeat: Infinity, ease: "linear" }}
        />
        <span style={{
          position: "absolute",
          left: "50%",
          top: -4,
          width: 1,
          height: 8,
          background: "#7dd3fc",
          boxShadow: "0 0 8px #38bdf8",
        }} />
        <span style={{
          position: "absolute",
          left: "50%",
          bottom: -4,
          width: 1,
          height: 8,
          background: "#a78bfa",
          boxShadow: "0 0 8px #8b5cf6",
        }} />
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