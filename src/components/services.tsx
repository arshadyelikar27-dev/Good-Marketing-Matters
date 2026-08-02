"use client";

import { useRef, useState, MouseEvent } from "react";
import { motion, useScroll, useTransform, useMotionTemplate, useMotionValue, useSpring } from "framer-motion";
import { ServiceData, services } from "@/data/services";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

function SpotlightCard({ service, index }: { service: ServiceData; index: number }) {
  const Icon = service.icon;
  const boundingRef = useRef<HTMLDivElement | null>(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const x = useSpring(useMotionValue(0), { damping: 50, stiffness: 400 });
  const y = useSpring(useMotionValue(0), { damping: 50, stiffness: 400 });

  function handleMouseMove(e: MouseEvent<HTMLDivElement>) {
    if (!boundingRef.current) return;
    const rect = boundingRef.current.getBoundingClientRect();
    
    // Spotlight position
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);

    // 3D Tilt calculation
    const xPct = (e.clientX - rect.left) / rect.width - 0.5;
    const yPct = (e.clientY - rect.top) / rect.height - 0.5;
    x.set(xPct);
    y.set(yPct);
  }

  function handleMouseLeave() {
    x.set(0);
    y.set(0);
  }

  const rotateX = useTransform(y, [-0.5, 0.5], ["7deg", "-7deg"]);
  const rotateY = useTransform(x, [-0.5, 0.5], ["-7deg", "7deg"]);

  return (
    <motion.div
      style={{ perspective: 1000 }}
      className="w-[85vw] md:w-[450px] shrink-0 h-[340px] md:h-[450px]"
    >
      <Link href={`/services/${service.slug}`} className="block h-full outline-none">
        <motion.div
          ref={boundingRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
          className="group relative h-full flex flex-col justify-between p-6 md:p-10 rounded-[2.5rem] bg-surface/40 backdrop-blur-md border border-white/10 overflow-hidden transition-colors duration-300 hover:border-primary/50 shadow-2xl"
        >
          {/* Background Image Reveal */}
          {service.imageUrl && (
            <div className="absolute inset-0 z-0 overflow-hidden rounded-[2.5rem] pointer-events-none">
              <Image 
                src={service.imageUrl} 
                alt={service.title}
                fill
                className="object-cover transition-all duration-700 opacity-40 md:opacity-0 md:group-hover:opacity-40 translate-y-0 md:translate-y-12 md:group-hover:translate-y-0 scale-100 md:scale-110 md:group-hover:scale-100"
              />
              {/* Dark overlay gradient for text readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-700" />
            </div>
          )}

          {/* Spotlight Effect */}
          <motion.div
            className="pointer-events-none absolute -inset-px rounded-[2.5rem] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            style={{
              background: useMotionTemplate`
                radial-gradient(
                  500px circle at ${mouseX}px ${mouseY}px,
                  rgba(104, 17, 201, 0.2),
                  transparent 80%
                )
              `,
            }}
          />

          <div 
            style={{ transform: "translateZ(60px)" }} 
            className="relative z-10 flex justify-between items-start mb-12"
          >
            <div className="w-14 h-14 md:w-20 md:h-20 rounded-3xl bg-primary/10 border border-primary/20 flex items-center justify-center shadow-[0_0_20px_rgba(104, 17, 201,0.1)] group-hover:shadow-[0_0_35px_rgba(224, 243, 71,0.25)] transition-all duration-500 group-hover:scale-110">
              <Icon className="w-7 h-7 md:w-10 md:h-10 text-accent group-hover:text-accent transition-colors duration-500" strokeWidth={1.5} />
            </div>
            
            <div className="w-14 h-14 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-primary transition-colors duration-500 border border-white/10 group-hover:border-primary">
              <ArrowUpRight className="w-7 h-7 text-white/50 group-hover:text-black group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300" />
            </div>
          </div>

          <div style={{ transform: "translateZ(40px)" }} className="relative z-10 mt-auto">
            <h3 className="text-2xl md:text-3xl font-black uppercase tracking-tighter text-white mb-2 md:mb-4 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-primary group-hover:to-accent transition-all duration-500 leading-none">
              {service.title}
            </h3>
            <p className="text-white text-base md:text-lg leading-relaxed font-medium line-clamp-3">
              {service.shortDescription}
            </p>
          </div>
        </motion.div>
      </Link>
    </motion.div>
  );
}

export function Services() {
  const targetRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  // Map scroll progress to horizontal translation
  // Negative percentage pushes the container left.
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-80%"]);

  return (
    <section 
      id="services" 
      ref={targetRef} 
      className="relative w-full bg-dark-section h-[400vh]" // 400vh gives enough scroll distance
    >
      <div className="sticky top-0 h-screen flex items-center overflow-hidden">
        
        {/* Background Gradients */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/5 via-transparent to-transparent pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-background to-transparent pointer-events-none" />
        
        {/* Left Intro Text (Scrolls out slightly as you scroll down) */}
        <motion.div 
          style={{ opacity: useTransform(scrollYProgress, [0, 0.15], [1, 0]), x: useTransform(scrollYProgress, [0, 0.15], [0, -100]), willChange: "transform, opacity" }}
          className="absolute left-6 lg:left-12 top-1/4 z-10 max-w-xl pointer-events-none"
        >
          <h2 className="text-6xl md:text-8xl font-black tracking-tighter text-white uppercase mb-6 drop-shadow-[0_0_20px_rgba(104, 17, 201,0.3)]">
            Digital <br/><span className="text-accent">Domination.</span>
          </h2>
          <p className="text-white text-xl md:text-2xl font-medium leading-relaxed max-w-lg mb-8">
            Scroll down to explore our full-funnel digital marketing services engineered for explosive growth.
          </p>
          <div className="w-16 h-16 rounded-full border border-primary/30 flex flex-col items-center justify-center animate-bounce">
            <span className="text-xs uppercase tracking-widest text-accent mb-1">Scroll</span>
            <div className="w-1 h-3 rounded-full bg-primary" />
          </div>
        </motion.div>

        {/* Horizontal Scrolling Track */}
        <motion.div style={{ x, willChange: "transform" }} className="flex gap-8 pl-[100vw] lg:pl-[60vw] pr-[10vw] md:pr-[20vw] relative z-20 items-center h-full pt-20">
          {services.map((service, index) => (
            <SpotlightCard key={service.slug} service={service} index={index} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
