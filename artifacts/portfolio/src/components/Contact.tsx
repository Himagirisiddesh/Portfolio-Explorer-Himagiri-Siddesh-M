import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

export function Contact() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 });

  return (
    <section id="contact" className="py-32 relative">
      <div className="container mx-auto px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto text-center"
        >
          <h2 className="text-5xl md:text-7xl font-light tracking-tighter text-white mb-8">Let's Connect</h2>
          <p className="text-white/50 text-lg md:text-xl font-light mb-12 max-w-2xl mx-auto">
            Currently open for new opportunities and collaborations. Feel free to reach out if you're looking for a developer, have a question, or just want to connect.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center items-center gap-6 mb-24">
            <a 
              href="mailto:himagiri.siddesh@example.com"
              className="px-8 py-4 bg-white text-black font-mono text-xs uppercase tracking-widest hover:bg-white/90 transition-colors"
            >
              Send Email
            </a>
          </div>
          
          <div className="flex justify-between items-center border-t border-white/10 pt-8 flex-col md:flex-row gap-4">
            <div className="text-white/30 font-mono text-xs tracking-widest uppercase">
              © {new Date().getFullYear()} Himagiri Siddesh
            </div>
            
            <div className="flex gap-8">
              <a href="https://github.com/himagiri-siddesh" target="_blank" rel="noopener noreferrer" className="text-white/50 hover:text-white font-mono text-xs uppercase tracking-widest transition-colors">
                GitHub
              </a>
              <a href="https://linkedin.com/in/himagiri-siddesh" target="_blank" rel="noopener noreferrer" className="text-white/50 hover:text-white font-mono text-xs uppercase tracking-widest transition-colors">
                LinkedIn
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
