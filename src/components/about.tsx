"use client";

import { motion } from "framer-motion";
import { Target, Zap, Shield } from "lucide-react";

export function AboutAnimation() {
  return (
    <section id="about" className="relative w-full py-24 lg:py-48 flex flex-col items-center justify-center bg-background overflow-hidden">
      
      {/* Background Orbs */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/10 rounded-full blur-[150px] pointer-events-none" />

      {/* Intro Text */}
      <div className="max-w-[1400px] w-full mx-auto px-6 mb-24 relative z-10">
        <motion.h2 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-5xl sm:text-6xl md:text-[5rem] lg:text-[6rem] font-bold tracking-tighter leading-[1] text-heading uppercase"
        >
          We don't just execute.<br />
          <span className="text-primary drop-shadow-[0_0_20px_rgba(147,51,234,0.4)]">We interpret, sharpen,</span><br />
          and deliver the<br />
          <span className="text-black bg-accent px-4 py-2 mr-2 shadow-[0_0_30px_rgba(239,253,50,0.5)] border border-yellow-300">digital signal</span>
          you need to grow.
        </motion.h2>
      </div>
      
      {/* Bento Grid Core Values */}
      <div className="w-full max-w-[1400px] mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
        
        {/* Large Bento Box */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="md:col-span-2 group relative p-10 md:p-14 rounded-3xl bg-surface/40 backdrop-blur-md border border-border hover:border-primary/50 transition-colors duration-500 overflow-hidden flex flex-col justify-end min-h-[400px] shadow-2xl"
        >
          <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-bl from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
          
          <div className="relative z-10">
            <div className="p-4 bg-primary/20 text-primary border border-primary/30 w-fit rounded-2xl mb-8 group-hover:bg-primary group-hover:text-black transition-colors duration-500 shadow-[0_0_15px_rgba(147,51,234,0.2)]">
              <Target className="w-8 h-8" />
            </div>
            <h3 className="text-4xl font-bold mb-4 tracking-tight uppercase text-heading">Relentless Pursuit of ROI.</h3>
            <p className="text-body-text text-xl leading-relaxed max-w-xl">
              We define our success strictly by the success of our clients. 
              Our strategies aren't just creative—they are engineered to maximize your return on investment.
            </p>
          </div>
        </motion.div>

        {/* Small Bento Box 1 */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="group relative p-10 rounded-3xl bg-surface/40 backdrop-blur-md border border-border hover:border-accent/50 transition-colors duration-500 overflow-hidden flex flex-col justify-end min-h-[400px] shadow-2xl"
        >
          <div className="absolute bottom-0 right-0 w-full h-full bg-gradient-to-tl from-accent/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

          <div className="relative z-10">
            <div className="p-4 bg-accent/20 text-accent border border-accent/30 w-fit rounded-2xl mb-8 group-hover:bg-accent group-hover:text-black transition-colors duration-500 shadow-[0_0_15px_rgba(239,253,50,0.2)]">
              <Zap className="w-8 h-8" />
            </div>
            <h3 className="text-3xl font-bold text-heading mb-4 tracking-tight uppercase">Speed & Agility.</h3>
            <p className="text-body-text text-lg leading-relaxed">
              In a digital world that changes overnight, we move fast without breaking things.
            </p>
          </div>
        </motion.div>

        {/* Small Bento Box 2 */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="md:col-span-3 group relative p-10 md:p-14 rounded-3xl bg-primary text-black transition-colors duration-500 overflow-hidden flex flex-col md:flex-row items-start md:items-center justify-between gap-10 shadow-[0_0_30px_rgba(147,51,234,0.3)] hover:shadow-[0_0_50px_rgba(147,51,234,0.5)]"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:animate-shine pointer-events-none" />

          <div className="relative z-10 max-w-2xl">
            <div className="p-4 bg-black text-white w-fit rounded-2xl mb-8 shadow-xl">
              <Shield className="w-8 h-8" />
            </div>
            <h3 className="text-4xl font-bold mb-4 tracking-tight uppercase">Uncompromising Quality.</h3>
            <p className="text-black/80 text-xl leading-relaxed font-medium">
              We treat your brand as if it were our own. Every pixel, every line of copy, and every ad campaign undergoes rigorous testing before it ever sees the light of day.
            </p>
          </div>
          
          <div className="relative z-10 shrink-0">
            <div className="text-9xl font-black text-black/10 select-none group-hover:text-black/20 transition-colors duration-500">
              100%
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
