"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Target, TrendingUp, Megaphone } from "lucide-react";
import { useIsMobile } from "@/hooks/use-is-mobile";

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // Lighter transforms on mobile
  const textScale = useTransform(scrollYProgress, [0, 0.8], [1, isMobile ? 1 : 1.4]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.4, 0.8], [1, 1, isMobile ? 1 : 0]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", isMobile ? "0%" : "40%"]);

  // Floating Elements Scroll Animations (desktop only)
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
    <section id="hero" ref={containerRef} className="relative w-full min-h-[100dvh] sm:h-[250vh] bg-transparent">
      <div className="sm:sticky sm:top-0 w-full min-h-[100dvh] sm:h-screen flex flex-col items-center justify-start sm:justify-center overflow-hidden pt-28 sm:pt-0">
        
        {/* Isometric Grid Background */}
        <div className="absolute inset-0 iso-grid opacity-30 pointer-events-none" />

        <motion.div
          style={{ scale: textScale, opacity: textOpacity, y: textY, willChange: isMobile ? "auto" : "transform, opacity" }}
          className="relative z-10 flex flex-col items-start text-left w-full max-w-[1400px] mx-auto px-4 sm:px-6 md:px-12 pt-8 sm:pt-24"
        >
          {/* Left Side Content */}
          <div className="w-full lg:w-3/5">
            <motion.div 
              initial="hidden"
              animate="visible"
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: { staggerChildren: 0.2, delayChildren: 0.1 }
                }
              }}
              className="flex flex-col text-heading font-medium tracking-tight items-start w-full lg:w-max mx-0"
            >
              <motion.div 
                variants={{
                  hidden: { opacity: 0, y: 50 },
                  visible: { opacity: 1, y: 0, transition: { duration: 1, ease: [0.16, 1, 0.3, 1] } }
                }}
                className="flex items-center whitespace-nowrap text-[11.5vw] sm:text-[11vw] md:text-[10vw] lg:text-[9vw] leading-[0.9] text-heading lowercase"
              >
                <span>g</span>
                <span className="inline-block w-[2.8em] h-[0.55em] border-[0.09em] border-heading bg-transparent rounded-full mx-[0.1em]" />
                <span>o</span>
                <span>d</span>
              </motion.div>
              <motion.div 
                variants={{
                  hidden: { opacity: 0, y: 50 },
                  visible: { opacity: 1, y: 0, transition: { duration: 1, ease: [0.16, 1, 0.3, 1] } }
                }}
                className="text-[11.5vw] sm:text-[11vw] md:text-[10vw] lg:text-[9vw] leading-[0.9] text-heading lowercase"
              >
                marketing
              </motion.div>
              <motion.div 
                variants={{
                  hidden: { opacity: 0, y: 50 },
                  visible: { opacity: 1, y: 0, transition: { duration: 1, ease: [0.16, 1, 0.3, 1] } }
                }}
                className="text-[11.5vw] sm:text-[11vw] md:text-[10vw] lg:text-[9vw] leading-[0.9] text-heading lowercase"
              >
                matters.
              </motion.div>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="mt-4 sm:mt-8 md:mt-12 text-base sm:text-xl md:text-2xl font-medium text-accent max-w-xl tracking-wide normal-case text-left w-full ml-0 lg:ml-1"
            >
              We build brands that are impossible to ignore.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 1.0, ease: [0.16, 1, 0.3, 1] }}
              className="mt-4 sm:mt-8 md:mt-12 flex justify-start ml-0 lg:ml-1"
            >
              <button 
                data-cursor-text="Explore" 
                className="group relative px-6 py-3 sm:px-8 sm:py-4 md:px-10 md:py-5 bg-transparent overflow-hidden rounded-full font-bold text-sm sm:text-lg text-heading border border-primary/50 hover:border-primary transition-colors duration-500"
              >
                <div className="absolute inset-0 bg-primary translate-y-[100%] group-hover:translate-y-0 transition-transform duration-500 ease-in-out" />
                <span className="relative z-10 group-hover:text-white transition-colors duration-500">
                  Discover Our Work
                </span>
              </button>
            </motion.div>
          </div>

          {/* Right Side Floating 3D Elements — Enabled on mobile with responsive compact sizes & clean spacing */}
          <div className="absolute right-0 top-0 w-1/4 sm:w-2/5 h-full pointer-events-none z-0">
            {/* Target Element */}
            <motion.div
              initial={{ opacity: 0, scale: 0, y: 100 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 1.2, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
              style={{ y: isMobile ? 0 : float1Y, x: isMobile ? 0 : float1X, rotate: isMobile ? -10 : float1Rotate, willChange: isMobile ? "auto" : "transform" }}
              className="absolute top-[16%] right-[2%] sm:right-[35%] lg:right-[48%] w-12 h-12 sm:w-24 sm:h-24 md:w-32 md:h-32 rounded-full sm:backdrop-blur-xl bg-gradient-to-br from-primary/20 to-transparent border border-primary/30 flex items-center justify-center"
            >
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent opacity-80 rounded-full" />
              <Target className="w-5 h-5 sm:w-10 sm:h-10 md:w-14 md:h-14 text-primary relative z-10" />
            </motion.div>

            {/* Growth Element (Center element shifted right for clean spacing) */}
            <motion.div
              initial={{ opacity: 0, scale: 0, y: 100 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 1.5, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
              style={{ y: isMobile ? 0 : float2Y, x: isMobile ? 0 : float2X, rotate: isMobile ? 15 : float2Rotate, willChange: isMobile ? "auto" : "transform" }}
              className="absolute top-[44%] -right-2 sm:right-[5%] w-16 h-16 sm:w-32 sm:h-32 md:w-48 md:h-48 rounded-xl sm:rounded-[2rem] sm:backdrop-blur-xl bg-gradient-to-tr from-primary/20 to-transparent border border-primary/30 flex items-center justify-center"
            >
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent opacity-80 rounded-xl sm:rounded-[2rem]" />
              <TrendingUp className="w-7 h-7 sm:w-14 sm:h-14 md:w-20 md:h-20 text-primary relative z-10" />
            </motion.div>

            {/* Megaphone Element */}
            <motion.div
              initial={{ opacity: 0, scale: 0, y: 100 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 1.4, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
              style={{ y: isMobile ? 0 : float3Y, x: isMobile ? 0 : float3X, rotate: isMobile ? -20 : float3Rotate, willChange: isMobile ? "auto" : "transform" }}
              className="absolute top-[72%] right-[4%] sm:right-[25%] lg:right-[35%] w-10 h-10 sm:w-16 sm:h-16 md:w-24 md:h-24 rounded-lg sm:rounded-2xl sm:backdrop-blur-xl bg-gradient-to-bl from-primary/20 to-transparent border border-primary/30 flex items-center justify-center"
            >
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent opacity-80 rounded-lg sm:rounded-2xl" />
              <Megaphone className="w-4 h-4 sm:w-8 sm:h-8 md:w-12 md:h-12 text-primary relative z-10" />
            </motion.div>
          </div>
        </motion.div>

        {/* Scroll Indicator — hidden on mobile for compact feel */}
        <motion.div
          style={{ opacity: textOpacity }}
          className="absolute bottom-8 sm:bottom-12 left-6 sm:left-12 flex-col items-center gap-4 hidden sm:flex"
        >
          <span className="text-xs uppercase tracking-widest text-primary font-bold">Scroll</span>
          <div className="w-px h-12 sm:h-16 bg-gradient-to-b from-primary to-transparent overflow-hidden relative">
            <div className="w-full h-1/3 bg-primary animate-[marquee-vertical_1.5s_linear_infinite]" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
