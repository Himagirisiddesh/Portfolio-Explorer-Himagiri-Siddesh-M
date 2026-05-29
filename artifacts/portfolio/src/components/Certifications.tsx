import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

export function Certifications() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 });

  const certifications = [
    { name: "AI/ML Internship Certificate", issuer: "ADVI Group", year: "2025" },
    { name: "Full Stack Developer Certificate", issuer: "Adversity Solutions", year: "2026" },
    { name: "Add Your Certification", issuer: "Issuing Organization", year: "2024" },
    { name: "Add Another Certification", issuer: "Issuing Organization", year: "2023" },
  ];

  return (
    <section id="certifications" className="py-32 relative bg-white/[0.02]">
      <div className="container mx-auto px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <div className="flex flex-col md:flex-row gap-16 md:gap-32">
            <div className="md:w-1/3">
              <h2 className="text-3xl font-light tracking-tight text-white mb-4">Certifications</h2>
              <div className="w-12 h-[1px] bg-white/20" />
            </div>

            <div className="md:w-2/3 flex flex-col gap-0">
              {certifications.map((cert, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
                  className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 border-b border-white/8 py-7 group hover:pl-2 transition-all"
                >
                  <div className="flex flex-col gap-1">
                    <h3 className="text-lg text-white font-light group-hover:text-white/85 transition-colors">
                      {cert.name}
                    </h3>
                    <span className="text-white/35 text-sm font-mono">{cert.issuer}</span>
                  </div>
                  <span className="text-white/25 font-mono text-xs tracking-widest shrink-0">{cert.year}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
