"use client";

import { useMemo, useState } from "react";
import { motion, useAnimation, useMotionValue, useTransform } from "framer-motion";
import { Monitor, Smartphone, Search, Target, Briefcase, PenTool, TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";
import { useEffect } from "react";

const IS_SERVER = typeof window === "undefined";

function useMediaQuery(query: string, defaultValue = false) {
  const [matches, setMatches] = useState<boolean>(() => {
    if (IS_SERVER) return defaultValue;
    return window.matchMedia(query).matches;
  });

  useEffect(() => {
    const matchMedia = window.matchMedia(query);
    const handleChange = () => setMatches(matchMedia.matches);
    handleChange();
    matchMedia.addEventListener("change", handleChange);
    return () => matchMedia.removeEventListener("change", handleChange);
  }, [query]);

  return matches;
}

const services = [
  {
    id: "web",
    title: "Web Development",
    description: "High-performance, beautifully animated websites built with modern frameworks like Next.js and React.",
    icon: Monitor,
    color: "from-blue-500/20 to-cyan-500/20"
  },
  {
    id: "app",
    title: "App Development",
    description: "Native and cross-platform mobile applications that deliver seamless user experiences.",
    icon: Smartphone,
    color: "from-purple-500/20 to-pink-500/20"
  },
  {
    id: "seo",
    title: "SEO Optimization",
    description: "Data-driven strategies to dominate search rankings and drive organic traffic.",
    icon: Search,
    color: "from-emerald-500/20 to-teal-500/20"
  },
  {
    id: "ads",
    title: "Ads Promotion",
    description: "Targeted PPC and social media campaigns that maximize ROI and conversion rates.",
    icon: Target,
    color: "from-orange-500/20 to-red-500/20"
  },
  {
    id: "brand",
    title: "Brand Marketing",
    description: "Building strong, memorable brand identities that resonate with your target audience.",
    icon: Briefcase,
    color: "from-[#F9C000]/20 to-[#A1824F]/20"
  },
  {
    id: "graphic",
    title: "Graphic Designing",
    description: "Stunning visuals, illustrations, and marketing collateral crafted by expert designers.",
    icon: PenTool,
    color: "from-indigo-500/20 to-blue-500/20"
  },
  {
    id: "business",
    title: "Business Marketing",
    description: "Comprehensive marketing strategies tailored to scale your B2B or B2C enterprise.",
    icon: TrendingUp,
    color: "from-rose-500/20 to-pink-500/20"
  }
];

export function Services() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  
  // 3D Carousel Mathematics
  const isScreenSizeSm = useMediaQuery("(max-width: 640px)");
  const cylinderWidth = isScreenSizeSm ? 1500 : 2500;
  const faceCount = services.length;
  const faceWidth = cylinderWidth / faceCount;
  const radius = cylinderWidth / (2 * Math.PI);
  
  const rotation = useMotionValue(0);
  const transform = useTransform(rotation, (value) => `rotate3d(0, 1, 0, ${value}deg)`);
  const controls = useAnimation();

  return (
    <section id="services" className="py-32 w-full relative z-10 bg-[#F9C000] text-black overflow-hidden">
      <div className="container mx-auto px-6 max-w-7xl relative z-20">
        <div className="flex flex-col items-center text-center mb-20">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="font-heading text-4xl md:text-5xl font-bold mb-4"
          >
            Our Core <span className="text-white">Services</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ delay: 0.1 }}
            className="text-black/70 text-lg max-w-2xl"
          >
            We leverage cutting-edge technology and creative strategies to elevate your brand in the digital landscape. Drag the cards to explore.
          </motion.p>
        </div>
      </div>

      <div className="relative h-[550px] md:h-[700px] w-full overflow-hidden flex items-center justify-center -mt-10" style={{ perspective: "1200px" }}>
        <motion.div
          drag="x"
          className="relative flex h-full origin-center cursor-grab justify-center active:cursor-grabbing"
          style={{
            transform,
            rotateY: rotation,
            width: cylinderWidth,
            transformStyle: "preserve-3d",
          }}
          onDrag={(_, info) => rotation.set(rotation.get() + info.offset.x * 0.05)}
          onDragEnd={(_, info) =>
            controls.start({
              rotateY: rotation.get() + info.velocity.x * 0.05,
              transition: { type: "spring", stiffness: 100, damping: 30, mass: 0.1 },
            })
          }
          animate={controls}
        >
          {services.map((service, idx) => {
            const Icon = service.icon;
            const isHovered = hoveredIndex === idx;
            const isDimmed = hoveredIndex !== null && hoveredIndex !== idx;

            return (
              <motion.div
                key={service.id}
                onMouseEnter={() => setHoveredIndex(idx)}
                onMouseLeave={() => setHoveredIndex(null)}
                className={cn(
                  "absolute flex h-full origin-center items-center justify-center p-4",
                  isDimmed ? "opacity-50" : "opacity-100",
                  "transition-opacity duration-500"
                )}
                style={{
                  width: `${faceWidth}px`,
                  transform: `rotateY(${idx * (360 / faceCount)}deg) translateZ(${radius}px)`,
                  backfaceVisibility: "hidden", // Hides cards when they rotate to the back
                  WebkitBackfaceVisibility: "hidden"
                }}
              >
                {/* The Original Card Design */}
                <div 
                  className={cn(
                    "relative group w-full h-[360px] rounded-3xl p-8 overflow-hidden border border-black/10 bg-white/80 backdrop-blur-xl transition-all duration-500 flex flex-col justify-between",
                    isHovered ? "shadow-[0_0_40px_rgba(0,0,0,0.1)] border-white/50 scale-[1.02]" : "scale-100"
                  )}
                >
                  {/* Background Gradient Hover Effect */}
                  <div 
                    className={cn(
                      "absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none",
                      service.color
                    )} 
                  />
                  
                  {/* Content */}
                  <div className="relative z-10 flex flex-col h-full gap-6">
                    <div className="w-16 h-16 shrink-0 rounded-full bg-white border border-white flex items-center justify-center group-hover:bg-white group-hover:border-white transition-colors duration-500 shadow-sm">
                      <Icon className="w-8 h-8 text-black group-hover:text-black transition-colors duration-500" />
                    </div>
                    
                    <div className="mt-auto">
                      <h3 className="text-2xl font-bold mb-3 font-heading text-black transition-colors duration-300">
                        {service.title}
                      </h3>
                      <p className="text-black/70 leading-relaxed text-sm">
                        {service.description}
                      </p>
                    </div>
                  </div>

                  {/* Animated Shine Effect */}
                  <div className="absolute top-0 -inset-full h-full w-1/2 z-5 block transform -skew-x-12 bg-gradient-to-r from-transparent to-white opacity-10 group-hover:animate-shine pointer-events-none" />
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
