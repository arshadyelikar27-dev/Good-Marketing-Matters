"use client";

import { motion } from "framer-motion";

const items = [
  "Surya Dakshin Idli",
  "Sunalk",
  "Sindbaad Bhandi",
  "Umang",
];

export function Clients() {
  return (
    <section id="clients" className="py-16 sm:py-24 md:py-32 w-full bg-surface overflow-hidden relative select-none border-y border-black/10">
      
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/5 via-transparent to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 mb-8 sm:mb-16 text-center relative z-10">
        <h2 className="text-base sm:text-xl md:text-2xl font-bold uppercase text-primary tracking-widest drop-shadow-[0_0_10px_rgba(104, 17, 201,0.5)]">
          Trusted by visionaries
        </h2>
      </div>

      {/* Gradient Mask for fading edges */}
      <div className="relative w-full overflow-hidden flex flex-col gap-4 md:gap-8"
           style={{ maskImage: 'linear-gradient(to right, transparent, black 15%, black 85%, transparent)', WebkitMaskImage: 'linear-gradient(to right, transparent, black 15%, black 85%, transparent)' }}>
        
        {/* ROW 1: Scrolling Left */}
        <div className="flex w-full group">
          <motion.div
            className="flex gap-6 sm:gap-12 md:gap-24 whitespace-nowrap min-w-max items-center"
            animate={{ x: [0, "-50%"] }}
            transition={{
              duration: 25,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            {[...items, ...items, ...items, ...items].map((item, i) => (
              <span
                key={i}
                className="text-4xl sm:text-6xl md:text-8xl lg:text-9xl font-black uppercase tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-black/20 to-black/5 transition-all duration-500 cursor-default group-hover:blur-sm hover:!blur-none hover:!text-primary hover:drop-shadow-[0_0_30px_rgba(104,17,201,0.5)] hover:scale-110"
              >
                {item}
              </span>
            ))}
          </motion.div>
        </div>

        {/* ROW 2: Scrolling Right with Outline Text Effect */}
        <div className="flex w-full group">
          <motion.div
            className="flex gap-6 sm:gap-12 md:gap-24 whitespace-nowrap min-w-max items-center"
            animate={{ x: ["-50%", 0] }}
            transition={{
              duration: 30,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            {[...items, ...items, ...items, ...items].map((item, i) => (
              <span
                key={i}
                className="text-4xl sm:text-6xl md:text-8xl lg:text-9xl font-black uppercase tracking-tighter cursor-default transition-all duration-500 group-hover:blur-sm hover:!blur-none hover:!text-primary hover:drop-shadow-[0_0_30px_rgba(104,17,201,0.5)] hover:scale-110 hover:!stroke-none"
                style={{
                  WebkitTextStroke: "2px rgba(0, 0, 0, 0.1)",
                  color: "transparent",
                }}
              >
                {item}
              </span>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
