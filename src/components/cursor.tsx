"use client";

import { useEffect, useState } from "react";
import { motion, useSpring } from "framer-motion";

export function CustomCursor() {
  // Wait until mounted to avoid hydration errors in Next.js
  const [mounted, setMounted] = useState(false);
  const [cursorState, setCursorState] = useState<"default" | "hover" | "hidden">("default");
  
  // Spring physics for smooth trailing movement
  const springX = useSpring(0, { stiffness: 500, damping: 28, mass: 0.5 });
  const springY = useSpring(0, { stiffness: 500, damping: 28, mass: 0.5 });
  
  // Outer circle has slightly slower physics for the "trailing" effect
  const outerSpringX = useSpring(0, { stiffness: 150, damping: 20, mass: 0.8 });
  const outerSpringY = useSpring(0, { stiffness: 150, damping: 20, mass: 0.8 });

  useEffect(() => {
    setMounted(true);
    
    // Update spring targets on mouse move
    const updateMousePosition = (e: MouseEvent) => {
      springX.set(e.clientX);
      springY.set(e.clientY);
      outerSpringX.set(e.clientX);
      outerSpringY.set(e.clientY);
    };

    // Detect if we are hovering over clickable elements
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === "BUTTON" ||
        target.tagName === "A" ||
        target.closest("button") ||
        target.closest("a") ||
        target.classList.contains("hoverable") ||
        target.closest(".hoverable") ||
        target.classList.contains("cursor-pointer") ||
        target.closest(".cursor-pointer")
      ) {
        setCursorState("hover");
      } else if (target.closest(".cursor-hide")) {
        setCursorState("hidden");
      } else {
        setCursorState("default");
      }
    };

    window.addEventListener("mousemove", updateMousePosition);
    window.addEventListener("mouseover", handleMouseOver);
    document.body.addEventListener("mouseleave", () => setCursorState("hidden"));
    document.body.addEventListener("mouseenter", () => setCursorState("default"));

    return () => {
      window.removeEventListener("mousemove", updateMousePosition);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, [springX, springY, outerSpringX, outerSpringY]);

  if (!mounted) return null;

  return (
    <div className="pointer-events-none hidden md:block">
      {/* INNER DOT */}
      <motion.div
        className="fixed top-0 left-0 w-3 h-3 bg-primary rounded-full pointer-events-none z-[99999] mix-blend-difference origin-center"
        style={{
          x: springX,
          y: springY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          scale: cursorState === "hover" ? 0 : cursorState === "hidden" ? 0 : 1,
        }}
        transition={{ type: "tween", ease: "backOut", duration: 0.2 }}
      />
      
      {/* OUTER CIRCLE / HOVER STATE */}
      <motion.div
        className="fixed top-0 left-0 w-10 h-10 border-[1.5px] border-primary rounded-full pointer-events-none z-[99999] mix-blend-difference flex justify-center items-center origin-center"
        style={{
          x: outerSpringX,
          y: outerSpringY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          scale: cursorState === "hover" ? 2 : cursorState === "hidden" ? 0 : 1,
          backgroundColor: cursorState === "hover" ? "var(--primary)" : "rgba(238, 255, 59, 0)",
          borderWidth: cursorState === "hover" ? "0px" : "1.5px"
        }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        {/* 'Click' text that appears only on hover */}
        <motion.span 
          initial={{ opacity: 0 }}
          animate={{ opacity: cursorState === "hover" ? 1 : 0 }}
          className="text-[#000000] text-[5px] font-black tracking-widest uppercase absolute"
        >
          Click
        </motion.span>
      </motion.div>
    </div>
  );
}
