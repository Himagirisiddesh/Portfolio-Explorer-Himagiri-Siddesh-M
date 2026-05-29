import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

export function Projects() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  const projects = [
    {
      name: "Diabetic Retinopathy Detection",
      description:
        "CNN-based system for classifying retinal image severity with 92% accuracy. Deployed as a Flask web app enabling real-time image predictions with data augmentation and preprocessing.",
      stack: ["Python", "TensorFlow", "CNN", "Flask", "HTML/CSS"],
      year: "2024",
      highlight: "92% accuracy",
    },
    {
      name: "Stress Detection AI",
      description:
        "Deep learning model to detect human stress levels in real time. Built end-to-end: data preprocessing, model training, and a full prediction pipeline.",
      stack: ["Python", "Deep Learning", "Data Preprocessing"],
      year: "2024",
      highlight: "Real-time detection",
    },
    {
      name: "Vehicle Speed Prediction",
      description:
        "ML pipeline using Random Forest Regressor achieving RMSE of 1.2 for vehicle speed prediction. Automated data preprocessing with Pandas/NumPy, reducing cleanup time by 25%.",
      stack: ["Python", "Random Forest", "Scikit-learn", "Pandas", "NumPy"],
      year: "2024",
      highlight: "RMSE: 1.2",
    },
    {
      name: "Full Stack Web Applications",
      description:
        "Led the frontend team building responsive, production-ready web applications with smooth API integration. Managed UI development lifecycle from design to deployment.",
      stack: ["React", "REST APIs", "JavaScript", "CSS3"],
      year: "2025",
      highlight: "Team Lead",
    },
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
          <div className="w-12 h-[1px] bg-white/20" />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
              className="group border border-white/10 bg-white/[0.02] p-8 md:p-10 hover:bg-white/[0.04] hover:border-white/20 transition-all relative overflow-hidden"
            >
              {/* top bar accent */}
              <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

              <div className="flex justify-between items-start mb-3">
                <h3 className="text-xl md:text-2xl font-light text-white">{project.name}</h3>
                <span className="text-white/25 font-mono text-xs shrink-0 ml-4">{project.year}</span>
              </div>

              {project.highlight && (
                <span className="inline-block text-[10px] font-mono tracking-wider text-white/50 border border-white/10 px-2 py-0.5 mb-5">
                  {project.highlight}
                </span>
              )}

              <p className="text-white/55 mb-8 font-light leading-relaxed text-sm md:text-base">
                {project.description}
              </p>

              <div className="flex flex-wrap gap-2 mt-auto">
                {project.stack.map((tech, i) => (
                  <span
                    key={i}
                    className="text-[10px] font-mono tracking-wider text-white/35 uppercase border border-white/10 px-2 py-1"
                  >
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
