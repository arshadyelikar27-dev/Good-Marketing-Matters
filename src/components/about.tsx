"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Target, Zap, Shield, Rocket } from "lucide-react";
import { cn } from "@/lib/utils";

const timelineData = [
  {
    year: "2018",
    title: "The Genesis",
    description: "Good Marketing Matters was founded with a single mission: to cut through the noise and deliver measurable ROI. We started by challenging the status quo.",
    icon: Target,
  },
  {
    year: "2020",
    title: "Speed & Agility",
    description: "In a digital world that changes overnight, we adapted. We built an agile framework to move fast, test rapidly, and iterate without breaking things.",
    icon: Zap,
  },
  {
    year: "2023",
    title: "Uncompromising Quality",
    description: "We scaled our operations globally while treating every brand as our own. Rigorous testing and pixel-perfect execution became our standard.",
    icon: Shield,
  },
  {
    year: "Present",
    title: "The Digital Signal",
    description: "Today, we don't just execute. We interpret, sharpen, and deliver the digital signal you need to dominate your market.",
    icon: Rocket,
  }
];

export function AboutAnimation() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section id="about" ref={containerRef} className="relative w-full py-24 lg:py-48 bg-background overflow-hidden">
      
      {/* Background Orbs */}
      <div className="absolute top-[10%] right-[5%] w-96 h-96 bg-accent/5 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-[10%] left-[5%] w-96 h-96 bg-white/5 rounded-full blur-[150px] pointer-events-none" />

      {/* Header */}
      <div className="max-w-[1400px] mx-auto px-6 mb-24 md:mb-40 text-center relative z-10">
        <motion.h2 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          className="text-4xl md:text-5xl lg:text-[5rem] font-black uppercase tracking-tighter text-white mb-6"
        >
          Our <span className="text-accent drop-shadow-[0_0_20px_rgba(224,243,71,0.3)]">Journey</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ delay: 0.2 }}
          className="text-white text-lg md:text-2xl max-w-3xl mx-auto font-medium"
        >
          We don't just execute. We interpret, sharpen, and deliver the digital signal you need to grow.
        </motion.p>
      </div>

      {/* Timeline */}
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* The background line */}
        <div className="absolute left-[40px] md:left-1/2 top-0 bottom-0 w-1 bg-surface -translate-x-1/2 rounded-full" />
        
        {/* The animated filled line */}
        <motion.div 
          style={{ height: lineHeight }}
          className="absolute left-[40px] md:left-1/2 top-0 w-1 bg-accent -translate-x-1/2 rounded-full shadow-[0_0_15px_rgba(224,243,71,0.5)] origin-top z-0"
        />

        <div className="relative z-10 flex flex-col gap-12 md:gap-0">
          {timelineData.map((item, index) => {
            const isEven = index % 2 === 0;
            return (
              <div key={item.year} className="relative flex flex-col md:flex-row items-start md:items-center justify-between md:min-h-[250px] w-full">
                
                {/* Desktop Empty Space for alternating layout */}
                <div className={cn("hidden md:block w-5/12", isEven ? "order-2" : "order-1")} />
                
                {/* Timeline Dot & Icon */}
                <motion.div 
                  initial={{ scale: 0, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: false, amount: 0.5 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20, delay: 0.2 }}
                  className={cn(
                    "absolute left-0 md:left-1/2 -translate-x-0 md:-translate-x-1/2 w-20 h-20 rounded-full border-4 border-background bg-surface flex items-center justify-center z-10 shadow-xl",
                    "order-1 md:order-2 top-0 md:top-auto"
                  )}
                >
                  <div className="absolute inset-0 rounded-full border border-accent/40 md:group-hover:border-accent animate-[spin_4s_linear_infinite]" />
                  <item.icon className="w-8 h-8 text-accent drop-shadow-[0_0_10px_rgba(224,243,71,0.5)]" />
                </motion.div>

                {/* Content Card */}
                <motion.div 
                  initial={{ opacity: 0, x: isEven ? -150 : 150 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: false, amount: 0.2 }}
                  transition={{ duration: 0.8, delay: 0.2, type: "spring", bounce: 0.4 }}
                  className={cn(
                    "w-full md:w-5/12 pl-[100px] md:pl-0 pt-2 md:pt-0",
                    isEven ? "order-1 md:pr-12 lg:pr-16" : "order-2 md:pl-12 lg:pl-16"
                  )}
                >
                  <div className={cn(
                    "p-6 sm:p-10 rounded-[2rem] bg-black/40 backdrop-blur-xl border border-border hover:border-accent/50 transition-all duration-500 shadow-2xl group flex flex-col",
                    isEven ? "md:items-end text-left md:text-right" : "text-left"
                  )}>
                    <span className="inline-block px-5 py-2 rounded-full bg-accent/15 text-accent font-bold tracking-widest text-sm mb-6 border border-accent/30 w-fit">
                      {item.year}
                    </span>
                    <h3 className="text-2xl md:text-3xl lg:text-4xl font-black text-white mb-4 uppercase tracking-tight group-hover:text-accent transition-colors duration-300">
                      {item.title}
                    </h3>
                    <p className="text-white text-base sm:text-lg leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </motion.div>

              </div>
            )
          })}
        </div>
      </div>
    </section>
  );
}
