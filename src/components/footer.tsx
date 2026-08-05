"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Mail, MapPin } from "lucide-react";
import { useModal } from "@/lib/modal-context";
import { motion } from "framer-motion";
import { ScrollReveal } from "@/components/scroll-reveal";

const TextReveal = ({ text, delay = 0, className = "" }: { text: string; delay?: number, className?: string }) => {
  const words = text.split(" ");
  return (
    <motion.p
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, amount: 0.2 }}
      variants={{
        visible: { transition: { staggerChildren: 0.04, delayChildren: delay } },
        hidden: {},
      }}
      className={className}
    >
      {words.map((word, i) => (
        <span key={i} className="inline-flex overflow-hidden mr-[0.25em] pb-1 -mb-1">
          <motion.span
            variants={{
              hidden: { y: "110%", opacity: 0 },
              visible: { y: 0, opacity: 1, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
            }}
            className="inline-block"
          >
            {word}
          </motion.span>
        </span>
      ))}
    </motion.p>
  );
};

export function Footer() {
  const { openContactModal } = useModal();
  return (
    <footer className="relative w-full bg-transparent text-white overflow-hidden pt-20 sm:pt-32 pb-6 sm:pb-10">

      {/* Background neon glows removed */}

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 sm:gap-16 lg:gap-8 mb-16 sm:mb-24">

          {/* Brand Column */}
          <div className="lg:col-span-5 flex flex-col">
            <ScrollReveal>
              <Link href="/" className="relative inline-block w-full h-[40px] sm:h-[50px] mb-6 sm:mb-8 group">
                <div className="absolute bottom-0 left-0 w-[200px] h-[90px] sm:w-[280px] sm:h-[120px] md:w-[400px] md:h-[160px] -ml-2">
                  <Image
                    src="/GMM_LOGO.png"
                    alt="Good Marketing Matters"
                    fill
                    sizes="120px"
                    className="object-contain object-left-bottom transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
              </Link>
            </ScrollReveal>
            
            <TextReveal 
              text="We engineer digital experiences that demand attention and drive uncompromising growth." 
              className="text-white text-sm sm:text-lg md:text-xl font-medium max-w-md leading-relaxed flex flex-wrap"
              delay={0.2}
            />

            <ScrollReveal delay={0.4} className="mt-8 sm:mt-12 flex gap-3 sm:gap-4">
              <Link href="#" className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border border-primary/30 flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" x2="17.51" y1="6.5" y2="6.5" /></svg>
              </Link>
              <Link href="#" className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border border-primary/30 flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" /><rect width="4" height="12" x="2" y="9" /><circle cx="4" cy="4" r="2" /></svg>
              </Link>
              <Link href="#" className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border border-primary/30 flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" /></svg>
              </Link>
            </ScrollReveal>
          </div>

          {/* Links Columns */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-8 sm:gap-12 lg:gap-8">
            <ScrollReveal delay={0.3} className="flex flex-col gap-6">
              <h4 className="text-xl font-bold uppercase tracking-widest text-primary mb-4">Explore</h4>
              <nav className="flex flex-col gap-4">
                {["Services", "About Us", "Our Work", "Insights", "Contact"].map((item) => (
                  <Link
                    key={item}
                    href="#"
                    className="text-lg font-medium text-white hover:text-primary transition-colors duration-300 w-fit group flex items-center gap-2"
                  >
                    <span className="w-0 h-[2px] bg-primary transition-all duration-300 group-hover:w-4" />
                    {item}
                  </Link>
                ))}
              </nav>
            </ScrollReveal>

            <ScrollReveal delay={0.4} className="flex flex-col gap-6">
              <h4 className="text-xl font-bold uppercase tracking-widest text-primary mb-4">Contact</h4>

              <div className="flex items-start gap-4 text-white group cursor-pointer hover:text-primary transition-colors">
                <MapPin className="w-6 h-6 shrink-0 mt-1 text-primary group-hover:text-primary transition-colors" />
                <p className="text-lg font-medium leading-relaxed">
                  Walmmiki Nagar, Latur-413512
                </p>
              </div>

              <div className="flex items-center gap-4 text-white mt-4 group cursor-pointer hover:text-primary transition-colors">
                <Mail className="w-6 h-6 shrink-0 text-primary group-hover:text-primary transition-colors" />
                <p className="text-lg font-medium">goodmarketingmatters.co</p>
              </div>
            </ScrollReveal>
          </div>
        </div>

        {/* Massive Animated CTA */}
        <ScrollReveal delay={0.5}>
          <div className="w-full py-8 sm:py-10 md:py-16 relative group overflow-hidden bg-transparent mb-10 sm:mb-16">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
            <button onClick={openContactModal} className="flex flex-col md:flex-row items-center justify-between w-full text-center md:text-left gap-4 sm:gap-6 md:gap-8 px-4 sm:px-6 md:px-16 relative z-10 cursor-pointer">
              <motion.h2 
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false, amount: 0.2 }}
                variants={{
                  visible: { transition: { staggerChildren: 0.08 } },
                  hidden: {},
                }}
                className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-black tracking-tight text-white uppercase transition-all duration-500 flex flex-wrap justify-center md:justify-start"
              >
                {"Ready to dominate?".split(" ").map((word, i) => (
                  <span key={i} className="inline-flex overflow-hidden mr-[0.3em] pb-2 -mb-2">
                    <motion.span
                      variants={{
                        hidden: { y: "100%", opacity: 0 },
                        visible: { y: 0, opacity: 1, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
                      }}
                      className="inline-block"
                    >
                      {word}
                    </motion.span>
                  </span>
                ))}
              </motion.h2>
              <motion.div 
                initial={{ scale: 0, rotate: -90 }}
                whileInView={{ scale: 1, rotate: 0 }}
                viewport={{ once: false, amount: 0.2 }}
                transition={{ type: "spring", stiffness: 200, damping: 20, delay: 0.3 }}
                className="w-16 h-16 sm:w-20 sm:h-20 md:w-32 md:h-32 rounded-full bg-primary flex items-center justify-center group-hover:scale-110 transition-all duration-500 shrink-0"
              >
                <ArrowRight className="w-8 h-8 sm:w-10 sm:h-10 md:w-16 md:h-16 text-white -rotate-45 group-hover:rotate-0 transition-transform duration-500" />
              </motion.div>
            </button>
          </div>
        </ScrollReveal>

        {/* Footer Bottom */}
        <ScrollReveal delay={0.6}>
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 sm:gap-6 pt-6 sm:pt-8 text-white text-sm sm:text-base font-medium">
            <p>© {new Date().getFullYear()} GMM. All rights reserved.</p>
            <div className="flex gap-8 text-sm uppercase tracking-widest">
              <Link href="#" className="hover:text-primary transition-colors">Privacy Policy</Link>
              <Link href="#" className="hover:text-primary transition-colors">Terms of Service</Link>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </footer>
  );
}
