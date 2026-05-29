import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

export function Education() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 });

  const education = [
    {
      degree: "B.Tech in Computer Science & Engineering",
      institution: "GITAM University, Visakhapatnam",
      years: "2021–2025",
    },
    {
      degree: "Class 12",
      institution: "Sri Chaitanya Junior College",
      years: "2019–2021",
    }
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
              <div className="w-12 h-[1px] bg-white/20"></div>
            </div>
            
            <div className="md:w-2/3 flex flex-col gap-12">
              {education.map((item, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
                  className="group"
                >
                  <div className="flex flex-col gap-2">
                    <span className="text-white/40 font-mono text-xs tracking-widest">{item.years}</span>
                    <h3 className="text-xl text-white font-light group-hover:text-white/80 transition-colors">{item.degree}</h3>
                    <p className="text-white/50">{item.institution}</p>
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
