"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

export function PageTransition() {
  const pathname = usePathname();
  const [key, setKey] = useState(pathname);
  const [transitioning, setTransitioning] = useState(false);

  useEffect(() => {
    if (pathname !== key) {
      setTransitioning(true);
      const t = setTimeout(() => {
        setKey(pathname);
        setTransitioning(false);
      }, 600);
      return () => clearTimeout(t);
    }
  }, [pathname, key]);

  return (
    <AnimatePresence mode="wait">
      {transitioning && (
        <motion.div
          key="page-transition-curtain"
          className="fixed inset-0 z-[99999] pointer-events-none flex"
          initial="initial"
          animate="animate"
          exit="exit"
        >
          {/* Left curtain panel */}
          <motion.div
            className="w-1/2 h-full bg-primary origin-left"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            exit={{ scaleX: 0 }}
            transition={{ duration: 0.35, ease: [0.76, 0, 0.24, 1] }}
            style={{ transformOrigin: "left" }}
          />
          {/* Right curtain panel */}
          <motion.div
            className="w-1/2 h-full bg-primary origin-right"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            exit={{ scaleX: 0 }}
            transition={{ duration: 0.35, ease: [0.76, 0, 0.24, 1] }}
            style={{ transformOrigin: "right" }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
