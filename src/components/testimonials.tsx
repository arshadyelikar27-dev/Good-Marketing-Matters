"use client";

import React, { useRef, useState, useEffect } from "react";
import HTMLFlipBook from "react-pageflip";
import { useMediaQuery } from "@react-hook/media-query";
import { motion } from "framer-motion";
import { Star, BookOpen, ChevronRight, Sparkles } from "lucide-react";

interface Testimonial {
  id: number;
  name: string;
  jobtitle: string;
  company: string;
  review: string;
  rating: number;
  image?: string;
}

const testimonialsData: Testimonial[] = [
  {
    id: 1,
    name: "John Doe",
    jobtitle: "CEO",
    company: "TechFlow Inc.",
    review: "GMM transformed our digital presence completely. Our organic traffic increased by 150% within just three months of their SEO overhaul.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200",
  },
  {
    id: 2,
    name: "Sarah Jenkins",
    jobtitle: "Marketing Director",
    company: "Bloom Cosmetics",
    review: "The new website design is absolutely stunning. Their team perfectly captured our brand's luxury aesthetic while ensuring lightning-fast load times.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=200",
  },
  {
    id: 3,
    name: "Michael Chen",
    jobtitle: "Founder",
    company: "Apex Startups",
    review: "Incredible attention to detail in their app development process. They didn't just build what we asked for; they built what we actually needed.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200",
  },
  {
    id: 4,
    name: "Elena Rodriguez",
    jobtitle: "VP of Business",
    company: "Global Logistics",
    review: "Their B2B marketing strategy was a game-changer. We're now consistently generating high-quality leads that convert into long-term clients.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=200",
  },
];

// Helper Page Wrapper for react-pageflip (forwardRef is required!)
const Page = React.forwardRef<HTMLDivElement, { children: React.ReactNode; className?: string }>(
  ({ children, className = "" }, ref) => {
    return (
      <div ref={ref} className={`w-full h-full shadow-2xl overflow-hidden select-none ${className}`}>
        {children}
      </div>
    );
  }
);
Page.displayName = "Page";

export function Testimonials() {
  const [mounted, setMounted] = useState(false);
  const bookRef = useRef<any>(null);

  const isSmallScreen = useMediaQuery("(min-width: 640px)");
  const smallerDevice = !isSmallScreen;

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleFlip = (pageNum: number) => {
    if (bookRef.current?.pageFlip()) {
      bookRef.current.pageFlip().flip(pageNum);
    }
  };

  return (
    <section id="reviews" className="relative w-full min-h-screen py-24 md:py-32 bg-white text-black flex flex-col items-center justify-center overflow-hidden">
      {/* Background glowing orb */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] md:w-[40vw] h-[80vw] md:h-[40vw] bg-primary/20 rounded-full blur-[120px] pointer-events-none" />

      {/* Header */}
      <div className="container relative z-10 mx-auto px-6 mb-12 text-center flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-black/5 text-black font-bold text-xs uppercase tracking-widest mb-4"
        >
          <BookOpen className="w-4 h-4 text-primary" /> Interactive Client Book
        </motion.div>

        <motion.h2 
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-heading text-4xl md:text-6xl font-bold mb-4"
        >
          What Our <span className="text-primary">Clients Say</span>
        </motion.h2>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-base sm:text-lg text-black/70 max-w-xl mx-auto"
        >
          Flip through the pages of our client storybook to see how GMM drives real growth.
        </motion.p>
      </div>

      {/* 3D FlipBook Container */}
      <div className="w-full relative z-10 flex justify-center items-center py-6 px-4">
        {mounted && (
          <HTMLFlipBook
            ref={bookRef}
            width={smallerDevice ? 310 : 360}
            height={smallerDevice ? 460 : 500}
            showCover={true}
            usePortrait={smallerDevice}
            startPage={0}
            size="fixed"
            minWidth={300}
            maxWidth={400}
            minHeight={400}
            maxHeight={550}
            drawShadow={true}
            flippingTime={900}
            startZIndex={0}
            autoSize={false}
            maxShadowOpacity={0.5}
            mobileScrollSupport={true}
            clickEventForward={true}
            useMouseEvents={true}
            swipeDistance={30}
            showPageCorners={true}
            disableFlipByClick={false}
            className="shadow-2xl rounded-2xl"
            style={{ margin: "0 auto" }}
          >
            {/* FRONT COVER */}
            <Page className="bg-black text-white p-8 flex flex-col justify-between items-center text-center border-r border-amber-500/30">
              <div className="w-full flex justify-between items-center pt-2 border-b border-white/20 pb-4">
                <span className="text-xs font-bold uppercase tracking-widest text-primary">GMM Edition</span>
                <Sparkles className="w-5 h-5 text-primary animate-pulse" />
              </div>

              <div className="my-auto flex flex-col items-center">
                <div className="w-20 h-20 rounded-full bg-primary flex items-center justify-center text-black font-black text-4xl mb-6 shadow-[0_0_30px_rgba(249,192,0,0.5)]">
                  G
                </div>
                <h1 className="text-3xl sm:text-4xl font-black font-heading tracking-tight mb-2">
                  Client <span className="text-primary">Stories</span>
                </h1>
                <div className="w-16 h-1 bg-primary rounded-full my-4" />
                <p className="text-xs text-white/70 max-w-xs leading-relaxed font-medium">
                  Read authentic reviews and feedback from industry leaders who scaled with GMM.
                </p>
              </div>

              <div className="w-full pt-4 border-t border-white/20 flex items-center justify-between text-xs text-white/50">
                <span>Click corner to flip</span>
                <ChevronRight className="w-4 h-4 text-primary animate-bounce" />
              </div>
            </Page>

            {/* INDEX / TABLE OF CONTENTS PAGE */}
            <Page className="bg-zinc-100 p-8 flex flex-col justify-between border-r border-black/10">
              <div>
                <div className="flex items-center justify-between border-b border-black/10 pb-4 mb-6">
                  <h3 className="font-heading font-black text-xl text-black">Table of Contents</h3>
                  <span className="text-xs font-bold text-black/40">Page 1</span>
                </div>
                
                <ol className="space-y-4">
                  {testimonialsData.map((t, idx) => (
                    <li
                      key={t.id}
                      onClick={() => handleFlip(idx + 2)}
                      className="flex items-center justify-between p-2.5 rounded-xl hover:bg-black/5 transition-colors cursor-pointer group"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-primary/20 text-black font-bold flex items-center justify-center text-xs border border-primary/30">
                          {t.name.charAt(0)}
                        </div>
                        <div>
                          <div className="text-xs font-bold text-black group-hover:text-primary transition-colors">{t.name}</div>
                          <div className="text-[10px] text-black/50">{t.company}</div>
                        </div>
                      </div>
                      <span className="text-xs font-mono font-bold text-black/40 group-hover:text-black">
                        Pg {idx + 2}
                      </span>
                    </li>
                  ))}
                </ol>
              </div>

              <div className="text-[11px] text-black/40 text-center font-medium">
                Click any name to jump directly to page 📖
              </div>
            </Page>

            {/* TESTIMONIAL PAGES */}
            {testimonialsData.map((t, idx) => (
              <Page key={t.id} className="bg-white p-8 flex flex-col justify-between border-r border-black/10">
                <div className="flex items-center justify-between border-b border-black/10 pb-4">
                  <span className="text-xs font-bold text-primary uppercase tracking-wider">Testimonial</span>
                  <span className="text-xs font-mono font-bold text-black/40">Page {idx + 2}</span>
                </div>

                <div className="my-auto flex flex-col items-center text-center">
                  {/* Star Rating */}
                  <div className="flex gap-1 mb-6">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-primary text-primary" />
                    ))}
                  </div>

                  {/* Review Quote */}
                  <p className="text-sm sm:text-base font-medium leading-relaxed text-black/90 italic mb-6">
                    "{t.review}"
                  </p>

                  {/* Client Info */}
                  <div className="flex flex-col items-center">
                    <div className="w-14 h-14 rounded-full bg-primary/20 border-2 border-primary flex items-center justify-center font-black text-black text-xl mb-3 shadow-md">
                      {t.name.charAt(0)}
                    </div>
                    <h4 className="font-heading font-bold text-black text-base">{t.name}</h4>
                    <span className="text-xs text-black/60 font-medium">{t.jobtitle}, {t.company}</span>
                  </div>
                </div>

                <div className="pt-4 border-t border-black/10 text-center text-[10px] text-black/40">
                  Great Marketing Matters • Client Reviews
                </div>
              </Page>
            ))}

            {/* BACK COVER */}
            <Page className="bg-black text-white p-8 flex flex-col items-center justify-center text-center">
              <Sparkles className="w-12 h-12 text-primary mb-4 animate-bounce" />
              <h2 className="text-3xl font-black font-heading text-white mb-2">Thank You!</h2>
              <p className="text-sm text-white/70 max-w-xs mb-6 font-medium">
                We appreciate our clients' trust and look forward to scaling your brand next!
              </p>
              <a
                href="#contact"
                className="px-6 py-3 rounded-full bg-primary text-black font-bold text-xs hover:bg-white transition-colors shadow-lg"
              >
                Become Our Next Success Story
              </a>
            </Page>
          </HTMLFlipBook>
        )}
      </div>
    </section>
  );
}
