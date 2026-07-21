"use client";

import { useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Search, PenTool, Code, Rocket } from "lucide-react";

const steps = [
  {
    id: "01",
    title: "Discovery & Strategy",
    description: "We dive deep into your business goals, target audience, and current digital presence to formulate a winning strategy.",
    icon: Search,
  },
  {
    id: "02",
    title: "Design & Prototyping",
    description: "Our creative team crafts stunning, user-centric designs that align perfectly with your brand identity.",
    icon: PenTool,
  },
  {
    id: "03",
    title: "Development & Engineering",
    description: "We build scalable, high-performance solutions using cutting-edge technologies like Next.js and robust backends.",
    icon: Code,
  },
  {
    id: "04",
    title: "Launch & Growth",
    description: "We ensure a smooth deployment and execute targeted marketing campaigns to drive immediate and sustained growth.",
    icon: Rocket,
  }
];

export function Timeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const lineFillRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Pinning the section
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=300%",
          pin: true,
          scrub: 1,
        }
      });

      const stepElements = gsap.utils.toArray(".timeline-step");
      const totalSteps = stepElements.length;

      // Animate the line filling up over the entire scrub duration
      tl.to(lineFillRef.current, {
        height: "100%",
        ease: "none",
        duration: totalSteps - 1
      }, 0);

      // Animate the steps appearing and highlighting synchronized with the line
      stepElements.forEach((step: any, i) => {
        // Highlight step slightly before the line reaches it
        const startTime = i === 0 ? 0 : i - 0.3;
        tl.to(step, {
          opacity: 1,
          scale: 1,
          duration: 0.5,
          ease: "power2.out"
        }, startTime);
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={containerRef} 
      id="process"
      className="h-screen w-full bg-primary text-black relative flex items-center overflow-hidden"
    >
      {/* Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]" />

      <div className="container mx-auto px-6 h-full flex flex-col md:flex-row items-center relative z-10 py-20">
        
        {/* Left Side: Illustration / Headline */}
        <div className="w-full md:w-1/2 h-full flex flex-col justify-center pr-10">
          <motion.h2 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="font-heading text-5xl md:text-7xl font-bold mb-6"
          >
            How We <br/>
            <span className="text-primary">Deliver Results.</span>
          </motion.h2>
          <p className="text-xl text-black/70 max-w-md">
            Our proven four-step methodology ensures transparency, quality, and measurable success for every project we undertake.
          </p>

          {/* Decorative Animated SVG */}
          <div className="mt-12 hidden md:block">
            <svg viewBox="0 0 200 200" className="w-48 h-48 opacity-50">
              <motion.path 
                d="M 100, 100 m -75, 0 a 75,75 0 1,0 150,0 a 75,75 0 1,0 -150,0"
                fill="transparent"
                stroke="#F9C000"
                strokeWidth="2"
                strokeDasharray="10 10"
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              />
              <motion.path 
                d="M 100, 100 m -50, 0 a 50,50 0 1,1 100,0 a 50,50 0 1,1 -100,0"
                fill="transparent"
                stroke="#A1824F"
                strokeWidth="1"
                animate={{ rotate: -360 }}
                transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
              />
            </svg>
          </div>
        </div>

        {/* Right Side: Timeline Steps */}
        <div className="w-full md:w-1/2 h-full relative flex py-20">
          
          {/* Vertical Line */}
          <div 
            ref={lineRef}
            className="absolute left-8 md:left-12 top-20 bottom-20 w-1 bg-black/10 rounded-full overflow-hidden"
          >
            <div 
              ref={lineFillRef}
              className="w-full h-0 bg-gradient-to-b from-primary via-[#FFEA5A] to-[#A1824F]"
            />
          </div>

          <div className="flex flex-col justify-between w-full h-full pl-20 md:pl-28">
            {steps.map((step, idx) => {
              const Icon = step.icon;
              return (
                <div 
                  key={step.id} 
                  className="timeline-step relative opacity-20 scale-95 transition-all duration-300"
                >
                  <div className="absolute -left-20 md:-left-28 top-0 w-12 h-12 rounded-full bg-white border-2 border-black/10 flex items-center justify-center text-primary font-bold z-10 shadow-lg shadow-black/10">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-3xl font-bold font-heading text-black mb-2">{step.title}</h3>
                  <p className="text-black/70 text-lg">{step.description}</p>
                </div>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
}
