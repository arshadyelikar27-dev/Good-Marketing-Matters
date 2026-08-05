"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, User, Mail, ChevronDown, CheckCircle2 } from "lucide-react";
import { useModal } from "@/lib/modal-context";
import { services } from "@/data/services";

export function ContactModal() {
  const { isContactOpen, openContactModal, closeContactModal } = useModal();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const [formData, setFormData] = useState({
    type: "Contact Form",
    name: "",
    email: "",
    service: "",
    message: "",
  });

  useEffect(() => {
    if (isContactOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isContactOpen]);

  const handleClose = () => {
    closeContactModal();
    setTimeout(() => {
      setIsSuccess(false);
      setFormData({ type: "Contact Form", name: "", email: "", service: "", message: "" });
    }, 300);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await fetch("https://script.google.com/macros/s/AKfycbzVFg7OethkXkdGIxwsPviMoHP3vIqqmPJmATo_jmkVhzCcugC3Ls_sVN9wRviX81zs/exec", {
        method: "POST",
        body: JSON.stringify(formData),
      });

      // With no-cors, the response is opaque. If fetch didn't throw, we assume the data was sent.
      setIsSuccess(true);
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Failed to send message. Please try again or email us directly.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {isContactOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4" data-lenis-prevent>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="absolute inset-0 bg-black/20 backdrop-blur-sm"
            data-lenis-prevent
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="relative w-full max-w-lg bg-card border border-border rounded-2xl sm:rounded-[2rem] shadow-xl overflow-hidden max-h-[85vh] overflow-y-auto"
            data-lenis-prevent
          >
            <button
              type="button"
              onClick={handleClose}
              className="absolute top-3 right-3 sm:top-5 sm:right-5 p-1.5 sm:p-2 rounded-full bg-black/5 hover:bg-black/10 text-heading hover:text-heading transition-colors z-50"
            >
              <X className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>

            {!isSuccess ? (
              <div className="p-4 sm:p-8 relative z-10">
                <div className="flex flex-col items-center text-center mb-4 sm:mb-8">
                  <p className="text-[10px] sm:text-xs bg-primary/20 text-accent font-bold tracking-widest uppercase px-3 py-1 sm:px-4 sm:py-1.5 rounded-full mb-2 sm:mb-4 border border-primary/30">
                    Contact Us
                  </p>
                  <h2 className="text-xl sm:text-3xl font-black text-heading uppercase tracking-tight">Let's Get In Touch.</h2>
                  <p className="text-body-text mt-1 sm:mt-2 text-xs sm:text-sm font-medium">
                    Or reach out manually to us at <a href="mailto:goodmarketingmatters.co" className="text-accent hover:underline">hello@goodmarketingmatters.co</a>
                  </p>
                </div>

                <form className="flex flex-col gap-2.5 sm:gap-4" onSubmit={handleSubmit}>

                  <div>
                    <label className="text-xs sm:text-sm font-medium text-heading mb-1 sm:mb-1.5 block">Full Name</label>
                    <div className="relative flex items-center">
                      <User className="absolute left-3 w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full bg-surface border border-border rounded-lg sm:rounded-xl h-9 sm:h-12 pl-9 sm:pl-10 pr-3 sm:pr-4 text-xs sm:text-base text-heading placeholder-body-text/30 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all"
                        placeholder="Enter your full name"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs sm:text-sm font-medium text-heading mb-1 sm:mb-1.5 block">Email Address</label>
                    <div className="relative flex items-center">
                      <Mail className="absolute left-3 w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full bg-surface border border-border rounded-lg sm:rounded-xl h-9 sm:h-12 pl-9 sm:pl-10 pr-3 sm:pr-4 text-xs sm:text-base text-heading placeholder-body-text/30 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all"
                        placeholder="Enter your email address"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs sm:text-sm font-medium text-heading mb-1 sm:mb-1.5 block">What service are you looking for?</label>
                    <div className="relative flex items-center">
                      <ChevronDown className="absolute right-3 w-4 h-4 sm:w-5 sm:h-5 text-primary pointer-events-none" />
                      <select
                        name="service"
                        value={formData.service}
                        onChange={handleChange}
                        required
                        className="w-full bg-surface border border-border rounded-lg sm:rounded-xl h-9 sm:h-12 pl-3 sm:pl-4 pr-9 sm:pr-10 text-xs sm:text-base text-heading focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all appearance-none cursor-pointer"
                      >
                        <option value="" disabled className="bg-[#121216] text-white/60">Select a service</option>
                        {services.map((s) => (
                          <option key={s.slug} value={s.title} className="bg-[#121216] text-white">{s.title}</option>
                        ))}
                        <option value="Other" className="bg-[#121216] text-white">Other / Comprehensive Package</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="text-xs sm:text-sm font-medium text-heading mb-1 sm:mb-1.5 block">Message</label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={2}
                      className="w-full bg-surface border border-border rounded-lg sm:rounded-xl p-2.5 sm:p-4 text-xs sm:text-base text-heading placeholder-body-text/30 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all resize-none"
                      placeholder="Tell us about your brand and goals..."
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="mt-2 sm:mt-4 w-full bg-primary hover:bg-primary-hover text-white font-medium text-sm sm:text-lg h-10 sm:h-14 rounded-lg sm:rounded-xl flex items-center justify-center gap-2 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? "Sending..." : (
                      <>
                        Submit Form
                        <Send className="w-4 h-4 sm:w-5 sm:h-5" />
                      </>
                    )}
                  </button>

                </form>
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-12 flex flex-col items-center text-center gap-4 relative z-10"
              >
                <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mb-2">
                  <CheckCircle2 className="w-10 h-10 text-green-500" />
                </div>
                <h3 className="text-3xl font-semibold text-heading tracking-tight">
                  Message Sent!
                </h3>
                <p className="text-body-text text-base leading-relaxed">
                  Thank you for reaching out, <span className="text-heading font-medium">{formData.name}</span>. <br />
                  Our team will get back to you shortly.
                </p>
                <button
                  onClick={handleClose}
                  className="mt-6 w-full bg-white text-black font-medium py-3.5 rounded-xl hover:bg-gray-200 transition-colors"
                >
                  Done
                </button>
              </motion.div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
