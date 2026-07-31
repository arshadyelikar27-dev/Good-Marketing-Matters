"use client";

import { useRef, useState } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { ServiceData, services } from "@/data/services";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

function HorizontalServiceCard({ service }: { service: ServiceData }) {
  const [isHovered, setIsHovered] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Spring config for smooth follow
  const springConfig = { damping: 25, stiffness: 200, mass: 0.5 };
  const x = useSpring(0, springConfig);
  const y = useSpring(0, springConfig);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    
    // Center the image (assuming 320x240 image)
    const offsetX = e.clientX - rect.left - 160;
    const offsetY = e.clientY - rect.top - 120;
    
    x.set(offsetX);
    y.set(offsetY);
  };

  const Icon = service.icon;

  return (
    <Link 
      href={`/services/${service.slug}`}
      ref={containerRef as any}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseMove={handleMouseMove}
      className="group relative flex flex-col justify-between w-[85vw] sm:w-[400px] h-[480px] shrink-0 p-8 rounded-[2rem] bg-white/[0.03] backdrop-blur-3xl border border-white/10 overflow-hidden hover:bg-white/[0.05] hover:border-primary/50 transition-all duration-500 cursor-pointer block"
    >
      {/* Revealed Image that follows the cursor */}
      {service.imageUrl && (
        <motion.div
          style={{ x, y }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ 
            opacity: isHovered ? 1 : 0, 
            scale: isHovered ? 1 : 0.8 
          }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="absolute z-0 pointer-events-none w-80 h-60 rounded-xl overflow-hidden shadow-2xl"
        >
          <div className="absolute inset-0 bg-black/40 z-10" />
          <Image 
            src={service.imageUrl}
            alt={service.title}
            fill
            className="object-cover"
            sizes="320px"
          />
        </motion.div>
      )}

      {/* Top Accent Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80%] h-px bg-gradient-to-r from-transparent via-primary to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-10" />
      
      <div className="p-4 bg-white/5 rounded-2xl w-fit mb-6 shadow-inner border border-white/5 group-hover:border-accent/30 group-hover:shadow-[0_0_30px_rgba(245,158,11,0.15)] transition-all duration-500 relative z-10 mix-blend-difference text-white">
        <Icon className="w-10 h-10 text-accent group-hover:text-primary transition-colors" />
      </div>

      <div className="flex-1 relative z-10 mix-blend-difference text-white">
        <h3 className="text-3xl font-semibold text-white mb-4 tracking-tight group-hover:text-accent transition-colors duration-300">
          {service.title}
        </h3>
        <p className="text-white/60 text-lg leading-relaxed font-light group-hover:text-white/80 transition-colors duration-300 line-clamp-3">
          {service.shortDescription}
        </p>
      </div>

      <div className="mt-6 relative z-10 mix-blend-difference text-white">
        <span 
          className="inline-flex items-center gap-2 text-primary font-medium group-hover:text-white transition-colors"
        >
          Read More <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
        </span>
      </div>
    </Link>
  );
}

export function Services() {
  const targetRef = useRef<HTMLDivElement>(null);
  
  // Create a huge scroll area (600vh) to allow horizontal scrolling for 10 items
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  // Map vertical scroll (0 to 1) to horizontal translation
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-85%"]);

  return (
    <section id="services" ref={targetRef} className="relative h-[600vh] w-full bg-transparent">
      
      {/* Sticky container that holds the horizontal track */}
      <div className="sticky top-0 h-screen flex items-center overflow-hidden">
        
        <div className="absolute top-24 left-8 md:left-24 z-10 pointer-events-none mix-blend-difference text-white">
          <h2 className="text-4xl md:text-6xl font-semibold tracking-tight text-white mb-2">
            Digital Solutions.
          </h2>
          <p className="text-white/50 text-lg md:text-xl font-light tracking-tight max-w-md">
            Scroll to explore our capabilities.
          </p>
        </div>

        {/* The horizontal track */}
        <motion.div style={{ x }} className="flex gap-8 px-8 md:px-24 mt-20 md:mt-0">
          
          {/* Spacer to push cards past the sticky title on initial load */}
          <div className="w-[10vw] md:w-[20vw] shrink-0" />

          {services.map((service) => (
            <HorizontalServiceCard key={service.slug} service={service} />
          ))}
          
          {/* End spacer */}
          <div className="w-[10vw] shrink-0" />
          
        </motion.div>
      </div>
    </section>
  );
}
