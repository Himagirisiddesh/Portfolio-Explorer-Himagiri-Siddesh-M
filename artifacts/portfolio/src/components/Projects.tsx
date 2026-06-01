import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { SiGithub } from "react-icons/si";
import { FaArrowRight } from "react-icons/fa";

/* ──────────────────────────────────────────
   Visual mockups (inline SVG / CSS)
────────────────────────────────────────── */

function RetinalEye() {
  return (
    <div style={{ position: "relative", width: 300, height: 300, display: "flex", alignItems: "center", justifyContent: "center" }}>
      {/* Outer glow rings */}
      {[300, 250, 210].map((size, i) => (
        <motion.div
          key={i}
          aria-hidden
          style={{
            position: "absolute", width: size, height: size, borderRadius: "50%",
            border: `1px solid rgba(${i === 0 ? "130,50,220" : i === 1 ? "180,70,160" : "220,80,40"},${0.12 + i * 0.08})`,
          }}
          animate={{ opacity: [0.3, 0.8, 0.3], scale: [1, 1.03, 1] }}
          transition={{ duration: 3 + i * 1.2, repeat: Infinity, delay: i * 0.6, ease: "easeInOut" }}
        />
      ))}
      {/* Globe */}
      <div style={{
        width: 210, height: 210, borderRadius: "50%",
        background: "radial-gradient(circle at 40% 35%, #7A1200 0%, #4A0800 25%, #230300 55%, #080000 100%)",
        border: "1.5px solid rgba(200,70,0,0.35)",
        boxShadow: "0 0 70px rgba(180,50,0,0.35), 0 0 140px rgba(110,20,160,0.2), inset 0 0 40px rgba(0,0,0,0.6)",
        position: "relative", overflow: "hidden",
        display: "flex", alignItems: "center", justifyContent: "center",
      }}>
        {/* Blood vessels */}
        <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }} viewBox="0 0 210 210" fill="none">
          <path d="M105,105 Q140,80 175,55 Q190,45 205,38" stroke="rgba(230,70,20,0.32)" strokeWidth="1.2"/>
          <path d="M105,105 Q80,140 55,165 Q35,182 15,192" stroke="rgba(230,70,20,0.28)" strokeWidth="1"/>
          <path d="M105,105 Q148,128 178,150 Q195,165 205,180" stroke="rgba(190,45,10,0.22)" strokeWidth="0.8"/>
          <path d="M105,105 Q70,70 48,38 Q32,18 15,8" stroke="rgba(210,55,15,0.22)" strokeWidth="0.8"/>
          <path d="M105,105 Q138,95 168,88 Q188,82 205,85" stroke="rgba(200,60,20,0.18)" strokeWidth="0.6"/>
          <path d="M105,105 Q75,115 48,130 Q28,142 12,155" stroke="rgba(200,60,20,0.18)" strokeWidth="0.6"/>
        </svg>
        {/* Optic disc */}
        <motion.div
          style={{
            width: 48, height: 48, borderRadius: "50%", position: "relative", zIndex: 2,
            background: "radial-gradient(circle, rgba(255,215,120,1) 0%, rgba(255,150,50,0.85) 45%, transparent 100%)",
          }}
          animate={{ boxShadow: ["0 0 18px rgba(255,180,60,0.7)", "0 0 34px rgba(255,180,60,1)", "0 0 18px rgba(255,180,60,0.7)"] }}
          transition={{ duration: 2.2, repeat: Infinity }}
        />
      </div>
      {/* Outer violet haze */}
      <div aria-hidden style={{
        position: "absolute", inset: 0, borderRadius: "50%",
        background: "radial-gradient(circle, transparent 48%, rgba(130,40,220,0.07) 80%, transparent 100%)",
        pointerEvents: "none",
      }} />
      {/* Tag */}
      <motion.div
        style={{
          position: "absolute", bottom: 12, left: "50%", transform: "translateX(-50%)",
          background: "rgba(5,5,5,0.82)", border: "1px solid rgba(180,60,0,0.4)",
          borderRadius: 99, padding: "4px 14px",
          fontFamily: "monospace", fontSize: 9, letterSpacing: "0.22em",
          color: "rgba(255,150,60,0.8)", whiteSpace: "nowrap",
        }}
        animate={{ opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 2.8, repeat: Infinity }}
      >
        RETINAL SCAN · ACTIVE
      </motion.div>
    </div>
  );
}

function VerdantDashboard() {
  return (
    <div style={{
      width: "100%", maxWidth: 390, borderRadius: 12,
      border: "1px solid rgba(34,197,94,0.28)", background: "rgba(6,16,10,0.97)",
      overflow: "hidden", boxShadow: "0 0 50px rgba(34,197,94,0.08)",
    }}>
      <div style={{ background: "rgba(12,28,18,0.95)", padding: "8px 14px", display: "flex", alignItems: "center", gap: 8, borderBottom: "1px solid rgba(34,197,94,0.12)" }}>
        <div style={{ width: 22, height: 22, borderRadius: 5, background: "rgba(34,197,94,0.25)", border: "1px solid rgba(34,197,94,0.5)", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <span style={{ color: "#22c55e", fontSize: 9, fontWeight: 700 }}>V</span>
        </div>
        <span style={{ color: "rgba(255,255,255,0.72)", fontFamily: "monospace", fontSize: 10 }}>VerdantPilot AI</span>
        <div style={{ marginLeft: "auto", display: "flex", gap: 5 }}>
          {["#ff5f57","#ffbd2e","#28c840"].map(c => <div key={c} style={{ width: 9, height: 9, borderRadius: "50%", background: c }} />)}
        </div>
      </div>
      <div style={{ display: "flex" }}>
        <div style={{ width: 90, borderRight: "1px solid rgba(34,197,94,0.1)", padding: "10px 0", flexShrink: 0 }}>
          {["Overview","Crops","Soil","Weather","Fertilizer","Analytics","Reports","Settings"].map((item, i) => (
            <div key={item} style={{
              padding: "6px 11px", fontSize: 9, fontFamily: "monospace",
              color: i === 0 ? "#22c55e" : "rgba(255,255,255,0.28)",
              background: i === 0 ? "rgba(34,197,94,0.1)" : "transparent",
              borderLeft: i === 0 ? "2px solid #22c55e" : "2px solid transparent",
              cursor: "default",
            }}>{item}</div>
          ))}
        </div>
        <div style={{ flex: 1, padding: 12 }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 6, marginBottom: 10 }}>
            {[["Crop Rec","Rice","High Suitability"],["Soil Score","78","Good"],["Weather","24°C","Moderate Rain"],["Yield Pred","3.2 t/h","↑7% in-season"]].map(([k,v,s]) => (
              <div key={k} style={{ background: "rgba(34,197,94,0.055)", border: "1px solid rgba(34,197,94,0.14)", borderRadius: 5, padding: "5px 7px" }}>
                <div style={{ color: "rgba(255,255,255,0.28)", fontSize: 7, marginBottom: 2 }}>{k}</div>
                <div style={{ color: "rgba(255,255,255,0.88)", fontSize: 11, fontWeight: 700 }}>{v}</div>
                <div style={{ color: "#22c55e", fontSize: 7.5 }}>{s}</div>
              </div>
            ))}
          </div>
          <div style={{ background: "rgba(0,0,0,0.35)", borderRadius: 5, padding: "7px 9px" }}>
            <div style={{ color: "rgba(255,255,255,0.28)", fontSize: 7.5, marginBottom: 5 }}>Growth Progress</div>
            <svg viewBox="0 0 220 55" style={{ width: "100%", height: 44 }}>
              <defs>
                <linearGradient id="gv" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#22c55e" stopOpacity="0.2"/>
                  <stop offset="100%" stopColor="#22c55e" stopOpacity="0"/>
                </linearGradient>
              </defs>
              <polyline points="0,48 22,42 44,35 66,38 88,26 110,21 132,29 154,17 176,23 198,13 220,9" fill="none" stroke="#22c55e" strokeWidth="1.5"/>
              <polyline points="0,48 22,42 44,35 66,38 88,26 110,21 132,29 154,17 176,23 198,13 220,9 220,55 0,55" fill="url(#gv)"/>
              {[0,22,44,66,88,110,132,154,176,198,220].map((x, i) => {
                const ys = [48,42,35,38,26,21,29,17,23,13,9];
                return <circle key={i} cx={x} cy={ys[i]} r="2.5" fill="#22c55e" opacity="0.7"/>;
              })}
            </svg>
            <div style={{ display: "flex", justifyContent: "space-between", marginTop: 4 }}>
              {["Jan","Mar","May","Jul","Sep","Nov"].map(m => (
                <span key={m} style={{ fontSize: 6.5, color: "rgba(255,255,255,0.22)", fontFamily: "monospace" }}>{m}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function FactoryDashboard() {
  return (
    <div style={{
      width: "100%", maxWidth: 390, borderRadius: 12,
      border: "1px solid rgba(59,130,246,0.28)", background: "rgba(5,8,20,0.97)",
      overflow: "hidden", boxShadow: "0 0 50px rgba(59,130,246,0.07)",
    }}>
      <div style={{ background: "rgba(10,15,38,0.95)", padding: "8px 14px", display: "flex", alignItems: "center", gap: 8, borderBottom: "1px solid rgba(59,130,246,0.14)" }}>
        <div style={{ width: 22, height: 22, borderRadius: 5, background: "rgba(59,130,246,0.25)", border: "1px solid rgba(59,130,246,0.5)", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <span style={{ color: "#3b82f6", fontSize: 9, fontWeight: 700 }}>F</span>
        </div>
        <span style={{ color: "rgba(255,255,255,0.72)", fontFamily: "monospace", fontSize: 10 }}>FactoryFlow AI</span>
        <div style={{ marginLeft: "auto", display: "flex", gap: 5 }}>
          {["#ff5f57","#ffbd2e","#28c840"].map(c => <div key={c} style={{ width: 9, height: 9, borderRadius: "50%", background: c }} />)}
        </div>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", borderBottom: "1px solid rgba(59,130,246,0.1)" }}>
        {[["Total Orders","128",""],["In Production","45",""],["Completed","83",""],["Efficiency","96%","#22c55e"]].map(([k,v,c], i) => (
          <div key={k} style={{ padding: "9px 10px", borderRight: i < 3 ? "1px solid rgba(59,130,246,0.1)" : "none" }}>
            <div style={{ color: "rgba(255,255,255,0.28)", fontSize: 7, marginBottom: 2 }}>{k}</div>
            <div style={{ color: c || "rgba(255,255,255,0.9)", fontSize: 16, fontWeight: 700 }}>{v}</div>
          </div>
        ))}
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr" }}>
        <div style={{ padding: "10px 12px", borderRight: "1px solid rgba(59,130,246,0.1)" }}>
          <div style={{ color: "rgba(255,255,255,0.28)", fontSize: 7.5, marginBottom: 5 }}>Production Overview</div>
          <svg viewBox="0 0 130 55" style={{ width: "100%", height: 40 }}>
            <defs>
              <linearGradient id="gf" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.25"/>
                <stop offset="100%" stopColor="#3b82f6" stopOpacity="0"/>
              </linearGradient>
            </defs>
            <polyline points="0,50 15,42 30,33 45,37 60,24 75,30 90,16 105,22 130,11" fill="none" stroke="#3b82f6" strokeWidth="1.3"/>
            <polyline points="0,50 15,42 30,33 45,37 60,24 75,30 90,16 105,22 130,11 130,55 0,55" fill="url(#gf)"/>
          </svg>
          <div style={{ display: "flex", justifyContent: "space-between", marginTop: 3 }}>
            {["Jan","Apr","Jul","Oct"].map(m => (
              <span key={m} style={{ fontSize: 6.5, color: "rgba(255,255,255,0.22)", fontFamily: "monospace" }}>{m}</span>
            ))}
          </div>
        </div>
        <div style={{ padding: "10px 12px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
            <span style={{ color: "rgba(255,255,255,0.28)", fontSize: 7.5 }}>Recent Orders</span>
            <span style={{ color: "#3b82f6", fontSize: 7, fontFamily: "monospace" }}>View All</span>
          </div>
          {[["ORD-1024","In Production","#3b82f6"],["ORD-1023","Quality Check","#f59e0b"],["ORD-1022","Completed","#22c55e"],["ORD-1021","Pending","#6b7280"]].map(([id,status,color]) => (
            <div key={id} style={{ display: "flex", alignItems: "center", gap: 5, marginBottom: 5 }}>
              <div style={{ width: 5, height: 5, borderRadius: "50%", background: color, flexShrink: 0 }} />
              <span style={{ fontSize: 8, color: "rgba(255,255,255,0.5)", flex: 1, fontFamily: "monospace" }}>{id}</span>
              <span style={{ fontSize: 7, color, fontFamily: "monospace", whiteSpace: "nowrap" }}>{status}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function StressFace() {
  return (
    <div style={{ position: "relative", width: 260, height: 260, display: "flex", alignItems: "center", justifyContent: "center" }}>
      <svg viewBox="0 0 260 260" style={{ width: "100%", height: "100%", overflow: "visible" }}>
        {/* Outer glow circles */}
        <circle cx="130" cy="130" r="120" fill="none" stroke="rgba(99,179,237,0.12)" strokeWidth="1"/>
        <circle cx="130" cy="130" r="100" fill="none" stroke="rgba(99,179,237,0.08)" strokeWidth="0.6"/>
        {/* Neural network connections to face */}
        {[[20,50],[55,22],[105,12],[155,22],[200,50],[218,100],[210,158],[130,205],[50,158],[42,100]].map(([x,y], i) => (
          <g key={i}>
            <line x1={x} y1={y} x2="130" y2="120" stroke="rgba(99,179,237,0.12)" strokeWidth="0.7"/>
            <motion.g
              animate={{ opacity: [0.4, 1, 0.4], scale: [0.8, 1.4, 0.8] }}
              transition={{ duration: 1.8, repeat: Infinity, delay: i * 0.18 }}
              style={{ transformOrigin: `${x}px ${y}px` }}
            >
              <circle cx={x} cy={y} r="2.5" fill="rgba(99,179,237,0.75)"/>
            </motion.g>
          </g>
        ))}
        {/* Head outline */}
        <ellipse cx="130" cy="128" rx="60" ry="72" fill="rgba(99,179,237,0.03)" stroke="rgba(99,179,237,0.55)" strokeWidth="1.5"/>
        {/* Eyes */}
        <ellipse cx="110" cy="112" rx="9" ry="6" fill="none" stroke="rgba(99,179,237,0.7)" strokeWidth="1.2"/>
        <circle cx="110" cy="112" r="3.5" fill="rgba(99,179,237,0.55)"/>
        <ellipse cx="150" cy="112" rx="9" ry="6" fill="none" stroke="rgba(99,179,237,0.7)" strokeWidth="1.2"/>
        <circle cx="150" cy="112" r="3.5" fill="rgba(99,179,237,0.55)"/>
        {/* Nose */}
        <path d="M126,122 L130,136 L134,122" fill="none" stroke="rgba(99,179,237,0.38)" strokeWidth="0.9"/>
        {/* Mouth */}
        <path d="M112,152 Q130,158 148,152" fill="none" stroke="rgba(99,179,237,0.55)" strokeWidth="1.1"/>
        {/* Brain scan area */}
        <ellipse cx="130" cy="98" rx="38" ry="28" fill="rgba(99,179,237,0.04)" stroke="rgba(99,179,237,0.18)" strokeWidth="0.7" strokeDasharray="3,3"/>
      </svg>

      {/* Stress Level card */}
      <motion.div
        style={{
          position: "absolute", top: 14, right: 0,
          background: "rgba(5,5,5,0.92)", border: "1px solid rgba(99,179,237,0.3)",
          borderRadius: 8, padding: "7px 12px",
        }}
        animate={{ boxShadow: ["0 0 0px rgba(99,179,237,0)", "0 0 16px rgba(99,179,237,0.3)", "0 0 0px rgba(99,179,237,0)"] }}
        transition={{ duration: 2.5, repeat: Infinity }}
      >
        <div style={{ color: "rgba(255,255,255,0.38)", fontSize: 8, fontFamily: "monospace", marginBottom: 2 }}>Stress Level</div>
        <div style={{ color: "#63b3ed", fontSize: 20, fontWeight: 700, lineHeight: 1 }}>82%</div>
      </motion.div>

      {/* Heart Rate card */}
      <div style={{
        position: "absolute", top: 72, right: -8,
        background: "rgba(5,5,5,0.92)", border: "1px solid rgba(239,68,68,0.28)",
        borderRadius: 8, padding: "7px 12px",
      }}>
        <div style={{ color: "rgba(255,255,255,0.38)", fontSize: 8, fontFamily: "monospace", marginBottom: 2 }}>Heart Rate</div>
        <div style={{ color: "#ef4444", fontSize: 17, fontWeight: 700, lineHeight: 1 }}>78<span style={{ fontSize: 9, color: "rgba(239,68,68,0.6)", marginLeft: 2 }}>bpm</span></div>
        <svg viewBox="0 0 60 16" style={{ width: 60, height: 12, marginTop: 4 }}>
          <polyline points="0,8 6,8 10,2 14,14 18,8 24,8 30,4 36,12 40,8 46,8 50,3 54,13 58,8 60,8" fill="none" stroke="#ef4444" strokeWidth="1.2"/>
        </svg>
      </div>

      {/* Signals card */}
      <div style={{
        position: "absolute", bottom: 14, left: 0,
        background: "rgba(5,5,5,0.92)", border: "1px solid rgba(99,179,237,0.2)",
        borderRadius: 8, padding: "7px 12px", minWidth: 100,
      }}>
        <div style={{ color: "rgba(255,255,255,0.38)", fontSize: 8, fontFamily: "monospace", marginBottom: 5 }}>Signals</div>
        {[["Facial Analysis",70,"#63b3ed"],["Voice Analysis",55,"#a78bfa"],["Text Sentiment",82,"#34d399"],["Physiological",68,"#fbbf24"]].map(([label, pct, color]) => (
          <div key={label as string} style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 4 }}>
            <span style={{ fontSize: 7.5, color: "rgba(255,255,255,0.45)", width: 80 }}>{label}</span>
            <div style={{ flex: 1, height: 3, background: "rgba(255,255,255,0.08)", borderRadius: 99 }}>
              <motion.div
                style={{ height: "100%", background: color as string, borderRadius: 99 }}
                initial={{ width: 0 }}
                animate={{ width: `${pct}%` }}
                transition={{ duration: 1.2, delay: 0.5 }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────
   GitHub button
────────────────────────────────────────── */
function GitHubBtn({ href }: { href: string }) {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      whileHover={{ scale: 1.04, y: -2 }}
      whileTap={{ scale: 0.97 }}
      style={{
        display: "inline-flex", alignItems: "center", gap: 10,
        border: "1px solid rgba(255,255,255,0.18)",
        background: "rgba(255,255,255,0.05)",
        borderRadius: 8, padding: "11px 22px",
        color: "rgba(255,255,255,0.8)", textDecoration: "none",
        fontFamily: "monospace", fontSize: 12, letterSpacing: "0.05em",
        cursor: "pointer", transition: "border-color 0.25s, background 0.25s, box-shadow 0.25s",
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget as HTMLAnchorElement;
        el.style.borderColor = "rgba(255,255,255,0.45)";
        el.style.background = "rgba(255,255,255,0.1)";
        el.style.boxShadow = "0 0 24px rgba(255,255,255,0.1)";
        el.style.color = "#fff";
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget as HTMLAnchorElement;
        el.style.borderColor = "rgba(255,255,255,0.18)";
        el.style.background = "rgba(255,255,255,0.05)";
        el.style.boxShadow = "none";
        el.style.color = "rgba(255,255,255,0.8)";
      }}
    >
      <SiGithub size={16} />
      View on GitHub
      <FaArrowRight size={10} style={{ opacity: 0.6 }} />
    </motion.a>
  );
}

/* ──────────────────────────────────────────
   Project row
────────────────────────────────────────── */
function ProjectRow({
  number, title, subtitle, category, year, description, github, visual, flip, delay,
}: {
  number: string;
  title: string;
  subtitle: string;
  category: string;
  year: string;
  description: string;
  github?: string;
  visual: React.ReactNode;
  flip?: boolean;
  delay: number;
}) {
  const ref    = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px 0px" });

  const textCol = (
    <motion.div
      initial={{ opacity: 0, x: flip ? 30 : -30 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.7, delay: delay + 0.1, ease: [0.22, 1, 0.36, 1] }}
      style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}
    >
      {/* Number */}
      <div style={{
        fontFamily: "monospace", fontSize: 11, letterSpacing: "0.35em",
        color: "rgba(255,255,255,0.2)", marginBottom: 14, display: "flex", alignItems: "center", gap: 10,
      }}>
        {number}
        <motion.div
          style={{ height: 1, flex: 1, background: "linear-gradient(90deg, rgba(255,255,255,0.15), transparent)" }}
          initial={{ scaleX: 0 }}
          animate={inView ? { scaleX: 1 } : {}}
          transition={{ duration: 0.6, delay: delay + 0.3 }}
        />
      </div>

      <h3 style={{
        fontSize: "clamp(26px, 3.5vw, 44px)", fontWeight: 700,
        letterSpacing: "-0.025em", color: "#ffffff", lineHeight: 1.05, marginBottom: 8,
      }}>
        {title}
      </h3>

      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
        <span style={{ fontSize: 12.5, fontWeight: 600, color: "#63b3ed" }}>{subtitle}</span>
        <span style={{ color: "rgba(255,255,255,0.2)" }}>·</span>
        <span style={{ fontFamily: "monospace", fontSize: 11, color: "rgba(255,255,255,0.3)", letterSpacing: "0.06em" }}>{year}</span>
      </div>

      <div style={{ height: 1, background: "rgba(255,255,255,0.07)", marginBottom: 16 }} />

      <p style={{ fontSize: 14, color: "rgba(255,255,255,0.5)", lineHeight: 1.75, marginBottom: 28, maxWidth: 460 }}>
        {description}
      </p>

      {github && <GitHubBtn href={github} />}
    </motion.div>
  );

  const visualCol = (
    <motion.div
      initial={{ opacity: 0, x: flip ? -30 : 30 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.7, delay: delay + 0.2, ease: [0.22, 1, 0.36, 1] }}
      style={{ display: "flex", alignItems: "center", justifyContent: "center" }}
    >
      {visual}
    </motion.div>
  );

  return (
    <div ref={ref}>
      {/* Divider */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={inView ? { scaleX: 1 } : {}}
        transition={{ duration: 0.7, delay }}
        style={{
          height: 1,
          background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.1) 30%, rgba(255,255,255,0.1) 70%, transparent)",
          transformOrigin: "left",
          marginBottom: 60,
        }}
      />

      <div style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: "40px 60px",
        alignItems: "center",
        marginBottom: 72,
      }}
      className="project-row"
      >
        {flip ? <>{visualCol}{textCol}</> : <>{textCol}{visualCol}</>}
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────
   Main
────────────────────────────────────────── */
export function Projects() {
  const headingRef    = useRef<HTMLDivElement>(null);
  const headingInView = useInView(headingRef, { once: true, margin: "-60px 0px" });

  return (
    <section id="projects" style={{ position: "relative", paddingTop: 128, paddingBottom: 80, overflow: "hidden" }}>
      {/* Background ambience */}
      <motion.div
        aria-hidden
        animate={{ opacity: [0.2, 0.45, 0.2] }}
        transition={{ duration: 8, repeat: Infinity }}
        style={{
          position: "absolute", top: "10%", left: "20%",
          width: 700, height: 500, borderRadius: "50%",
          background: "radial-gradient(ellipse, rgba(99,179,237,0.04) 0%, transparent 70%)",
          filter: "blur(40px)", pointerEvents: "none",
        }}
      />
      <motion.div
        aria-hidden
        animate={{ opacity: [0.15, 0.35, 0.15] }}
        transition={{ duration: 10, repeat: Infinity, delay: 3 }}
        style={{
          position: "absolute", bottom: "20%", right: "10%",
          width: 600, height: 400, borderRadius: "50%",
          background: "radial-gradient(ellipse, rgba(167,139,250,0.04) 0%, transparent 70%)",
          filter: "blur(40px)", pointerEvents: "none",
        }}
      />

      {/* Fine dot grid */}
      <div aria-hidden style={{
        position: "absolute", inset: 0,
        backgroundImage: "radial-gradient(rgba(255,255,255,0.03) 1px, transparent 1px)",
        backgroundSize: "28px 28px", pointerEvents: "none",
      }} />

      <div className="container mx-auto" style={{ maxWidth: 1080, padding: "0 24px", position: "relative" }}>

        {/* ── Section heading ── */}
        <motion.div
          ref={headingRef}
          initial={{ opacity: 0, y: 32 }}
          animate={headingInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          style={{ marginBottom: 80, textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center" }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
            <motion.div
              style={{ width: 28, height: 1, background: "#63b3ed" }}
              initial={{ scaleX: 0 }}
              animate={headingInView ? { scaleX: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.2 }}
            />
            <span style={{
              fontFamily: "monospace", fontSize: 10, letterSpacing: "0.38em",
              textTransform: "uppercase", color: "#63b3ed",
            }}>
              Selected Work
            </span>
            <motion.div
              style={{ width: 28, height: 1, background: "#63b3ed" }}
              initial={{ scaleX: 0 }}
              animate={headingInView ? { scaleX: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.2 }}
            />
          </div>

          <h2 style={{
            fontSize: "clamp(52px, 9vw, 120px)", fontWeight: 800,
            letterSpacing: "-0.04em", color: "#ffffff", lineHeight: 0.9,
            marginBottom: 24,
          }}>
            Projects
          </h2>

          <p style={{
            fontSize: 15, color: "rgba(255,255,255,0.38)", lineHeight: 1.7,
            maxWidth: 480, textAlign: "center",
          }}>
            A collection of intelligent systems and AI products solving real-world problems.
          </p>

          <motion.div
            initial={{ scaleX: 0 }}
            animate={headingInView ? { scaleX: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            style={{ width: 40, height: 2, background: "#63b3ed", marginTop: 24, borderRadius: 99 }}
          />
        </motion.div>

        {/* ── Project rows ── */}
        <ProjectRow
          number="01"
          title="Diabetic Retinopathy Detection"
          subtitle="Healthcare AI"
          category="ai-ml"
          year="2025"
          description="Deep learning system that analyzes retinal fundus images to detect diabetic retinopathy with high accuracy, enabling early diagnosis and better treatment outcomes. Built with CNN architectures and deployed as a Flask web app enabling real-time image predictions with data augmentation and preprocessing."
          visual={<RetinalEye />}
          flip={false}
          delay={0.1}
        />

        <ProjectRow
          number="02"
          title="VerdantPilot AI"
          subtitle="Smart Farming Intelligence Platform"
          category="ai-ml"
          year="2025"
          description="AI-powered agriculture system featuring crop recommendation, soil health analysis, weather intelligence, fertilizer guidance, and yield prediction. Integrates multi-source data for comprehensive farm management."
          github="https://github.com/Himagirisiddesh/VerdantPilot-AI"
          visual={<VerdantDashboard />}
          flip={true}
          delay={0.15}
        />

        <ProjectRow
          number="03"
          title="FactoryFlow AI"
          subtitle="AI Manufacturing Workflow Platform"
          category="fullstack"
          year="2025"
          description="Role-based manufacturing management system with intelligent order intake, workflow automation, production tracking, and customer-admin collaboration. Delivers real-time factory floor visibility with efficiency analytics."
          github="https://github.com/Himagirisiddesh/Factory-Flow-AI"
          visual={<FactoryDashboard />}
          flip={false}
          delay={0.15}
        />

        <ProjectRow
          number="04"
          title="Multi-Modal Stress Detection"
          subtitle="AI-Powered Stress Detection System"
          category="ai-ml"
          year="2024"
          description="AI-driven stress detection system using multiple behavioral and physiological indicators — facial expression analysis, voice pattern recognition, text sentiment, and biometric signals — for comprehensive wellbeing analysis."
          github="https://github.com/Himagirisiddesh/Multi_Model-Stress-Detection"
          visual={<StressFace />}
          flip={true}
          delay={0.15}
        />

        {/* ── Explore more ── */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          style={{
            display: "flex", flexDirection: "column", alignItems: "center",
            textAlign: "center", paddingTop: 40, paddingBottom: 20,
          }}
        >
          {/* GitHub logo circle */}
          <motion.div
            style={{
              width: 72, height: 72, borderRadius: "50%",
              border: "1px solid rgba(255,255,255,0.18)",
              background: "rgba(255,255,255,0.04)",
              display: "flex", alignItems: "center", justifyContent: "center",
              marginBottom: 20,
            }}
            animate={{ boxShadow: ["0 0 0px rgba(255,255,255,0)", "0 0 30px rgba(255,255,255,0.12)", "0 0 0px rgba(255,255,255,0)"] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            <SiGithub size={32} color="rgba(255,255,255,0.75)" />
          </motion.div>

          <h3 style={{
            fontSize: "clamp(20px, 2.8vw, 32px)", fontWeight: 700,
            letterSpacing: "-0.02em", color: "#ffffff", marginBottom: 10,
          }}>
            Explore More Projects
          </h3>
          <p style={{ fontSize: 14, color: "rgba(255,255,255,0.38)", lineHeight: 1.65, maxWidth: 340, marginBottom: 28 }}>
            View additional experiments, tools, and open-source work on GitHub.
          </p>

          <motion.a
            href="https://github.com/Himagirisiddesh"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05, y: -3 }}
            whileTap={{ scale: 0.97 }}
            style={{
              display: "inline-flex", alignItems: "center", gap: 10,
              background: "linear-gradient(135deg, #2563eb 0%, #7c3aed 100%)",
              border: "none", borderRadius: 8, padding: "13px 28px",
              color: "#ffffff", textDecoration: "none",
              fontFamily: "monospace", fontSize: 12, letterSpacing: "0.1em",
              fontWeight: 600, cursor: "pointer",
              boxShadow: "0 0 40px rgba(99,102,241,0.3)",
            }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.boxShadow = "0 0 60px rgba(99,102,241,0.5)"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.boxShadow = "0 0 40px rgba(99,102,241,0.3)"; }}
          >
            Visit GitHub Profile
            <FaArrowRight size={11} />
          </motion.a>
        </motion.div>

      </div>

      {/* Responsive styles */}
      <style>{`
        @media (max-width: 768px) {
          .project-row {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
