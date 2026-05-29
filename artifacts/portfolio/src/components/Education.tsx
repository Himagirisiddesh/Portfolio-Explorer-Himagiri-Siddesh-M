import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

export function Education() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 });

  const education = [
    {
      degree: "Master of Computer Applications (MCA)",
      institution: "RNS Institute of Technology, Bengaluru",
      years: "2025 – 2027",
      cgpa: "9.39",
    },
    {
      degree: "Bachelor of Computer Applications (BCA)",
      institution: "KLE Society's Degree College",
      years: "2022 – 2025",
      cgpa: "8.4",
    },
  ];

  return (
    <section id="education" className="py-32 relative">
      <div className="container mx-auto px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <div className="flex flex-col md:flex-row gap-16 md:gap-32">
            <div className="md:w-1/3">
              <h2 className="text-3xl font-light tracking-tight text-white mb-4">Education</h2>
              <div className="w-12 h-[1px] bg-white/20" />
            </div>

            <div className="md:w-2/3 flex flex-col gap-12">
              {education.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.2 + index * 0.15 }}
                  className="group border-l border-white/10 pl-8 hover:border-white/30 transition-colors"
                >
                  <div className="flex flex-col gap-2">
                    <span className="text-white/35 font-mono text-xs tracking-widest">{item.years}</span>
                    <h3 className="text-xl text-white font-light group-hover:text-white/90 transition-colors">
                      {item.degree}
                    </h3>
                    <p className="text-white/50">{item.institution}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-[10px] font-mono text-white/30 uppercase tracking-widest">CGPA</span>
                      <span className="text-white/70 font-mono text-sm">{item.cgpa}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
