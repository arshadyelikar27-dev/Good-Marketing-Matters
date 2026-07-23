"use client";

import { motion } from "framer-motion";

export function AnimatedBackground() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none">
      {/* Animated Grain Overlay (SVG noise filter) */}
      <svg className="absolute inset-0 w-full h-full opacity-[0.04] mix-blend-overlay">
        <filter id="noiseFilter">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.8"
            numOctaves="3"
            stitchTiles="stitch"
          >
            <animate
              attributeName="baseFrequency"
              values="0.7;0.85;0.7"
              dur="10s"
              repeatCount="indefinite"
            />
          </feTurbulence>
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#noiseFilter)" />
      </svg>

      {/* Blurred Gradient Blob 1 - Primary Yellow Accent */}
      <motion.div
        animate={{
          x: [0, 80, -40, 0],
          y: [0, -100, 60, 0],
          scale: [1, 1.2, 0.9, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute -top-[20%] -left-[10%] w-[55vw] h-[55vw] max-w-[800px] max-h-[800px] bg-primary/10 rounded-full blur-[160px] pointer-events-none"
      />

      {/* Blurred Gradient Blob 2 - Secondary Dark Glow */}
      <motion.div
        animate={{
          x: [0, -90, 50, 0],
          y: [0, 80, -70, 0],
          scale: [1, 0.85, 1.15, 1],
        }}
        transition={{
          duration: 24,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
        className="absolute top-[45%] -right-[15%] w-[60vw] h-[60vw] max-w-[900px] max-h-[900px] bg-primary/8 rounded-full blur-[180px] pointer-events-none"
      />

      {/* Blurred Gradient Blob 3 - Bottom Left Glow */}
      <motion.div
        animate={{
          x: [0, 60, -60, 0],
          y: [0, -50, 50, 0],
          scale: [1, 1.1, 0.95, 1],
        }}
        transition={{
          duration: 22,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 4,
        }}
        className="absolute -bottom-[20%] left-[20%] w-[50vw] h-[50vw] max-w-[750px] max-h-[750px] bg-primary/10 rounded-full blur-[170px] pointer-events-none"
      />
    </div>
  );
}
