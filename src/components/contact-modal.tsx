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
        mode: "no-cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData)
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
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="relative w-full max-w-lg bg-surface border border-white/10 rounded-[2rem] shadow-[0_0_50px_rgba(104, 17, 201,0.15)] overflow-hidden"
          >
            <button
              type="button"
              onClick={handleClose}
              className="absolute top-5 right-5 p-2 rounded-full bg-white/5 hover:bg-white/10 text-white hover:text-white transition-colors z-50"
            >
              <X size={20} />
            </button>

            {/* Decorative Glow inside modal */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-[80px] pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent/5 rounded-full blur-[80px] pointer-events-none" />

            {!isSuccess ? (
              <div className="p-8 relative z-10">
                <div className="flex flex-col items-center text-center mb-8">
                  <p className="text-xs bg-primary/20 text-primary font-bold tracking-widest uppercase px-4 py-1.5 rounded-full mb-4 border border-primary/30">
                    Contact Us
                  </p>
                  <h2 className="text-3xl font-black text-white uppercase tracking-tight">Let's Get In Touch.</h2>
                  <p className="text-gray-400 mt-2 text-sm font-medium">
                    Or reach out manually to us at <a href="mailto:goodmarketingmatters.co" className="text-accent hover:underline">hello@goodmarketingmatters.co</a>
                  </p>
                </div>

                <form className="flex flex-col gap-4" onSubmit={handleSubmit}>

                  <div>
                    <label className="text-sm font-medium text-gray-300 mb-1.5 block">Full Name</label>
                    <div className="relative flex items-center">
                      <User className="absolute left-3 w-5 h-5 text-gray-500" />
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full bg-black border border-white/5 rounded-xl h-12 pl-10 pr-4 text-white placeholder-white/20 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all"
                        placeholder="Enter your full name"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-300 mb-1.5 block">Email Address</label>
                    <div className="relative flex items-center">
                      <Mail className="absolute left-3 w-5 h-5 text-gray-500" />
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full bg-black border border-white/5 rounded-xl h-12 pl-10 pr-4 text-white placeholder-white/20 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all"
                        placeholder="Enter your email address"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-300 mb-1.5 block">What service are you looking for?</label>
                    <div className="relative flex items-center">
                      <ChevronDown className="absolute right-3 w-5 h-5 text-gray-500 pointer-events-none" />
                      <select
                        name="service"
                        value={formData.service}
                        onChange={handleChange}
                        required
                        className="w-full bg-black border border-white/5 rounded-xl h-12 pl-4 pr-10 text-white focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all appearance-none cursor-pointer"
                      >
                        <option value="" disabled className="bg-surface text-gray-500">Select a service</option>
                        {services.map((s) => (
                          <option key={s.slug} value={s.title} className="bg-surface">{s.title}</option>
                        ))}
                        <option value="Other" className="bg-surface">Other / Comprehensive Package</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-300 mb-1.5 block">Message</label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={3}
                      className="w-full bg-black border border-white/5 rounded-xl p-4 text-white placeholder-white/20 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all resize-none"
                      placeholder="Tell us about your brand and goals..."
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="mt-4 w-full bg-gradient-to-r from-primary to-accent hover:opacity-90 text-white font-medium text-lg h-14 rounded-xl flex items-center justify-center gap-2 transition-opacity duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_0_20px_rgba(104, 17, 201,0.2)]"
                  >
                    {isSubmitting ? "Sending..." : (
                      <>
                        Submit Form
                        <Send className="w-5 h-5" />
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
                <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mb-2 shadow-[0_0_30px_rgba(34,197,94,0.3)]">
                  <CheckCircle2 className="w-10 h-10 text-green-500" />
                </div>
                <h3 className="text-3xl font-semibold text-white tracking-tight">
                  Message Sent!
                </h3>
                <p className="text-white text-base leading-relaxed">
                  Thank you for reaching out, <span className="text-white font-medium">{formData.name}</span>. <br />
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
