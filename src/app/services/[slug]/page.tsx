"use client";

import { notFound } from "next/navigation";
import { useParams } from "next/navigation";
import { services } from "@/data/services";
import Link from "next/link";
import Image from "next/image";
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
    <main ref={containerRef} className="min-h-screen bg-transparent text-foreground overflow-x-hidden font-sans selection:bg-primary/30">
      
      {/* ─── HERO SECTION (Sticky & Cinematic) ─── */}
      <section ref={heroRef} className="relative h-[80vh] sm:h-[150vh]">
        <motion.div 
          style={{ opacity: heroOpacity, scale: heroScale, y: heroY }}
          className="sticky top-0 h-[80vh] sm:h-screen flex flex-col justify-center px-4 sm:px-6 md:px-16 lg:px-32 overflow-hidden bg-transparent"
        >
          {/* Deep abstract glow removed as requested */}


          {/* Back Button */}
          <div className="absolute top-20 sm:top-28 left-4 sm:left-6 md:left-12 lg:left-24 z-20">
            <Link
              href="/#services"
              className="inline-flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-3 rounded-full border border-primary/30 text-xs sm:text-sm font-bold text-heading uppercase tracking-widest hover:text-black hover:bg-primary transition-all duration-300"
            >
              <ArrowLeft size={16} /> All Services
            </Link>
          </div>

          <div className="relative z-10 max-w-[1400px] mx-auto w-full flex flex-col items-center text-center mt-12 sm:mt-16">

            <motion.h1
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, ease: EASE }}
              className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black uppercase tracking-tighter leading-[0.9] text-transparent bg-clip-text bg-gradient-to-b from-primary to-primary/70 break-words hyphens-auto w-full mb-6 sm:mb-8"
            >
              {s.title}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2, ease: EASE }}
              className="text-sm sm:text-lg md:text-2xl text-heading font-bold max-w-3xl leading-snug mb-6 sm:mb-12"
            >
              {s.heroDescription}
            </motion.p>
          </div>
        </motion.div>
      </section>


      {/* ─── CAPABILITIES (Bento Box Glassmorphism) ─── */}
      <section className="relative z-20 py-16 sm:py-24 md:py-32 bg-transparent">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.15 }}
            transition={{ duration: 1, ease: EASE }}
            className="mb-10 sm:mb-16 md:mb-20 text-center md:text-left"
          >
            <h2 className="text-2xl sm:text-4xl md:text-5xl lg:text-7xl font-bold uppercase tracking-tighter mb-3 sm:mb-4 text-heading break-words hyphens-auto w-full">
              Capabilities. <br />
              <span className="text-primary">Engineered for growth.</span>
            </h2>
          </motion.div>

          {/* Bento Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 auto-rows-[minmax(280px,auto)] sm:auto-rows-[minmax(350px,auto)]">
            {s.subServices.map((sub, i) => {
              const SubIcon = sub.icon;
              const isLarge = i === 0 || i === 3;
              
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: false, amount: 0.15 }}
                  transition={{ duration: 0.8, delay: (i % 3) * 0.1, ease: EASE }}
                  className={`group relative bg-transparent p-5 sm:p-8 md:p-10 flex flex-col justify-between overflow-hidden transition-colors duration-500 ${isLarge ? 'md:col-span-2' : 'md:col-span-1'}`}
                >
                  <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl bg-transparent flex items-center justify-center mb-5 sm:mb-8 transition-colors duration-500">
                      <SubIcon className="w-6 h-6 sm:w-8 sm:h-8 text-primary group-hover:text-black transition-colors" strokeWidth={2} />
                    </div>
                  
                  {sub.image && (
                    <div className="relative z-10 mb-5 sm:mb-8 w-full aspect-video rounded-xl sm:rounded-2xl overflow-hidden border border-primary/20 group-hover:border-primary/50 transition-colors duration-500 shadow-2xl">
                      <Image 
                        src={sub.image} 
                        alt={sub.title} 
                        fill 
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover group-hover:scale-110 transition-transform duration-1000"
                      />
                    </div>
                  )}

                  <div className="relative z-10 mt-auto">
                    <h3 className="text-xl sm:text-2xl md:text-3xl font-bold uppercase tracking-tight text-heading mb-2 sm:mb-4 group-hover:text-accent transition-colors duration-500">
                      {sub.title}
                    </h3>
                    <p className="text-body-text text-sm sm:text-base md:text-lg leading-relaxed font-medium">
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
      <section className="relative z-20 bg-transparent">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12 flex flex-col lg:flex-row relative">
          
          {/* Sticky Left Side */}
          <div className="lg:w-1/2 lg:sticky lg:top-0 lg:h-screen flex flex-col justify-center py-12 sm:py-16 lg:py-0">
            <motion.h2 
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false, amount: 0.15 }}
              transition={{ duration: 1, ease: EASE }}
              className="text-3xl sm:text-5xl md:text-6xl lg:text-8xl font-black uppercase tracking-tighter leading-[0.9] break-words hyphens-auto w-full"
            >
              The difference <br /> is in the <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary/60">details.</span>
            </motion.h2>
          </div>

          {/* Scrolling Right Side */}
          <div className="lg:w-1/2 py-12 sm:py-16 lg:py-[30vh] flex flex-col gap-10 sm:gap-16 md:gap-24">
            {s.whyChoose.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ margin: "-20% 0px -20% 0px" }}
                transition={{ duration: 0.8, ease: EASE }}
                className="bg-transparent p-6 sm:p-8 md:p-10 lg:p-14 relative overflow-hidden group transition-colors duration-500"
              >
                {/* Hover gradient removed */}
                
                <div className="text-white bg-primary font-black text-base sm:text-xl mb-5 sm:mb-8 rounded-full w-10 h-10 sm:w-14 sm:h-14 flex items-center justify-center">
                  0{i + 1}
                </div>
                <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold uppercase tracking-tight text-heading mb-3 sm:mb-6">
                  {item.title}
                </h3>
                <p className="text-body-text text-sm sm:text-base md:text-xl leading-relaxed font-medium">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* ─── PROCESS SECTION (Timeline) ─── */}
      <section className="relative z-20 py-16 sm:py-24 md:py-32 bg-transparent overflow-hidden">
        {/* no neon gradient needed */}
        
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12 relative">
          <div className="text-center mb-12 sm:mb-16 md:mb-24">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold uppercase tracking-tighter text-heading break-words hyphens-auto w-full">
              How it <span className="text-primary">works.</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 lg:gap-8">
            {s.process.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.15 }}
                transition={{ duration: 0.8, delay: i * 0.1, ease: EASE }}
                className="relative group"
              >
                <div className="text-primary/10 text-[80px] sm:text-[100px] md:text-[140px] font-black tracking-tighter leading-none mb-3 sm:mb-6 -ml-4 sm:-ml-6 group-hover:text-primary/30 transition-colors duration-500">
                  {step.step}
                </div>
                <div className="relative z-10">
                  <h3 className="text-xl sm:text-2xl md:text-3xl font-bold uppercase tracking-tight text-heading mb-2 sm:mb-4 flex items-center gap-2">
                    <Zap className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
                    {step.title}
                  </h3>
                  <p className="text-body-text text-sm sm:text-base md:text-lg leading-relaxed font-medium">
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
      <section className="py-16 sm:py-24 md:py-32 px-4 sm:px-6 lg:px-12 bg-transparent">
        <div className="max-w-[1400px] mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: false, amount: 0.15 }}
            transition={{ duration: 1, ease: EASE }}
            className="relative overflow-hidden bg-transparent p-6 sm:p-10 md:p-16 lg:p-24 text-center group"
          >
            <div className="relative z-10 flex flex-col items-center">
              <h2 className="text-2xl sm:text-4xl md:text-5xl lg:text-7xl font-black uppercase tracking-tighter mb-4 sm:mb-6 md:mb-8 max-w-4xl text-balance break-words hyphens-auto w-full">
                Ready to redefine your brand&apos;s trajectory?
              </h2>
              <p className="text-body-text text-base sm:text-lg md:text-2xl font-medium mb-6 sm:mb-8 md:mb-12 max-w-2xl text-balance">
                Let&apos;s orchestrate a strategy that places you at the forefront of your industry.
              </p>
              
              <Link
                href="/#contact"
                className="group inline-flex items-center gap-2 sm:gap-4 px-6 sm:px-8 md:px-10 py-3 sm:py-4 md:py-5 rounded-full bg-primary text-white font-bold uppercase tracking-widest text-sm sm:text-base md:text-lg hover:bg-primary/90 transition-all duration-300"
              >
                Start the Conversation 
                <ArrowUpRight size={24} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─── EXPLORE MORE SERVICES ─── */}
      <section className="py-16 sm:py-20 md:py-24 px-4 sm:px-6 lg:px-12 bg-transparent">
        <div className="max-w-[1400px] mx-auto">
          <div className="mb-8 sm:mb-12 md:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold uppercase tracking-tighter text-heading">
              More Services
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
            {services
              .filter((svc) => svc.slug !== s.slug)
              .slice(0, 6)
              .map((svc, i) => {
                return (
                  <motion.div
                    key={svc.slug}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false, amount: 0.15 }}
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
