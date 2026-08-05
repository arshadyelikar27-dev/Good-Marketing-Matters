"use client";

import { useEffect, useRef } from "react";
import { useScroll } from "framer-motion";

class Star {
  x: number;
  y: number;
  z: number;
  size: number;
  twinkleSpeed: number;
  opacity: number;
  baseY: number;

  constructor(canvasWidth: number, canvasHeight: number) {
    this.x = Math.random() * canvasWidth;
    this.y = Math.random() * canvasHeight;
    this.baseY = this.y;
    
    // Z determines depth. Lower Z = closer to camera.
    // We use a range from 1 to 5.
    this.z = Math.random() * 4 + 1;
    
    // Closer stars are bigger
    this.size = (Math.random() * 1.5 + 0.5) / (this.z * 0.5);
    
    this.opacity = Math.random();
    this.twinkleSpeed = (Math.random() * 0.02 + 0.005) * (6 - this.z); // Closer stars twinkle faster
  }

  update(scrollY: number, mouseX: number, mouseY: number, canvasWidth: number, canvasHeight: number) {
    // Parallax effect: closer stars (low z) move faster
    const parallaxFactor = 3 / this.z;
    
    // Mouse interaction (parallax shift opposite to mouse)
    const centerX = canvasWidth / 2;
    const centerY = canvasHeight / 2;
    
    // Slight shift based on mouse distance from center
    let mouseShiftX = ((centerX - mouseX) * 0.05) * parallaxFactor;
    let mouseShiftY = ((centerY - mouseY) * 0.05) * parallaxFactor;
    
    // If mouse is off-screen (default -1000), don't apply mouse shift
    if (mouseX === -1000) {
      mouseShiftX = 0;
      mouseShiftY = 0;
    }

    // Scroll parallax
    this.y = this.baseY - (scrollY * parallaxFactor * 0.8);

    // Slowly drift upwards automatically to feel alive
    this.baseY -= 0.2 * parallaxFactor;

    // Wrap around screen
    if (this.y < -50) {
      this.baseY = canvasHeight + 50 + (scrollY * parallaxFactor * 0.8);
      this.y = this.baseY;
      this.x = Math.random() * canvasWidth;
    } else if (this.y > canvasHeight + 50) {
      this.baseY = -50 + (scrollY * parallaxFactor * 0.8);
      this.y = this.baseY;
      this.x = Math.random() * canvasWidth;
    }

    // Twinkle effect
    this.opacity += this.twinkleSpeed;
    if (this.opacity > 1 || this.opacity < 0.1) {
      this.twinkleSpeed = -this.twinkleSpeed;
    }
    
    return { drawX: this.x + mouseShiftX, drawY: this.y + mouseShiftY };
  }

  draw(ctx: CanvasRenderingContext2D, drawX: number, drawY: number) {
    ctx.globalAlpha = Math.max(0, Math.min(1, this.opacity));
    ctx.fillStyle = "#ffffff";

    ctx.beginPath();
    ctx.arc(drawX, drawY, this.size, 0, Math.PI * 2);
    ctx.fill();
  }
}

export function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { scrollY } = useScroll();
  const currentScrollY = useRef(0);
  const mousePos = useRef({ x: -1000, y: -1000 });

  useEffect(() => {
    return scrollY.onChange((latest) => {
      currentScrollY.current = latest;
    });
  }, [scrollY]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let stars: Star[] = [];
    let animationFrameId: number;

    const init = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      stars = [];
      
      // Optimized particle count for stable 60fps rendering
      const isMobile = window.innerWidth < 768;
      const particleCount = isMobile ? 120 : 250; 
      for (let i = 0; i < particleCount; i++) {
        stars.push(new Star(canvas.width, canvas.height));
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      stars.forEach((star) => {
        const { drawX, drawY } = star.update(
          currentScrollY.current, 
          mousePos.current.x, 
          mousePos.current.y,
          canvas.width,
          canvas.height
        );
        star.draw(ctx, drawX, drawY);
      });
      
      animationFrameId = requestAnimationFrame(animate);
    };

    init();
    animate();

    const handleResize = () => {
      // Re-init on resize to cover new area
      init();
    };
    window.addEventListener("resize", handleResize);
    
    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="fixed inset-0 w-full h-full pointer-events-none z-[-1]"
      style={{ background: 'transparent' }}
    />
  );
}
