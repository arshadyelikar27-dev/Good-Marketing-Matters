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

  return (
    <section id="faq" className="w-full py-24 sm:py-32 bg-background relative overflow-hidden">
      {/* Background neon lines */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
      <div className="absolute bottom-0 right-0 w-full h-[1px] bg-gradient-to-r from-transparent via-primary/50 to-transparent" />

      <div className="max-w-4xl mx-auto px-6 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.15 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold uppercase tracking-tighter text-heading drop-shadow-[0_0_15px_rgba(104, 17, 201,0.3)]">
            Got Questions?
          </h2>
          <p className="mt-4 text-heading">Everything you need to know about partnering with GMM.</p>
        </motion.div>

        <div className="flex flex-col gap-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;

            return (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.15 }}
                transition={{ delay: index * 0.1 }}
                key={index} 
                className={`group border rounded-2xl overflow-hidden transition-all duration-500 bg-white/40 backdrop-blur-md shadow-lg ${
                  isOpen 
                    ? "border-primary shadow-[0_0_20px_rgba(104, 17, 201,0.2)]" 
                    : "border-black/10 hover:border-primary/50"
                }`}
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="w-full flex items-center justify-between p-6 sm:p-8 text-left focus:outline-none"
                >
                  <span className={`text-lg sm:text-xl font-bold tracking-tight transition-colors duration-300 ${isOpen ? "text-primary" : "text-heading group-hover:text-primary"}`}>
                    {faq.question}
                  </span>
                  <motion.div
                    animate={{ rotate: isOpen ? 45 : 0 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    className={`shrink-0 ml-6 flex items-center justify-center w-10 h-10 rounded-full transition-colors duration-300 ${
                      isOpen ? "bg-primary text-white" : "bg-primary/10 text-primary group-hover:bg-primary/30"
                    }`}
                  >
                    <Plus className="w-5 h-5" />
                  </motion.div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    >
                      <div className="px-6 sm:px-8 pb-6 sm:pb-8 pt-0 text-heading leading-relaxed">
                        <div className="w-full h-px bg-gradient-to-r from-primary/30 to-transparent mb-6" />
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
