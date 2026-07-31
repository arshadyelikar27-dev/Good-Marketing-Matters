"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export function AboutAnimation() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"],
  });

  // Apple-style text reveal scrub
  // We break the text into parts and reveal them based on scroll progress
  
  const opacity1 = useTransform(scrollYProgress, [0, 0.15], [0.2, 1]);
  const opacity2 = useTransform(scrollYProgress, [0.15, 0.3], [0.2, 1]);
  const opacity3 = useTransform(scrollYProgress, [0.3, 0.45], [0.2, 1]);
  const opacity4 = useTransform(scrollYProgress, [0.45, 0.6], [0.2, 1]);
  const opacity5 = useTransform(scrollYProgress, [0.6, 0.75], [0.2, 1]);

  return (
    <section id="about" ref={containerRef} className="relative w-full py-48 md:py-64 flex flex-col items-center justify-center">
      
      <div className="max-w-5xl mx-auto px-6 text-center sm:text-left">
        <h2 className="text-4xl sm:text-5xl md:text-7xl lg:text-[6rem] font-semibold tracking-tighter leading-[1.1] text-white">
          <motion.span style={{ opacity: opacity1 }}>We don't just execute. </motion.span>
          <motion.span style={{ opacity: opacity2 }} className="text-accent">We interpret, sharpen, </motion.span>
          <motion.span style={{ opacity: opacity3 }}>and deliver the </motion.span>
          <motion.span style={{ opacity: opacity4 }} className="text-accent italic">digital signal </motion.span>
          <motion.span style={{ opacity: opacity5 }}>you need to grow.</motion.span>
        </h2>
      </div>
      
      <div className="mt-32 w-full max-w-5xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Core Value 1 */}
        <div className="p-8 rounded-[2rem] bg-white/[0.03] backdrop-blur-3xl border border-white/10 hover:border-primary/50 transition-colors duration-500">
          <div className="text-accent font-mono text-sm mb-4">01</div>
          <h3 className="text-2xl font-semibold text-white mb-3">Your Success</h3>
          <p className="text-white/50 leading-relaxed font-light">
            We define our success by the success of our clients. Unwavering commitment to quality.
          </p>
        </div>

        {/* Core Value 2 */}
        <div className="p-8 rounded-[2rem] bg-white/[0.03] backdrop-blur-3xl border border-white/10 hover:border-primary/50 transition-colors duration-500">
          <div className="text-accent font-mono text-sm mb-4">02</div>
          <h3 className="text-2xl font-semibold text-white mb-3">Digital Excellence</h3>
          <p className="text-white/50 leading-relaxed font-light">
            Excellence and creativity are at the heart of everything we do. Tailored digital solutions.
          </p>
        </div>

        {/* Core Value 3 */}
        <div className="p-8 rounded-[2rem] bg-white/[0.03] backdrop-blur-3xl border border-white/10 hover:border-primary/50 transition-colors duration-500">
          <div className="text-accent font-mono text-sm mb-4">03</div>
          <h3 className="text-2xl font-semibold text-white mb-3">True Innovation</h3>
          <p className="text-white/50 leading-relaxed font-light">
            Driven by a passion for technology, reshaping how brands connect with audiences.
          </p>
        </div>

      </div>

    </section>
  );
}
