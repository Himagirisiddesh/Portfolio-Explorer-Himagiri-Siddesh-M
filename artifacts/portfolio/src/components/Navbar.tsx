import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const navItems = [
    { name: "About", id: "hero" },
    { name: "Education", id: "education" },
    { name: "Skills", id: "skills" },
    { name: "Projects", id: "projects" },
    { name: "Achievements", id: "achievements" },
    { name: "Contact", id: "contact" },
  ];

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.6 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-black/85 backdrop-blur-md border-b border-white/5 py-4"
          : "bg-transparent py-6"
      }`}
    >
      <div className="container mx-auto px-6 flex justify-between items-center">
        <button
          onClick={() => scrollTo("hero")}
          className="text-white font-mono text-xs tracking-widest uppercase hover:text-white/60 transition-colors"
        >
          HS.
        </button>

        <div className="hidden md:flex gap-8">
          {navItems.map((item) => (
            <button
              key={item.name}
              onClick={() => scrollTo(item.id)}
              className="text-white/50 hover:text-white text-[10px] uppercase tracking-widest font-mono transition-colors"
            >
              {item.name}
            </button>
          ))}
        </div>

        <a
          href="mailto:himagirisiddesh@gmail.com"
          className="hidden md:block text-[10px] font-mono tracking-widest uppercase text-white/40 hover:text-white border border-white/15 hover:border-white/40 px-4 py-2 transition-all"
        >
          Hire Me
        </a>
      </div>
    </motion.nav>
  );
}
