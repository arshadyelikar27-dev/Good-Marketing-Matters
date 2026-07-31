"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus } from "lucide-react";

const faqs = [
  {
    question: "What makes GMM different from other agencies?",
    answer: "We don't just execute tasks; we engineer growth. Our approach combines data-driven performance marketing with Apple-tier design and cutting-edge AI optimization (AEO/GEO). We define our success strictly by your ROI.",
  },
  {
    question: "How long does a typical digital transformation take?",
    answer: "Depending on project complexity, a complete brand and website overhaul typically ranges from 4 to 8 weeks. We operate on agile sprints, ensuring you see measurable milestones and rapid deployment.",
  },
  {
    question: "Do you guarantee search engine rankings?",
    answer: "While no agency can guarantee specific Google rankings, our track record speaks for itself. We utilize rigorous technical SEO, programmatic content strategies, and Answer Engine Optimization to ensure you dominate your niche.",
  },
  {
    question: "How do we get started?",
    answer: "It starts with a conversation. Reach out via our contact form, and our strategic team will analyze your current digital footprint and deliver a customized, high-impact growth proposal within 48 hours.",
  },
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFAQ = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="faq" className="py-32 w-full bg-transparent overflow-hidden">
      <div className="max-w-4xl mx-auto px-6">
        
        <div className="mb-20">
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-medium tracking-tighter text-white mb-6">
            Frequently Asked.
          </h2>
          <p className="text-xl text-white font-normal max-w-xl">
            Everything you need to know about partnering with GMM.
          </p>
        </div>

        <div className="flex flex-col border-t border-white/10">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;

            return (
              <div key={idx} className="border-b border-white/10 overflow-hidden">
                <button
                  onClick={() => toggleFAQ(idx)}
                  className="w-full flex items-center justify-between py-8 text-left group"
                >
                  <span className="text-2xl sm:text-3xl font-medium tracking-tight transition-colors duration-500 text-white">
                    {faq.question}
                  </span>
                  
                  {/* Apple-style plus icon that rotates to an X */}
                  <motion.div
                    animate={{ rotate: isOpen ? 45 : 0 }}
                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    className="shrink-0 ml-6 text-white/40 group-hover:text-white transition-colors duration-500"
                  >
                    <Plus className="w-8 h-8" strokeWidth={1.5} />
                  </motion.div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <div className="pb-10 pr-12 text-lg sm:text-xl text-white/90 font-normal leading-relaxed">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
