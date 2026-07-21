"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

export function AboutAnimation() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // --- 1. FRAMER MOTION: Parallax Background Text ---
  // Tracks scroll progress relative to this specific section
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"], // Starts when top of section hits bottom of viewport
  });
  
  // Moves the text horizontally based on scroll progress
  const xLeft = useTransform(scrollYProgress, [0, 1], ["0%", "-30%"]);
  const xRight = useTransform(scrollYProgress, [0, 1], ["-30%", "0%"]);

  // --- 2. GSAP: Scroll Text Reveal ---
  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Selects all elements with the 'highlight-text' class
    gsap.utils.toArray<HTMLElement>(".highlight-text").forEach((text) => {
      ScrollTrigger.create({
        trigger: text,
        start: "top 80%",   // Animation starts when element reaches 80% of viewport height
        end: "bottom 50%",  // Animation ends when element reaches 50% of viewport height
        scrub: 1,           // Ties animation directly to scrollbar (scrubbing effect)
        animation: gsap.to(text, {
          color: "#000000", // The final text color
          backgroundPositionX: "0%", 
          ease: "none",
        }),
      });
    });
  }, { scope: containerRef });

  return (
    <section id="about" ref={containerRef} className="py-28 md:py-36 bg-white relative overflow-hidden w-full">
      
      {/* EFFECT 1: Background Parallax Text */}
      <div className="absolute top-[15%] left-0 w-full overflow-hidden pointer-events-none opacity-[0.03] flex flex-col gap-4 select-none font-heading font-black text-[18vw] leading-[0.85] tracking-tighter whitespace-nowrap text-black">
        <motion.div style={{ x: xLeft }}>WHO WE ARE WHO WE ARE</motion.div>
        <motion.div style={{ x: xRight }}>DIGITAL MASTERY DIGITAL MASTERY</motion.div>
      </div>

      <div className="container max-w-[1600px] mx-auto px-6 md:px-12 relative z-10">
        <div className="grid md:grid-cols-12 gap-16 items-center">
          
          {/* IMAGE GRID - Left Side */}
          <div className="md:col-span-5 relative h-[56vh] md:h-[580px] w-full group hidden md:block">
            {/* Image 1 */}
            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="absolute top-0 left-0 w-3/4 h-[390px] overflow-hidden rounded-3xl"
            >
              <div className="w-full h-full bg-[url('https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070')] bg-cover bg-center grayscale hover:grayscale-0 transition-all duration-700 hover:scale-105" />
            </motion.div>
            
            {/* Image 2 (Overlapping) */}
            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="absolute bottom-0 right-0 w-2/3 h-[290px] overflow-hidden rounded-3xl border-8 border-white shadow-2xl"
            >
              <div className="w-full h-full bg-[url('https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2070')] bg-cover bg-center grayscale hover:grayscale-0 transition-all duration-700 hover:scale-105" />
            </motion.div>
          </div>

          {/* EFFECT 2: GSAP Scroll Reveal Text - Right Side */}
          <div className="md:col-span-12 lg:col-span-6 lg:col-start-7 flex flex-col justify-center">
            <p className="text-primary font-bold text-sm tracking-widest uppercase mb-6 font-heading">
              About GMM Agency
            </p>
            
            <h3 className="text-3xl md:text-5xl lg:text-6xl font-black leading-[1.2] tracking-tight text-black/10">
              <span className="highlight-text bg-clip-text font-heading" style={{ 
                backgroundImage: "linear-gradient(to right, #000000 50%, rgba(0,0,0,0.1) 50%)", 
                backgroundSize: "200% 100%", 
                backgroundPositionX: "100%", 
                transition: "background-position-x 0.1s" 
              }}>
                We are a team of visionary designers, developers, and marketers.
              </span>
              <br /><br />
              <span className="highlight-text bg-clip-text font-heading" style={{ 
                backgroundImage: "linear-gradient(to right, #000000 50%, rgba(0,0,0,0.1) 50%)", 
                backgroundSize: "200% 100%", 
                backgroundPositionX: "100%", 
                transition: "background-position-x 0.1s" 
              }}>
                We don't just build websites; we engineer digital experiences that drive massive growth for your brand.
              </span>
            </h3>

            {/* Mobile image fallback */}
            <div className="w-full h-[300px] mt-12 rounded-3xl overflow-hidden md:hidden">
               <div className="w-full h-full bg-[url('https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070')] bg-cover bg-center grayscale hover:grayscale-0 transition-all duration-700 hover:scale-105" />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
