"use client";

import { useRef, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { HeroIllustration } from "@/components/hero-illustration";

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 1000], [0, 150]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    // Text reveal animation
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".reveal-text",
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.12,
          ease: "power4.out",
          delay: 0.1,
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={containerRef}
      className="relative min-h-[100svh] w-full flex items-center justify-center overflow-hidden pt-28 pb-16 lg:pt-32 lg:pb-24 bg-background text-foreground"
    >
      {/* Background glow orb */}
      <motion.div 
        style={{ y }}
        className="absolute inset-0 z-0 flex items-center justify-center opacity-30 pointer-events-none"
      >
        <div className="absolute top-1/3 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] max-w-[700px] max-h-[700px] bg-primary/15 rounded-full blur-[140px]" />
      </motion.div>

      {/* Main 2-Column Container */}
      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* LEFT COLUMN: Typography & CTAs */}
          <div ref={textRef} className="lg:col-span-6 flex flex-col items-center lg:items-start text-center lg:text-left space-y-6">
            
            {/* Main Heading */}
            <div className="overflow-hidden w-full">
              <h1 className="reveal-text font-heading text-4xl sm:text-6xl md:text-7xl lg:text-7xl font-bold tracking-tighter leading-[1.08]">
                Great Marketing <br/>
                <span className="text-primary">
                  Matters
                </span>
              </h1>
            </div>
            
            {/* Subtitle description */}
            <div className="overflow-hidden max-w-xl">
              <p className="reveal-text text-base sm:text-lg md:text-xl text-body-text font-medium leading-relaxed">
                We craft extraordinary brand experiences, intelligent SEO optimization, and high-converting web & mobile apps tailored for rapid growth.
              </p>
            </div>
            
            {/* Action Buttons */}
            <div className="overflow-hidden pt-2 w-full sm:w-auto">
              <div className="reveal-text flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 w-full">
                <Link 
                  href="#services" 
                  className="group flex items-center justify-center gap-2 w-full sm:w-auto px-7 py-4 bg-primary text-primary-foreground rounded-full font-bold text-base sm:text-lg hover:bg-primary-hover transition-all hover:scale-105 shadow-xl shadow-primary/25"
                >
                  Explore Services
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link 
                  href="#contact" 
                  className="flex items-center justify-center w-full sm:w-auto px-7 py-4 border border-[#262626] text-foreground rounded-full font-bold text-base sm:text-lg hover:bg-[#151515] transition-all"
                >
                  Get a Proposal
                </Link>
              </div>
            </div>

          </div>

          {/* RIGHT COLUMN: Premium Animated SVG Illustration */}
          <div className="lg:col-span-6 flex items-center justify-center w-full">
            <HeroIllustration />
          </div>

        </div>
      </div>
    </section>
  );
}
