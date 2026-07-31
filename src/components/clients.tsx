"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ScrollReveal } from "@/components/scroll-reveal";
import { KineticYellowBgFX } from "@/components/section-background-fx";

const items = [
  "Google",
  "Microsoft",
  "Spotify",
  "Tesla",
  "Netflix",
  "Adobe",
  "Meta",
  "Amazon",
];

export function Clients() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <section id="clients" className="py-16 sm:py-24 md:py-32 w-full bg-transparent overflow-hidden relative select-none">
      <KineticYellowBgFX />
      {/* Subtle dotted background pattern */}
      <div
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(#000000 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />

      <div className="container mx-auto px-4 sm:px-6 mb-10 sm:mb-16 text-center relative z-10">
        <ScrollReveal>
          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight">
            Trusted by <span className="text-white underline decoration-white/30">Industry Leaders</span>
          </h2>
        </ScrollReveal>
      </div>

      {/* AUTO MOVING MARQUEE (PAUSE ON HOVER) */}
      <div
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="flex flex-col gap-6 sm:gap-10 md:gap-14 relative z-10 transform -rotate-2 py-4 cursor-pointer"
      >
        {/* ROW 1: Scrolling Left */}
        <div className="flex w-full overflow-hidden">
          <motion.div
            className="flex gap-8 sm:gap-16 md:gap-24 whitespace-nowrap min-w-max"
            animate={{ x: isHovered ? undefined : [0, "-50%"] }}
            transition={{
              duration: 35,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            {[...items, ...items, ...items, ...items].map((item, i) => (
              <motion.span
                key={i}
                whileHover={{ scale: 1.08 }}
                className="text-3xl sm:text-5xl md:text-7xl lg:text-8xl font-black uppercase text-white/30 hover:text-accent transition-all duration-300 cursor-pointer inline-block"
              >
                {item}
              </motion.span>
            ))}
          </motion.div>
        </div>

        {/* ROW 2: Scrolling Right with Outline Text Effect */}
        <div className="flex w-full overflow-hidden">
          <motion.div
            className="flex gap-8 sm:gap-16 md:gap-24 whitespace-nowrap min-w-max"
            animate={{ x: isHovered ? undefined : ["-50%", 0] }}
            transition={{
              duration: 40,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            {[...items, ...items, ...items, ...items].map((item, i) => (
              <motion.span
                key={i}
                whileHover={{ scale: 1.08 }}
                className="text-3xl sm:text-5xl md:text-7xl lg:text-8xl font-black uppercase transition-all duration-300 cursor-pointer inline-block hover:text-white"
                style={{
                  WebkitTextStroke: "1.8px rgba(180, 130, 255, 0.5)",
                  color: "transparent",
                }}
              >
                {item}
              </motion.span>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
