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
          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-white/35 font-mono text-xs tracking-widest uppercase mb-6"
          >
            Let's build something
          </motion.p>

          <h2 className="text-5xl md:text-7xl font-light tracking-tighter text-white mb-8">
            Let's Connect
          </h2>

          <p className="text-white/45 text-lg md:text-xl font-light mb-12 max-w-2xl mx-auto leading-relaxed">
            Currently open for new opportunities, collaborations, and interesting problems to solve. 
            If you're looking for a developer with strong AI/ML and full stack skills — let's talk.
          </p>

          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-8">
            <a
              href="mailto:himagirisiddesh@gmail.com"
              data-testid="link-email"
              className="px-8 py-4 bg-white text-black font-mono text-xs uppercase tracking-widest hover:bg-white/90 transition-colors"
            >
              himagirisiddesh@gmail.com
            </a>
            <a
              href="tel:+919148490736"
              data-testid="link-phone"
              className="px-8 py-4 border border-white/20 text-white font-mono text-xs uppercase tracking-widest hover:border-white/50 transition-colors"
            >
              +91 91484 90736
            </a>
          </div>

          <div className="flex justify-between items-center border-t border-white/8 pt-10 mt-16 flex-col md:flex-row gap-4">
            <div className="text-white/25 font-mono text-xs tracking-widest uppercase">
              © {new Date().getFullYear()} Himagiri Siddesh M
            </div>

            <div className="flex gap-8">
              <a
                href="https://github.com/Himagirisiddesh"
                target="_blank"
                rel="noopener noreferrer"
                data-testid="link-github"
                className="text-white/40 hover:text-white font-mono text-xs uppercase tracking-widest transition-colors"
              >
                GitHub
              </a>
              <a
                href="https://linkedin.com/in/himagiri-siddesh-m-532b102a3"
                target="_blank"
                rel="noopener noreferrer"
                data-testid="link-linkedin"
                className="text-white/40 hover:text-white font-mono text-xs uppercase tracking-widest transition-colors"
              >
                LinkedIn
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
