"use client";

import { useEffect, useRef, useState } from "react";

const CHARS = "!<>-_\\/[]{}—=+*^?#@$%&ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

interface TextScrambleProps {
  text: string;
  className?: string;
  delay?: number; // ms before animation starts
  duration?: number; // total scramble duration in ms
  tag?: "h1" | "h2" | "h3" | "span" | "p";
}

export function TextScramble({
  text,
  className = "",
  delay = 200,
  duration = 1400,
  tag: Tag = "span",
}: TextScrambleProps) {
  const [display, setDisplay] = useState(text);
  const frameRef = useRef<number | null>(null);

  useEffect(() => {
    let startTime: number | null = null;
    let started = false;

    const timeout = setTimeout(() => {
      started = true;
      const chars = text.split("");

      const animate = (timestamp: number) => {
        if (!startTime) startTime = timestamp;
        const elapsed = timestamp - startTime;
        const progress = Math.min(elapsed / duration, 1);

        const revealCount = Math.floor(progress * chars.length);
        const scrambled = chars.map((char, i) => {
          if (char === " ") return " ";
          if (i < revealCount) return char;
          return CHARS[Math.floor(Math.random() * CHARS.length)];
        });

        setDisplay(scrambled.join(""));

        if (progress < 1) {
          frameRef.current = requestAnimationFrame(animate);
        } else {
          setDisplay(text);
        }
      };

      frameRef.current = requestAnimationFrame(animate);
    }, delay);

    return () => {
      clearTimeout(timeout);
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
    };
  }, [text, delay, duration]);

  return <Tag className={className}>{display}</Tag>;
}
