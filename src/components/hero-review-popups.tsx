"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star } from "lucide-react";

interface ReviewPopup {
  id: number;
  name: string;
  role: string;
  review: string;
  rating: number;
  positionClass: string;
}

const reviewsData: ReviewPopup[] = [
  {
    id: 1,
    name: "Sarah Jenkins",
    role: "CMO, Bloom",
    review: "Organic traffic grew +150%! 🔥",
    rating: 5,
    positionClass: "-top-8 -left-4 sm:-top-10 sm:-left-12",
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "Founder, Apex",
    review: "Best digital agency team! ⚡",
    rating: 5,
    positionClass: "top-0 -right-4 sm:-top-6 sm:-right-14",
  },
  {
    id: 3,
    name: "Elena Rodriguez",
    role: "VP, Global",
    review: "Consistently high quality leads 🚀",
    rating: 5,
    positionClass: "top-1/2 -translate-y-1/2 -right-6 sm:-right-20",
  },
  {
    id: 4,
    name: "John Doe",
    role: "CEO, TechFlow",
    review: "Stunning design & speed ✨",
    rating: 5,
    positionClass: "-bottom-6 -right-2 sm:-bottom-8 sm:-right-12",
  },
  {
    id: 5,
    name: "Alex Rivera",
    role: "Director, Spark",
    review: "10x ROI on ad campaigns 📈",
    rating: 5,
    positionClass: "-bottom-8 -left-4 sm:-bottom-10 sm:-left-14",
  },
  {
    id: 6,
    name: "David Miller",
    role: "Founder, Nexa",
    review: "Incredible UX & execution 💯",
    rating: 5,
    positionClass: "top-1/3 -translate-y-1/2 -left-6 sm:-left-20",
  },
];

export function HeroReviewPopups({ children }: { children: React.ReactNode }) {
  const [activeIndices, setActiveIndices] = useState<number[]>([0, 1]);

  useEffect(() => {
    // Every 3.5s, cycle popups with slow, elegant fade-up animations
    const interval = setInterval(() => {
      setActiveIndices((prev) => {
        const nextIndex1 = (prev[0] + 1) % reviewsData.length;
        const nextIndex2 = (nextIndex1 + 2) % reviewsData.length;
        return [nextIndex1, nextIndex2];
      });
    }, 3500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full max-w-[650px] lg:max-w-[700px] mx-auto flex items-center justify-center">
      {/* Central Illustration */}
      {children}

      {/* Elegant Slow Fade-Up Client Review Popups */}
      <AnimatePresence>
        {activeIndices.map((idx) => {
          const item = reviewsData[idx];

          return (
            <motion.div
              key={`${item.id}-${idx}`}
              initial={{
                opacity: 0,
                y: 30,
                filter: "blur(8px)",
              }}
              animate={{
                opacity: 1,
                y: 0,
                filter: "blur(0px)",
              }}
              exit={{
                opacity: 0,
                y: -20,
                filter: "blur(8px)",
              }}
              transition={{
                duration: 1.0,
                ease: [0.16, 1, 0.3, 1], // Smooth slow cubic ease out
              }}
              className={`absolute z-30 pointer-events-auto ${item.positionClass}`}
            >
              {/* Very Slow Floating Y-Movement */}
              <motion.div
                animate={{ y: [-4, 4, -4] }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: idx * 0.3,
                }}
                className="relative group cursor-pointer"
              >
                {/* Sleek Glass Card */}
                <motion.div
                  whileHover={{ scale: 1.04, y: -4 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  className="flex items-center gap-3 p-3.5 sm:p-4 rounded-2xl bg-[#0A0A0A]/90 border border-primary/40 shadow-[0_15px_40px_rgba(0,0,0,0.8)] backdrop-blur-2xl max-w-[230px] sm:max-w-[280px] group-hover:border-primary transition-colors duration-500 shadow-primary/10"
                >
                  {/* Initial Avatar Badge */}
                  <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-primary/15 border border-primary/60 flex items-center justify-center font-black text-primary text-xs sm:text-sm shrink-0 shadow-[0_0_15px_rgba(238,255,59,0.2)]">
                    {item.name.charAt(0)}
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-1 mb-0.5">
                      <span className="text-xs font-black text-white truncate font-heading tracking-tight">
                        {item.name}
                      </span>

                      {/* Stars */}
                      <div className="flex gap-0.5 shrink-0 items-center">
                        {[...Array(item.rating)].map((_, i) => (
                          <Star
                            key={i}
                            className="w-2.5 h-2.5 fill-primary text-primary"
                          />
                        ))}
                      </div>
                    </div>

                    <p className="text-[10px] sm:text-xs text-white/90 font-medium truncate leading-tight">
                      {item.review}
                    </p>
                    <span className="text-[8px] sm:text-[9px] text-primary/90 font-bold uppercase tracking-widest block mt-0.5 font-heading">
                      {item.role}
                    </span>
                  </div>
                </motion.div>
              </motion.div>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}
