"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);

  // We make the container height 200vh so it takes 2 screens to scroll past.
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // Apple-style scaling and fading
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.5]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1, 0]);
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);

  // Secondary text fades in earlier and fades out faster
  const subtitleOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);

  return (
    <section ref={containerRef} className="relative w-full h-[200vh]">
      {/* Sticky container holds the content in place while we scroll */}
      <div className="sticky top-0 w-full h-screen flex flex-col items-center justify-center overflow-hidden pointer-events-none">
        
        <motion.div 
          style={{ scale, opacity, y }}
          className="flex flex-col items-center justify-center text-center px-4"
        >
          {/* Subtle top badge */}
          <motion.div 
            style={{ opacity: subtitleOpacity }}
            className="mb-8 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-md font-mono text-[10px] uppercase tracking-[0.2em] text-white/70"
          >
            Introducing the future of marketing
          </motion.div>

          {/* Massive Cinematic Typography */}
          <h1 className="text-[14vw] sm:text-[12vw] leading-[0.85] font-semibold tracking-tighter text-white mix-blend-plus-lighter">
            Great <br /> Marketing <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent via-white to-accent opacity-90">
              Matters.
            </span>
          </h1>

          {/* Subtitle */}
          <motion.p 
            style={{ opacity: subtitleOpacity }}
            className="mt-12 max-w-2xl text-lg sm:text-2xl font-light text-white/60 tracking-tight"
          >
            We engineer experiences that redefine digital growth. Precision, automation, and unmatched creativity.
          </motion.p>
        </motion.div>
        


      </div>
    </section>
  );
}
