"use client";

import React, { useRef, useState, useEffect } from "react";
import HTMLFlipBook from "react-pageflip";
import { motion } from "framer-motion";
import { Star, BookOpen, ChevronRight, Sparkles } from "lucide-react";
import { ScrollReveal } from "@/components/scroll-reveal";
import { KineticDarkBgFX } from "@/components/section-background-fx";

interface Testimonial {
  id: number;
  name: string;
  jobtitle: string;
  company: string;
  review: string;
  rating: number;
}

const testimonialsData: Testimonial[] = [
  {
    id: 1,
    name: "John Doe",
    jobtitle: "CEO",
    company: "TechFlow Inc.",
    review: "GMM transformed our digital presence completely. Our organic traffic increased by 150% within just three months of their SEO overhaul.",
    rating: 5,
  },
  {
    id: 2,
    name: "Sarah Jenkins",
    jobtitle: "Marketing Director",
    company: "Bloom Cosmetics",
    review: "The new website design is absolutely stunning. Their team perfectly captured our brand's luxury aesthetic while ensuring lightning-fast load times.",
    rating: 5,
  },
  {
    id: 3,
    name: "Michael Chen",
    jobtitle: "Founder",
    company: "Apex Startups",
    review: "Incredible attention to detail in their app development process. They didn't just build what we asked for; they built what we actually needed.",
    rating: 5,
  },
  {
    id: 4,
    name: "Elena Rodriguez",
    jobtitle: "VP of Business",
    company: "Global Logistics",
    review: "Their B2B marketing strategy was a game-changer. We're now consistently generating high-quality leads that convert into long-term clients.",
    rating: 5,
  },
];

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
  const [bookDimensions, setBookDimensions] = useState({ width: 340, height: 460 });
  const bookRef = useRef<any>(null);

  useEffect(() => {
    setMounted(true);
    const handleResize = () => {
      const w = typeof window !== "undefined" ? window.innerWidth : 1000;
      const containerWidth = Math.min(w - 20, 1000);
      let pageW = Math.floor((containerWidth - 12) / 2);
      pageW = Math.max(140, Math.min(360, pageW));
      let pageH = Math.floor(pageW * 1.35);
      if (w < 480) {
        pageH = Math.floor(pageW * 1.4);
      }
      setBookDimensions({ width: pageW, height: pageH });
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const flipDirectionRef = useRef<"forward" | "backward">("forward");

  // AUTO ROTATE EVERY 3 SECONDS & REVERSE DIRECTION AT BOUNDARIES
  useEffect(() => {
    if (!mounted) return;
    const interval = setInterval(() => {
      if (bookRef.current?.pageFlip()) {
        const pageFlipObj = bookRef.current.pageFlip();
        const currentPage = pageFlipObj.getCurrentPageIndex();
        const totalPages = pageFlipObj.getPageCount();

        if (flipDirectionRef.current === "forward") {
          if (currentPage + 2 >= totalPages) {
            flipDirectionRef.current = "backward";
            pageFlipObj.flipPrev();
          } else {
            pageFlipObj.flipNext();
          }
        } else {
          if (currentPage <= 0) {
            flipDirectionRef.current = "forward";
            pageFlipObj.flipNext();
          } else {
            pageFlipObj.flipPrev();
          }
        }
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [mounted]);

  const handleFlip = (pageNum: number) => {
    if (bookRef.current?.pageFlip()) {
      bookRef.current.pageFlip().flip(pageNum);
    }
  };

  return (
    <section id="reviews" className="relative w-full min-h-screen py-16 sm:py-24 md:py-32 bg-[#0A0A0A] text-white flex flex-col items-center justify-center overflow-hidden">
      <KineticDarkBgFX />
      {/* Background Glowing Breathing Orb */}
      <motion.div
        animate={{ scale: [1, 1.15, 1], opacity: [0.15, 0.25, 0.15] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] md:w-[40vw] h-[80vw] md:h-[40vw] bg-primary/20 rounded-full blur-[140px] pointer-events-none"
      />

      {/* Header */}
      <div className="container relative z-10 mx-auto px-4 sm:px-6 mb-6 sm:mb-12 text-center flex flex-col items-center">
        <ScrollReveal>
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-white font-bold text-xs uppercase tracking-widest mb-4">
            <BookOpen className="w-4 h-4 text-primary" /> Interactive Client Storybook
          </div>

          <h2 className="font-heading text-3xl sm:text-4xl md:text-6xl font-black mb-4 tracking-tight">
            What Our <span className="text-primary underline decoration-primary/30">Clients Say</span>
          </h2>

          <p className="text-sm sm:text-base md:text-lg text-[#BDBDBD] max-w-xl mx-auto px-2 leading-relaxed">
            Flip through the pages of our client storybook to see how GMM drives real growth.
          </p>
        </ScrollReveal>
      </div>

      {/* FLOATING 3D FLIPBOOK CONTAINER WITH SLIGHT MOMENTUM FLOAT */}
      <motion.div
        animate={{ y: [-6, 6, -6] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        className="w-full relative z-10 flex justify-center items-center py-2 sm:py-6 px-1 sm:px-4 overflow-hidden"
      >
        {mounted && (
          <HTMLFlipBook
            key={`spread-${bookDimensions.width}-${bookDimensions.height}`}
            ref={bookRef}
            width={bookDimensions.width}
            height={bookDimensions.height}
            showCover={true}
            usePortrait={false}
            startPage={0}
            size="fixed"
            minWidth={130}
            maxWidth={420}
            minHeight={240}
            maxHeight={550}
            drawShadow={true}
            flippingTime={800}
            startZIndex={0}
            autoSize={false}
            maxShadowOpacity={0.5}
            mobileScrollSupport={true}
            clickEventForward={true}
            useMouseEvents={true}
            swipeDistance={20}
            showPageCorners={true}
            disableFlipByClick={false}
            className="shadow-2xl rounded-2xl max-w-full"
            style={{ margin: "0 auto" }}
          >
            {/* COVER */}
            <Page className="bg-[#0A0A0A] text-white p-3 sm:p-6 md:p-8 flex flex-col justify-between items-center text-center border-r border-[#262626]">
              <div className="w-full flex justify-between items-center pt-1 border-b border-white/20 pb-2 sm:pb-4">
                <span className="text-[8px] sm:text-[10px] md:text-xs font-bold uppercase tracking-widest text-primary">GMM Edition</span>
                <Sparkles className="w-3 h-3 sm:w-4 sm:h-5 text-primary animate-pulse" />
              </div>

              <div className="my-auto flex flex-col items-center">
                <div className="w-10 h-10 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-full bg-primary flex items-center justify-center text-black font-black text-xl sm:text-3xl md:text-4xl mb-2 sm:mb-4 md:mb-6 shadow-[0_0_30px_rgba(249,192,0,0.5)]">
                  G
                </div>
                <h1 className="text-lg sm:text-2xl md:text-4xl font-black font-heading tracking-tight mb-1 sm:mb-2">
                  Client <span className="text-primary">Stories</span>
                </h1>
                <div className="w-8 sm:w-12 md:w-16 h-0.5 sm:h-1 bg-primary rounded-full my-2 sm:my-3" />
                <p className="text-[9px] sm:text-xs text-white/70 max-w-xs leading-relaxed font-medium">
                  Read authentic reviews and feedback from industry leaders who scaled with GMM.
                </p>
              </div>

              <div className="w-full pt-2 sm:pt-4 border-t border-white/20 flex items-center justify-between text-[9px] sm:text-xs text-white/50">
                <span>Auto-flips every 3s 📖</span>
                <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4 text-primary animate-bounce" />
              </div>
            </Page>

            {/* INDEX PAGE */}
            <Page className="bg-[#151515] p-3 sm:p-6 md:p-8 flex flex-col justify-between border-r border-[#262626]">
              <div>
                <div className="flex items-center justify-between border-b border-[#262626] pb-2 mb-2 sm:mb-4">
                  <h3 className="font-heading font-black text-xs sm:text-lg md:text-xl text-white">Table of Contents</h3>
                  <span className="text-[8px] sm:text-[10px] md:text-xs font-bold text-white/40">Page 1</span>
                </div>

                <ol className="space-y-1.5 sm:space-y-3">
                  {testimonialsData.map((t, idx) => (
                    <li
                      key={t.id}
                      onClick={() => handleFlip(idx + 2)}
                      className="flex items-center justify-between p-1 sm:p-2 rounded-lg sm:rounded-xl hover:bg-white/5 transition-colors cursor-pointer group"
                    >
                      <div className="flex items-center gap-1.5 sm:gap-2.5">
                        <div className="w-5 h-5 sm:w-7 sm:h-7 rounded-full bg-primary/20 text-[#0A0A0A] font-bold flex items-center justify-center text-[9px] sm:text-xs border border-primary/30 shrink-0">
                          {t.name.charAt(0)}
                        </div>
                        <div className="min-w-0">
                          <div className="text-[10px] sm:text-xs font-bold text-white group-hover:text-primary transition-colors truncate">{t.name}</div>
                          <div className="text-[8px] sm:text-[10px] text-white/50 truncate">{t.company}</div>
                        </div>
                      </div>
                      <span className="text-[8px] sm:text-[10px] font-mono font-bold text-white/40 group-hover:text-white shrink-0">
                        Pg {idx + 2}
                      </span>
                    </li>
                  ))}
                </ol>
              </div>

              <div className="text-[8px] sm:text-[10px] text-white/40 text-center font-medium pt-1">
                Click any name to jump 📖
              </div>
            </Page>

            {/* TESTIMONIAL PAGES */}
            {testimonialsData.map((t, idx) => (
              <Page key={t.id} className="bg-[#151515] p-3 sm:p-6 md:p-8 flex flex-col justify-between border-r border-[#262626]">
                <div className="flex items-center justify-between border-b border-[#262626] pb-2">
                  <span className="text-[8px] sm:text-xs font-bold text-primary uppercase tracking-wider">Testimonial</span>
                  <span className="text-[8px] sm:text-xs font-mono font-bold text-white/40">Page {idx + 2}</span>
                </div>

                <div className="my-auto flex flex-col items-center text-center px-0.5">
                  <div className="flex gap-0.5 sm:gap-1 mb-2 sm:mb-4">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 fill-primary text-primary" />
                    ))}
                  </div>

                  <p className="text-[10px] sm:text-xs md:text-base font-medium leading-tight sm:leading-relaxed text-white/90 italic mb-2 sm:mb-4">
                    "{t.review}"
                  </p>

                  <div className="flex flex-col items-center">
                    <div className="w-8 h-8 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-full bg-primary/20 border-2 border-primary flex items-center justify-center font-black text-[#0A0A0A] text-sm sm:text-lg md:text-xl mb-1 sm:mb-2 shadow-md">
                      {t.name.charAt(0)}
                    </div>
                    <h4 className="font-heading font-bold text-white text-xs sm:text-sm md:text-base">{t.name}</h4>
                    <span className="text-[9px] sm:text-xs text-white/60 font-medium">{t.jobtitle}, {t.company}</span>
                  </div>
                </div>

                <div className="pt-2 sm:pt-3 border-t border-[#262626] text-center text-[8px] sm:text-[10px] text-white/40">
                  GMM • Reviews
                </div>
              </Page>
            ))}

            {/* BACK COVER */}
            <Page className="bg-black text-white p-3 sm:p-6 md:p-8 flex flex-col items-center justify-center text-center">
              <Sparkles className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-primary mb-2 sm:mb-3 animate-bounce" />
              <h2 className="text-lg sm:text-2xl md:text-3xl font-black font-heading text-white mb-1 sm:mb-2">Thank You!</h2>
              <p className="text-[10px] sm:text-xs md:text-sm text-white/70 max-w-xs mb-3 sm:mb-5 font-medium">
                We appreciate our clients' trust!
              </p>
              <a
                href="#contact"
                className="px-3 sm:px-5 py-1.5 sm:py-2.5 rounded-full bg-primary text-[#0A0A0A] font-bold text-[9px] sm:text-xs hover:bg-[#E6F52F] transition-colors shadow-lg"
              >
                Become Next Story
              </a>
            </Page>
          </HTMLFlipBook>
        )}
      </motion.div>
    </section>
  );
}
