"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);

  // We make the container height 200vh so it takes 2 screens to scroll past.
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // Apple-style scaling and fading
  const textScale = useTransform(scrollYProgress, [0, 0.5], [1, 1.2]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.4, 0.8], [1, 1, 0]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

  // Orb parallax
  const orbScale = useTransform(scrollYProgress, [0, 1], [1, 1.5]);
  const orbY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const orbRotate = useTransform(scrollYProgress, [0, 1], [0, 45]);

  // Secondary text fades in earlier and fades out faster
  const subtitleOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);

  return (
    <section id="hero" ref={containerRef} className="relative w-full h-[300vh] bg-transparent">
      {/* Sticky container holds the content in place while we scroll */}
      <div className="sticky top-0 w-full h-screen flex flex-col justify-center overflow-hidden pointer-events-none">


        {/* Cinematic Typography */}
        <motion.div
          style={{ scale: textScale, opacity: textOpacity, y: textY }}
          className="relative z-10 flex flex-col items-start justify-center text-left w-full max-w-[1400px] mx-auto px-6 lg:px-12"
        >
          <div className="relative z-10 flex flex-col text-white lowercase font-medium tracking-tighter w-fit origin-left">
            {/* Line 1: g [pill] od */}
            <div className="flex items-center w-full mt-2">
              <span className="text-[16vw] sm:text-[12vw] lg:text-[10vw] leading-[0.75]">g</span>
              <div className="flex-1 h-[5vw] sm:h-[4vw] lg:h-[3.2vw] border-[1vw] sm:border-[0.8vw] lg:border-[0.7vw] border-white rounded-full mx-[1.5vw] sm:mx-[1vw] translate-y-[1.5vw] sm:translate-y-[1vw]" />
              <span className="text-[16vw] sm:text-[12vw] lg:text-[10vw] leading-[0.75]">od</span>
            </div>
            {/* Line 2 */}
            <span className="text-[16vw] sm:text-[12vw] lg:text-[10vw] leading-[0.8]">
              marketing
            </span>
            {/* Line 3 */}
            <span className="text-[16vw] sm:text-[12vw] lg:text-[10vw] leading-[0.8]">
              matters.
            </span>
          </div>
          <motion.p
            style={{ opacity: subtitleOpacity }}
            className="mt-4 sm:mt-6 max-w-2xl text-xl sm:text-3xl italic font-serif text-primary tracking-wide"
          >
            We build brands that are impossible to ignore.
          </motion.p>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          style={{ opacity: subtitleOpacity }}
          className="absolute bottom-12 left-6 lg:left-12 flex flex-col items-center gap-2"
        >
          <span className="text-xs uppercase tracking-widest text-white/40">Scroll</span>
          <div className="w-px h-12 bg-gradient-to-b from-white/40 to-transparent" />
        </motion.div>

      </div>
    </section>
  );
}
