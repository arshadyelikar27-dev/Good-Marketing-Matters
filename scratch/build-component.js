const fs = require('fs');

const svgContent = fs.readFileSync('C:/Users/arsha/OneDrive/Desktop/Demo-GMM/public/hero-illustration.svg', 'utf8');

// Parse paths
const pathRegex = /<path\s+d="([^"]+)"\s+fill="([^"]+)"/g;
let match;
let paths = [];
let idx = 0;

while ((match = pathRegex.exec(svgContent)) !== null) {
  const d = match[1];
  let fill = match[2];
  
  // Replace yellow color rgb(252,193,41) with #584CDD
  if (fill === 'rgb(252,193,41)') {
    fill = '#584CDD';
  }
  
  // calculate center and bounding box to categorize
  const numbers = d.match(/-?\d+(\.\d+)?/g);
  let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity;
  if (numbers) {
    for (let i = 0; i < numbers.length - 1; i += 2) {
      const x = parseFloat(numbers[i]);
      const y = parseFloat(numbers[i+1]);
      if (!isNaN(x) && !isNaN(y)) {
        if (x < minX) minX = x;
        if (x > maxX) maxX = x;
        if (y < minY) minY = y;
        if (y > maxY) maxY = y;
      }
    }
  }
  
  paths.push({
    id: `path-${idx}`,
    idx,
    d,
    fill,
    minX,
    maxX,
    minY,
    maxY,
    width: maxX - minX,
    height: maxY - minY,
    centerY: (minY + maxY) / 2,
    centerX: (minX + maxX) / 2
  });
  idx++;
}

// Categorize paths into groups (skip idx 0 which is full white background path)
const groups = {
  blobs: [],
  topCard: [],
  floatingCardLeft: [],
  floatingCardRight: [],
  characterAndDesk: [],
  decorations: []
};

paths.forEach(p => {
  if (p.idx === 0) {
    // Skip background white canvas rectangle for 100% transparency!
    return;
  } else if (p.idx >= 1 && p.idx <= 2) {
    groups.blobs.push(p);
  } else if ((p.minY >= 350 && p.maxY <= 570 && p.minX >= 730 && p.maxX <= 1240)) {
    groups.topCard.push(p);
  } else if (p.minX >= 500 && p.maxX <= 710 && p.minY >= 440 && p.maxY <= 650) {
    groups.floatingCardLeft.push(p);
  } else if (p.minX >= 1650 && p.minY >= 680 && p.maxY <= 1010) {
    groups.floatingCardRight.push(p);
  } else if (p.width < 100 && p.height < 100 && (p.minY < 400 || p.maxY > 1500 || p.minX < 200 || p.maxX > 1800)) {
    groups.decorations.push(p);
  } else {
    groups.characterAndDesk.push(p);
  }
});

console.log('Group counts (Transparent BG, Yellow -> #584CDD):', {
  blobs: groups.blobs.length,
  topCard: groups.topCard.length,
  floatingCardLeft: groups.floatingCardLeft.length,
  floatingCardRight: groups.floatingCardRight.length,
  decorations: groups.decorations.length,
  characterAndDesk: groups.characterAndDesk.length
});

function renderGroupPaths(pathList, prefix) {
  return pathList.map((p, i) => `        <path id="${prefix}-${i}" d="${p.d}" fill="${p.fill}" transform="translate(0,0)" />`).join('\n');
}

const componentCode = `"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function HeroIllustration() {
  const containerRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const isReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const ctx = gsap.context(() => {
      // ----------------------------------------------------
      // 1. INITIAL ENTRANCE ANIMATION TIMELINE
      // ----------------------------------------------------
      const tl = gsap.timeline({
        defaults: { ease: "power3.out", duration: 1.2 }
      });

      // SVG fade in & scale from 0.95
      tl.fromTo(
        svgRef.current,
        { opacity: 0, scale: 0.95, y: 30 },
        { opacity: 1, scale: 1, y: 0, duration: 1.4 }
      );

      // Background Blobs
      tl.fromTo(
        "#hero-group-blobs",
        { opacity: 0, scale: 0.9 },
        { opacity: 1, scale: 1, duration: 1 },
        "-=1.0"
      );

      // Character & Desk Station
      tl.fromTo(
        "#hero-group-main",
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 1.2 },
        "-=0.9"
      );

      // Floating Cards (Left, Right, Top)
      tl.fromTo(
        ["#hero-group-top-card", "#hero-group-card-left", "#hero-group-card-right"],
        { opacity: 0, y: -25, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 1, stagger: 0.15 },
        "-=0.8"
      );

      // Sparkles and Floating Doodles
      tl.fromTo(
        "#hero-group-decorations path",
        { opacity: 0, scale: 0 },
        { opacity: 1, scale: 1, duration: 0.8, stagger: 0.03, ease: "back.out(1.7)" },
        "-=0.6"
      );

      if (!isReducedMotion) {
        // ----------------------------------------------------
        // 2. CONTINUOUS IDLE FLOATING ANIMATIONS
        // ----------------------------------------------------
        // Main Character Breathing/Floating
        gsap.to("#hero-group-main", {
          y: -8,
          duration: 3.2,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut"
        });

        // Floating Card Left
        gsap.to("#hero-group-card-left", {
          y: -12,
          rotation: -1.5,
          duration: 4,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut"
        });

        // Floating Card Right
        gsap.to("#hero-group-card-right", {
          y: 12,
          rotation: 1.5,
          duration: 4.5,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut"
        });

        // Top UI Header Card
        gsap.to("#hero-group-top-card", {
          y: -6,
          duration: 5,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut"
        });

        // Background Blobs Subtle Pulse
        gsap.to("#hero-group-blobs", {
          scale: 1.02,
          rotation: 0.8,
          transformOrigin: "center center",
          duration: 6,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut"
        });

        // Doodles & Sparkles Twinkle
        gsap.to("#hero-group-decorations path", {
          opacity: 0.4,
          scale: 0.85,
          duration: 2,
          repeat: -1,
          yoyo: true,
          stagger: { amount: 1.5, from: "random" },
          ease: "sine.inOut"
        });

        // ----------------------------------------------------
        // 3. MOUSE PARALLAX INTERACTION
        // ----------------------------------------------------
        const quickToMainX = gsap.quickTo("#hero-group-main", "x", { duration: 0.6, ease: "power2.out" });
        const quickToMainY = gsap.quickTo("#hero-group-main", "y", { duration: 0.6, ease: "power2.out" });

        const quickToCardsX = gsap.quickTo(
          ["#hero-group-card-left", "#hero-group-card-right", "#hero-group-top-card"],
          "x",
          { duration: 0.8, ease: "power2.out" }
        );
        const quickToCardsY = gsap.quickTo(
          ["#hero-group-card-left", "#hero-group-card-right", "#hero-group-top-card"],
          "y",
          { duration: 0.8, ease: "power2.out" }
        );

        const quickToDecoX = gsap.quickTo("#hero-group-decorations", "x", { duration: 1, ease: "power2.out" });
        const quickToDecoY = gsap.quickTo("#hero-group-decorations", "y", { duration: 1, ease: "power2.out" });

        const handleMouseMove = (e: MouseEvent) => {
          if (!containerRef.current) return;
          const rect = containerRef.current.getBoundingClientRect();
          const mouseX = (e.clientX - rect.left) / rect.width - 0.5;
          const mouseY = (e.clientY - rect.top) / rect.height - 0.5;

          quickToMainX(mouseX * 14);
          quickToMainY(mouseY * 14);

          quickToCardsX(mouseX * 28);
          quickToCardsY(mouseY * 28);

          quickToDecoX(mouseX * 40);
          quickToDecoY(mouseY * 40);
        };

        const handleMouseLeave = () => {
          quickToMainX(0);
          quickToMainY(0);
          quickToCardsX(0);
          quickToCardsY(0);
          quickToDecoX(0);
          quickToDecoY(0);
        };

        const currentContainer = containerRef.current;
        if (currentContainer) {
          currentContainer.addEventListener("mousemove", handleMouseMove);
          currentContainer.addEventListener("mouseleave", handleMouseLeave);
        }

        return () => {
          if (currentContainer) {
            currentContainer.removeEventListener("mousemove", handleMouseMove);
            currentContainer.removeEventListener("mouseleave", handleMouseLeave);
          }
        };
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full max-w-[650px] lg:max-w-[700px] mx-auto flex items-center justify-center group select-none"
    >
      <svg
        ref={svgRef}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 2048 2048"
        className="w-full h-auto will-change-transform"
        style={{ display: "block" }}
        version="1.1"
      >
        {/* Layer 1: Organic Primary Color Blobs */}
        <g id="hero-group-blobs" className="origin-center">
${renderGroupPaths(groups.blobs, 'blob')}
        </g>

        {/* Layer 2: Top Navigation / Header Card */}
        <g id="hero-group-top-card" className="origin-center">
${renderGroupPaths(groups.topCard, 'topcard')}
        </g>

        {/* Layer 3: Floating UI Card (Left) */}
        <g id="hero-group-card-left" className="origin-center">
${renderGroupPaths(groups.floatingCardLeft, 'cardleft')}
        </g>

        {/* Layer 4: Floating UI Card (Right) */}
        <g id="hero-group-card-right" className="origin-center">
${renderGroupPaths(groups.floatingCardRight, 'cardright')}
        </g>

        {/* Layer 5: Main Character & Workstation */}
        <g id="hero-group-main" className="origin-center">
${renderGroupPaths(groups.characterAndDesk, 'main')}
        </g>

        {/* Layer 6: Floating Doodles, Sparkles & Stars */}
        <g id="hero-group-decorations" className="origin-center">
${renderGroupPaths(groups.decorations, 'deco')}
        </g>
      </svg>
    </div>
  );
}
`;

fs.writeFileSync('C:/Users/arsha/OneDrive/Desktop/Demo-GMM/src/components/hero-illustration.tsx', componentCode);
console.log('Successfully updated src/components/hero-illustration.tsx!');
