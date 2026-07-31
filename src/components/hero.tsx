"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Target, TrendingUp, Megaphone } from "lucide-react";

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const textScale = useTransform(scrollYProgress, [0, 0.8], [1, 1.4]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.4, 0.8], [1, 1, 0]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  const textBlur = useTransform(scrollYProgress, [0, 0.8], ["blur(0px)", "blur(12px)"]);

  // Floating Elements Scroll Animations
  const float1Y = useTransform(scrollYProgress, [0, 1], ["0%", "-300%"]);
  const float1X = useTransform(scrollYProgress, [0, 1], ["0%", "-100%"]);
  const float1Rotate = useTransform(scrollYProgress, [0, 1], [-10, 45]);

  const float2Y = useTransform(scrollYProgress, [0, 1], ["0%", "-400%"]);
  const float2X = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const float2Rotate = useTransform(scrollYProgress, [0, 1], [15, -60]);

  const float3Y = useTransform(scrollYProgress, [0, 1], ["0%", "-250%"]);
  const float3X = useTransform(scrollYProgress, [0, 1], ["0%", "80%"]);
  const float3Rotate = useTransform(scrollYProgress, [0, 1], [-20, 90]);

  return (
    <section id="hero" ref={containerRef} className="relative w-full h-[250vh] bg-background">
      <div className="sticky top-0 w-full h-screen flex flex-col items-center justify-center overflow-hidden">
        
        {/* Isometric Grid Background */}
        <div className="absolute inset-0 iso-grid opacity-30 pointer-events-none" />

        <motion.div
          style={{ scale: textScale, opacity: textOpacity, y: textY, filter: textBlur }}
          className="relative z-10 flex flex-col items-start text-left w-full max-w-[1400px] mx-auto px-6 md:px-12 pt-24"
        >
          {/* Left Side Content */}
          <div className="w-full lg:w-3/5">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col text-heading font-medium tracking-tight items-start w-max mx-auto lg:mx-0"
            >
              <div className="flex items-center text-[12vw] sm:text-[13vw] lg:text-[9vw] leading-[0.9] text-white lowercase">
                <span>g</span>
                <span className="inline-block w-[3.5em] h-[0.7em] border-[0.09em] border-white rounded-full mx-[0.1em]" />
                <span>d</span>
              </div>
              <div className="text-[12vw] sm:text-[13vw] lg:text-[9vw] leading-[0.9] text-white lowercase">
                marketing
              </div>
              <div className="text-[12vw] sm:text-[13vw] lg:text-[9vw] leading-[0.9] text-white lowercase">
                matters.
              </div>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="mt-4 sm:mt-12 text-xl sm:text-2xl font-medium text-accent max-w-xl tracking-wide normal-case text-center lg:text-left w-full lg:ml-1"
            >
              We build brands that are impossible to ignore.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="mt-6 md:mt-12 flex justify-center lg:justify-start lg:ml-1"
            >
              <button 
                data-cursor-text="Explore" 
                className="group relative px-8 py-4 md:px-10 md:py-5 bg-transparent overflow-hidden rounded-full font-bold text-lg text-white border border-primary/50 hover:border-primary transition-colors duration-500"
              >
                <div className="absolute inset-0 bg-primary translate-y-[100%] group-hover:translate-y-0 transition-transform duration-500 ease-in-out" />
                <span className="relative z-10 group-hover:text-black transition-colors duration-500">
                  Discover Our Work
                </span>
              </button>
            </motion.div>
          </div>

          {/* Right Side Floating 3D Elements */}
          <div className="absolute right-0 top-0 w-2/5 h-full hidden lg:block pointer-events-none">
            {/* Target Element */}
            <motion.div
              initial={{ opacity: 0, scale: 0, y: 100 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 1.2, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
              style={{ y: float1Y, x: float1X, rotate: float1Rotate }}
              className="absolute top-[20%] right-[40%] w-32 h-32 rounded-full backdrop-blur-xl bg-gradient-to-br from-white/10 to-transparent border-t border-l border-white/20 flex items-center justify-center shadow-[0_20px_40px_-10px_rgba(239,253,50,0.2)]"
            >
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent opacity-50 rounded-full" />
              <Target className="w-14 h-14 text-accent relative z-10 drop-shadow-[0_0_15px_rgba(239,253,50,0.5)]" />
            </motion.div>

            {/* Growth Element */}
            <motion.div
              initial={{ opacity: 0, scale: 0, y: 100 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 1.2, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
              style={{ y: float2Y, x: float2X, rotate: float2Rotate }}
              className="absolute top-[45%] right-[10%] w-48 h-48 rounded-[2rem] backdrop-blur-xl bg-gradient-to-br from-white/10 to-transparent border-t border-l border-white/20 flex items-center justify-center shadow-[0_20px_40px_-10px_rgba(147,51,234,0.3)]"
            >
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent opacity-50 rounded-[2rem]" />
              <TrendingUp className="w-20 h-20 text-primary relative z-10 drop-shadow-[0_0_20px_rgba(147,51,234,0.6)]" />
            </motion.div>

            {/* Megaphone Element */}
            <motion.div
              initial={{ opacity: 0, scale: 0, y: 100 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 1.2, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
              style={{ y: float3Y, x: float3X, rotate: float3Rotate }}
              className="absolute top-[75%] right-[50%] w-28 h-28 rounded-full backdrop-blur-xl bg-gradient-to-br from-white/10 to-transparent border-t border-l border-white/20 flex items-center justify-center shadow-[0_20px_40px_-10px_rgba(255,255,255,0.1)]"
            >
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent opacity-50 rounded-full" />
              <Megaphone className="w-12 h-12 text-white relative z-10" />
            </motion.div>
          </div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          style={{ opacity: textOpacity }}
          className="absolute bottom-12 left-12 flex flex-col items-center gap-4"
        >
          <span className="text-xs uppercase tracking-widest text-primary font-bold">Scroll</span>
          <div className="w-px h-16 bg-gradient-to-b from-primary to-transparent overflow-hidden relative">
            <div className="w-full h-1/3 bg-accent animate-[marquee-vertical_1.5s_linear_infinite]" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
