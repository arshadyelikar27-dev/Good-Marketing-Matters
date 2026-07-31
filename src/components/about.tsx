"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Target, Zap, Shield } from "lucide-react";

export function AboutAnimation() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"],
  });

  // Apple-style text reveal scrub
  const opacity1 = useTransform(scrollYProgress, [0, 0.15], [0.2, 1]);
  const opacity2 = useTransform(scrollYProgress, [0.15, 0.3], [0.2, 1]);
  const opacity3 = useTransform(scrollYProgress, [0.3, 0.45], [0.2, 1]);
  const opacity4 = useTransform(scrollYProgress, [0.45, 0.6], [0.2, 1]);
  const opacity5 = useTransform(scrollYProgress, [0.6, 0.75], [0.2, 1]);

  return (
    <section id="about" ref={containerRef} className="relative w-full py-48 flex flex-col items-center justify-center bg-transparent">
      
      {/* Scroll-scrubbed Text Reveal */}
      <div className="max-w-6xl mx-auto px-6 text-center sm:text-left mb-32">
        <h2 className="text-4xl sm:text-5xl md:text-7xl lg:text-[5.5rem] font-medium tracking-tighter leading-[1.1] text-white">
          <motion.span style={{ opacity: opacity1 }}>We don't just execute. </motion.span>
          <motion.span style={{ opacity: opacity2 }} className="text-primary">We interpret, sharpen, </motion.span>
          <motion.span style={{ opacity: opacity3 }}>and deliver the </motion.span>
          <motion.span style={{ opacity: opacity4 }} className="text-accent">digital signal </motion.span>
          <motion.span style={{ opacity: opacity5 }}>you need to grow.</motion.span>
        </h2>
      </div>
      
      {/* Bento Grid Core Values */}
      <div className="w-full max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Large Bento Box (Spans 2 columns on tablet+) */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="md:col-span-2 group relative p-10 md:p-14 rounded-[2.5rem] glass-panel hover:bg-white/[0.04] transition-colors duration-500 overflow-hidden flex flex-col justify-end min-h-[400px]"
        >
          {/* Subtle background glow */}
          <div className="absolute -top-32 -right-32 w-96 h-96 bg-primary/20 rounded-full blur-[100px] group-hover:bg-primary/30 transition-colors duration-500" />
          
          <div className="relative z-10">
            <div className="p-4 bg-white/10 w-fit rounded-2xl mb-8 group-hover:bg-primary/20 transition-colors">
              <Target className="w-8 h-8 text-white group-hover:text-primary transition-colors" />
            </div>
            <h3 className="text-4xl font-semibold text-white mb-4 tracking-tight">Relentless Pursuit of ROI.</h3>
            <p className="text-white/60 text-xl leading-relaxed font-light max-w-xl">
              We define our success strictly by the success of our clients. 
              Our strategies aren't just creative—they are engineered to maximize your return on investment.
            </p>
          </div>
        </motion.div>

        {/* Small Bento Box 1 */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="group relative p-10 rounded-[2.5rem] glass-panel hover:bg-white/[0.04] transition-colors duration-500 overflow-hidden flex flex-col justify-end min-h-[400px]"
        >
          <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-accent/10 rounded-full blur-[100px] group-hover:bg-accent/20 transition-colors duration-500" />
          
          <div className="relative z-10">
            <div className="p-4 bg-white/10 w-fit rounded-2xl mb-8 group-hover:bg-accent/20 transition-colors">
              <Zap className="w-8 h-8 text-white group-hover:text-accent transition-colors" />
            </div>
            <h3 className="text-3xl font-semibold text-white mb-4 tracking-tight">Speed & Agility.</h3>
            <p className="text-white/60 text-lg leading-relaxed font-light">
              In a digital world that changes overnight, we move fast without breaking things.
            </p>
          </div>
        </motion.div>

        {/* Small Bento Box 2 (Spans full width on mobile, 1 col on md, but let's make a 3rd box span 3 cols or just sit below) */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="md:col-span-3 group relative p-10 md:p-14 rounded-[2.5rem] glass-panel-highlight hover:bg-white/[0.04] transition-colors duration-500 overflow-hidden flex flex-col md:flex-row items-start md:items-center justify-between gap-10"
        >
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-white/5 blur-[120px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
          
          <div className="relative z-10 max-w-2xl">
            <div className="p-4 bg-white/10 w-fit rounded-2xl mb-8 group-hover:bg-white/20 transition-colors">
              <Shield className="w-8 h-8 text-white transition-colors" />
            </div>
            <h3 className="text-3xl font-semibold text-white mb-4 tracking-tight">Uncompromising Quality.</h3>
            <p className="text-white/60 text-lg leading-relaxed font-light">
              We treat your brand as if it were our own. Every pixel, every line of copy, and every ad campaign undergoes rigorous testing before it ever sees the light of day.
            </p>
          </div>
          
          <div className="relative z-10 shrink-0">
            {/* Abstract visual element for the 3rd box */}
            <div className="w-48 h-48 md:w-64 md:h-64 rounded-full border border-white/10 flex items-center justify-center relative animate-spin-slow">
              <div className="w-32 h-32 md:w-48 md:h-48 rounded-full border border-white/20 flex items-center justify-center">
                <div className="w-16 h-16 md:w-32 md:h-32 rounded-full border border-white/30" />
              </div>
              {/* Orbiting dot */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-accent rounded-full shadow-[0_0_20px_rgba(239,253,50,0.8)]" />
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
