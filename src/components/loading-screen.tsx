"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function LoadingScreen() {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Check session storage to show only on first visit
    const hasVisited = sessionStorage.getItem("gmm_has_visited");
    if (hasVisited) {
      setIsLoading(false);
      return;
    }

    sessionStorage.setItem("gmm_has_visited", "true");

    const duration = 1800; // ms
    const intervalTime = 30;
    const steps = duration / intervalTime;
    let stepCount = 0;

    const timer = setInterval(() => {
      stepCount++;
      const currentProgress = Math.min(100, Math.round((stepCount / steps) * 100));
      setProgress(currentProgress);

      if (stepCount >= steps) {
        clearInterval(timer);
        setTimeout(() => {
          setIsLoading(false);
        }, 300);
      }
    }, intervalTime);

    return () => clearInterval(timer);
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.02, filter: "blur(8px)" }}
          transition={{ duration: 0.7, ease: [0.65, 0, 0.35, 1] }}
          className="fixed inset-0 z-[999999] bg-[#0A0A0A] flex flex-col items-center justify-center select-none overflow-hidden"
        >
          {/* Central Radial Glow */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: [0.2, 0.5, 0.3], scale: [0.8, 1.2, 1] }}
            transition={{ duration: 1.8, ease: "easeInOut" }}
            className="absolute w-[400px] h-[400px] bg-primary/25 rounded-full blur-[100px] pointer-events-none"
          />

          <div className="relative z-10 flex flex-col items-center gap-6">
            {/* Self-drawing Animated Logo Symbol */}
            <div className="relative flex items-center justify-center">
              <motion.svg
                width="80"
                height="80"
                viewBox="0 0 100 100"
                className="w-20 h-20 sm:w-24 sm:h-24"
              >
                {/* Circle Outer Border */}
                <motion.circle
                  cx="50"
                  cy="50"
                  r="45"
                  stroke="var(--primary)"
                  strokeWidth="3"
                  fill="none"
                  initial={{ pathLength: 0, rotate: -90 }}
                  animate={{ pathLength: 1, rotate: 0 }}
                  transition={{ duration: 1.4, ease: "easeInOut" }}
                />
                {/* Text G */}
                <motion.text
                  x="50"
                  y="62"
                  textAnchor="middle"
                  fill="var(--primary)"
                  fontSize="48"
                  fontWeight="900"
                  fontFamily="var(--font-outfit)"
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.4, duration: 0.6 }}
                >
                  G
                </motion.text>
              </motion.svg>
            </div>

            {/* Brand Title */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="text-center"
            >
              <h2 className="font-heading font-black text-xl sm:text-2xl tracking-widest uppercase text-white">
                GMM<span className="text-primary">.</span>
              </h2>
              <p className="text-[10px] text-white/50 tracking-widest uppercase mt-1">
                Great Marketing Matters
              </p>
            </motion.div>

            {/* Progress Bar Container */}
            <div className="w-48 sm:w-64 h-[3px] bg-white/10 rounded-full overflow-hidden relative mt-4">
              <motion.div
                className="h-full bg-primary shadow-[0_0_12px_rgba(238,255,59,0.9)]"
                style={{ width: `${progress}%` }}
                transition={{ ease: "easeOut" }}
              />
            </div>

            {/* Progress Counter */}
            <span className="font-mono text-xs font-bold text-primary/80 tracking-wider">
              {progress}%
            </span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
