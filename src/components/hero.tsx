"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { HeroIllustration } from "@/components/hero-illustration";
import { HeroReviewPopups } from "@/components/hero-review-popups";
import { MagneticButton } from "@/components/magnetic-button";
import { TextScramble } from "@/components/text-scramble";

export function Hero() {
  // Generate 20 deterministic tiny floating yellow particles
  const particles = useMemo(() => {
    return Array.from({ length: 20 }).map((_, i) => ({
      id: i,
      left: `${(i * 17) % 90 + 5}%`,
      top: `${(i * 23) % 85 + 10}%`,
      size: (i % 3) * 2 + 3,
      duration: (i % 5) * 3 + 12,
      delay: (i % 4) * 1.5,
    }));
  }, []);

  return (
    <section
      id="hero"
      className="relative min-h-[100svh] w-full flex items-center justify-center overflow-hidden pt-28 pb-16 lg:pt-32 lg:pb-24 bg-background text-foreground"
    >
      {/* 20 TINY YELLOW FLOATING PARTICLES */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        {particles.map((p) => (
          <motion.div
            key={p.id}
            initial={{ opacity: 0.1, y: 0, x: 0 }}
            animate={{
              opacity: [0.1, 0.25, 0.1],
              y: [0, -35, 20, 0],
              x: [0, 20, -15, 0],
            }}
            transition={{
              duration: p.duration,
              delay: p.delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            style={{
              position: "absolute",
              left: p.left,
              top: p.top,
              width: p.size,
              height: p.size,
              backgroundColor: "#EEFF3B",
              borderRadius: "50%",
              boxShadow: "0 0 10px rgba(238, 255, 59, 0.6)",
            }}
          />
        ))}
      </div>

      {/* BREATHING RADIAL GLOW ORB BEHIND ILLUSTRATION */}
      <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none">
        <motion.div
          animate={{ scale: [1, 1.08, 1], opacity: [0.12, 0.18, 0.12] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="w-[70vw] h-[70vw] max-w-[800px] max-h-[800px] bg-primary rounded-full blur-[150px]"
        />
      </div>

      {/* MAIN 2-COLUMN CONTAINER */}
      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 max-w-7xl xl:max-w-[1400px]">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 xl:gap-16 items-center">
          {/* LEFT COLUMN: TYPOGRAPHY & CTAS */}
          <div className="lg:col-span-6 flex flex-col items-center lg:items-start text-center lg:text-left space-y-6">
            {/* HEADLINE WITH TEXT SCRAMBLE EFFECT */}
            <div className="overflow-hidden w-full">
              <motion.h1
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2, ease: [0.215, 0.61, 0.355, 1.0] }}
                className="font-heading text-4xl sm:text-6xl md:text-7xl lg:text-7xl xl:text-8xl 2xl:text-9xl font-bold tracking-tighter leading-[1.08]"
              >
                <TextScramble
                  text="Great Marketing "
                  delay={600}
                  duration={1200}
                  className="inline"
                />
                <br />
                <span className="text-primary drop-shadow-[0_0_25px_rgba(238,255,59,0.3)]">
                  <TextScramble
                    text="Matters"
                    delay={900}
                    duration={1000}
                    className="inline"
                  />
                </span>
              </motion.h1>
            </div>

            {/* SUBTITLE PARAGRAPH FADE UP (DELAY 0.4s) */}
            <div className="overflow-hidden max-w-xl">
              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4, ease: [0.215, 0.61, 0.355, 1.0] }}
                className="text-base sm:text-lg md:text-xl xl:text-2xl text-body-text font-medium leading-relaxed"
              >
                We craft extraordinary brand experiences, intelligent SEO optimization, and high-converting web &amp; mobile apps tailored for rapid growth.
              </motion.p>
            </div>

            {/* CTA BUTTONS WITH MAGNETIC EFFECT */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6, ease: "easeOut" }}
              className="pt-2 w-full sm:w-auto"
            >
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 w-full">
                {/* PRIMARY EXPLORE SERVICES BUTTON — MAGNETIC */}
                <MagneticButton className="w-full sm:w-auto" strength={0.4}>
                  <Link
                    href="#services"
                    className="relative group flex items-center justify-center gap-2.5 w-full sm:w-auto px-8 py-4 bg-primary text-primary-foreground rounded-full font-black text-base sm:text-lg shadow-[0_10px_25px_rgba(238,255,59,0.3)] hover:shadow-[0_15px_35px_rgba(238,255,59,0.5)] transition-all overflow-hidden"
                  >
                    <span className="relative z-10">Explore Services</span>
                    <ArrowRight className="w-5 h-5 relative z-10 group-hover:translate-x-1.5 transition-transform duration-300" />
                    <span className="absolute -inset-full w-[200%] h-[200%] bg-gradient-to-r from-transparent via-white/50 to-transparent group-hover:animate-shine pointer-events-none" />
                  </Link>
                </MagneticButton>

                {/* SECONDARY GET A PROPOSAL BUTTON — MAGNETIC */}
                <MagneticButton className="w-full sm:w-auto" strength={0.4}>
                  <Link
                    href="#contact"
                    className="relative group flex items-center justify-center w-full sm:w-auto px-8 py-4 border border-[#262626] bg-[#151515]/80 text-foreground rounded-full font-bold text-base sm:text-lg hover:border-primary/50 hover:bg-[#151515] transition-all shadow-md overflow-hidden"
                  >
                    <span className="relative z-10 text-center">Get a Proposal</span>
                    <span className="absolute -inset-full w-[200%] h-[200%] bg-gradient-to-r from-transparent via-primary/20 to-transparent group-hover:animate-shine pointer-events-none" />
                  </Link>
                </MagneticButton>
              </div>
            </motion.div>
          </div>

          {/* RIGHT COLUMN: PREMIUM ANIMATED SVG ILLUSTRATION WITH FLOATING REVIEW POPUPS */}
          <div className="lg:col-span-6 flex items-center justify-center w-full relative">
            <HeroReviewPopups>
              <HeroIllustration />
            </HeroReviewPopups>
          </div>
        </div>
      </div>
    </section>
  );
}
