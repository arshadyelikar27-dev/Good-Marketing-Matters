"use client";

import { notFound } from "next/navigation";
import { useParams } from "next/navigation";
import { services } from "@/data/services";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight, Zap } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import { CursorRevealCard } from "@/components/cursor-reveal-card";
import { useRef } from "react";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

export default function ServicePage() {
  const params = useParams<{ slug: string }>();
  const service = services.find((s) => s.slug === params.slug);

  const containerRef = useRef<HTMLElement>(null);
  const heroRef = useRef<HTMLElement>(null);

  // Scroll logic for Hero fading out
  const { scrollYProgress: heroProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const heroOpacity = useTransform(heroProgress, [0, 1], [1, 0]);
  const heroScale = useTransform(heroProgress, [0, 1], [1, 0.95]);
  const heroY = useTransform(heroProgress, [0, 1], [0, 100]);
  const orbScale = useTransform(heroProgress, [0, 1], [1, 2]);
  const orbRotate = useTransform(heroProgress, [0, 1], [0, 180]);

  if (!service) {
    notFound();
    return null;
  }

  const s = service;
  const HeroIcon = s.icon;

  return (
    <main ref={containerRef} className="min-h-screen bg-background text-white overflow-x-hidden font-sans selection:bg-primary/30">
      
      {/* ─── HERO SECTION (Sticky & Cinematic) ─── */}
      <section ref={heroRef} className="relative h-[150vh]">
        <motion.div 
          style={{ opacity: heroOpacity, scale: heroScale, y: heroY }}
          className="sticky top-0 h-screen flex flex-col justify-center px-6 md:px-16 lg:px-32 overflow-hidden bg-background"
        >
          {/* Deep abstract glow */}
          <motion.div 
            style={{ scale: orbScale, rotate: orbRotate }}
            className="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/20 rounded-full blur-[120px] pointer-events-none mix-blend-screen" 
          />
          <motion.div 
            style={{ scale: orbScale, rotate: useTransform(heroProgress, [0, 1], [0, -180]) }}
            className="absolute top-1/3 right-1/4 translate-x-1/4 -translate-y-1/2 w-[600px] h-[600px] bg-accent/20 rounded-full blur-[100px] pointer-events-none mix-blend-screen" 
          />


          {/* Back Button */}
          <div className="absolute top-28 left-6 md:left-12 lg:left-24 z-20">
            <Link
              href="/#services"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-primary/30 text-sm font-bold text-white uppercase tracking-widest hover:text-black hover:bg-primary transition-all duration-300 shadow-[0_0_15px_rgba(147,51,234,0.3)] hover:shadow-[0_0_25px_rgba(147,51,234,0.6)]"
            >
              <ArrowLeft size={16} /> All Services
            </Link>
          </div>

          <div className="relative z-10 max-w-[1400px] mx-auto w-full flex flex-col items-center text-center mt-16">

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.1, ease: EASE }}
              className="text-6xl md:text-8xl lg:text-[140px] font-black uppercase tracking-tighter leading-[0.9] py-2 mb-8 text-transparent bg-clip-text bg-gradient-to-b from-white to-white/50 drop-shadow-[0_0_20px_rgba(147,51,234,0.3)]"
            >
              {s.title}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2, ease: EASE }}
              className="text-lg md:text-2xl text-accent font-medium max-w-3xl leading-snug mb-12"
            >
              {s.heroDescription}
            </motion.p>
          </div>
        </motion.div>
      </section>


      {/* ─── CAPABILITIES (Bento Box Glassmorphism) ─── */}
      <section className="relative z-20 py-32 bg-dark-section border-y border-primary/20">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: EASE }}
            className="mb-20 text-center md:text-left"
          >
            <h2 className="text-5xl md:text-7xl font-bold uppercase tracking-tighter mb-4 text-heading drop-shadow-[0_0_15px_rgba(147,51,234,0.3)]">
              Capabilities. <br />
              <span className="text-primary">Engineered for growth.</span>
            </h2>
          </motion.div>

          {/* Bento Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[minmax(350px,auto)]">
            {s.subServices.map((sub, i) => {
              const SubIcon = sub.icon;
              const isLarge = i === 0 || i === 3;
              
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.8, delay: (i % 3) * 0.1, ease: EASE }}
                  className={`group relative bg-surface/30 backdrop-blur-md rounded-3xl p-10 flex flex-col justify-between overflow-hidden border border-border hover:border-primary/50 transition-colors duration-500 shadow-xl hover:shadow-[0_0_30px_rgba(147,51,234,0.2)] ${isLarge ? 'md:col-span-2' : 'md:col-span-1'}`}
                >
                  <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-primary/20 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
                  
                  <div className="relative z-10">
                    <div className="w-16 h-16 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-8 group-hover:bg-primary group-hover:border-primary transition-colors duration-500 shadow-[0_0_15px_rgba(147,51,234,0.1)]">
                      <SubIcon className="w-8 h-8 text-primary group-hover:text-black transition-colors" strokeWidth={2} />
                    </div>
                  </div>
                  <div className="relative z-10 mt-auto">
                    <h3 className="text-3xl font-bold uppercase tracking-tight text-white mb-4 group-hover:text-accent transition-colors duration-500">
                      {sub.title}
                    </h3>
                    <p className="text-body-text text-lg leading-relaxed font-medium">
                      {sub.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── WHY CHOOSE US (Sticky Storytelling) ─── */}
      <section className="relative z-20 bg-background border-b border-primary/20">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 flex flex-col lg:flex-row relative">
          
          {/* Sticky Left Side */}
          <div className="lg:w-1/2 lg:sticky lg:top-0 lg:h-screen flex flex-col justify-center py-20 lg:py-0">
            <motion.h2 
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: EASE }}
              className="text-6xl md:text-8xl font-black uppercase tracking-tighter leading-[0.9]"
            >
              The difference <br /> is in the <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent drop-shadow-[0_0_20px_rgba(239,253,50,0.4)]">details.</span>
            </motion.h2>
          </div>

          {/* Scrolling Right Side */}
          <div className="lg:w-1/2 py-20 lg:py-[30vh] flex flex-col gap-24">
            {s.whyChoose.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ margin: "-20% 0px -20% 0px" }}
                transition={{ duration: 0.8, ease: EASE }}
                className="bg-surface/50 backdrop-blur-md rounded-3xl p-10 md:p-14 border border-border shadow-2xl relative overflow-hidden group hover:border-accent/50 transition-colors duration-500"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
                
                <div className="text-black bg-accent font-black text-xl mb-8 rounded-full w-14 h-14 flex items-center justify-center shadow-[0_0_20px_rgba(239,253,50,0.5)]">
                  0{i + 1}
                </div>
                <h3 className="text-4xl font-bold uppercase tracking-tight text-white mb-6">
                  {item.title}
                </h3>
                <p className="text-body-text text-xl leading-relaxed font-medium">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* ─── PROCESS SECTION (Timeline) ─── */}
      <section className="relative z-20 py-32 bg-dark-section border-b border-primary/20 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/5 via-transparent to-transparent pointer-events-none" />
        
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 relative">
          <div className="text-center mb-24">
            <h2 className="text-5xl md:text-7xl font-bold uppercase tracking-tighter text-heading drop-shadow-[0_0_15px_rgba(147,51,234,0.3)]">
              How it <span className="text-primary">works.</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
            {s.process.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.8, delay: i * 0.1, ease: EASE }}
                className="relative group"
              >
                <div className="text-primary/10 text-[140px] font-black tracking-tighter leading-none mb-6 -ml-6 group-hover:text-primary/30 transition-colors duration-500">
                  {step.step}
                </div>
                <div className="relative z-10">
                  <h3 className="text-3xl font-bold uppercase tracking-tight text-white mb-4 flex items-center gap-2">
                    <Zap className="w-6 h-6 text-accent" />
                    {step.title}
                  </h3>
                  <p className="text-body-text text-lg leading-relaxed font-medium">
                    {step.description}
                  </p>
                </div>
                {/* Connector line for desktop */}
                {i !== s.process.length - 1 && (
                  <div className="hidden lg:block absolute top-24 right-[-3rem] w-12 h-px bg-gradient-to-r from-primary to-transparent" />
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA BANNER (Cinematic Dark) ─── */}
      <section className="py-32 px-6 lg:px-12 bg-background">
        <div className="max-w-[1400px] mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: EASE }}
            className="relative rounded-[3rem] overflow-hidden bg-surface/50 backdrop-blur-md p-12 md:p-24 text-center border border-primary/30 shadow-2xl group"
          >
            <div className="absolute inset-0 bg-gradient-to-b from-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            
            <div className="relative z-10 flex flex-col items-center">
              <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter mb-8 max-w-4xl text-balance drop-shadow-[0_0_20px_rgba(147,51,234,0.5)]">
                Ready to redefine your <span className="text-accent">brand&apos;s trajectory?</span>
              </h2>
              <p className="text-body-text text-2xl font-medium mb-12 max-w-2xl text-balance">
                Let&apos;s orchestrate a strategy that places you at the forefront of your industry.
              </p>
              
              <Link
                href="/#contact"
                className="group inline-flex items-center gap-4 px-10 py-5 rounded-full bg-primary text-black font-bold uppercase tracking-widest text-lg hover:bg-accent transition-all duration-300 shadow-[0_0_30px_rgba(147,51,234,0.6)] hover:shadow-[0_0_50px_rgba(239,253,50,0.8)]"
              >
                Start the Conversation 
                <ArrowUpRight size={24} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─── EXPLORE MORE SERVICES ─── */}
      <section className="py-24 px-6 lg:px-12 bg-dark-section border-t border-primary/20">
        <div className="max-w-[1400px] mx-auto">
          <div className="mb-16">
            <h2 className="text-4xl font-bold uppercase tracking-tighter text-body-text">
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
