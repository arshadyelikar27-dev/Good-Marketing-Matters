"use client";

import { motion } from "framer-motion";

const items = [
  "Google", 
  "Microsoft", 
  "Spotify", 
  "Tesla", 
  "Netflix", 
  "Adobe", 
  "Meta",
  "Amazon"
];

export function Clients() {
  return (
    <section id="clients" className="py-16 sm:py-24 md:py-32 w-full bg-primary overflow-hidden relative">
      
      {/* A subtle dotted background effect */}
      <div className="absolute inset-0 opacity-10 pointer-events-none" style={{
        backgroundImage: "radial-gradient(#000000 1px, transparent 1px)",
        backgroundSize: "20px 20px"
      }} />

      <div className="container mx-auto px-4 sm:px-6 mb-10 sm:mb-16 text-center relative z-10">
        <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-black">
          Trusted by <span className="text-white">Industry Leaders</span>
        </h2>
      </div>

      {/* THE TILT EFFECT */}
      <div className="flex flex-col gap-6 sm:gap-10 md:gap-14 relative z-10 transform -rotate-2">
        
        {/* ROW 1: Scrolling Left */}
        <div className="flex w-full overflow-hidden">
          <motion.div 
            className="flex gap-6 sm:gap-12 md:gap-20 whitespace-nowrap min-w-max"
            animate={{ x: [0, "-50%"] }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          >
            {[...items, ...items, ...items].map((item, i) => (
              <span key={i} className="text-3xl sm:text-5xl md:text-7xl lg:text-8xl font-black uppercase text-black opacity-80 hover:opacity-100 transition-opacity cursor-default">
                {item}
              </span>
            ))}
          </motion.div>
        </div>

        {/* ROW 2: Scrolling Right with Outline Text Effect */}
        <div className="flex w-full overflow-hidden">
          <motion.div 
            className="flex gap-6 sm:gap-12 md:gap-20 whitespace-nowrap min-w-max"
            animate={{ x: ["-50%", 0] }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          >
            {[...items, ...items, ...items].map((item, i) => (
              <span 
                key={i} 
                className="text-3xl sm:text-5xl md:text-7xl lg:text-8xl font-black uppercase hover:text-white transition-colors cursor-default" 
                style={{ 
                  WebkitTextStroke: "1.5px rgba(0,0,0,0.6)", 
                  color: "transparent" 
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
