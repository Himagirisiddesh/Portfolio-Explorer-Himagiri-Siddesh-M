import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

interface Achievement {
  title: string;
  event: string;
  organizer: string;
  year: string;
  type: "hackathon" | "ideathon" | "award" | "competition";
  description: string;
  rank?: string;
}

const achievements: Achievement[] = [
  {
    title: "Add Your Hackathon Win",
    event: "Hackathon / Event Name",
    organizer: "Organizer",
    year: "2024",
    type: "hackathon",
    description: "Describe what you built and what problem you solved.",
    rank: "1st Place",
  },
  {
    title: "Add Your Ideathon",
    event: "Ideathon / Event Name",
    organizer: "Organizer",
    year: "2024",
    type: "ideathon",
    description: "Describe your idea and its impact.",
    rank: "Finalist",
  },
  {
    title: "Add Another Achievement",
    event: "Competition / Award Name",
    organizer: "Organizer",
    year: "2023",
    type: "award",
    description: "Describe what you achieved.",
  },
];

const typeLabel: Record<Achievement["type"], string> = {
  hackathon: "Hackathon",
  ideathon: "Ideathon",
  award: "Award",
  competition: "Competition",
};

export function Achievements() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section id="achievements" className="py-32 relative">
      <div className="container mx-auto px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-16 md:mb-24"
        >
          <h2 className="text-3xl font-light tracking-tight text-white mb-4">Achievements</h2>
          <div className="w-12 h-[1px] bg-white/20" />
          <p className="text-white/30 font-mono text-xs tracking-widest uppercase mt-4">
            Hackathons · Ideathons · Recognitions
          </p>
        </motion.div>

        <div className="flex flex-col gap-0">
          {achievements.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.15 + index * 0.12 }}
              className="group border-b border-white/8 last:border-b-0 py-10 grid grid-cols-1 md:grid-cols-[1fr_2fr_auto] gap-6 md:gap-12 items-start hover:bg-white/[0.02] transition-colors px-4 -mx-4"
            >
              {/* Left: type + year */}
              <div className="flex md:flex-col gap-4 md:gap-2">
                <span className="text-[10px] font-mono tracking-widest uppercase border border-white/15 px-2 py-1 text-white/40 self-start">
                  {typeLabel[item.type]}
                </span>
                <span className="text-white/25 font-mono text-xs tracking-widest self-center md:self-start">
                  {item.year}
                </span>
              </div>

              {/* Center: title + details */}
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-3 flex-wrap">
                  <h3 className="text-xl md:text-2xl font-light text-white group-hover:text-white/90 transition-colors">
                    {item.title}
                  </h3>
                  {item.rank && (
                    <span className="text-[10px] font-mono tracking-wider text-white/60 bg-white/8 border border-white/12 px-2 py-0.5">
                      {item.rank}
                    </span>
                  )}
                </div>
                <p className="text-white/40 text-sm font-mono tracking-wide">
                  {item.event} — {item.organizer}
                </p>
                <p className="text-white/55 font-light leading-relaxed max-w-xl">
                  {item.description}
                </p>
              </div>

              {/* Right: animated arrow indicator */}
              <div className="hidden md:flex items-center justify-end self-center">
                <motion.div
                  className="w-8 h-[1px] bg-white/15 group-hover:bg-white/40 transition-colors"
                  initial={false}
                />
                <motion.div
                  className="w-0 h-0 border-t-4 border-b-4 border-l-4 border-transparent border-l-white/15 group-hover:border-l-white/40 transition-colors"
                  style={{ borderLeftWidth: 6 }}
                />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Decorative grid lines */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden -z-10">
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 1.5, delay: 0.5 }}
            className="absolute right-0 top-0 w-px h-full bg-gradient-to-b from-transparent via-white/5 to-transparent"
          />
        </div>
      </div>
    </section>
  );
}
