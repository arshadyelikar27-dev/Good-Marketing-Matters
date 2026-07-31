"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useSpring } from "framer-motion";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import { ServiceData } from "@/data/services";

interface CursorRevealCardProps {
  service: ServiceData;
}

export function CursorRevealCard({ service }: CursorRevealCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const containerRef = useRef<HTMLAnchorElement>(null);
  
  // Spring config for smooth follow
  const springConfig = { damping: 25, stiffness: 200, mass: 0.5 };
  
  // Use framer-motion's useSpring to animate x/y smoothly
  const x = useSpring(0, springConfig);
  const y = useSpring(0, springConfig);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    
    // Calculate cursor position relative to the center of the image
    // Assume image width is 320px and height is 240px
    const offsetX = e.clientX - rect.left - 160;
    const offsetY = e.clientY - rect.top - 120;
    
    x.set(offsetX);
    y.set(offsetY);
  };

  const ServiceIcon = service.icon;

  return (
    <Link
      href={`/services/${service.slug}`}
      ref={containerRef}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseMove={handleMouseMove}
      className="group relative flex items-center justify-between p-8 rounded-2xl glass-panel transition-all hover:bg-white/5 overflow-hidden"
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
          <div className="absolute inset-0 bg-black/20 z-10" />
          <Image 
            src={service.imageUrl}
            alt={service.title}
            fill
            className="object-cover"
            sizes="320px"
          />
        </motion.div>
      )}

      {/* Content */}
      <div className="flex items-center gap-6 relative z-10 mix-blend-difference text-white">
        <div className="p-4 rounded-xl bg-white/10 group-hover:bg-primary/20 transition-colors">
          <ServiceIcon className="w-8 h-8 group-hover:text-primary transition-colors" />
        </div>
        <div>
          <h3 className="text-2xl font-semibold mb-2 group-hover:text-white transition-colors">{service.title}</h3>
          <p className="text-gray-300 max-w-md group-hover:text-gray-200 transition-colors">{service.shortDescription}</p>
        </div>
      </div>
      
      {/* Icon */}
      <div className="p-4 rounded-full bg-white/5 group-hover:bg-primary transition-colors relative z-10 mix-blend-difference text-white">
        <ArrowUpRight className="w-6 h-6 group-hover:text-white transition-colors" />
      </div>
    </Link>
  );
}
