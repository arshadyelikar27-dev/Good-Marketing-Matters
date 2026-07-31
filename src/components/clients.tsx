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
    <section id="clients" className="py-24 md:py-32 w-full bg-transparent overflow-hidden relative select-none">
      
      <div className="max-w-7xl mx-auto px-6 mb-16 text-center">
        <h2 className="text-xl md:text-2xl font-medium text-white/50 tracking-tight">
          Trusted by our amazing clients
        </h2>
      </div>

      {/* Gradient Mask for fading edges */}
      <div className="relative w-full overflow-hidden flex flex-col gap-8 md:gap-12"
           style={{ maskImage: 'linear-gradient(to right, transparent, black 15%, black 85%, transparent)', WebkitMaskImage: 'linear-gradient(to right, transparent, black 15%, black 85%, transparent)' }}>
        
        {/* ROW 1: Scrolling Left */}
        <div className="flex w-full">
          <motion.div
            className="flex gap-12 md:gap-24 whitespace-nowrap min-w-max items-center"
            animate={{ x: [0, "-50%"] }}
            transition={{
              duration: 40,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            {[...items, ...items, ...items, ...items].map((item, i) => (
              <span
                key={i}
                className="text-4xl sm:text-5xl md:text-7xl font-semibold tracking-tighter text-white/20 hover:text-white transition-colors duration-500 cursor-default"
              >
                {item}
              </span>
            ))}
          </motion.div>
        </div>

        {/* ROW 2: Scrolling Right with Outline Text Effect */}
        <div className="flex w-full">
          <motion.div
            className="flex gap-12 md:gap-24 whitespace-nowrap min-w-max items-center"
            animate={{ x: ["-50%", 0] }}
            transition={{
              duration: 45,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            {[...items, ...items, ...items, ...items].map((item, i) => (
              <span
                key={i}
                className="text-4xl sm:text-5xl md:text-7xl font-semibold tracking-tighter cursor-default transition-colors duration-500 hover:text-accent"
                style={{
                  WebkitTextStroke: "1px rgba(255, 255, 255, 0.2)",
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
