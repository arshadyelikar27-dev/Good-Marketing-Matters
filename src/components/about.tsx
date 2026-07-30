"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { ScrollReveal } from "@/components/scroll-reveal";
import { KineticDarkBgFX } from "@/components/section-background-fx";

// Animated Counter Hook (0 -> Target over 2s)
function CounterNumber({ value, suffix = "+" }: { value: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const end = value;
    const duration = 2000; // ms
    const increment = end / (duration / 16);

    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [isInView, value]);

  return (
    <span ref={ref} className="font-mono font-black">
      {count}
      {suffix}
    </span>
  );
}

const stats = [
  { label: "Projects Completed", value: 150, suffix: "+" },
  { label: "Client Satisfaction", value: 98, suffix: "%" },
  { label: "Years Experience", value: 10, suffix: "+" },
  { label: "Organic Impressions", value: 50, suffix: "M+" },
];

export function AboutAnimation() {
  const containerRef = useRef<HTMLDivElement>(null);

  // --- 1. FRAMER MOTION: Parallax Background Text (20% differential) ---
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const xLeft = useTransform(scrollYProgress, [0, 1], ["0%", "-20%"]);
  const xRight = useTransform(scrollYProgress, [0, 1], ["-20%", "0%"]);
  const imageParallax = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  // --- 2. GSAP: Scroll Text Reveal ---
  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);

    const targets = gsap.utils.toArray<HTMLElement>(".highlight-text", containerRef.current);
    targets.forEach((text) => {
      gsap.to(text, {
        backgroundPositionX: "0%",
        ease: "none",
        scrollTrigger: {
          trigger: text,
          start: "top 85%",
          end: "bottom 45%",
          scrub: 0.5,
        },
      });
    });
  }, { scope: containerRef });

  return (
    <section id="about" ref={containerRef} className="py-16 sm:py-28 md:py-36 bg-[#0D0020] relative overflow-hidden w-full">
      <KineticDarkBgFX />
      {/* EFFECT 1: Background Parallax Text (20% Speed) */}
      <div className="absolute top-[10%] left-0 w-full overflow-hidden pointer-events-none opacity-[0.04] flex flex-col gap-4 select-none font-heading font-black text-[22vw] sm:text-[18vw] leading-[0.85] tracking-tighter whitespace-nowrap text-white">
        <motion.div style={{ x: xLeft }}>WHO WE ARE WHO WE ARE</motion.div>
        <motion.div style={{ x: xRight }}>DIGITAL MASTERY DIGITAL MASTERY</motion.div>
      </div>

      <div className="container max-w-[1600px] mx-auto px-4 sm:px-6 md:px-12 relative z-10">
        <div className="grid md:grid-cols-12 gap-10 md:gap-16 items-center">
          
          {/* IMAGE GRID - Left Side with 20% Parallax */}
          <div className="md:col-span-5 relative h-[56vh] md:h-[580px] w-full group hidden md:block">
            {/* Image 1 with Parallax Y transform */}
            <motion.div 
              style={{ y: imageParallax }}
              initial={{ opacity: 0, y: 80 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="absolute top-0 left-0 w-3/4 h-[390px] overflow-hidden rounded-3xl shadow-2xl shadow-black/80"
            >
              <div className="w-full h-full bg-[url('https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070')] bg-cover bg-center grayscale hover:grayscale-0 transition-all duration-700 hover:scale-105" />
            </motion.div>
            
            {/* Image 2 (Overlapping) */}
            <motion.div 
              initial={{ opacity: 0, y: 80 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="absolute bottom-0 right-0 w-2/3 h-[290px] overflow-hidden rounded-3xl border-8 border-[#151515] shadow-2xl shadow-black"
            >
              <div className="w-full h-full bg-[url('https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2070')] bg-cover bg-center grayscale hover:grayscale-0 transition-all duration-700 hover:scale-105" />
            </motion.div>
          </div>

          {/* RIGHT SIDE: Text Reveal Stagger */}
          <div className="md:col-span-12 lg:col-span-6 lg:col-start-7 flex flex-col justify-center">
            <ScrollReveal>
              <p className="text-primary font-black text-xs sm:text-sm tracking-widest uppercase mb-4 sm:mb-6 font-heading">
                About GMM Agency
              </p>

              <h3 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-black leading-[1.25] tracking-tight">
                <span className="highlight-text bg-clip-text text-transparent font-heading inline-block" style={{ 
                  backgroundImage: "linear-gradient(to right, #FFFFFF 50%, rgba(255,255,255,0.15) 50%)", 
                  backgroundSize: "200% 100%", 
                  backgroundPositionX: "100%", 
                }}>
                  We are a team of visionary designers, developers, and marketers.
                </span>
                <br /><br />
                <span className="highlight-text bg-clip-text text-transparent font-heading inline-block" style={{ 
                  backgroundImage: "linear-gradient(to right, #FFFFFF 50%, rgba(255,255,255,0.15) 50%)", 
                  backgroundSize: "200% 100%", 
                  backgroundPositionX: "100%", 
                }}>
                  We don't just build websites; we engineer digital experiences that drive massive growth for your brand.
                </span>
              </h3>
            </ScrollReveal>

            {/* Mobile Image Fallback */}
            <div className="w-full h-[300px] mt-12 rounded-3xl overflow-hidden md:hidden">
              <div className="w-full h-full bg-[url('https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070')] bg-cover bg-center grayscale hover:grayscale-0 transition-all duration-700 hover:scale-105" />
            </div>
          </div>

        </div>

        {/* STATISTICS SECTION WITH ANIMATED COUNTER & CIRCULAR PULSING GLOW BEHIND NUMBERS */}
        <div className="mt-20 sm:mt-28 grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 pt-12 border-t border-white/10">
          {stats.map((stat, idx) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 80 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: idx * 0.08 }}
              className="relative flex flex-col items-center justify-center text-center p-6 rounded-2xl bg-[#151515]/60 border border-white/5 backdrop-blur-md group hover:border-primary/40 transition-all duration-500 hover:-translate-y-2 shadow-lg"
            >
              {/* Circular Pulse Glow Behind Numbers */}
              <div className="absolute w-20 h-20 bg-primary/20 rounded-full blur-xl group-hover:scale-150 group-hover:bg-primary/30 transition-all duration-700 pointer-events-none" />

              <div className="relative z-10 text-3xl sm:text-5xl md:text-6xl font-black text-primary font-heading mb-2">
                <CounterNumber value={stat.value} suffix={stat.suffix} />
              </div>

              <span className="relative z-10 text-xs sm:text-sm font-bold text-white/70 tracking-wide font-heading uppercase">
                {stat.label}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
