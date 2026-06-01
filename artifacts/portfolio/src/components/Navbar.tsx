import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const NAV_ITEMS = [
  { name: "About",        id: "hero" },
  { name: "Education",    id: "education" },
  { name: "Skills",       id: "skills" },
  { name: "Projects",     id: "projects" },
  { name: "Experience",   id: "experience" },
  { name: "Achievements", id: "achievements" },
  { name: "Contact",      id: "contact" },
];

/* ── Orbiting dot around the logo ── */
function OrbitDot({ angle, radius, size, color, duration }: {
  angle: number; radius: number; size: number; color: string; duration: number;
}) {
  return (
    <motion.div
      aria-hidden
      style={{
        position: "absolute",
        width: size, height: size,
        borderRadius: "50%",
        background: color,
        boxShadow: `0 0 6px ${color}`,
        top: "50%", left: "50%",
        marginLeft: -size / 2, marginTop: -size / 2,
      }}
      animate={{
        x: [
          Math.cos((angle * Math.PI) / 180) * radius,
          Math.cos(((angle + 120) * Math.PI) / 180) * radius,
          Math.cos(((angle + 240) * Math.PI) / 180) * radius,
          Math.cos((angle * Math.PI) / 180) * radius,
        ],
        y: [
          Math.sin((angle * Math.PI) / 180) * radius,
          Math.sin(((angle + 120) * Math.PI) / 180) * radius,
          Math.sin(((angle + 240) * Math.PI) / 180) * radius,
          Math.sin((angle * Math.PI) / 180) * radius,
        ],
      }}
      transition={{ duration, repeat: Infinity, ease: "linear" }}
    />
  );
}

/* ── Floating particle ── */
function Particle({ x, y, delay }: { x: string; y: number; delay: number }) {
  return (
    <motion.div
      aria-hidden
      style={{
        position: "absolute",
        left: x, top: y,
        width: 2, height: 2,
        borderRadius: "50%",
        background: "rgba(255,255,255,0.35)",
      }}
      animate={{ opacity: [0, 1, 0], y: [0, -8, 0], scale: [0.5, 1.2, 0.5] }}
      transition={{ duration: 2.5 + delay, repeat: Infinity, delay, ease: "easeInOut" }}
    />
  );
}

export function Navbar() {
  const [scrolled, setScrolled]   = useState(false);
  const [activeId, setActiveId]   = useState("hero");
  const [hovered, setHovered]     = useState<string | null>(null);
  const [menuOpen, setMenuOpen]   = useState(false);
  const observersRef              = useRef<IntersectionObserver[]>([]);

  /* Track scroll for background */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* Track active section */
  useEffect(() => {
    observersRef.current.forEach((o) => o.disconnect());
    observersRef.current = [];

    NAV_ITEMS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveId(id); },
        { rootMargin: "-40% 0px -55% 0px" }
      );
      obs.observe(el);
      observersRef.current.push(obs);
    });
    return () => observersRef.current.forEach((o) => o.disconnect());
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.9, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
        style={{
          position: "fixed", top: 0, left: 0, right: 0, zIndex: 50,
          transition: "all 0.4s cubic-bezier(0.4,0,0.2,1)",
          background: scrolled
            ? "rgba(5,5,5,0.88)"
            : "transparent",
          backdropFilter: scrolled ? "blur(20px) saturate(180%)" : "none",
          borderBottom: scrolled ? "1px solid rgba(255,255,255,0.06)" : "1px solid transparent",
          padding: scrolled ? "14px 0" : "24px 0",
        }}
      >
        {/* Animated top edge line when scrolled */}
        <AnimatePresence>
          {scrolled && (
            <motion.div
              key="topline"
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: 1 }}
              exit={{ scaleX: 0, opacity: 0 }}
              transition={{ duration: 0.5 }}
              style={{
                position: "absolute", top: 0, left: 0, right: 0, height: 1,
                background: "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.12) 30%, rgba(99,179,237,0.25) 50%, rgba(255,255,255,0.12) 70%, transparent 100%)",
                transformOrigin: "left",
              }}
            />
          )}
        </AnimatePresence>

        {/* Floating particles */}
        <div style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none" }}>
          <Particle x="10%"  y={8}  delay={0} />
          <Particle x="25%"  y={14} delay={0.7} />
          <Particle x="50%"  y={6}  delay={1.4} />
          <Particle x="72%"  y={16} delay={0.4} />
          <Particle x="88%"  y={9}  delay={1.1} />
        </div>

        <div
          className="container mx-auto"
          style={{ maxWidth: 1200, padding: "0 24px", display: "flex", alignItems: "center", justifyContent: "space-between" }}
        >
          {/* ── Logo ── */}
          <button
            onClick={() => scrollTo("hero")}
            style={{ background: "none", border: "none", cursor: "pointer", position: "relative", width: 48, height: 48, display: "flex", alignItems: "center", justifyContent: "center" }}
          >
            {/* Orbit ring */}
            <motion.div
              aria-hidden
              style={{
                position: "absolute", width: 40, height: 40, borderRadius: "50%",
                border: "1px solid rgba(255,255,255,0.08)",
              }}
              animate={{ rotate: 360 }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            />
            {/* Orbiting dot */}
            <OrbitDot angle={0} radius={20} size={3} color="rgba(99,179,237,0.9)" duration={4} />
            <OrbitDot angle={180} radius={20} size={2} color="rgba(167,139,250,0.8)" duration={4} />

            {/* Logo text */}
            <motion.span
              style={{
                fontFamily: "monospace", fontSize: 13, fontWeight: 700,
                letterSpacing: "0.12em", textTransform: "uppercase",
                color: "#ffffff", position: "relative", zIndex: 1,
              }}
              animate={{ textShadow: ["0 0 0px transparent", "0 0 16px rgba(255,255,255,0.4)", "0 0 0px transparent"] }}
              transition={{ duration: 3.5, repeat: Infinity }}
            >
              HS.
            </motion.span>
          </button>

          {/* ── Desktop Nav Items ── */}
          <div style={{ display: "flex", alignItems: "center", gap: 2 }}>
            {/* Decorative left bracket */}
            <motion.span
              aria-hidden
              style={{ fontFamily: "monospace", fontSize: 11, color: "rgba(255,255,255,0.12)", marginRight: 8 }}
              animate={{ opacity: [0.3, 0.7, 0.3] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              [
            </motion.span>

            {NAV_ITEMS.map((item, i) => {
              const isActive = activeId === item.id;
              const isHovered = hovered === item.id;
              return (
                <motion.button
                  key={item.id}
                  onClick={() => scrollTo(item.id)}
                  onMouseEnter={() => setHovered(item.id)}
                  onMouseLeave={() => setHovered(null)}
                  initial={{ opacity: 0, y: -12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.7 + i * 0.06 }}
                  style={{
                    position: "relative", background: "none", border: "none",
                    cursor: "pointer", padding: "8px 11px",
                    fontFamily: "monospace", fontSize: 9.5,
                    letterSpacing: "0.28em", textTransform: "uppercase",
                    color: isActive
                      ? "#ffffff"
                      : isHovered
                      ? "rgba(255,255,255,0.85)"
                      : "rgba(255,255,255,0.38)",
                    transition: "color 0.25s",
                  }}
                >
                  {/* Active glow bg */}
                  <AnimatePresence>
                    {isActive && (
                      <motion.div
                        key="active-bg"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        transition={{ duration: 0.3 }}
                        style={{
                          position: "absolute", inset: 0, borderRadius: 6,
                          background: "rgba(255,255,255,0.055)",
                          border: "1px solid rgba(255,255,255,0.08)",
                        }}
                      />
                    )}
                  </AnimatePresence>

                  {/* Hover bg */}
                  <AnimatePresence>
                    {isHovered && !isActive && (
                      <motion.div
                        key="hover-bg"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        style={{
                          position: "absolute", inset: 0, borderRadius: 6,
                          background: "rgba(255,255,255,0.028)",
                        }}
                      />
                    )}
                  </AnimatePresence>

                  <span style={{ position: "relative", zIndex: 1 }}>{item.name}</span>

                  {/* Active dot indicator */}
                  <AnimatePresence>
                    {isActive && (
                      <motion.div
                        key="dot"
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0 }}
                        transition={{ duration: 0.3 }}
                        style={{
                          position: "absolute", bottom: 2, left: "50%",
                          transform: "translateX(-50%)",
                          width: 3, height: 3, borderRadius: "50%",
                          background: "#63b3ed",
                          boxShadow: "0 0 8px rgba(99,179,237,0.8)",
                        }}
                      />
                    )}
                  </AnimatePresence>

                  {/* Hover underline */}
                  <AnimatePresence>
                    {isHovered && (
                      <motion.div
                        key="underline"
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        exit={{ scaleX: 0 }}
                        transition={{ duration: 0.2 }}
                        style={{
                          position: "absolute", bottom: 2, left: "15%", right: "15%",
                          height: 1,
                          background: "rgba(255,255,255,0.3)",
                          transformOrigin: "center",
                        }}
                      />
                    )}
                  </AnimatePresence>
                </motion.button>
              );
            })}

            {/* Decorative right bracket */}
            <motion.span
              aria-hidden
              style={{ fontFamily: "monospace", fontSize: 11, color: "rgba(255,255,255,0.12)", marginLeft: 8 }}
              animate={{ opacity: [0.3, 0.7, 0.3] }}
              transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
            >
              ]
            </motion.span>
          </div>

          {/* ── Hire Me button ── */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 1.2 }}
            style={{ position: "relative" }}
          >
            {/* Animated border glow */}
            <motion.div
              aria-hidden
              style={{
                position: "absolute", inset: -1, borderRadius: 3,
                background: "linear-gradient(135deg, rgba(99,179,237,0.5), rgba(167,139,250,0.5), rgba(99,179,237,0.5))",
                backgroundSize: "200% 200%",
              }}
              animate={{ backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"] }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            />
            <motion.a
              href="mailto:himagirisiddesh@gmail.com?subject=Opportunity%20for%20Himagiri%20Siddesh"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              style={{
                position: "relative",
                display: "block",
                fontFamily: "monospace", fontSize: 9.5,
                letterSpacing: "0.28em", textTransform: "uppercase",
                color: "rgba(255,255,255,0.75)",
                background: "rgba(5,5,5,0.95)",
                border: "none",
                padding: "9px 18px",
                textDecoration: "none",
                cursor: "pointer",
                transition: "color 0.2s",
                borderRadius: 2,
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.color = "#fff";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.color = "rgba(255,255,255,0.75)";
              }}
            >
              Hire Me
            </motion.a>
          </motion.div>
        </div>
      </motion.nav>

      {/* ── Mobile nav overlay ── (hidden on large screens) */}
    </>
  );
}
