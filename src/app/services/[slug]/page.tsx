"use client";

import { notFound } from "next/navigation";
import { useParams } from "next/navigation";
import { services } from "@/data/services";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ChevronRight, ArrowUpRight } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import { MarqueeText } from "@/components/marquee-text";
import { CursorRevealCard } from "@/components/cursor-reveal-card";
import { useRef } from "react";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

export default function ServicePage() {
  const params = useParams<{ slug: string }>();
  const service = services.find((s) => s.slug === params.slug);

  const containerRef = useRef<HTMLElement>(null);
  const heroRef = useRef<HTMLElement>(null);
  const chooseUsRef = useRef<HTMLElement>(null);

  // Scroll logic for Hero fading out
  const { scrollYProgress: heroProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const heroOpacity = useTransform(heroProgress, [0, 1], [1, 0]);
  const heroScale = useTransform(heroProgress, [0, 1], [1, 0.95]);
  const heroY = useTransform(heroProgress, [0, 1], [0, 50]);

  if (!service) {
    notFound();
    return null;
  }

  const s = service;
  const HeroIcon = s.icon;

  return (
    <main ref={containerRef} className="min-h-screen bg-transparent text-[#F5F5F7] overflow-x-hidden font-sans selection:bg-primary/30">
      
      {/* ─── HERO SECTION (Sticky & Cinematic) ─── */}
      <section ref={heroRef} className="relative h-[120vh]">
        <motion.div 
          style={{ opacity: heroOpacity, scale: heroScale, y: heroY }}
          className="sticky top-0 h-screen flex flex-col justify-center px-6 md:px-16 lg:px-32 overflow-hidden"
        >
          {/* Deep abstract glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/20 rounded-full blur-[120px] pointer-events-none" />
          
          <div className="relative z-10 max-w-7xl mx-auto w-full flex flex-col items-center text-center mt-16">
            <Link
              href="/#services"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel text-sm text-white/70 hover:text-white hover:bg-white/5 transition-all mb-12"
            >
              <ArrowLeft size={16} /> All Services
            </Link>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: EASE }}
              className="mb-8"
            >
              <div className="w-20 h-20 md:w-28 md:h-28 mx-auto rounded-[2rem] glass-panel-highlight flex items-center justify-center">
                <HeroIcon className="w-10 h-10 md:w-14 md:h-14 text-white" strokeWidth={1} />
              </div>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.1, ease: EASE }}
              className="text-6xl md:text-8xl lg:text-[120px] font-medium tracking-tighter leading-[0.85] mb-8 text-transparent bg-clip-text bg-gradient-to-b from-white to-white/60"
            >
              {s.title}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2, ease: EASE }}
              className="text-xl md:text-3xl text-[#86868B] font-light max-w-3xl leading-snug tracking-tight mb-12"
            >
              {s.heroDescription}
            </motion.p>
          </div>
        </motion.div>
      </section>

      {/* ─── STATS SECTION (Minimal Apple Style) ─── */}
      <section className="relative z-20 py-24 px-6 md:px-16 lg:px-32 bg-transparent">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-16">
            {s.stats.map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, delay: i * 0.1, ease: EASE }}
                className="flex flex-col items-start border-l border-white/10 pl-6"
              >
                <p className="text-5xl md:text-6xl font-medium tracking-tighter text-white mb-2">{stat.value}</p>
                <p className="text-[#86868B] text-sm tracking-wide uppercase font-medium">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CAPABILITIES (Bento Box Glassmorphism) ─── */}
      <section className="relative z-20 py-32 px-6 md:px-16 lg:px-32 bg-transparent">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: EASE }}
            className="mb-20 text-center md:text-left"
          >
            <h2 className="text-5xl md:text-7xl font-medium tracking-tighter mb-6">
              Capabilities. <br />
              <span className="text-[#86868B]">Engineered for growth.</span>
            </h2>
          </motion.div>

          {/* Bento Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[minmax(300px,auto)]">
            {s.subServices.map((sub, i) => {
              const SubIcon = sub.icon;
              // Make the first and sometimes 4th items span more columns to create the bento look
              const isLarge = i === 0 || i === 3;
              
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.8, delay: (i % 3) * 0.1, ease: EASE }}
                  className={`group relative glass-panel-highlight rounded-[2.5rem] p-10 flex flex-col justify-between overflow-hidden transition-all duration-500 hover:bg-white/[0.03] ${isLarge ? 'md:col-span-2' : 'md:col-span-1'}`}
                >
                  <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-primary/10 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                  
                  <div className="relative z-10">
                    <div className="w-16 h-16 rounded-[1.5rem] bg-white/5 border border-white/10 flex items-center justify-center mb-8">
                      <SubIcon className="w-8 h-8 text-white" strokeWidth={1.5} />
                    </div>
                  </div>
                  <div className="relative z-10 mt-auto">
                    <h3 className="text-3xl font-medium tracking-tight text-white mb-4">
                      {sub.title}
                    </h3>
                    <p className="text-[#86868B] text-lg leading-relaxed font-light">
                      {sub.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── MARQUEE STRIP ─── */}
      <div className="py-12 border-y border-white/5 bg-white/[0.01]">
        <MarqueeText text={`Great Marketing Matters — ${s.title}`} />
      </div>

      {/* ─── WHY CHOOSE US (Sticky Storytelling) ─── */}
      <section ref={chooseUsRef} className="relative z-20 bg-transparent">
        <div className="max-w-7xl mx-auto px-6 md:px-16 lg:px-32 flex flex-col lg:flex-row relative">
          
          {/* Sticky Left Side */}
          <div className="lg:w-1/2 lg:sticky lg:top-0 lg:h-screen flex flex-col justify-center py-20 lg:py-0">
            <motion.h2 
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: EASE }}
              className="text-5xl md:text-7xl font-medium tracking-tighter leading-[1.1]"
            >
              The difference <br /> is in the <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">details.</span>
            </motion.h2>
          </div>

          {/* Scrolling Right Side */}
          <div className="lg:w-1/2 py-20 lg:py-[30vh] flex flex-col gap-[30vh]">
            {s.whyChoose.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0.2, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ margin: "-40% 0px -40% 0px" }}
                transition={{ duration: 0.6, ease: EASE }}
                className="glass-panel-highlight rounded-[2.5rem] p-10 md:p-14"
              >
                <div className="text-primary font-mono text-sm tracking-widest mb-6 border border-primary/30 rounded-full px-4 py-1 w-fit">
                  0{i + 1}
                </div>
                <h3 className="text-3xl md:text-4xl font-medium tracking-tight text-white mb-6">
                  {item.title}
                </h3>
                <p className="text-[#86868B] text-xl leading-relaxed font-light">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* ─── PROCESS SECTION (Timeline) ─── */}
      <section className="relative z-20 py-32 px-6 md:px-16 lg:px-32 bg-transparent overflow-hidden">
        <div className="max-w-7xl mx-auto relative">
          <div className="text-center mb-24">
            <h2 className="text-5xl md:text-7xl font-medium tracking-tighter">
              How it works.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {s.process.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.8, delay: i * 0.1, ease: EASE }}
                className="relative"
              >
                <div className="text-primary/20 text-[120px] font-medium tracking-tighter leading-none mb-6 -ml-4">
                  {step.step}
                </div>
                <h3 className="text-2xl font-medium tracking-tight text-white mb-4">
                  {step.title}
                </h3>
                <p className="text-[#86868B] text-lg leading-relaxed font-light">
                  {step.description}
                </p>
                {/* Connector line for desktop */}
                {i !== s.process.length - 1 && (
                  <div className="hidden lg:block absolute top-16 right-[-2rem] w-8 h-px bg-white/10" />
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA BANNER (Cinematic Dark) ─── */}
      <section className="py-32 px-6 md:px-16 lg:px-32 bg-transparent">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: EASE }}
            className="relative rounded-[3rem] overflow-hidden glass-panel-highlight p-12 md:p-24 text-center border-t border-white/5"
          >
            {/* Soft background glow */}
            <div className="absolute inset-0 bg-gradient-to-b from-primary/10 to-transparent opacity-50" />
            
            <div className="relative z-10 flex flex-col items-center">
              <h2 className="text-5xl md:text-7xl font-medium tracking-tighter mb-8 max-w-3xl text-balance">
                Ready to redefine your <span className="text-primary">brand&apos;s trajectory?</span>
              </h2>
              <p className="text-[#86868B] text-2xl font-light mb-12 max-w-2xl text-balance">
                Let&apos;s orchestrate a strategy that places you at the forefront of your industry.
              </p>
              
              <Link
                href="/#contact"
                className="group inline-flex items-center gap-3 px-8 py-5 rounded-full bg-white text-black font-medium text-lg hover:scale-105 transition-all duration-300"
              >
                Start the Conversation 
                <ArrowUpRight size={20} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─── EXPLORE MORE SERVICES ─── */}
      <section className="py-24 px-6 md:px-16 lg:px-32 bg-transparent border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16">
            <h2 className="text-4xl font-medium tracking-tighter text-[#86868B]">
              More Services
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {services
              .filter((svc) => svc.slug !== s.slug)
              .slice(0, 6)
              .map((svc, i) => {
                return (
                  <motion.div
                    key={svc.slug}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: i * 0.05, ease: EASE }}
                  >
                    <CursorRevealCard service={svc} />
                  </motion.div>
                );
              })}
          </div>
        </div>
      </section>
    </main>
  );
}
