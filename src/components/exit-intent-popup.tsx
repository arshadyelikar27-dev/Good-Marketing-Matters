"use client";

import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Sparkles } from "lucide-react";

const STORAGE_KEY = "gmm_exit_popup_dismissed";

export function ExitIntentPopup() {
  const [show, setShow] = useState(false);

  const dismiss = useCallback(() => {
    setShow(false);
    try {
      sessionStorage.setItem(STORAGE_KEY, "1");
    } catch {}
  }, []);

  useEffect(() => {
    // Don't show if already dismissed this session
    try {
      if (sessionStorage.getItem(STORAGE_KEY)) return;
    } catch {}

    let triggered = false;

    const handleMouseLeave = (e: MouseEvent) => {
      // Only fire when cursor moves toward top of viewport
      if (triggered || e.clientY > 20) return;
      triggered = true;
      // Small delay so it feels intentional
      setTimeout(() => setShow(true), 200);
    };

    document.addEventListener("mouseleave", handleMouseLeave);
    return () => document.removeEventListener("mouseleave", handleMouseLeave);
  }, []);

  // Close on ESC
  useEffect(() => {
    if (!show) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") dismiss();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [show, dismiss]);

  return (
    <AnimatePresence>
      {show && (
        <>
          {/* Backdrop */}
          <motion.div
            key="exit-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[9998] bg-black/70 backdrop-blur-sm"
            onClick={dismiss}
          />

          {/* Modal */}
          <motion.div
            key="exit-modal"
            initial={{ opacity: 0, scale: 0.88, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.88, y: 40 }}
            transition={{ type: "spring", stiffness: 340, damping: 26 }}
            className="fixed inset-0 z-[9999] flex items-center justify-center p-4 pointer-events-none"
          >
            <div className="relative pointer-events-auto max-w-md w-full rounded-3xl bg-[#0D0D0D] border border-[#2A2A2A] shadow-[0_30px_80px_rgba(0,0,0,0.8)] overflow-hidden">
              {/* Top yellow glow accent */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-1 bg-primary rounded-full blur-sm" />
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-px bg-primary" />

              {/* Ambient orb */}
              <div className="absolute top-[-60px] left-1/2 -translate-x-1/2 w-64 h-64 bg-primary/10 rounded-full blur-[80px] pointer-events-none" />

              {/* Close button */}
              <button
                onClick={dismiss}
                aria-label="Close popup"
                className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors text-[#BDBDBD] hover:text-white z-10"
              >
                <X size={16} />
              </button>

              <div className="relative p-8 pt-10 text-center flex flex-col items-center gap-5">
                {/* Icon */}
                <motion.div
                  animate={{ rotate: [0, 15, -15, 0], scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  className="w-14 h-14 rounded-2xl bg-primary/15 border border-primary/30 flex items-center justify-center"
                >
                  <Sparkles className="w-7 h-7 text-primary" />
                </motion.div>

                {/* Heading */}
                <div>
                  <p className="text-xs font-bold tracking-[0.2em] uppercase text-primary mb-2">
                    Wait — Before You Go!
                  </p>
                  <h2 className="text-2xl sm:text-3xl font-black text-white leading-tight">
                    Get <span className="text-primary">20% Off</span> Your
                    <br /> First Project
                  </h2>
                </div>

                {/* Description */}
                <p className="text-[#BDBDBD] text-sm leading-relaxed max-w-xs">
                  Limited-time offer for new clients. Chat with us on WhatsApp now and mention{" "}
                  <span className="text-primary font-bold">&quot;FIRSTPROJECT&quot;</span> to claim your discount.
                </p>

                {/* CTA */}
                <motion.a
                  href="https://wa.me/15551234567?text=Hi%20GMM!%20I%27d%20like%20to%20claim%20the%2020%25%20off%20FIRSTPROJECT%20offer."
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.04, y: -2 }}
                  whileTap={{ scale: 0.96 }}
                  onClick={dismiss}
                  className="w-full py-4 rounded-2xl bg-primary text-primary-foreground font-black text-base shadow-[0_8px_30px_rgba(238,255,59,0.4)] hover:shadow-[0_12px_40px_rgba(238,255,59,0.6)] transition-all relative overflow-hidden group"
                >
                  <span className="relative z-10">Claim My 20% Discount →</span>
                  <span className="absolute -inset-full w-[200%] h-[200%] bg-gradient-to-r from-transparent via-white/30 to-transparent group-hover:animate-shine pointer-events-none" />
                </motion.a>

                {/* Dismiss link */}
                <button
                  onClick={dismiss}
                  className="text-xs text-[#666] hover:text-[#BDBDBD] transition-colors underline underline-offset-2"
                >
                  No thanks, I&apos;ll pass
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
