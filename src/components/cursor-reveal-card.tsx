"use client";

import React, { useRef, useState } from "react";
import { motion, useSpring } from "framer-motion";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import { ServiceData } from "@/data/services";
import { useIsMobile } from "@/hooks/use-is-mobile";

interface CursorRevealCardProps {
  service: ServiceData;
}

export function CursorRevealCard({ service }: CursorRevealCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const containerRef = useRef<HTMLAnchorElement>(null);
  const isMobile = useIsMobile();
  
  // Spring config for smooth follow
  const springConfig = { damping: 25, stiffness: 200, mass: 0.5 };
  
  // Use framer-motion's useSpring to animate x/y smoothly
  const x = useSpring(0, springConfig);
  const y = useSpring(0, springConfig);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current || isMobile) return;
    const rect = containerRef.current.getBoundingClientRect();
    
    // Calculate cursor position relative to the center of the image
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
      onMouseEnter={() => !isMobile && setIsHovered(true)}
      onMouseLeave={() => !isMobile && setIsHovered(false)}
      onMouseMove={handleMouseMove}
      className="group relative flex items-center justify-between p-4 sm:p-8 rounded-2xl transition-all hover:bg-white/5 overflow-hidden"
    >
      {/* On mobile: show image directly as background. On desktop: cursor-follow reveal */}
      {service.imageUrl && (
        <>
          {/* Mobile: Static background image, always visible */}
          {isMobile ? (
            <div className="absolute inset-0 z-0 pointer-events-none rounded-2xl overflow-hidden">
              <Image 
                src={service.imageUrl}
                alt={service.title}
                fill
                className="object-cover opacity-25"
                sizes="100vw"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-background/80 to-background/40" />
            </div>
          ) : (
            /* Desktop: Cursor-following reveal */
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
              <div className="absolute inset-0 bg-surface/20 z-10" />
              <Image 
                src={service.imageUrl}
                alt={service.title}
                fill
                className="object-cover"
                sizes="320px"
              />
            </motion.div>
          )}
        </>
      )}

      {/* Content */}
      <div className={`flex items-center gap-4 sm:gap-6 relative z-10 text-heading`}>
        <div className={`p-3 sm:p-4 rounded-xl ${isMobile ? 'bg-primary/10' : 'bg-white/10 group-hover:bg-primary/20'} transition-colors`}>
          <ServiceIcon className={`w-6 h-6 sm:w-8 sm:h-8 ${isMobile ? 'text-primary' : 'group-hover:text-accent'} transition-colors`} />
        </div>
        <div>
          <h3 className={`text-lg sm:text-2xl font-semibold mb-1 sm:mb-2 group-hover:text-primary transition-colors`}>{service.title}</h3>
          <p className={`text-sm sm:text-base max-w-md text-body-text transition-colors line-clamp-2`}>{service.shortDescription}</p>
        </div>
      </div>
      
      {/* Icon */}
      <div className={`p-3 sm:p-4 rounded-full ${isMobile ? 'bg-primary/10' : 'bg-white/5 group-hover:bg-primary'} transition-colors relative z-10 text-heading`}>
        <ArrowUpRight className={`w-5 h-5 sm:w-6 sm:h-6 group-hover:text-background transition-colors`} />
      </div>
    </Link>
  );
}
