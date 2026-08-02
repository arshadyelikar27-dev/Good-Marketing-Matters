"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Cookie, X } from "lucide-react";

const STORAGE_KEY = "gmm_cookie_consent";

export function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      if (!localStorage.getItem(STORAGE_KEY)) {
        // Small delay so it doesn't flash immediately on load
        const t = setTimeout(() => setVisible(true), 2500);
        return () => clearTimeout(t);
      }
    } catch {}
  }, []);

  const accept = () => {
    try { localStorage.setItem(STORAGE_KEY, "accepted"); } catch {}
    setVisible(false);
  };

  const decline = () => {
    try { localStorage.setItem(STORAGE_KEY, "declined"); } catch {}
    setVisible(false);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="cookie-banner"
          initial={{ y: 120, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 120, opacity: 0 }}
          transition={{ type: "spring", stiffness: 320, damping: 28, delay: 0.1 }}
          className="fixed bottom-4 left-1/2 -translate-x-1/2 z-[9990] w-[calc(100%-2rem)] max-w-2xl"
        >
          <div className="relative rounded-2xl bg-black/95 backdrop-blur-xl border border-black shadow-[0_20px_60px_rgba(0,0,0,0.7)] px-5 py-4 flex flex-col sm:flex-row items-start sm:items-center gap-4 overflow-hidden">
            {/* Accent line */}
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/60 to-transparent" />

            {/* Icon */}
            <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-primary/15 border border-primary/25 flex items-center justify-center">
              <Cookie className="w-5 h-5 text-accent" />
            </div>

            {/* Text */}
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold text-white mb-0.5">We use cookies 🍪</p>
              <p className="text-xs text-white leading-relaxed">
                We use cookies to enhance your experience, analyse site traffic, and personalise content. By clicking
                &quot;Accept&quot; you consent to our use of cookies.
              </p>
            </div>

            {/* Buttons */}
            <div className="flex items-center gap-2 flex-shrink-0 w-full sm:w-auto">
              <button
                onClick={decline}
                className="flex-1 sm:flex-none px-4 py-2 rounded-xl text-xs font-bold text-white hover:text-white border border-black hover:border-white bg-transparent transition-all duration-200"
              >
                Decline
              </button>
              <motion.button
                onClick={accept}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                className="flex-1 sm:flex-none px-5 py-2 rounded-xl text-xs font-black bg-primary text-primary-foreground shadow-[0_4px_15px_rgba(104, 17, 201,0.35)] hover:shadow-[0_6px_20px_rgba(104, 17, 201,0.55)] transition-all duration-200"
              >
                Accept All
              </motion.button>
            </div>

            {/* Close X */}
            <button
              onClick={decline}
              aria-label="Close cookie banner"
              className="absolute top-3 right-3 sm:static sm:top-auto sm:right-auto w-7 h-7 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center text-white hover:text-white transition-colors flex-shrink-0"
            >
              <X size={14} />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
