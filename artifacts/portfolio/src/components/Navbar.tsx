import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const NAV_ITEMS = [
  { name: "About", id: "hero", num: "01" },
  { name: "Education", id: "education", num: "02" },
  { name: "Skills", id: "skills", num: "03" },
  { name: "Projects", id: "projects", num: "04" },
  { name: "Experience", id: "experience", num: "05" },
  { name: "Achievements", id: "achievements", num: "06" },
  { name: "Contact", id: "contact", num: "07" },
];

function ScrollProgress({ pct }: { pct: number }) {
  return (
    <div className="nav-progress" aria-hidden>
      <motion.div
        className="nav-progress-fill"
        animate={{ width: `${pct}%` }}
        transition={{ duration: 0.1, ease: "linear" }}
      />
      <motion.div
        className="nav-progress-tip"
        animate={{ left: `calc(${pct}% - 20px)` }}
        transition={{ duration: 0.1, ease: "linear" }}
      />
    </div>
  );
}

function NavItem({
  item,
  index,
  active,
  hovered,
  onHover,
  onClick,
}: {
  item: (typeof NAV_ITEMS)[number];
  index: number;
  active: boolean;
  hovered: boolean;
  onHover: (id: string | null) => void;
  onClick: (id: string) => void;
}) {
  return (
    <motion.button
      className={`nav-link${active ? " is-active" : ""}${hovered ? " is-hovered" : ""}`}
      onClick={() => onClick(item.id)}
      onMouseEnter={() => onHover(item.id)}
      onMouseLeave={() => onHover(null)}
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: 0.92 + index * 0.055, ease: [0.22, 1, 0.36, 1] }}
      whileTap={{ scale: 0.96 }}
      aria-current={active ? "page" : undefined}
    >
      {active && (
        <motion.span
          className="nav-active-surface"
          layoutId="nav-active-surface"
          transition={{ type: "spring", stiffness: 380, damping: 28 }}
          aria-hidden
        />
      )}
      <AnimatePresence initial={false}>
        {(active || hovered) && (
          <motion.span
            className="nav-link-number"
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            transition={{ duration: 0.16 }}
          >
            {item.num}
          </motion.span>
        )}
      </AnimatePresence>
      <span className="nav-link-label">{item.name}</span>
      {active && <span className="nav-active-dot" aria-hidden />}
    </motion.button>
  );
}

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [activeId, setActiveId] = useState("hero");
  const [hovered, setHovered] = useState<string | null>(null);
  const [scrollPct, setScrollPct] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const scrollY = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setScrollPct(docHeight > 0 ? (scrollY / docHeight) * 100 : 0);
      setScrolled(scrollY > 60);

      const trigger = scrollY + window.innerHeight * 0.3;
      let current = NAV_ITEMS[0].id;
      for (const { id } of NAV_ITEMS) {
        const element = document.getElementById(id);
        if (element && element.getBoundingClientRect().top + scrollY <= trigger) {
          current = id;
        }
      }
      setActiveId(current);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <motion.nav
      className={`nav-shell${scrolled ? " is-scrolled" : ""}`}
      initial={{ y: -90, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.85, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
    >
      <ScrollProgress pct={scrollPct} />

      <AnimatePresence>
        {scrolled && <motion.div className="nav-scroll-wash" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} aria-hidden />}
      </AnimatePresence>

      <div className="nav-container">
        <motion.div
          className="nav-rail"
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.65, delay: 0.72, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="nav-rail-beam" aria-hidden />
          <div className="nav-links">
            {NAV_ITEMS.map((item, index) => (
              <NavItem
                key={item.id}
                item={item}
                index={index}
                active={activeId === item.id}
                hovered={hovered === item.id}
                onHover={setHovered}
                onClick={scrollTo}
              />
            ))}
          </div>
        </motion.div>

        <motion.a
          className="nav-hire"
          href="mailto:himagirisiddesh@gmail.com?subject=Opportunity%20for%20Himagiri%20Siddesh"
          initial={{ opacity: 0, x: 18 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 1.1 }}
          whileHover={{ y: -2, scale: 1.04 }}
          whileTap={{ scale: 0.96 }}
        >
          <span className="nav-hire-orb" aria-hidden />
          <span>Hire Me</span>
          <span className="nav-hire-arrow" aria-hidden>↗</span>
        </motion.a>
      </div>

      <AnimatePresence>
        {scrolled && (
          <motion.div
            className="nav-section-strip"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.28 }}
          >
            <span className="nav-strip-label">NOW VIEWING</span>
            <span className="nav-strip-current">
              {NAV_ITEMS.find((item) => item.id === activeId)?.name}
            </span>
            <div className="nav-strip-dots" aria-hidden>
              {NAV_ITEMS.map((item) => (
                <span key={item.id} className={item.id === activeId ? "is-active" : ""} />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}