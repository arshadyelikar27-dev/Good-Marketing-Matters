"use client";

import { motion } from "framer-motion";

export function AnimatedBackground() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none">
      {/* Optimized Static SVG Grain Overlay */}
      <svg className="absolute inset-0 w-full h-full opacity-[0.035] mix-blend-overlay">
        <filter id="noiseFilter">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.8"
            numOctaves="2"
            stitchTiles="stitch"
          />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#noiseFilter)" />
      </svg>

      {/* Blurred Gradient Blob 1 - GPU Accelerated */}
      <motion.div
        animate={{
          x: [0, 60, -30, 0],
          y: [0, -80, 40, 0],
          scale: [1, 1.15, 0.95, 1],
        }}
        transition={{
          duration: 22,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{ willChange: "transform", transform: "translateZ(0)" }}
        className="absolute -top-[15%] -left-[10%] w-[50vw] h-[50vw] max-w-[700px] max-h-[700px] bg-primary/10 rounded-full blur-[100px] pointer-events-none"
      />

      {/* Blurred Gradient Blob 2 - GPU Accelerated */}
      <motion.div
        animate={{
          x: [0, -70, 40, 0],
          y: [0, 60, -50, 0],
          scale: [1, 0.9, 1.1, 1],
        }}
        transition={{
          duration: 26,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
        style={{ willChange: "transform", transform: "translateZ(0)" }}
        className="absolute top-[45%] -right-[15%] w-[55vw] h-[55vw] max-w-[800px] max-h-[800px] bg-primary/8 rounded-full blur-[110px] pointer-events-none"
      />

      {/* Blurred Gradient Blob 3 - GPU Accelerated */}
      <motion.div
        animate={{
          x: [0, 50, -50, 0],
          y: [0, -40, 40, 0],
          scale: [1, 1.08, 0.95, 1],
        }}
        transition={{
          duration: 24,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 4,
        }}
        style={{ willChange: "transform", transform: "translateZ(0)" }}
        className="absolute -bottom-[15%] left-[20%] w-[45vw] h-[45vw] max-w-[650px] max-h-[650px] bg-primary/10 rounded-full blur-[100px] pointer-events-none"
      />
    </div>
  );
}
