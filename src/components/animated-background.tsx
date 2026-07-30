"use client";

import { motion } from "framer-motion";

export function AnimatedBackground() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none">

      {/* Aurora base — slow rotating conic gradient */}
      <motion.div
        animate={{ rotate: [0, 360] }}
        transition={{ duration: 90, repeat: Infinity, ease: "linear" }}
        style={{
          willChange: "transform",
          transform: "translateZ(0)",
          background:
            "conic-gradient(from 0deg at 50% 60%, #3D00B800 0deg, #5B00E820 60deg, #7C3AED30 120deg, #0D002000 180deg, #D4E00010 240deg, #4A00C820 300deg, #3D00B800 360deg)",
        }}
        className="absolute -inset-[25%] rounded-full blur-[80px] opacity-70 pointer-events-none"
      />

      {/* Blob 1 — deep violet top-left */}
      <motion.div
        animate={{
          x: [0, 70, -40, 0],
          y: [0, -90, 50, 0],
          scale: [1, 1.18, 0.92, 1],
        }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
        style={{ willChange: "transform", transform: "translateZ(0)" }}
        className="absolute -top-[15%] -left-[10%] w-[55vw] h-[55vw] max-w-[760px] max-h-[760px] rounded-full blur-[110px] pointer-events-none"
      >
        <div
          className="absolute inset-0 rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(92,0,232,0.30) 0%, rgba(61,0,184,0.14) 55%, transparent 100%)",
          }}
        />
      </motion.div>

      {/* Blob 2 — electric yellow-green mid-right */}
      <motion.div
        animate={{
          x: [0, -80, 50, 0],
          y: [0, 70, -60, 0],
          scale: [1, 0.88, 1.12, 1],
        }}
        transition={{ duration: 28, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        style={{ willChange: "transform", transform: "translateZ(0)" }}
        className="absolute top-[35%] -right-[15%] w-[50vw] h-[50vw] max-w-[700px] max-h-[700px] rounded-full blur-[120px] pointer-events-none"
      >
        <div
          className="absolute inset-0 rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(212,224,0,0.18) 0%, rgba(180,190,0,0.08) 55%, transparent 100%)",
          }}
        />
      </motion.div>

      {/* Blob 3 — lavender bottom-center */}
      <motion.div
        animate={{
          x: [0, 55, -55, 0],
          y: [0, -50, 50, 0],
          scale: [1, 1.1, 0.93, 1],
        }}
        transition={{ duration: 25, repeat: Infinity, ease: "easeInOut", delay: 4 }}
        style={{ willChange: "transform", transform: "translateZ(0)" }}
        className="absolute -bottom-[20%] left-[15%] w-[50vw] h-[50vw] max-w-[700px] max-h-[700px] rounded-full blur-[100px] pointer-events-none"
      >
        <div
          className="absolute inset-0 rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(155,111,212,0.22) 0%, rgba(120,70,180,0.10) 55%, transparent 100%)",
          }}
        />
      </motion.div>

      {/* Blob 4 — violet center pulse */}
      <motion.div
        animate={{
          scale: [1, 1.25, 0.85, 1],
          opacity: [0.3, 0.55, 0.25, 0.3],
        }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
        style={{ willChange: "transform, opacity", transform: "translateZ(0)" }}
        className="absolute top-[20%] left-[30%] w-[40vw] h-[40vw] max-w-[560px] max-h-[560px] rounded-full blur-[130px] pointer-events-none"
      >
        <div
          className="absolute inset-0 rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(74,0,200,0.28) 0%, rgba(45,0,140,0.12) 60%, transparent 100%)",
          }}
        />
      </motion.div>

      {/* Blob 5 — yellow accent top-right glow */}
      <motion.div
        animate={{
          x: [0, -40, 30, 0],
          y: [0, 40, -30, 0],
          scale: [1, 1.15, 0.9, 1],
        }}
        transition={{ duration: 32, repeat: Infinity, ease: "easeInOut", delay: 6 }}
        style={{ willChange: "transform", transform: "translateZ(0)" }}
        className="absolute -top-[10%] right-[10%] w-[35vw] h-[35vw] max-w-[480px] max-h-[480px] rounded-full blur-[100px] pointer-events-none"
      >
        <div
          className="absolute inset-0 rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(212,224,0,0.14) 0%, rgba(150,160,0,0.06) 55%, transparent 100%)",
          }}
        />
      </motion.div>
    </div>
  );
}
