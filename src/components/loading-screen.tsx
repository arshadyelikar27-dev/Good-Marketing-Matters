"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
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
            {/* Animated PNG Logo Symbol */}
            <div className="relative flex flex-col items-center justify-center gap-4">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="relative w-[170px] h-[170px] drop-shadow-[0_0_25px_rgba(238,255,59,0.2)]"
              >
                <Image 
                  src="/gmm-logo-white-text-cropped.png" 
                  alt="GMM Logo" 
                  fill
                  className="object-contain"
                  priority
                />
              </motion.div>
            </div>

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
