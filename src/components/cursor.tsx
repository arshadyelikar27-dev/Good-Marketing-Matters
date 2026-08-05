"use client";

import { useEffect, useState } from "react";
import { motion, useSpring, AnimatePresence } from "framer-motion";
import Image from "next/image";

export function CustomCursor() {
  const [mounted, setMounted] = useState(false);
  const [cursorState, setCursorState] = useState<"default" | "hover" | "click" | "hidden">("default");
  const [hoverText, setHoverText] = useState("");

  // Smooth trailing physics for rocket cursor
  const springConfig = { stiffness: 450, damping: 28, mass: 0.5 };
  const springX = useSpring(-100, springConfig);
  const springY = useSpring(-100, springConfig);

  useEffect(() => {
    setMounted(true);

    const updateMousePosition = (e: MouseEvent) => {
      springX.set(e.clientX);
      springY.set(e.clientY);
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
        const customText =
          target.getAttribute("data-cursor-text") ||
          target.closest("[data-cursor-text]")?.getAttribute("data-cursor-text");
        setHoverText(customText || "");
      } else if (target.closest(".cursor-hide")) {
        setCursorState("hidden");
      } else {
        setCursorState("default");
        setHoverText("");
      }
    };

    window.addEventListener("mousemove", updateMousePosition, { passive: true });
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseover", handleMouseOver);
    document.body.addEventListener("mouseleave", () => setCursorState("hidden"));
    document.body.addEventListener("mouseenter", () => setCursorState("default"));

    return () => {
      window.removeEventListener("mousemove", updateMousePosition);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, [springX, springY]);

  if (!mounted) return null;

  return (
    <div className="pointer-events-none hidden md:block">
      {/* ROCKET CUSTOM CURSOR */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[999999] flex items-center gap-2 origin-center"
        style={{
          x: springX,
          y: springY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          scale: cursorState === "hidden" ? 0 : cursorState === "click" ? 0.85 : cursorState === "hover" ? 1.25 : 1,
          rotate: cursorState === "hover" ? -12 : 0,
        }}
        transition={{ type: "spring", stiffness: 380, damping: 24 }}
      >
        {/* Rocket Image */}
        <div className="relative w-10 h-10 sm:w-12 sm:h-12 drop-shadow-[0_0_15px_rgba(104,17,201,0.6)]">
          <Image
            src="/Rocket Cursur.png"
            alt="Rocket Custom Cursor"
            fill
            sizes="48px"
            className="object-contain"
            priority
          />
        </div>

        {/* Hover Label Badge */}
        <AnimatePresence>
          {cursorState === "hover" && hoverText && (
            <motion.span
              initial={{ opacity: 0, scale: 0.8, x: -5 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              exit={{ opacity: 0, scale: 0.8, x: -5 }}
              className="px-2.5 py-1 rounded-full bg-[#6811C9] text-white font-black text-[10px] tracking-widest uppercase shadow-lg border border-white/20 select-none whitespace-nowrap"
            >
              {hoverText}
            </motion.span>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
