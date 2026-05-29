import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

interface Role {
  title: string;
  company: string;
  type: string;
  period: string;
  bullets: string[];
  tech: string[];
}

const roles: Role[] = [
  {
    title: "Full Stack Developer Intern",
    company: "Adversity Solutions",
    type: "Online",
    period: "Dec 2025 – Mar 2026",
    bullets: [
      "Developed real-world web applications using modern technologies in a production environment.",
      "Led the frontend team and managed the full UI development lifecycle.",
      "Built responsive interfaces and ensured seamless API integration across all features.",
    ],
    tech: ["React", "REST APIs", "JavaScript", "CSS3"],
  },
  {
    title: "AI/ML Intern",
    company: "ADVI Group",
    type: "Remote",
    period: "Nov 2024 – Feb 2025",
    bullets: [
      "Built and evaluated ML models including Random Forest Regressor achieving RMSE of 1.2 for vehicle speed prediction.",
      "Automated data preprocessing pipelines with Pandas & NumPy, reducing cleanup time by 25%.",
      "Applied supervised and unsupervised learning — Decision Trees, Random Forests, Clustering.",
      "Worked with TensorFlow, PyTorch, Scikit-learn, and CNNs for deep learning tasks.",
    ],
    tech: ["Python", "TensorFlow", "PyTorch", "Scikit-learn", "Pandas", "NumPy", "CNN"],
  },
];

export function Experience() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section id="experience" className="py-32 relative bg-white/[0.02]">
      <div className="container mx-auto px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <div className="flex flex-col md:flex-row gap-16 md:gap-32">
            {/* Left label */}
            <div className="md:w-1/3 md:pt-2">
              <h2 className="text-3xl font-light tracking-tight text-white mb-4">Experience</h2>
              <div className="w-12 h-[1px] bg-white/20 mb-6" />
              <p className="text-white/30 font-mono text-xs tracking-widest uppercase leading-relaxed">
                Internships &<br />Professional Work
              </p>
            </div>

            {/* Timeline */}
            <div className="md:w-2/3 relative">
              {/* vertical line */}
              <motion.div
                className="absolute left-0 top-0 bottom-0 w-[1px] bg-gradient-to-b from-white/20 via-white/10 to-transparent"
                initial={{ scaleY: 0, transformOrigin: "top" }}
                animate={inView ? { scaleY: 1 } : {}}
                transition={{ duration: 1.2, delay: 0.3, ease: [0.25, 0.4, 0.25, 1] }}
              />

              <div className="flex flex-col gap-16 pl-10">
                {roles.map((role, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -24 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.7, delay: 0.4 + index * 0.2 }}
                    className="relative group"
                  >
                    {/* dot on timeline */}
                    <motion.div
                      className="absolute -left-[2.65rem] top-1.5 w-2.5 h-2.5 rounded-full border border-white/30 bg-black group-hover:bg-white/20 transition-colors"
                      initial={{ scale: 0 }}
                      animate={inView ? { scale: 1 } : {}}
                      transition={{ duration: 0.4, delay: 0.5 + index * 0.2 }}
                    />

                    {/* header */}
                    <div className="flex flex-col gap-1 mb-5">
                      <div className="flex items-center gap-3 flex-wrap">
                        <h3 className="text-xl md:text-2xl font-light text-white">{role.title}</h3>
                        <span className="text-[10px] font-mono text-white/40 border border-white/12 px-2 py-0.5 tracking-widest uppercase">
                          {role.type}
                        </span>
                      </div>
                      <div className="flex items-baseline gap-3">
                        <span className="text-white/60 font-light">{role.company}</span>
                        <span className="text-white/25 font-mono text-xs tracking-widest">{role.period}</span>
                      </div>
                    </div>

                    {/* bullets */}
                    <ul className="flex flex-col gap-3 mb-6">
                      {role.bullets.map((bullet, i) => (
                        <motion.li
                          key={i}
                          initial={{ opacity: 0, x: -10 }}
                          animate={inView ? { opacity: 1, x: 0 } : {}}
                          transition={{ duration: 0.5, delay: 0.6 + index * 0.2 + i * 0.08 }}
                          className="flex gap-3 text-white/50 font-light text-sm leading-relaxed"
                        >
                          <span className="text-white/25 mt-[5px] shrink-0">—</span>
                          {bullet}
                        </motion.li>
                      ))}
                    </ul>

                    {/* tech stack */}
                    <div className="flex flex-wrap gap-2">
                      {role.tech.map((t, i) => (
                        <span
                          key={i}
                          className="text-[10px] font-mono tracking-wider text-white/35 uppercase border border-white/10 px-2 py-1 hover:border-white/25 hover:text-white/55 transition-all"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
