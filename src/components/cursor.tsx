"use client";

import { useEffect, useState } from "react";
import { motion, useSpring, AnimatePresence } from "framer-motion";

export function CustomCursor() {
  const [mounted, setMounted] = useState(false);
  const [cursorState, setCursorState] = useState<"default" | "hover" | "click" | "hidden">("default");
  const [hoverText, setHoverText] = useState("");

  // Smooth trailing physics
  const springConfig = { stiffness: 450, damping: 28, mass: 0.5 };
  const springX = useSpring(-100, springConfig);
  const springY = useSpring(-100, springConfig);

  const outerSpringConfig = { stiffness: 180, damping: 22, mass: 0.7 };
  const outerSpringX = useSpring(-100, outerSpringConfig);
  const outerSpringY = useSpring(-100, outerSpringConfig);

  useEffect(() => {
    setMounted(true);

    const updateMousePosition = (e: MouseEvent) => {
      springX.set(e.clientX);
      springY.set(e.clientY);
      outerSpringX.set(e.clientX);
      outerSpringY.set(e.clientY);
    };

    const handleMouseDown = () => {
      setCursorState("click");
      setTimeout(() => setCursorState("default"), 150);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target) return;

      const interactive =
        target.tagName === "BUTTON" ||
        target.tagName === "A" ||
        target.closest("button") ||
        target.closest("a") ||
        target.classList.contains("hoverable") ||
        target.closest(".hoverable") ||
        target.classList.contains("cursor-pointer") ||
        target.closest(".cursor-pointer");

      if (interactive) {
        setCursorState("hover");
        const customText = target.getAttribute("data-cursor-text") || target.closest("[data-cursor-text]")?.getAttribute("data-cursor-text");
        setHoverText(customText || "View");
      } else if (target.closest(".cursor-hide")) {
        setCursorState("hidden");
      } else {
        setCursorState("default");
        setHoverText("");
      }
    };

    window.addEventListener("mousemove", updateMousePosition);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseover", handleMouseOver);
    document.body.addEventListener("mouseleave", () => setCursorState("hidden"));
    document.body.addEventListener("mouseenter", () => setCursorState("default"));

    return () => {
      window.removeEventListener("mousemove", updateMousePosition);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, [springX, springY, outerSpringX, outerSpringY]);

  if (!mounted) return null;

  return (
    <div className="pointer-events-none hidden md:block">
      {/* INNER DOT */}
      <motion.div
        className="fixed top-0 left-0 w-2.5 h-2.5 bg-primary rounded-full pointer-events-none z-[999999] mix-blend-difference origin-center shadow-[0_0_15px_rgba(104, 17, 201,0.9)]"
        style={{
          x: springX,
          y: springY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          scale: cursorState === "hover" ? 0 : cursorState === "click" ? 0.5 : cursorState === "hidden" ? 0 : 1,
        }}
        transition={{ type: "spring", stiffness: 500, damping: 28 }}
      />

      {/* OUTER NEON GLOW CIRCLE / HOVER EXPANDER */}
      <motion.div
        className="fixed top-0 left-0 rounded-full pointer-events-none z-[999998] flex items-center justify-center origin-center"
        style={{
          x: outerSpringX,
          y: outerSpringY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          width: cursorState === "hover" ? 72 : cursorState === "click" ? 24 : 40,
          height: cursorState === "hover" ? 72 : cursorState === "click" ? 24 : 40,
          backgroundColor: cursorState === "hover" ? "rgba(224, 243, 71, 0.95)" : "rgba(104, 17, 201, 0)",
          borderWidth: cursorState === "hover" ? "0px" : "1.5px",
          borderColor: cursorState === "hover" ? "rgba(224, 243, 71, 0.8)" : "rgba(104, 17, 201, 0.8)",
          boxShadow: cursorState === "hover"
            ? "0 0 40px rgba(224, 243, 71, 0.6)"
            : "0 0 20px rgba(104, 17, 201, 0.3)",
          scale: cursorState === "hidden" ? 0 : 1,
        }}
        transition={{ type: "spring", stiffness: 350, damping: 24 }}
      >
        <AnimatePresence>
          {cursorState === "hover" && (
            <motion.span
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              className="text-white font-black text-[9px] tracking-widest uppercase font-heading select-none"
            >
              {hoverText}
            </motion.span>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
