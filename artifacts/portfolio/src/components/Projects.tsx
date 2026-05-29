import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

export function Projects() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  const projects = [
    {
      name: "AI Code Reviewer",
      description: "An AI-powered tool that reviews GitHub PRs and provides actionable feedback.",
      stack: ["Python", "FastAPI", "OpenAI API", "React"],
      year: "2024"
    },
    {
      name: "3D Product Visualizer",
      description: "Real-time 3D product configurator for e-commerce.",
      stack: ["Three.js", "React", "WebGL", "Node.js"],
      year: "2023"
    },
    {
      name: "DevCollab",
      description: "Real-time collaborative coding platform with video chat.",
      stack: ["Next.js", "WebRTC", "Socket.io", "PostgreSQL"],
      year: "2023"
    },
    {
      name: "NexusAI Dashboard",
      description: "Analytics dashboard for AI model performance monitoring.",
      stack: ["React", "Recharts", "Python", "FastAPI"],
      year: "2022"
    }
  ];

  return (
    <section id="projects" className="py-32 relative">
      <div className="container mx-auto px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-16 md:mb-24"
        >
          <h2 className="text-3xl font-light tracking-tight text-white mb-4">Selected Works</h2>
          <div className="w-12 h-[1px] bg-white/20"></div>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
              className="group border border-white/10 bg-white/[0.02] p-8 md:p-10 hover:bg-white/[0.04] transition-all hover:border-white/20"
            >
              <div className="flex justify-between items-start mb-6">
                <h3 className="text-2xl font-light text-white group-hover:text-white transition-colors">{project.name}</h3>
                <span className="text-white/30 font-mono text-xs">{project.year}</span>
              </div>
              
              <p className="text-white/60 mb-8 font-light leading-relaxed">
                {project.description}
              </p>
              
              <div className="flex flex-wrap gap-2 mt-auto">
                {project.stack.map((tech, i) => (
                  <span key={i} className="text-[10px] font-mono tracking-wider text-white/40 uppercase border border-white/10 px-2 py-1">
                    {tech}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
