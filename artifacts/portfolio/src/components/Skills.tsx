import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

export function Skills() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 });

  const skills = [
    { category: "Languages", items: ["Python", "JavaScript", "TypeScript", "Java", "C++"] },
    { category: "Frontend", items: ["React", "Next.js", "Three.js", "Tailwind CSS", "Framer Motion"] },
    { category: "Backend", items: ["Node.js", "Express", "FastAPI", "Django"] },
    { category: "Databases", items: ["PostgreSQL", "MongoDB", "Redis"] },
    { category: "Tools", items: ["Git", "Docker", "AWS", "Figma", "Linux"] },
  ];

  return (
    <section id="skills" className="py-32 relative bg-white/[0.02]">
      <div className="container mx-auto px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <div className="flex flex-col md:flex-row gap-16 md:gap-32">
            <div className="md:w-1/3">
              <h2 className="text-3xl font-light tracking-tight text-white mb-4">Technical Arsenal</h2>
              <div className="w-12 h-[1px] bg-white/20"></div>
            </div>
            
            <div className="md:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-12">
              {skills.map((skillGroup, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
                >
                  <h3 className="text-white/40 font-mono text-xs tracking-widest uppercase mb-4">{skillGroup.category}</h3>
                  <ul className="flex flex-wrap gap-2">
                    {skillGroup.items.map((item, i) => (
                      <li 
                        key={i} 
                        className="text-sm text-white/80 border border-white/10 px-3 py-1 rounded-full bg-white/5 hover:bg-white/10 transition-colors"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
