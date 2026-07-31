"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { 
  TrendingUp, 
  MessageCircle, 
  Search, 
  Bot, 
  Sparkles, 
  MonitorSmartphone 
} from "lucide-react";

const servicesList = [
  {
    id: "performance-marketing",
    title: "Performance Marketing",
    description: "Tailored campaigns across Google & LinkedIn to drive explosive, measurable growth.",
    icon: <TrendingUp className="w-10 h-10 text-accent" />
  },
  {
    id: "social-media",
    title: "Social Media",
    description: "Engage your audience with cinematic storytelling and impactful brand narratives.",
    icon: <MessageCircle className="w-10 h-10 text-accent" />
  },
  {
    id: "seo",
    title: "SEO Optimization",
    description: "Own the search results. We engineer visibility with extreme technical precision.",
    icon: <Search className="w-10 h-10 text-accent" />
  },
  {
    id: "aeo",
    title: "Answer Engine Ops",
    description: "Dominate ChatGPT and AI Overviews. Ensure your brand is the definitive answer.",
    icon: <Bot className="w-10 h-10 text-accent" />
  },
  {
    id: "geo",
    title: "Generative Engine Ops",
    description: "We optimize your digital footprint for the next generation of generative search.",
    icon: <Sparkles className="w-10 h-10 text-accent" />
  },
  {
    id: "web-dev",
    title: "Web Development",
    description: "Award-winning, high-performance web applications built for speed and conversion.",
    icon: <MonitorSmartphone className="w-10 h-10 text-accent" />
  }
];

export function Services() {
  const targetRef = useRef<HTMLDivElement>(null);
  
  // Create a huge scroll area (400vh) to allow horizontal scrolling
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  // Map vertical scroll (0 to 1) to horizontal translation (-75% or whatever fits the cards)
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-65%"]);

  return (
    <section id="services" ref={targetRef} className="relative h-[400vh] w-full bg-transparent">
      
      {/* Sticky container that holds the horizontal track */}
      <div className="sticky top-0 h-screen flex items-center overflow-hidden">
        
        <div className="absolute top-24 left-8 md:left-24 z-10 pointer-events-none">
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

          {servicesList.map((service) => (
            <div 
              key={service.id} 
              className="group relative flex flex-col justify-between w-[85vw] sm:w-[400px] h-[450px] shrink-0 p-8 rounded-[2rem] bg-white/[0.03] backdrop-blur-3xl border border-white/10 overflow-hidden hover:bg-white/[0.05] hover:border-primary/50 transition-all duration-500"
            >
              {/* Top Accent Glow */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80%] h-px bg-gradient-to-r from-transparent via-primary to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              
              <div className="p-4 bg-white/5 rounded-2xl w-fit mb-8 shadow-inner border border-white/5 group-hover:border-accent/30 group-hover:shadow-[0_0_30px_rgba(245,158,11,0.15)] transition-all duration-500">
                {service.icon}
              </div>

              <div>
                <h3 className="text-3xl font-semibold text-white mb-4 tracking-tight group-hover:text-accent transition-colors duration-300">
                  {service.title}
                </h3>
                <p className="text-white/60 text-lg leading-relaxed font-light group-hover:text-white/80 transition-colors duration-300">
                  {service.description}
                </p>
              </div>

            </div>
          ))}
          
          {/* End spacer */}
          <div className="w-[10vw] shrink-0" />
          
        </motion.div>
      </div>
    </section>
  );
}
