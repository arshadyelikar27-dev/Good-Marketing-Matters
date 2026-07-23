"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, HelpCircle } from "lucide-react";
import { ScrollReveal } from "@/components/scroll-reveal";
import { KineticYellowBgFX } from "@/components/section-background-fx";

const faqs = [
  {
    question: "What services does GMM agency specialize in?",
    answer: "We offer end-to-end digital solutions including high-performance web development, cross-platform mobile apps, ROI-focused SEO optimization, performance marketing, brand strategy, and high-converting graphic design.",
  },
  {
    question: "How long does a typical website or mobile app project take?",
    answer: "Depending on project complexity, custom web applications typically range from 2 to 6 weeks, while mobile apps take 4 to 8 weeks. We work with agile sprints to deliver measurable milestones fast.",
  },
  {
    question: "How does GMM ensure high search engine rankings (SEO)?",
    answer: "We utilize data-backed technical SEO, keyword architecture, content optimization, authority backlink strategies, and speed optimization to ensure your website dominates Google rankings.",
  },
  {
    question: "Can we request a custom quote or strategy proposal?",
    answer: "Absolutely! Simply submit your project details via our contact form or proposal request button, and our strategic team will deliver a customized proposal within 24 hours.",
  },
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFAQ = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="faq" className="py-20 sm:py-28 bg-primary text-[#0A0A0A] relative z-10 overflow-hidden select-none">
      <KineticYellowBgFX />
      {/* Subtle dotted background pattern */}
      <div
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(#000000 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />

      <div className="container max-w-4xl mx-auto px-4 sm:px-6 relative z-10">
        <ScrollReveal className="text-center mb-12 sm:mb-16 flex flex-col items-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-black/10 border border-black/20 text-black font-bold text-xs uppercase tracking-widest mb-4">
            <HelpCircle className="w-4 h-4 text-black" /> Got Questions?
          </div>

          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-black">
            Frequently Asked <span className="text-white underline decoration-white/40">Questions</span>
          </h2>
        </ScrollReveal>

        <div className="flex flex-col gap-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;

            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                className={`rounded-2xl transition-all duration-300 overflow-hidden shadow-2xl ${
                  isOpen
                    ? "bg-[#0A0A0A] text-white border-2 border-black shadow-black/40"
                    : "bg-[#0A0A0A]/90 text-white hover:bg-[#0A0A0A] border border-black/30"
                }`}
              >
                <button
                  onClick={() => toggleFAQ(idx)}
                  className="w-full flex items-center justify-between p-6 text-left font-heading font-bold text-base sm:text-xl text-white focus:outline-none cursor-pointer group"
                >
                  <span className={`transition-colors duration-300 ${isOpen ? "text-primary" : "group-hover:text-primary"}`}>
                    {faq.question}
                  </span>

                  {/* Chevron with 300ms 180° rotation animation */}
                  <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className={`w-9 h-9 rounded-full flex items-center justify-center border shrink-0 transition-colors ${
                      isOpen ? "bg-primary text-black border-primary" : "bg-white/10 border-white/20 text-white"
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </motion.div>
                </button>

                {/* Smooth Height Animation */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: [0.25, 1, 0.5, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-6 pt-1 text-sm sm:text-base text-white/80 leading-relaxed border-t border-white/10">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
