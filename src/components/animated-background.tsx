"use client";

import { useEffect, useRef } from "react";

export function AnimatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let rafId: number;
    let time = 0;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    window.addEventListener("resize", resize);
    resize();

    // Define the moving orbs for the mesh gradient
    const orbs = [
      { x: 0.2, y: 0.3, vx: 0.001, vy: 0.0015, radius: 0.6, color: [107, 33, 168] }, // Royal Purple
      { x: 0.8, y: 0.7, vx: -0.0012, vy: -0.001, radius: 0.7, color: [88, 28, 135] }, // Darker Purple
      { x: 0.5, y: 0.8, vx: 0.0008, vy: -0.0012, radius: 0.5, color: [239, 253, 50] }, // Neon Yellow/Green
    ];

    const render = () => {
      time += 0.01;
      
      // Clear with Deep Space Black
      ctx.fillStyle = "#05000A";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.globalCompositeOperation = "screen";

      orbs.forEach((orb) => {
        // Move orbs slowly
        orb.x += orb.vx;
        orb.y += orb.vy;
        
        // Bounce off edges smoothly
        if (orb.x < -0.2 || orb.x > 1.2) orb.vx *= -1;
        if (orb.y < -0.2 || orb.y > 1.2) orb.vy *= -1;

        const x = orb.x * canvas.width;
        const y = orb.y * canvas.height;
        const radius = orb.radius * Math.max(canvas.width, canvas.height);

        // Draw radial gradient
        const gradient = ctx.createRadialGradient(x, y, 0, x, y, radius);
        gradient.addColorStop(0, `rgba(${orb.color[0]}, ${orb.color[1]}, ${orb.color[2]}, 0.15)`);
        gradient.addColorStop(1, `rgba(${orb.color[0]}, ${orb.color[1]}, ${orb.color[2]}, 0)`);

        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      });
      
      // Add a subtle static noise overlay for premium texture
      // (Rendered once per frame is slow, so we just use CSS grain overlay on top of canvas)

      ctx.globalCompositeOperation = "source-over";
      rafId = requestAnimationFrame(render);
    };

    rafId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-0 pointer-events-none w-full h-full">
      <canvas ref={canvasRef} className="w-full h-full opacity-60" />
      {/* Noise Texture Overlay */}
      <div 
        className="absolute inset-0 opacity-[0.03] mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat'
        }}
      />
      {/* Vignette */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#05000A] opacity-80" />
    </div>
  );
}
