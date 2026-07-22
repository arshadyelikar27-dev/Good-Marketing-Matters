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
    color: "from-blue-500/20 to-cyan-500/20",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "app",
    title: "App Development",
    description: "Native and cross-platform mobile applications that deliver seamless user experiences.",
    icon: Smartphone,
    color: "from-purple-500/20 to-pink-500/20",
    image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "seo",
    title: "SEO Optimization",
    description: "Data-driven strategies to dominate search rankings and drive organic traffic.",
    icon: Search,
    color: "from-emerald-500/20 to-teal-500/20",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "ads",
    title: "Ads Promotion",
    description: "Targeted PPC and social media campaigns that maximize ROI and conversion rates.",
    icon: Target,
    color: "from-orange-500/20 to-red-500/20",
    image: "https://images.unsplash.com/photo-1533750516457-a7f992034fec?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "brand",
    title: "Brand Marketing",
    description: "Building strong, memorable brand identities that resonate with your target audience.",
    icon: Briefcase,
    color: "from-primary/20 to-primary/10",
    image: "https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "graphic",
    title: "Graphic Designing",
    description: "Stunning visuals, illustrations, and marketing collateral crafted by expert designers.",
    icon: PenTool,
    color: "from-indigo-500/20 to-blue-500/20",
    image: "https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "business",
    title: "Business Marketing",
    description: "Comprehensive marketing strategies tailored to scale your B2B or B2C enterprise.",
    icon: TrendingUp,
    color: "from-rose-500/20 to-pink-500/20",
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&q=80",
  }
];

export function Services() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  
  // 3D Carousel Mathematics with fine-grained responsive breakpoints
  const isMobileXs = useMediaQuery("(max-width: 480px)");
  const isMobileSm = useMediaQuery("(max-width: 640px)");
  const cylinderWidth = isMobileXs ? 1200 : isMobileSm ? 1600 : 2500;
  const faceCount = services.length;
  const faceWidth = cylinderWidth / faceCount;
  const radius = cylinderWidth / (2 * Math.PI);
  
  const rotation = useMotionValue(0);
  const transform = useTransform(rotation, (value) => `rotate3d(0, 1, 0, ${value}deg)`);
  const controls = useAnimation();

  useEffect(() => {
    let animationFrame: number;
    
    const updateRotation = () => {
      if (hoveredIndex === null) {
        rotation.set(rotation.get() + 0.08); 
      }
      animationFrame = requestAnimationFrame(updateRotation);
    };
    
    animationFrame = requestAnimationFrame(updateRotation);
    return () => cancelAnimationFrame(animationFrame);
  }, [rotation, hoveredIndex]);

  return (
    <section id="services" className="py-20 sm:py-32 w-full relative z-10 bg-primary text-primary-foreground overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 max-w-7xl relative z-20">
        <div className="flex flex-col items-center text-center mb-12 sm:mb-20">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold mb-4"
          >
            Our Core <span className="text-white">Services</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ delay: 0.1 }}
            className="text-black/70 text-base sm:text-lg max-w-2xl px-2"
          >
            We leverage cutting-edge technology and creative strategies to elevate your brand in the digital landscape. Drag the cards to explore.
          </motion.p>
        </div>
      </div>

      <div 
        className="relative h-[550px] md:h-[700px] w-full overflow-hidden flex items-center justify-center -mt-10" 
        style={{ perspective: "1200px" }}
      >
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
                {/* The Card Design */}
                <div 
                  className={cn(
                    "relative group w-full h-[360px] rounded-3xl p-8 overflow-hidden border transition-all duration-500 flex flex-col justify-between cursor-pointer",
                    isHovered 
                      ? "shadow-[0_20px_50px_rgba(0,0,0,0.3)] border-white/50 scale-[1.03]" 
                      : "border-black/10 bg-white/80 backdrop-blur-xl scale-100"
                  )}
                >
                  {/* Hover Image Reveal */}
                  <div 
                    className={cn(
                      "absolute inset-0 bg-cover bg-center transition-all duration-700 pointer-events-none transform",
                      isHovered ? "opacity-100 scale-100" : "opacity-0 scale-110"
                    )}
                    style={{ backgroundImage: `url(${service.image})` }}
                  />

                  {/* Dark Gradient Overlay on Hover for Text Contrast */}
                  <div 
                    className={cn(
                      "absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-black/30 transition-opacity duration-500 pointer-events-none",
                      isHovered ? "opacity-100" : "opacity-0"
                    )}
                  />

                  {/* Background Color Glow on Hover */}
                  <div 
                    className={cn(
                      "absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-40 transition-opacity duration-700 pointer-events-none mix-blend-overlay",
                      service.color
                    )} 
                  />
                  
                  {/* Content */}
                  <div className="relative z-10 flex flex-col h-full gap-6">
                    <div 
                      className={cn(
                        "w-16 h-16 shrink-0 rounded-full border flex items-center justify-center transition-all duration-500 shadow-sm",
                        isHovered 
                          ? "bg-primary border-primary text-black scale-110 shadow-lg shadow-primary/30" 
                          : "bg-white border-white text-black"
                      )}
                    >
                      <Icon className="w-8 h-8 transition-transform duration-500 group-hover:scale-110" />
                    </div>
                    
                    <div className="mt-auto">
                      <h3 
                        className={cn(
                          "text-2xl font-bold mb-3 font-heading transition-colors duration-300",
                          isHovered ? "text-white" : "text-black"
                        )}
                      >
                        {service.title}
                      </h3>
                      <p 
                        className={cn(
                          "leading-relaxed text-sm transition-colors duration-300",
                          isHovered ? "text-white/90" : "text-black/70"
                        )}
                      >
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
