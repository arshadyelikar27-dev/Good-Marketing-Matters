"use client";

import { useState, FormEvent } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Mail, Phone, MapPin, CheckCircle2 } from "lucide-react";
import { ScrollReveal } from "@/components/scroll-reveal";
import { KineticDarkBgFX } from "@/components/section-background-fx";

const FacebookIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
  </svg>
);

const TwitterIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const InstagramIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
  </svg>
);

const LinkedinIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path fillRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clipRule="evenodd" />
  </svg>
);

export function Footer() {
  const [formState, setFormState] = useState({ name: "", email: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!formState.email) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormState({ name: "", email: "", message: "" });
      setTimeout(() => setIsSubmitted(false), 4000);
    }, 1000);
  };

  return (
    <footer id="contact" className="bg-black text-white py-16 sm:py-24 relative overflow-hidden w-full border-t border-white/10">
      <KineticDarkBgFX />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 max-w-7xl xl:max-w-[1400px] relative z-10">
        <ScrollReveal>
          {/* QUICK INLINE CONTACT FORM WITH FOCUS GLOW & CHECKMARK DRAW ANIMATION */}
          <div className="mb-16 bg-[#151515]/80 border border-[#262626] rounded-3xl p-6 sm:p-10 backdrop-blur-xl shadow-2xl">
            <h3 className="font-heading font-black text-2xl sm:text-4xl text-white mb-2">
              Start Your Project <span className="text-primary">With GMM</span>
            </h3>
            <p className="text-body-text text-sm sm:text-base mb-8">
              Fill in your details below to receive a custom agency strategy proposal.
            </p>

            <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="relative group">
                <input
                  type="text"
                  placeholder="Your Name"
                  value={formState.name}
                  onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                  className="w-full px-5 py-3.5 rounded-full bg-[#0A0A0A] border border-[#262626] text-white text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/40 transition-all duration-300 placeholder:text-white/40"
                />
              </div>

              <div className="relative group">
                <input
                  type="email"
                  required
                  placeholder="Your Email *"
                  value={formState.email}
                  onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                  className="w-full px-5 py-3.5 rounded-full bg-[#0A0A0A] border border-[#262626] text-white text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/40 transition-all duration-300 placeholder:text-white/40"
                />
              </div>

              <div className="relative">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="relative group w-full px-6 py-3.5 bg-primary text-black rounded-full font-black text-sm hover:bg-primary-hover transition-all duration-300 hover:scale-[1.03] active:scale-[0.96] shadow-[0_0_20px_rgba(238,255,59,0.3)] hover:shadow-[0_0_30px_rgba(238,255,59,0.6)] flex items-center justify-center gap-2 overflow-hidden cursor-pointer"
                >
                  <AnimatePresence mode="wait">
                    {isSubmitted ? (
                      <motion.span
                        key="success"
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0 }}
                        className="flex items-center gap-2 text-black font-black"
                      >
                        <CheckCircle2 className="w-5 h-5 text-black animate-bounce" />
                        Proposal Requested!
                      </motion.span>
                    ) : isSubmitting ? (
                      <motion.span key="submitting" className="animate-pulse">
                        Processing...
                      </motion.span>
                    ) : (
                      <motion.span key="idle" className="flex items-center gap-2">
                        Get Instant Proposal <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </motion.span>
                    )}
                  </AnimatePresence>
                  <span className="absolute -inset-full w-[200%] h-[200%] bg-gradient-to-r from-transparent via-white/50 to-transparent group-hover:animate-shine pointer-events-none" />
                </button>
              </div>
            </form>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-8 sm:gap-12 mb-12 sm:mb-16">
          {/* Brand & Floating Logo */}
          <div className="sm:col-span-2 xl:col-span-2">
            <Link href="/" className="flex items-center group inline-flex mb-4 sm:mb-6">
              {/* SLOW FLOATING ANIMATION FOR LOGO */}
              <motion.div
                animate={{ y: [-4, 4, -4] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="relative w-36 h-12 sm:w-44 sm:h-16 transition-transform group-hover:scale-105"
              >
                <Image 
                  src="/gmm-logo.png" 
                  alt="GMM Logo" 
                  fill
                  className="object-contain drop-shadow-[0_0_20px_rgba(238,255,59,0.2)]"
                />
              </motion.div>
            </Link>

            <p className="text-white/70 max-w-sm mb-6 sm:mb-8 text-base sm:text-lg leading-relaxed">
              Elevating brands through strategic digital marketing, stunning design, and cutting-edge development.
            </p>

            <a
              href="https://forms.google.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="relative group inline-flex items-center gap-2 px-7 py-3.5 bg-primary text-black rounded-full font-bold text-base hover:bg-primary-hover transition-all duration-300 hover:scale-105 shadow-[0_0_20px_rgba(238,255,59,0.3)] overflow-hidden"
            >
              <span className="relative z-10 flex items-center gap-2">
                Open Full Form <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
              <span className="absolute -inset-full w-[200%] h-[200%] bg-gradient-to-r from-transparent via-white/40 to-transparent group-hover:animate-shine pointer-events-none" />
            </a>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-heading font-bold text-lg sm:text-xl mb-4 sm:mb-6 text-primary">Contact</h4>
            <ul className="flex flex-col gap-3 sm:gap-4 text-white/70 text-sm sm:text-base">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-primary shrink-0 mt-1" />
                <span>123 Innovation Drive,<br />Tech City, TC 10010</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-primary shrink-0" />
                <span>+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-primary shrink-0" />
                <span>hello@gmmagency.com</span>
              </li>
            </ul>
          </div>

          {/* Socials & Links */}
          <div>
            <h4 className="font-heading font-bold text-lg sm:text-xl mb-4 sm:mb-6 text-primary">Follow Us</h4>
            {/* SOCIAL ICONS HOVER ROTATE 10° + GLOW */}
            <div className="flex gap-3 sm:gap-4 mb-6 sm:mb-8">
              {[
                { icon: FacebookIcon, label: "Facebook" },
                { icon: TwitterIcon, label: "Twitter" },
                { icon: InstagramIcon, label: "Instagram" },
                { icon: LinkedinIcon, label: "LinkedIn" },
              ].map((item, i) => {
                const IconComp = item.icon;
                return (
                  <motion.a
                    key={i}
                    href="#"
                    whileHover={{ rotate: 10, scale: 1.15 }}
                    transition={{ type: "spring", stiffness: 400, damping: 15 }}
                    className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary hover:text-black transition-colors hover:shadow-[0_0_20px_rgba(238,255,59,0.8)]"
                    aria-label={item.label}
                  >
                    <IconComp className="w-5 h-5" />
                  </motion.a>
                );
              })}
            </div>

            <h4 className="font-heading font-bold text-lg sm:text-xl mb-4 sm:mb-6 text-primary">Legal</h4>
            {/* LINKS UNDERLINE GROWS FROM LEFT */}
            <ul className="flex flex-col gap-2 text-white/70 text-sm sm:text-base">
              {["Privacy Policy", "Terms of Service"].map((text) => (
                <li key={text}>
                  <Link href="#" className="relative inline-block hover:text-white transition-colors group">
                    <span>{text}</span>
                    <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-primary group-hover:w-full transition-all duration-300 origin-left" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-6 sm:pt-8 border-t border-white/10 text-center text-xs sm:text-sm text-white/50">
          <p>&copy; {new Date().getFullYear()} Great Marketing Matters (GMM). All rights reserved.</p>
        </div>
      </div>

      {/* Decorative background logo typography */}
      <div className="absolute -bottom-14 sm:-bottom-20 -right-10 text-[24vw] sm:text-[20vw] font-black text-white/5 font-heading pointer-events-none leading-none select-none">
        GMM.
      </div>
    </footer>
  );
}
