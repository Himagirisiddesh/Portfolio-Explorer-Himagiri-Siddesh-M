import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const NAV_ITEMS = [
  { name: "About",        id: "hero",         num: "01" },
  { name: "Education",    id: "education",    num: "02" },
  { name: "Skills",       id: "skills",       num: "03" },
  { name: "Projects",     id: "projects",     num: "04" },
  { name: "Experience",   id: "experience",   num: "05" },
  { name: "Achievements", id: "achievements", num: "06" },
  { name: "Contact",      id: "contact",      num: "07" },
];

/* ── Logo hex geometry ── */
function LogoMark({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      aria-label="Go to top"
      style={{ background: "none", border: "none", cursor: "pointer", padding: 0, display: "flex", alignItems: "center", gap: 10 }}
    >
      <div style={{ position: "relative", width: 36, height: 36 }}>
        {/* Spinning outer hex ring */}
        <motion.svg
          viewBox="0 0 36 36"
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
          animate={{ rotate: 360 }}
          transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
        >
          <polygon
            points="18,2 32,10 32,26 18,34 4,26 4,10"
            fill="none"
            stroke="rgba(99,179,237,0.25)"
            strokeWidth="1"
            strokeDasharray="4 3"
          />
        </motion.svg>

        {/* Counter-rotating inner hex */}
        <motion.svg
          viewBox="0 0 36 36"
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
          animate={{ rotate: -360 }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
        >
          <polygon
            points="18,7 28,13 28,23 18,29 8,23 8,13"
            fill="none"
            stroke="rgba(167,139,250,0.3)"
            strokeWidth="0.8"
          />
        </motion.svg>

        {/* Center pulse */}
        <motion.svg
          viewBox="0 0 36 36"
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 2.5, repeat: Infinity }}
        >
          <circle cx="18" cy="18" r="3" fill="rgba(99,179,237,0.9)" />
          <circle cx="18" cy="18" r="6" fill="none" stroke="rgba(99,179,237,0.3)" strokeWidth="0.8"/>
        </motion.svg>

        {/* Corner sparks */}
        {[[18,2],[32,10],[32,26],[18,34],[4,26],[4,10]].map(([cx,cy], i) => (
          <motion.div
            key={i}
            aria-hidden
            style={{
              position: "absolute",
              width: 3, height: 3, borderRadius: "50%",
              background: i % 2 === 0 ? "rgba(99,179,237,0.9)" : "rgba(167,139,250,0.9)",
              left: `${(cx / 36) * 100}%`,
              top:  `${(cy / 36) * 100}%`,
              transform: "translate(-50%,-50%)",
              boxShadow: `0 0 5px ${i % 2 === 0 ? "rgba(99,179,237,0.8)" : "rgba(167,139,250,0.8)"}`,
            }}
            animate={{ opacity: [0.2, 1, 0.2], scale: [0.6, 1.4, 0.6] }}
            transition={{ duration: 1.8, repeat: Infinity, delay: i * 0.3 }}
          />
        ))}
      </div>

      {/* HS text + tagline */}
      <div style={{ display: "flex", flexDirection: "column", gap: 0, lineHeight: 1 }}>
        <motion.span
          style={{
            fontFamily: "monospace", fontSize: 14, fontWeight: 800,
            letterSpacing: "0.14em", color: "#ffffff",
          }}
          animate={{ textShadow: ["0 0 0px transparent", "0 0 20px rgba(99,179,237,0.5)", "0 0 0px transparent"] }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          HS
        </motion.span>
        <span style={{ fontFamily: "monospace", fontSize: 7, letterSpacing: "0.25em", color: "rgba(255,255,255,0.22)", textTransform: "uppercase" }}>
          Portfolio
        </span>
      </div>
    </button>
  );
}

/* ── Scroll progress bar (top edge) ── */
function ScrollProgress({ pct }: { pct: number }) {
  return (
    <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: "rgba(255,255,255,0.04)", zIndex: 10 }}>
      <motion.div
        style={{
          height: "100%",
          background: "linear-gradient(90deg, #3b82f6, #8b5cf6, #06b6d4)",
          boxShadow: "0 0 12px rgba(139,92,246,0.6)",
          borderRadius: "0 2px 2px 0",
        }}
        animate={{ width: `${pct}%` }}
        transition={{ duration: 0.1, ease: "linear" }}
      />
      {/* Glow tip */}
      <motion.div
        style={{
          position: "absolute", top: -2, height: 6, width: 20,
          background: "linear-gradient(90deg, transparent, rgba(139,92,246,0.9))",
          boxShadow: "0 0 10px rgba(139,92,246,1)",
          borderRadius: "0 3px 3px 0",
        }}
        animate={{ left: `calc(${pct}% - 20px)` }}
        transition={{ duration: 0.1, ease: "linear" }}
      />
    </div>
  );
}

/* ── Available badge ── */
function AvailableBadge() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: 1.4 }}
      style={{
        display: "flex", alignItems: "center", gap: 6,
        border: "1px solid rgba(52,211,153,0.3)",
        background: "rgba(52,211,153,0.07)",
        borderRadius: 99, padding: "4px 10px",
      }}
    >
      <motion.div
        style={{ width: 6, height: 6, borderRadius: "50%", background: "#34d399", flexShrink: 0 }}
        animate={{ boxShadow: ["0 0 0px rgba(52,211,153,0)", "0 0 8px rgba(52,211,153,0.9)", "0 0 0px rgba(52,211,153,0)"] }}
        transition={{ duration: 1.6, repeat: Infinity }}
      />
      <span style={{ fontFamily: "monospace", fontSize: 8.5, letterSpacing: "0.18em", color: "rgba(52,211,153,0.85)", textTransform: "uppercase", whiteSpace: "nowrap" }}>
        Available
      </span>
    </motion.div>
  );
}

export function Navbar() {
  const [scrolled,   setScrolled]   = useState(false);
  const [activeId,   setActiveId]   = useState("hero");
  const [hovered,    setHovered]    = useState<string | null>(null);
  const [scrollPct,  setScrollPct]  = useState(0);

  /* Scroll progress + background trigger + active section */
  useEffect(() => {
    const onScroll = () => {
      const scrollY   = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setScrollPct(docHeight > 0 ? (scrollY / docHeight) * 100 : 0);
      setScrolled(scrollY > 60);

      const trigger = scrollY + window.innerHeight * 0.3;
      let current   = NAV_ITEMS[0].id;
      for (const { id } of NAV_ITEMS) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top + scrollY <= trigger) current = id;
      }
      setActiveId(current);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  const activeIndex = NAV_ITEMS.findIndex((n) => n.id === activeId);

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
      style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 50,
        padding: scrolled ? "10px 0" : "18px 0",
        background: scrolled ? "rgba(5,5,5,0.92)" : "transparent",
        backdropFilter: scrolled ? "blur(24px) saturate(180%)" : "none",
        borderBottom: scrolled ? "1px solid rgba(255,255,255,0.05)" : "none",
        transition: "padding 0.4s, background 0.4s, border 0.4s",
      }}
    >
      {/* Scroll progress */}
      <ScrollProgress pct={scrollPct} />

      {/* Subtle gradient wash when scrolled */}
      <AnimatePresence>
        {scrolled && (
          <motion.div
            key="wash"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: "absolute", inset: 0, pointerEvents: "none",
              background: "linear-gradient(180deg, rgba(37,99,235,0.03) 0%, transparent 100%)",
            }}
          />
        )}
      </AnimatePresence>

      <div style={{ maxWidth: 1240, margin: "0 auto", padding: "0 28px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16 }}>

        {/* ── Logo ── */}
        <div style={{ display: "flex", alignItems: "center", gap: 12, flexShrink: 0 }}>
          <LogoMark onClick={() => scrollTo("hero")} />
          <AvailableBadge />
        </div>

        {/* ── Floating nav pill ── */}
        <motion.div
          initial={{ opacity: 0, y: -16, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
          style={{ position: "relative", display: "flex", alignItems: "center" }}
        >
          {/* Pill outer glow border */}
          <div style={{
            position: "absolute", inset: -1, borderRadius: 99,
            background: "linear-gradient(135deg, rgba(59,130,246,0.35) 0%, rgba(139,92,246,0.35) 50%, rgba(6,182,212,0.3) 100%)",
            pointerEvents: "none",
          }} />

          {/* Pill background */}
          <div style={{
            position: "relative",
            display: "flex", alignItems: "center",
            background: "rgba(8,8,12,0.85)",
            backdropFilter: "blur(20px)",
            borderRadius: 99,
            padding: "5px 6px",
            gap: 2,
          }}>
            {/* Sliding active bg inside pill */}
            {activeIndex >= 0 && (() => {
              const itemW = 80;
              return (
                <motion.div
                  aria-hidden
                  style={{
                    position: "absolute",
                    height: "calc(100% - 10px)",
                    width: itemW,
                    borderRadius: 99,
                    background: "linear-gradient(135deg, rgba(59,130,246,0.22) 0%, rgba(139,92,246,0.18) 100%)",
                    border: "1px solid rgba(99,179,237,0.25)",
                    boxShadow: "0 0 16px rgba(99,179,237,0.15), inset 0 1px 0 rgba(255,255,255,0.06)",
                    top: 5, left: 6 + activeIndex * (itemW + 2),
                    pointerEvents: "none",
                  }}
                  layout
                  transition={{ duration: 0.35, ease: [0.34, 1.56, 0.64, 1] }}
                />
              );
            })()}

            {NAV_ITEMS.map((item, i) => {
              const isActive  = activeId === item.id;
              const isHovered = hovered === item.id;

              return (
                <button
                  key={item.id}
                  onClick={() => scrollTo(item.id)}
                  onMouseEnter={() => setHovered(item.id)}
                  onMouseLeave={() => setHovered(null)}
                  style={{
                    position: "relative",
                    background: "none", border: "none", cursor: "pointer",
                    width: 80, padding: "6px 4px",
                    display: "flex", flexDirection: "column", alignItems: "center", gap: 2,
                    borderRadius: 99,
                    overflow: "hidden",
                  }}
                >
                  {/* Number — slides down from above on hover */}
                  <AnimatePresence>
                    {(isHovered || isActive) && (
                      <motion.span
                        key="num"
                        initial={{ opacity: 0, y: -6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -6 }}
                        transition={{ duration: 0.18 }}
                        style={{
                          fontFamily: "monospace",
                          fontSize: 7.5,
                          letterSpacing: "0.2em",
                          color: isActive ? "rgba(99,179,237,0.8)" : "rgba(255,255,255,0.3)",
                          lineHeight: 1,
                        }}
                      >
                        {item.num}
                      </motion.span>
                    )}
                  </AnimatePresence>

                  {/* Name */}
                  <span style={{
                    fontFamily: "monospace",
                    fontSize: 9,
                    letterSpacing: "0.2em",
                    textTransform: "uppercase",
                    color: isActive
                      ? "#ffffff"
                      : isHovered
                      ? "rgba(255,255,255,0.75)"
                      : "rgba(255,255,255,0.35)",
                    transition: "color 0.2s",
                    position: "relative", zIndex: 1,
                    whiteSpace: "nowrap",
                  }}>
                    {item.name}
                  </span>

                  {/* Active glow dot */}
                  <AnimatePresence>
                    {isActive && (
                      <motion.div
                        key="dot"
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0, opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        style={{ width: 3, height: 3, borderRadius: "50%", background: "#63b3ed", boxShadow: "0 0 6px rgba(99,179,237,1)" }}
                      />
                    )}
                  </AnimatePresence>
                </button>
              );
            })}
          </div>
        </motion.div>

        {/* ── Right: Hire Me ── */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 1.2 }}
          style={{ flexShrink: 0, position: "relative" }}
        >
          {/* Animated shine behind button */}
          <motion.div
            aria-hidden
            style={{
              position: "absolute", inset: -2, borderRadius: 10,
              background: "linear-gradient(135deg, rgba(59,130,246,0.6), rgba(139,92,246,0.6), rgba(6,182,212,0.5))",
              backgroundSize: "200% 200%",
              filter: "blur(6px)",
              opacity: 0.7,
            }}
            animate={{ backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"] }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          />

          <motion.a
            href="mailto:himagirisiddesh@gmail.com?subject=Opportunity%20for%20Himagiri%20Siddesh"
            whileHover={{ scale: 1.06, y: -1 }}
            whileTap={{ scale: 0.96 }}
            style={{
              position: "relative",
              display: "flex", alignItems: "center", gap: 8,
              background: "linear-gradient(135deg, rgba(37,99,235,0.9) 0%, rgba(109,40,217,0.85) 100%)",
              border: "1px solid rgba(99,179,237,0.3)",
              borderRadius: 8, padding: "9px 20px",
              fontFamily: "monospace", fontSize: 9.5,
              letterSpacing: "0.25em", textTransform: "uppercase",
              color: "#ffffff", textDecoration: "none", cursor: "pointer",
              boxShadow: "0 4px 20px rgba(37,99,235,0.3), inset 0 1px 0 rgba(255,255,255,0.12)",
              overflow: "hidden",
            }}
          >
            {/* Shine sweep */}
            <motion.div
              aria-hidden
              style={{
                position: "absolute", top: 0, left: "-60%", width: "40%", height: "100%",
                background: "linear-gradient(105deg, transparent, rgba(255,255,255,0.15), transparent)",
                transform: "skewX(-15deg)",
              }}
              animate={{ left: ["−60%", "160%"] }}
              transition={{ duration: 2.5, repeat: Infinity, repeatDelay: 2, ease: "easeInOut" }}
            />

            {/* Dot */}
            <motion.div
              style={{ width: 5, height: 5, borderRadius: "50%", background: "#7dd3fc", flexShrink: 0 }}
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 1.4, repeat: Infinity }}
            />
            Hire Me
          </motion.a>
        </motion.div>

      </div>

      {/* Section label strip (appears when scrolled, shows current section) */}
      <AnimatePresence>
        {scrolled && (
          <motion.div
            key="section-strip"
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.3 }}
            style={{
              position: "absolute", bottom: -22, left: "50%", transform: "translateX(-50%)",
              display: "flex", alignItems: "center", gap: 6,
              background: "rgba(5,5,5,0.7)", backdropFilter: "blur(10px)",
              border: "1px solid rgba(255,255,255,0.06)",
              borderRadius: 99, padding: "3px 12px",
              pointerEvents: "none",
            }}
          >
            {NAV_ITEMS.map((item, i) => (
              <motion.div
                key={item.id}
                style={{ display: "flex", alignItems: "center", gap: 4 }}
              >
                <motion.div
                  style={{
                    width: activeId === item.id ? 18 : 4,
                    height: 3, borderRadius: 99,
                    background: activeId === item.id
                      ? "linear-gradient(90deg,#3b82f6,#8b5cf6)"
                      : "rgba(255,255,255,0.12)",
                    boxShadow: activeId === item.id ? "0 0 8px rgba(99,179,237,0.6)" : "none",
                  }}
                  animate={{ width: activeId === item.id ? 18 : 4 }}
                  transition={{ duration: 0.3, ease: [0.34, 1.56, 0.64, 1] }}
                />
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
