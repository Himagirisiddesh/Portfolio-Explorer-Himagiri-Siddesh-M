import { useRef } from "react";
import { motion, useInView, useMotionValue, useSpring, useTransform } from "framer-motion";
import { MdMail, MdPhone, MdLocationOn } from "react-icons/md";

/* ─── Floating particle ──────────────────────────────────── */
function Particle({ x, y, delay, size }: { x: number; y: number; delay: number; size: number }) {
  return (
    <motion.div
      aria-hidden
      style={{
        position: "absolute", left: `${x}%`, top: `${y}%`,
        width: size, height: size, borderRadius: "50%",
        background: "rgba(66,133,244,0.45)", pointerEvents: "none",
      }}
      animate={{ y: [0, -22, 0], opacity: [0, 0.55, 0] }}
      transition={{ duration: 4.5 + delay * 0.6, repeat: Infinity, ease: "easeInOut", delay: delay * 0.55 }}
    />
  );
}

/* ─── Contact info row ───────────────────────────────────── */
function ContactRow({ icon: Icon, label, value, href, delay }: {
  icon: React.ElementType; label: string; value: string; href?: string; delay: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });

  const inner = (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: 24 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] }}
      style={{ display: "flex", alignItems: "center", gap: 20, paddingTop: 24, paddingBottom: 24 }}
      onMouseEnter={(e) => {
        const ci = e.currentTarget.querySelector(".ci") as HTMLDivElement;
        if (ci) { ci.style.borderColor = "rgba(66,133,244,0.65)"; ci.style.boxShadow = "0 0 22px rgba(66,133,244,0.3)"; }
      }}
      onMouseLeave={(e) => {
        const ci = e.currentTarget.querySelector(".ci") as HTMLDivElement;
        if (ci) { ci.style.borderColor = "rgba(66,133,244,0.22)"; ci.style.boxShadow = "none"; }
      }}
    >
      <div
        className="ci"
        style={{
          flexShrink: 0, width: 48, height: 48, borderRadius: "50%",
          border: "1px solid rgba(66,133,244,0.22)",
          background: "rgba(66,133,244,0.06)",
          display: "flex", alignItems: "center", justifyContent: "center",
          transition: "border-color 0.3s, box-shadow 0.3s",
        }}
      >
        <Icon size={18} color="rgba(66,133,244,0.82)" />
      </div>
      <div>
        <div style={{ fontFamily: "monospace", fontSize: 10, letterSpacing: "0.32em", textTransform: "uppercase", color: "rgba(66,133,244,0.72)", marginBottom: 5 }}>
          {label}
        </div>
        <div style={{ fontSize: 16, fontWeight: 300, color: "rgba(255,255,255,0.76)", letterSpacing: "0.01em" }}>
          {value}
        </div>
      </div>
    </motion.div>
  );

  return (
    <div>
      {href ? (
        <a href={href} style={{ textDecoration: "none", display: "block" }}>{inner}</a>
      ) : inner}
      <div style={{ height: 1, background: "rgba(255,255,255,0.055)" }} />
    </div>
  );
}

/* ─── Main ───────────────────────────────────────────────── */
export function Contact() {
  const sectionRef    = useRef<HTMLElement>(null);
  const headingRef    = useRef<HTMLDivElement>(null);
  const headingInView = useInView(headingRef, { once: true, margin: "-60px 0px" });

  /* Mouse parallax for ambient glow */
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const spX = useSpring(mouseX, { stiffness: 55, damping: 18 });
  const spY = useSpring(mouseY, { stiffness: 55, damping: 18 });
  const glowLeft = useTransform(spX, (v) => `${50 + v * 10}%`);
  const glowTop  = useTransform(spY, (v) => `${44 + v * 7}%`);

  const particles = Array.from({ length: 14 }, (_, i) => ({
    x: 4 + (i * 7.1) % 92, y: 5 + (i * 13.4) % 88,
    delay: i * 0.38, size: i % 3 === 0 ? 2.5 : 1.5,
  }));

  const headlineWords = ["Let's", "build", "something"];

  return (
    <section
      id="contact"
      ref={sectionRef}
      style={{ position: "relative", paddingTop: 120, paddingBottom: 72, overflow: "hidden" }}
      onMouseMove={(e) => {
        const r = sectionRef.current?.getBoundingClientRect();
        if (!r) return;
        mouseX.set((e.clientX - r.left - r.width / 2) / r.width);
        mouseY.set((e.clientY - r.top  - r.height / 2) / r.height);
      }}
      onMouseLeave={() => { mouseX.set(0); mouseY.set(0); }}
    >
      {/* Particles */}
      {particles.map((p, i) => <Particle key={i} {...p} />)}

      {/* Dot grid */}
      <div aria-hidden style={{
        position: "absolute", inset: 0,
        backgroundImage: "radial-gradient(rgba(255,255,255,0.028) 1px, transparent 1px)",
        backgroundSize: "30px 30px", pointerEvents: "none",
      }} />

      {/* Mouse-tracked blue ambient glow */}
      <motion.div aria-hidden style={{
        position: "absolute", left: glowLeft, top: glowTop,
        transform: "translate(-50%,-50%)",
        width: 680, height: 480, borderRadius: "50%",
        background: "radial-gradient(ellipse, rgba(66,133,244,0.072) 0%, transparent 65%)",
        filter: "blur(24px)", pointerEvents: "none",
      }} />

      {/* Decorative arc rings (bottom-right) */}
      <motion.div aria-hidden
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.6, delay: 0.8 }}
        style={{ position: "absolute", right: -140, bottom: 60, width: 420, height: 420, borderRadius: "50%", border: "1px solid rgba(66,133,244,0.1)", pointerEvents: "none" }}
      />
      <motion.div aria-hidden
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.6, delay: 1.1 }}
        style={{ position: "absolute", right: -220, bottom: -20, width: 580, height: 580, borderRadius: "50%", border: "1px solid rgba(66,133,244,0.055)", pointerEvents: "none" }}
      />

      <div className="container mx-auto" style={{ maxWidth: 1020, padding: "0 24px", position: "relative" }}>

        {/* ── Two-column grid ── */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 80px", alignItems: "center", minHeight: 400 }}>

          {/* ── LEFT ── */}
          <div ref={headingRef}>

            {/* LET'S CONNECT label + line + dot */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={headingInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5 }}
              style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 32 }}
            >
              <span style={{ fontFamily: "monospace", fontSize: 10.5, letterSpacing: "0.34em", textTransform: "uppercase", color: "rgba(66,133,244,0.78)" }}>
                Let's Connect
              </span>
              <motion.div
                initial={{ scaleX: 0 }} animate={headingInView ? { scaleX: 1 } : {}}
                transition={{ duration: 0.6, delay: 0.18 }}
                style={{ width: 38, height: 1, background: "rgba(66,133,244,0.48)", transformOrigin: "left" }}
              />
              <motion.div
                animate={{ opacity: [0.35, 1, 0.35], scale: [1, 1.55, 1], boxShadow: ["0 0 0px rgba(66,133,244,0)", "0 0 10px rgba(66,133,244,0.7)", "0 0 0px rgba(66,133,244,0)"] }}
                transition={{ duration: 2.2, repeat: Infinity }}
                style={{ width: 7, height: 7, borderRadius: "50%", background: "#4285F4", flexShrink: 0 }}
              />
            </motion.div>

            {/* Headline — word-by-word reveal */}
            <h2 style={{ margin: 0, marginBottom: 28, lineHeight: 1.02 }}>
              {headlineWords.map((word, i) => (
                <span key={word} style={{ display: "block" }}>
                  <motion.span
                    style={{ display: "inline-block" }}
                    initial={{ opacity: 0, y: 30 }}
                    animate={headingInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.65, delay: 0.12 + i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <span style={{ fontSize: "clamp(50px, 7.2vw, 88px)", fontWeight: 700, letterSpacing: "-0.04em", color: "#ffffff" }}>
                      {word}
                    </span>
                  </motion.span>
                </span>
              ))}
              {/* "impactful." in blue gradient */}
              <span style={{ display: "block" }}>
                <motion.span
                  style={{ display: "inline-block" }}
                  initial={{ opacity: 0, y: 30 }}
                  animate={headingInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.65, delay: 0.42, ease: [0.22, 1, 0.36, 1] }}
                >
                  <span style={{
                    fontSize: "clamp(50px, 7.2vw, 88px)", fontWeight: 700, letterSpacing: "-0.04em",
                    background: "linear-gradient(135deg, #4285F4 0%, #7EB3FF 55%, #4285F4 100%)",
                    WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
                  }}>
                    impactful.
                  </span>
                </motion.span>
              </span>
            </h2>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={headingInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.52 }}
              style={{ fontSize: 15, fontWeight: 300, color: "rgba(255,255,255,0.4)", lineHeight: 1.78, marginBottom: 36, maxWidth: 340 }}
            >
              Currently open for new opportunities, collaborations and challenging projects.{" "}
              If you have an idea,{" "}
              <a
                href="mailto:himagirisiddesh@gmail.com?subject=Opportunity%20for%20Himagiri%20Siddesh"
                style={{ color: "#4285F4", textDecoration: "none", borderBottom: "1px solid rgba(66,133,244,0.38)", paddingBottom: 1 }}
              >
                let's bring it to life.
              </a>
            </motion.p>

            {/* GET IN TOUCH button */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={headingInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, delay: 0.62 }}
            >
              <motion.a
                href="mailto:himagirisiddesh@gmail.com?subject=Opportunity%20for%20Himagiri%20Siddesh"
                whileHover={{
                  boxShadow: "0 0 30px rgba(66,133,244,0.22), inset 0 0 0 1px rgba(66,133,244,0.48)",
                  borderColor: "rgba(66,133,244,0.5)",
                  color: "#ffffff",
                }}
                style={{
                  display: "inline-flex", alignItems: "center", gap: 12,
                  padding: "14px 28px", borderRadius: 4,
                  border: "1px solid rgba(255,255,255,0.16)",
                  background: "transparent", textDecoration: "none",
                  fontFamily: "monospace", fontSize: 11, letterSpacing: "0.24em",
                  textTransform: "uppercase", color: "rgba(255,255,255,0.72)",
                  transition: "border-color 0.3s, color 0.3s, box-shadow 0.3s",
                }}
              >
                <span style={{ fontSize: 15, lineHeight: 1 }}>→</span>
                Get In Touch
              </motion.a>
            </motion.div>
          </div>

          {/* ── RIGHT: Contact info ── */}
          <div style={{ position: "relative" }}>
            {/* Top divider */}
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.08 }}
              style={{ height: 1, background: "rgba(255,255,255,0.055)", transformOrigin: "left" }}
            />

            <ContactRow icon={MdMail}       label="Email"    value="himagirisiddesh@gmail.com" href="mailto:himagirisiddesh@gmail.com?subject=Opportunity%20for%20Himagiri%20Siddesh" delay={0.22} />
            <ContactRow icon={MdPhone}      label="Phone"    value="+91 91484 90736"            href="tel:+919148490736" delay={0.34} />
            <ContactRow icon={MdLocationOn} label="Location" value="Bengaluru, India"                                    delay={0.46} />

            {/* Floating decorative dots */}
            <motion.div aria-hidden
              animate={{ opacity: [0, 0.55, 0] }} transition={{ duration: 3.2, repeat: Infinity, delay: 1 }}
              style={{ position: "absolute", right: "12%", top: "14%", width: 3, height: 3, borderRadius: "50%", background: "#4285F4", pointerEvents: "none" }}
            />
            <motion.div aria-hidden
              animate={{ opacity: [0, 0.4, 0] }} transition={{ duration: 4, repeat: Infinity, delay: 2.4 }}
              style={{ position: "absolute", right: "28%", top: "42%", width: 2, height: 2, borderRadius: "50%", background: "#4285F4", pointerEvents: "none" }}
            />
          </div>
        </div>

        {/* ── Bottom bar ── */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.15 }}
          style={{ marginTop: 80 }}
        >
          {/* Divider with spinning blue diamond */}
          <div style={{ position: "relative", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 26 }}>
            <div style={{ flex: 1, height: 1, background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.08) 50%, rgba(66,133,244,0.22) 100%)" }} />
            <motion.div
              animate={{ rotate: [0, 360], boxShadow: ["0 0 0px rgba(66,133,244,0)", "0 0 16px rgba(66,133,244,0.65)", "0 0 0px rgba(66,133,244,0)"] }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
              style={{ width: 9, height: 9, background: "#4285F4", transform: "rotate(45deg)", margin: "0 18px", flexShrink: 0 }}
            />
            <div style={{ flex: 1, height: 1, background: "linear-gradient(90deg, rgba(66,133,244,0.22), rgba(255,255,255,0.08) 50%, transparent)" }} />
          </div>

          {/* Tagline */}
          <p style={{ textAlign: "center", fontFamily: "monospace", fontSize: 10, letterSpacing: "0.34em", textTransform: "uppercase", color: "rgba(255,255,255,0.18)", marginBottom: 38 }}>
            Looking Forward to Creating Something Amazing Together.
          </p>

          {/* Footer row */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderTop: "1px solid rgba(255,255,255,0.05)", paddingTop: 22 }}>
            <span style={{ fontFamily: "monospace", fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(255,255,255,0.18)" }}>
              © {new Date().getFullYear()} Himagiri Siddesh M
            </span>
            <div style={{ display: "flex", gap: 28 }}>
              {[
                { label: "GitHub",   href: "https://github.com/Himagirisiddesh" },
                { label: "LinkedIn", href: "https://linkedin.com/in/himagiri-siddesh-m-532b102a3" },
              ].map(({ label, href }) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ color: "#4285F4" }}
                  style={{
                    fontFamily: "monospace", fontSize: 10, letterSpacing: "0.2em",
                    textTransform: "uppercase", color: "rgba(255,255,255,0.22)",
                    textDecoration: "none", transition: "color 0.2s",
                  }}
                >
                  {label}
                </motion.a>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
