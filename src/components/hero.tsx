"use client";

import { useRef, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 1000], [0, 300]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    // Text reveal animation
    const ctx = gsap.context(() => {
      gsap.from(".reveal-text", {
        y: 100,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power4.out",
        delay: 0.2
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={containerRef}
      className="relative min-h-[100svh] w-full flex items-center justify-center overflow-hidden pt-20 bg-white text-black"
    >
      {/* Background Animated Illustration */}
      <motion.div 
        style={{ y }}
        className="absolute inset-0 z-0 flex items-center justify-center opacity-40 pointer-events-none"
      >
        <svg viewBox="0 0 1000 1000" className="w-[120vw] h-[120vh] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <motion.circle
            cx="500"
            cy="500"
            r="300"
            stroke="url(#gold-gradient)"
            strokeWidth="2"
            fill="transparent"
            initial={{ pathLength: 0, rotate: 0 }}
            animate={{ pathLength: 1, rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          />
          <motion.circle
            cx="500"
            cy="500"
            r="400"
            stroke="url(#gold-gradient)"
            strokeWidth="1"
            fill="transparent"
            initial={{ pathLength: 0, rotate: 360 }}
            animate={{ pathLength: 1, rotate: 0 }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          />
          <motion.path
            d="M 200,500 Q 500,100 800,500 T 200,500"
            stroke="#000000"
            strokeWidth="0.5"
            fill="transparent"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", repeatType: "reverse" }}
            className="opacity-10"
          />
          <defs>
            <linearGradient id="gold-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#F9C000" />
              <stop offset="100%" stopColor="#A1824F" />
            </linearGradient>
          </defs>
        </svg>
        
        {/* Glow orb */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] bg-primary/10 rounded-full blur-[120px]" />
      </motion.div>

      {/* Content */}
      <div className="container relative z-10 mx-auto px-6 flex flex-col items-center text-center">
        <div ref={textRef} className="max-w-5xl overflow-hidden flex flex-col items-center gap-6">
          <div className="overflow-hidden">
            <h1 className="reveal-text font-heading text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter leading-tight">
              Great Marketing <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-[#FFEA5A] to-[#A1824F]">
                Matters.
              </span>
            </h1>
          </div>
          
          <div className="overflow-hidden max-w-2xl mt-4">
            <p className="reveal-text text-lg md:text-xl text-black/70 font-medium">
              We are a premium digital agency crafting extraordinary brand experiences, intelligent SEO optimization, and stunning web & app development.
            </p>
          </div>
          
          <div className="overflow-hidden mt-8">
            <div className="reveal-text flex flex-col sm:flex-row items-center gap-4">
              <Link 
                href="#services" 
                className="group flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground rounded-full font-bold text-lg hover:bg-primary/90 transition-all hover:scale-105"
              >
                Explore Services
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link 
                href="#contact" 
                className="px-8 py-4 border border-black/20 text-black rounded-full font-bold text-lg hover:bg-black/5 transition-all"
              >
                Get a Proposal
              </Link>
            </div>
          </div>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <motion.div 
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 1 }}
      >
        <span className="text-xs uppercase tracking-[0.2em] text-black/50 font-bold">Scroll Down</span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-primary/50 to-transparent relative overflow-hidden">
          <motion.div 
            className="absolute top-0 left-0 w-full h-1/2 bg-primary"
            animate={{ y: ["0%", "200%"] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
          />
        </div>
      </motion.div>
    </section>
  );
}
