"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";

// Kinetic floating geometric icons (crosshairs, rings, diamonds) for Yellow Sections (Services, FAQ, Clients)
export function KineticYellowBgFX() {
  const shapes = useMemo(() => {
    return Array.from({ length: 12 }).map((_, i) => ({
      id: i,
      left: `${(i * 23) % 90 + 5}%`,
      top: `${(i * 31) % 85 + 10}%`,
      size: (i % 3) * 12 + 16,
      duration: (i % 4) * 4 + 14,
      delay: (i % 3) * 2,
      type: i % 3 === 0 ? "+" : i % 3 === 1 ? "◇" : "○",
    }));
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden select-none z-0">
      {shapes.map((s) => (
        <motion.div
          key={s.id}
          initial={{ opacity: 0.15, y: 0, rotate: 0 }}
          animate={{
            opacity: [0.12, 0.28, 0.12],
            y: [0, -40, 30, 0],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: s.duration,
            delay: s.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          style={{
            position: "absolute",
            left: s.left,
            top: s.top,
          }}
          className="font-mono font-black text-black text-lg sm:text-2xl opacity-20"
        >
          {s.type}
        </motion.div>
      ))}
    </div>
  );
}

// Kinetic floating glowing particle constellation for Dark Sections (About, Testimonials, Footer)
export function KineticDarkBgFX() {
  const particles = useMemo(() => {
    return Array.from({ length: 16 }).map((_, i) => ({
      id: i,
      left: `${(i * 19) % 92 + 4}%`,
      top: `${(i * 29) % 88 + 6}%`,
      size: (i % 3) * 3 + 4,
      duration: (i % 5) * 3 + 12,
      delay: (i % 4) * 1.5,
    }));
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden select-none z-0">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          initial={{ opacity: 0.1, y: 0 }}
          animate={{
            opacity: [0.1, 0.35, 0.1],
            y: [0, -50, 25, 0],
            x: [0, 25, -20, 0],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          style={{
            position: "absolute",
            left: p.left,
            top: p.top,
            width: p.size,
            height: p.size,
            backgroundColor: "#EEFF3B",
            borderRadius: "50%",
            boxShadow: "0 0 14px rgba(238, 255, 59, 0.7)",
          }}
        />
      ))}
    </div>
  );
}
