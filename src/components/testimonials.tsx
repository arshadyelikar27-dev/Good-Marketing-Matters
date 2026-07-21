"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { Star } from "lucide-react";

const testimonials = [
  {
    id: 1,
    name: "John Doe",
    company: "TechFlow Inc.",
    review: "GMM transformed our digital presence completely. Our organic traffic increased by 150% within just three months of their SEO overhaul.",
    rating: 5,
    style: "w-80 md:w-96 left-4 md:left-[10%] top-20"
  },
  {
    id: 2,
    name: "Sarah Jenkins",
    company: "Bloom Cosmetics",
    review: "The new website design is absolutely stunning. Their team perfectly captured our brand's luxury aesthetic while ensuring lightning-fast load times.",
    rating: 5,
    style: "w-72 md:w-80 right-4 md:right-[15%] top-40"
  },
  {
    id: 3,
    name: "Michael Chen",
    company: "Apex Startups",
    review: "Incredible attention to detail in their app development process. They didn't just build what we asked for; they built what we actually needed.",
    rating: 5,
    style: "w-80 md:w-96 left-8 md:left-[25%] bottom-32"
  },
  {
    id: 4,
    name: "Elena Rodriguez",
    company: "Global Logistics",
    review: "Their B2B marketing strategy was a game-changer. We're now consistently generating high-quality leads that convert into long-term clients.",
    rating: 5,
    style: "w-72 md:w-80 right-10 md:right-[5%] bottom-10"
  }
];

export function Testimonials() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cards = gsap.utils.toArray(".testimonial-card");
    
    cards.forEach((card: any) => {
      // Randomize float duration and drift for each card
      const duration = 4 + Math.random() * 4;
      const yDrift = 15 + Math.random() * 20;
      const xDrift = 10 + Math.random() * 15;
      const rotDrift = -2 + Math.random() * 4;

      gsap.to(card, {
        y: `+=${yDrift}`,
        x: `+=${xDrift}`,
        rotation: rotDrift,
        duration: duration,
        yoyo: true,
        repeat: -1,
        ease: "sine.inOut",
        delay: Math.random() * 2
      });
    });
  }, []);

  return (
    <section 
      id="reviews" 
      ref={containerRef}
      className="relative w-full min-h-screen py-32 overflow-hidden bg-primary text-black flex flex-col items-center justify-center"
    >
      {/* Background glowing orb */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] md:w-[40vw] h-[80vw] md:h-[40vw] bg-white/20 rounded-full blur-[100px] pointer-events-none" />

      <div className="container relative z-10 mx-auto px-6 mb-20 text-center flex flex-col items-center">
        <motion.h2 
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-heading text-4xl md:text-6xl font-bold mb-6"
        >
          What Our <span className="text-white">Clients Say</span>
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-lg text-black/70 max-w-xl mx-auto"
        >
          Don't just take our word for it. Here is what leading brands have to say about working with GMM.
        </motion.p>
      </div>

      <div className="container relative z-10 mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {testimonials.map((t, idx) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: idx * 0.15 }}
              className="bg-black/5 backdrop-blur-xl border border-black/10 rounded-3xl p-8 shadow-xl hover:shadow-2xl hover:bg-black/10 transition-all duration-300 group cursor-pointer"
            >
              <div className="flex gap-1 mb-6">
                {[...Array(t.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-primary text-primary group-hover:scale-110 transition-transform" style={{ transitionDelay: `${i * 50}ms` }} />
                ))}
              </div>
              <p className="text-black/90 text-lg leading-relaxed mb-8 font-medium">
                "{t.review}"
              </p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center font-bold text-primary border border-primary/30 text-lg">
                  {t.name.charAt(0)}
                </div>
                <div>
                  <h4 className="font-bold text-black text-base">{t.name}</h4>
                  <p className="text-sm text-black/60">{t.company}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      
    </section>
  );
}
