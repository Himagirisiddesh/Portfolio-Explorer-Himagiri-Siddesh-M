import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  FaTrophy, FaStar, FaBrain, FaClock, FaUsers,
  FaLightbulb, FaRocket, FaMedal, FaBullseye, FaArrowRight,
} from "react-icons/fa";
import { MdLocationOn, MdCalendarToday } from "react-icons/md";

/* ─── Stat item for featured card ───────────────────────── */
function Stat({ icon: Icon, label, sub, color }: {
  icon: React.ElementType; label: string; sub: string; color: string;
}) {
  return (
    <div style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
      <div style={{
        flexShrink: 0, width: 36, height: 36, borderRadius: 8,
        border: `1px solid ${color}40`, background: `${color}12`,
        display: "flex", alignItems: "center", justifyContent: "center",
      }}>
        <Icon size={15} color={color} />
      </div>
      <div>
        <div style={{ fontSize: 14, fontWeight: 600, color: "rgba(255,255,255,0.88)", lineHeight: 1.2 }}>{label}</div>
        <div style={{ fontSize: 11, color: "rgba(255,255,255,0.38)", marginTop: 2 }}>{sub}</div>
      </div>
    </div>
  );
}

/* ─── Ideathon card ──────────────────────────────────────── */
function IdeathonCard({ title, highlight, org, date, desc, tags, color, delay }: {
  title: string; highlight: string; org: string; date: string;
  desc: string; tags: string[]; color: string; delay: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px 0px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -4, transition: { duration: 0.25 } }}
      style={{
        position: "relative", flex: 1, minWidth: 0,
        borderRadius: 16, overflow: "hidden",
        border: `1px solid ${color}28`,
        background: "rgba(255,255,255,0.022)",
        backdropFilter: "blur(12px)",
        padding: "22px 22px 20px",
        cursor: "default",
        transition: "border-color 0.3s, box-shadow 0.3s",
        boxShadow: `0 0 40px ${color}08`,
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLDivElement).style.borderColor = `${color}55`;
        (e.currentTarget as HTMLDivElement).style.boxShadow = `0 0 50px ${color}18`;
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLDivElement).style.borderColor = `${color}28`;
        (e.currentTarget as HTMLDivElement).style.boxShadow = `0 0 40px ${color}08`;
      }}
    >
      {/* Top-edge glow */}
      <div style={{
        position: "absolute", top: 0, left: "15%", right: "15%", height: 1,
        background: `linear-gradient(90deg, transparent, ${color}55, transparent)`,
      }} />

      {/* Icon + badge row */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <motion.div
            animate={{ boxShadow: [`0 0 0px ${color}00`, `0 0 20px ${color}60`, `0 0 0px ${color}00`] }}
            transition={{ duration: 2.5, repeat: Infinity }}
            style={{
              width: 42, height: 42, borderRadius: 10,
              border: `1px solid ${color}40`, background: `${color}14`,
              display: "flex", alignItems: "center", justifyContent: "center",
            }}
          >
            <FaBrain size={18} color={color} />
          </motion.div>
          <span style={{
            fontFamily: "monospace", fontSize: 9.5, letterSpacing: "0.22em",
            textTransform: "uppercase", color: color,
            border: `1px solid ${color}40`, borderRadius: 99,
            padding: "3px 10px", background: `${color}12`,
          }}>
            Ideathon Participant
          </span>
        </div>
        <div style={{
          width: 30, height: 30, borderRadius: "50%",
          border: "1px solid rgba(255,255,255,0.1)",
          display: "flex", alignItems: "center", justifyContent: "center",
        }}>
          <FaArrowRight size={11} color="rgba(255,255,255,0.4)" />
        </div>
      </div>

      <h3 style={{ fontSize: "clamp(15px, 1.9vw, 18px)", fontWeight: 600, color: "rgba(255,255,255,0.88)", marginBottom: 8, lineHeight: 1.25 }}>
        {title} – <span style={{ color }}>{highlight}</span>
      </h3>

      <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 12 }}>
        <span style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 11, color: "rgba(255,255,255,0.38)" }}>
          <MdLocationOn size={12} color={color} />{org}
        </span>
        <span style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 11, color: "rgba(255,255,255,0.38)" }}>
          <MdCalendarToday size={11} color={color} />{date}
        </span>
      </div>

      <p style={{ fontSize: 12.5, color: "rgba(255,255,255,0.45)", lineHeight: 1.65, marginBottom: 16 }}>
        {desc}
      </p>

      <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
        {tags.map((t) => (
          <span key={t} style={{
            fontSize: 10, fontFamily: "monospace", letterSpacing: "0.05em",
            color: "rgba(255,255,255,0.45)",
            border: `1px solid ${color}30`, background: `${color}0a`,
            padding: "3px 9px", borderRadius: 99,
          }}>{t}</span>
        ))}
      </div>
    </motion.div>
  );
}

/* ─── Summary stat ───────────────────────────────────────── */
function SummaryItem({ icon: Icon, number, label, sub, color, delay }: {
  icon: React.ElementType; number: string; label: string; sub: string; color: string; delay: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 18 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay }}
      style={{ display: "flex", alignItems: "center", gap: 12 }}
    >
      <motion.div
        animate={{ filter: [`drop-shadow(0 0 0px ${color}00)`, `drop-shadow(0 0 8px ${color}80)`, `drop-shadow(0 0 0px ${color}00)`] }}
        transition={{ duration: 2.8, repeat: Infinity, delay }}
      >
        <Icon size={28} color={color} />
      </motion.div>
      <div>
        <div style={{ fontSize: 22, fontWeight: 700, color, lineHeight: 1 }}>{number}</div>
        <div style={{ fontSize: 12, fontWeight: 500, color: "rgba(255,255,255,0.65)", lineHeight: 1.3 }}>{label}</div>
        <div style={{ fontSize: 10, color: "rgba(255,255,255,0.3)", fontFamily: "monospace" }}>{sub}</div>
      </div>
    </motion.div>
  );
}

/* ─── Main ───────────────────────────────────────────────── */
export function Achievements() {
  const headingRef    = useRef<HTMLDivElement>(null);
  const heroRef       = useRef<HTMLDivElement>(null);
  const headingInView = useInView(headingRef, { once: true });
  const heroInView    = useInView(heroRef, { once: true, margin: "-80px 0px" });

  return (
    <section
      id="achievements"
      style={{ position: "relative", paddingTop: 128, paddingBottom: 128, overflow: "hidden" }}
    >
      {/* Fine dot grid */}
      <div aria-hidden style={{
        position: "absolute", inset: 0,
        backgroundImage: "radial-gradient(rgba(255,255,255,0.03) 1px, transparent 1px)",
        backgroundSize: "28px 28px", pointerEvents: "none",
      }} />

      {/* Gold radial ambience */}
      <motion.div
        aria-hidden
        animate={{ opacity: [0.25, 0.55, 0.25] }}
        transition={{ duration: 6, repeat: Infinity }}
        style={{
          position: "absolute", top: "20%", left: "30%",
          width: 600, height: 400, borderRadius: "50%",
          background: "radial-gradient(ellipse, rgba(255,180,0,0.055) 0%, transparent 70%)",
          filter: "blur(30px)", pointerEvents: "none",
        }}
      />
      <div aria-hidden style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        background: "radial-gradient(ellipse 60% 40% at 50% 30%, rgba(33,150,243,0.04) 0%, transparent 70%)",
      }} />

      <div className="container mx-auto" style={{ maxWidth: 1020, padding: "0 24px", position: "relative" }}>

        {/* ── Heading ── */}
        <motion.div
          ref={headingRef}
          initial={{ opacity: 0, y: 32 }}
          animate={headingInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          style={{ textAlign: "center", marginBottom: 60 }}
        >
          <h2 style={{
            fontSize: "clamp(42px, 8vw, 96px)", fontWeight: 700,
            letterSpacing: "-0.04em", color: "#ffffff", lineHeight: 0.9,
          }}>
            Achievements
          </h2>
          <p style={{
            fontSize: 14, color: "rgba(255,255,255,0.35)", lineHeight: 1.7,
            maxWidth: 380, margin: "18px auto 0",
          }}>
            Milestones that reflect my passion for innovation, teamwork and continuous learning.
          </p>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={headingInView ? { scaleX: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            style={{ width: 48, height: 1, background: "rgba(255,215,0,0.4)", margin: "18px auto 0", transformOrigin: "left" }}
          />
        </motion.div>

        {/* ── Featured hero card ── */}
        <motion.div
          ref={heroRef}
          initial={{ opacity: 0, y: 40 }}
          animate={heroInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
          style={{
            position: "relative", borderRadius: 20, overflow: "hidden",
            border: "1px solid rgba(255,200,0,0.2)",
            background: "rgba(255,255,255,0.022)",
            backdropFilter: "blur(16px)",
            marginBottom: 20,
            boxShadow: "0 0 80px rgba(255,180,0,0.06), 0 8px 40px rgba(0,0,0,0.3)",
          }}
        >
          {/* Gold top-edge glow line */}
          <div style={{
            position: "absolute", top: 0, left: "10%", right: "10%", height: 1,
            background: "linear-gradient(90deg, transparent, rgba(255,200,0,0.7), rgba(255,150,0,0.5), transparent)",
          }} />

          {/* Top-left radial glow */}
          <motion.div
            animate={{ opacity: [0.3, 0.65, 0.3] }}
            transition={{ duration: 4, repeat: Infinity }}
            style={{
              position: "absolute", top: 0, left: 0,
              width: 420, height: 300,
              background: "radial-gradient(ellipse at 0% 0%, rgba(255,180,0,0.07) 0%, transparent 70%)",
              pointerEvents: "none",
            }}
          />

          <div style={{
            padding: "32px 32px 28px",
            display: "grid",
            gridTemplateColumns: "1fr 200px 1fr",
            gap: "0 32px",
            alignItems: "center",
          }}>

            {/* ── Left: text content ── */}
            <div>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={heroInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.2 }}
                style={{
                  display: "inline-flex", alignItems: "center", gap: 7,
                  border: "1px solid rgba(255,200,0,0.5)",
                  background: "rgba(255,180,0,0.1)",
                  borderRadius: 99, padding: "5px 14px", marginBottom: 16,
                }}
              >
                <FaTrophy size={11} color="#FFD700" />
                <span style={{ fontFamily: "monospace", fontSize: 10, letterSpacing: "0.22em", textTransform: "uppercase", color: "#FFD700" }}>
                  Hackathon Winner
                </span>
              </motion.div>

              <motion.h2
                initial={{ opacity: 0, y: 12 }}
                animate={heroInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.28 }}
                style={{
                  fontSize: "clamp(24px, 3.2vw, 38px)", fontWeight: 800,
                  letterSpacing: "-0.02em", lineHeight: 1.05, marginBottom: 6,
                  background: "linear-gradient(135deg, #FFE44D 0%, #FFB300 55%, #FF8C00 100%)",
                  WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
                }}
              >
                INSTELLATION 3.0
              </motion.h2>

              <motion.p
                initial={{ opacity: 0 }}
                animate={heroInView ? { opacity: 1 } : {}}
                transition={{ duration: 0.5, delay: 0.35 }}
                style={{ fontSize: 12, fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(255,255,255,0.4)", marginBottom: 16 }}
              >
                Hackathon Champion
              </motion.p>

              <motion.div
                initial={{ opacity: 0 }}
                animate={heroInView ? { opacity: 1 } : {}}
                transition={{ duration: 0.5, delay: 0.42 }}
                style={{ display: "flex", gap: 16, flexWrap: "wrap", marginBottom: 18 }}
              >
                <span style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, color: "rgba(255,255,255,0.42)" }}>
                  <MdLocationOn size={13} color="#FFB300" />DSATM (MCA Department)
                </span>
                <span style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, color: "rgba(255,255,255,0.42)" }}>
                  <MdCalendarToday size={12} color="#FFB300" />May 6–7, 2026
                </span>
              </motion.div>

              <motion.div
                initial={{ scaleX: 0 }}
                animate={heroInView ? { scaleX: 1 } : {}}
                transition={{ duration: 0.55, delay: 0.48 }}
                style={{ height: 1, background: "rgba(255,200,0,0.12)", marginBottom: 16, transformOrigin: "left" }}
              />

              <motion.p
                initial={{ opacity: 0, y: 8 }}
                animate={heroInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.55 }}
                style={{ fontSize: 13, color: "rgba(255,255,255,0.48)", lineHeight: 1.75 }}
              >
                Secured{" "}
                <span style={{ color: "#FFD700", fontWeight: 600 }}>1st Place</span>{" "}
                among multiple teams in a 6-hour high-intensity hackathon by building a complete solution from an on-the-spot problem statement.
              </motion.p>
            </div>

            {/* ── Center: Trophy ── */}
            <motion.div
              initial={{ opacity: 0, scale: 0.65 }}
              animate={heroInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.85, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}
            >
              <div style={{ position: "relative", display: "flex", alignItems: "center", justifyContent: "center" }}>
                {/* Outer pulse ring 1 */}
                <motion.div
                  animate={{ scale: [1, 1.18, 1], opacity: [0.35, 0, 0.35] }}
                  transition={{ duration: 2.4, repeat: Infinity }}
                  style={{
                    position: "absolute", width: 170, height: 170, borderRadius: "50%",
                    border: "1px solid rgba(255,200,0,0.4)",
                  }}
                />
                {/* Outer pulse ring 2 */}
                <motion.div
                  animate={{ scale: [1, 1.35, 1], opacity: [0.2, 0, 0.2] }}
                  transition={{ duration: 2.4, repeat: Infinity, delay: 0.5 }}
                  style={{
                    position: "absolute", width: 170, height: 170, borderRadius: "50%",
                    border: "1px solid rgba(255,200,0,0.2)",
                  }}
                />
                {/* Glow backdrop */}
                <motion.div
                  animate={{ scale: [1, 1.1, 1], opacity: [0.4, 0.75, 0.4] }}
                  transition={{ duration: 3, repeat: Infinity }}
                  style={{
                    position: "absolute", width: 130, height: 130, borderRadius: "50%",
                    background: "radial-gradient(circle, rgba(255,180,0,0.18) 0%, transparent 70%)",
                  }}
                />
                {/* Trophy */}
                <motion.div
                  animate={{ y: [0, -7, 0] }}
                  transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
                  style={{
                    filter: "drop-shadow(0 0 18px rgba(255,200,0,0.75)) drop-shadow(0 0 40px rgba(255,150,0,0.45))",
                    position: "relative", zIndex: 2,
                  }}
                >
                  <FaTrophy size={88} color="#FFB300" style={{
                    background: "linear-gradient(180deg,#FFE55C 0%,#FFB300 50%,#FF8C00 100%)",
                    WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
                  }} />
                </motion.div>
              </div>

              {/* Stars */}
              <div style={{ display: "flex", gap: 6, marginTop: 14 }}>
                {[0, 1, 2].map((i) => (
                  <motion.div
                    key={i}
                    animate={{ opacity: [0.35, 1, 0.35], scale: [0.85, 1.25, 0.85] }}
                    transition={{ duration: 1.8, repeat: Infinity, delay: i * 0.28 }}
                  >
                    <FaStar size={13} color="#FFD700" />
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* ── Right: Stats ── */}
            <motion.div
              initial={{ opacity: 0, x: 24 }}
              animate={heroInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.65, delay: 0.4 }}
              style={{
                display: "flex", flexDirection: "column", gap: 20,
                paddingLeft: 20, borderLeft: "1px solid rgba(255,200,0,0.1)",
              }}
            >
              <Stat icon={FaClock}     label="6 Hours"       sub="Build Time"   color="#FFB300" />
              <Stat icon={FaUsers}     label="Team QuadCode" sub="4 Members"    color="#61DAFB" />
              <Stat icon={FaLightbulb} label="End-to-End"    sub="Solution"     color="#A78BFA" />
              <Stat icon={FaRocket}    label="Innovation"    sub="& Impact"     color="#34D399" />
            </motion.div>
          </div>
        </motion.div>

        {/* ── Two ideathon cards ── */}
        <div style={{ display: "flex", gap: 20, marginBottom: 20, flexWrap: "wrap" }}>
          <IdeathonCard
            title="Ideathon Arena"
            highlight="Luminus 2026"
            org="RNS Institute of Technology"
            date="April 2026"
            desc="Participated in a national-level ideathon, contributing innovative ideas and technical concepts to solve real-world challenges."
            tags={["Innovation", "Idea Generation", "Teamwork", "Problem Solving"]}
            color="#2196F3"
            delay={0.1}
          />
          <IdeathonCard
            title="Ideathon of"
            highlight="Ignitron 2K25"
            org="GM University, Davangere"
            date="Nov 2025"
            desc="Participated in ideathon focused on innovation, ideation and collaborative problem-solving."
            tags={["Ideation", "Collaboration", "Creativity", "Problem Solving"]}
            color="#9C27B0"
            delay={0.22}
          />
        </div>

        {/* ── Achievement summary bar ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65, delay: 0.15 }}
          style={{
            borderRadius: 16, overflow: "hidden",
            border: "1px solid rgba(255,255,255,0.08)",
            background: "rgba(255,255,255,0.02)",
            backdropFilter: "blur(12px)",
            padding: "24px 32px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", marginBottom: 20 }}>
            <span style={{ fontFamily: "monospace", fontSize: 10, letterSpacing: "0.32em", textTransform: "uppercase", color: "rgba(255,255,255,0.26)" }}>
              Achievement Summary
            </span>
          </div>

          <div style={{ height: 1, background: "rgba(255,255,255,0.05)", marginBottom: 22 }} />

          <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 24 }}>
            <SummaryItem icon={FaTrophy}   number="1"    label="Hackathon Win"     sub="Champion"       color="#FFD700" delay={0.1} />
            <SummaryItem icon={FaMedal}    number="2"    label="Ideathon"          sub="Participations" color="#61DAFB" delay={0.2} />
            <SummaryItem icon={FaStar}     number="3+"   label="Competitions"      sub="Participated"   color="#A78BFA" delay={0.3} />
            <SummaryItem icon={FaBullseye} number="100%" label="Learning & Growth" sub="Mindset"        color="#34D399" delay={0.4} />
          </div>
        </motion.div>

        {/* ── Left sidebar: PROOF OF GROWTH ── */}
        <div style={{
          position: "absolute", left: -50, top: "50%",
          transform: "translateY(-50%)",
          display: "flex", flexDirection: "column", alignItems: "center", gap: 10,
        }}>
          <motion.div
            animate={{ boxShadow: ["0 0 0px rgba(33,150,243,0)", "0 0 18px rgba(33,150,243,0.6)", "0 0 0px rgba(33,150,243,0)"] }}
            transition={{ duration: 2.5, repeat: Infinity }}
            style={{
              width: 32, height: 32, borderRadius: "50%",
              border: "1px solid rgba(33,150,243,0.5)",
              background: "rgba(33,150,243,0.12)",
              display: "flex", alignItems: "center", justifyContent: "center",
            }}
          >
            <FaTrophy size={13} color="#2196F3" />
          </motion.div>

          <motion.div
            animate={{ opacity: [0.45, 1, 0.45], scale: [0.9, 1.2, 0.9] }}
            transition={{ duration: 2.2, repeat: Infinity, delay: 0.6 }}
            style={{ padding: 4 }}
          >
            <FaStar size={13} color="#FFD700" />
          </motion.div>

          {[0, 1, 2, 3, 4].map((i) => (
            <motion.div
              key={i}
              animate={{ opacity: [0.15, 0.75, 0.15] }}
              transition={{ duration: 2, repeat: Infinity, delay: i * 0.28 }}
              style={{ width: 5, height: 5, borderRadius: "50%", background: "#2196F3" }}
            />
          ))}

          <div style={{
            fontFamily: "monospace", fontSize: 8, letterSpacing: "0.28em",
            textTransform: "uppercase", color: "rgba(255,255,255,0.18)",
            writingMode: "vertical-rl", transform: "rotate(180deg)",
            marginTop: 6,
          }}>
            Proof of Growth
          </div>
        </div>
      </div>
    </section>
  );
}
