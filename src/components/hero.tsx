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
    <section id="hero" ref={containerRef} className="relative w-full h-[200vh]">
      {/* Sticky container holds the content in place while we scroll */}
      <div className="sticky top-0 w-full h-screen flex flex-col justify-center overflow-hidden pointer-events-none px-6 sm:px-12 md:px-20 lg:px-32">
        
        <motion.div 
          style={{ scale, opacity, y }}
          className="flex flex-col items-start justify-center text-left w-full max-w-[1600px] mx-auto mt-20 sm:mt-28 lg:mt-32"
        >


          {/* Massive Cinematic Typography */}
          <h1 className="text-[14vw] sm:text-[12vw] leading-[0.85] font-semibold tracking-tighter text-white mix-blend-plus-lighter flex flex-col items-start">
            <div className="flex items-center justify-start gap-[1.5vw] sm:gap-[1vw]">
              <span>g</span>
              <span className="inline-block w-[45vw] sm:w-[40vw] md:w-[36vw] h-[11vw] sm:h-[9vw] border-[1.5vw] sm:border-[1.2vw] border-white rounded-full mt-[1vw]" />
              <span>d</span>
            </div>
            <span>marketing</span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent via-white to-accent opacity-90">
              matters.
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
