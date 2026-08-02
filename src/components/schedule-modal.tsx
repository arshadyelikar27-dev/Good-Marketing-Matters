"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, User, Phone, Calendar, CheckCircle2 } from "lucide-react";
import { useModal } from "@/lib/modal-context";

export function ScheduleModal() {
  const { isScheduleOpen, closeScheduleModal } = useModal();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  
  const [formData, setFormData] = useState({
    type: "Call Schedule",
    name: "",
    phone: "",
    dateTime: "",
    purpose: "",
  });

  const handleClose = () => {
    closeScheduleModal();
    setTimeout(() => {
      setIsSuccess(false);
      setFormData({ type: "Call Schedule", name: "", phone: "", dateTime: "", purpose: "" });
    }, 300);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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
      
      setIsSuccess(true);
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Failed to schedule call. Please try again or email us directly.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {isScheduleOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="absolute inset-0 bg-surface/80 backdrop-blur-sm"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="relative w-full max-w-lg bg-surface border border-white/10 rounded-[2rem] shadow-[0_0_50px_rgba(224, 243, 71,0.15)] overflow-hidden"
          >
            <button
              type="button"
              onClick={handleClose}
              className="absolute top-5 right-5 p-2 rounded-full bg-white/5 hover:bg-white/10 text-white hover:text-white transition-colors z-50"
            >
              <X size={20} />
            </button>

            {/* Decorative Glow inside modal */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-accent/10 rounded-full blur-[80px] pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary/5 rounded-full blur-[80px] pointer-events-none" />

            {!isSuccess ? (
              <div className="p-8 relative z-10">
                <div className="flex flex-col items-center text-center mb-8">
                  <p className="text-xs bg-accent/20 text-accent font-bold tracking-widest uppercase px-4 py-1.5 rounded-full mb-4 border border-accent/30">
                    Schedule a Call
                  </p>
                  <h2 className="text-3xl font-black text-white uppercase tracking-tight">Let's Talk Strategy.</h2>
                  <p className="text-white mt-2 text-sm font-medium">
                    Pick a time and we'll call you to discuss your brand.
                  </p>
                </div>

                <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                  
                  <div>
                    <label className="text-sm font-medium text-white mb-1.5 block">Full Name</label>
                    <div className="relative flex items-center">
                      <User className="absolute left-3 w-5 h-5 text-white" />
                      <input 
                        type="text" 
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required 
                        className="w-full bg-surface border border-white/5 rounded-xl h-12 pl-10 pr-4 text-white placeholder-white/20 focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/50 transition-all"
                        placeholder="Enter your full name"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-white mb-1.5 block">Phone Number</label>
                    <div className="relative flex items-center">
                      <Phone className="absolute left-3 w-5 h-5 text-white" />
                      <input 
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange} 
                        required 
                        className="w-full bg-surface border border-white/5 rounded-xl h-12 pl-10 pr-4 text-white placeholder-white/20 focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/50 transition-all"
                        placeholder="Enter your phone number"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-white mb-1.5 block">Preferred Date & Time</label>
                    <div className="relative flex items-center">
                      <Calendar className="absolute left-3 w-5 h-5 text-white pointer-events-none" />
                      <input 
                        type="datetime-local"
                        name="dateTime"
                        value={formData.dateTime}
                        onChange={handleChange} 
                        required 
                        className="w-full bg-surface border border-white/5 rounded-xl h-12 pl-10 pr-4 text-white focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/50 transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-white mb-1.5 block">Purpose of Call</label>
                    <textarea 
                      name="purpose"
                      value={formData.purpose}
                      onChange={handleChange}
                      required 
                      rows={2}
                      className="w-full bg-surface border border-white/5 rounded-xl p-4 text-white placeholder-white/20 focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/50 transition-all resize-none"
                      placeholder="Briefly describe what you'd like to discuss..."
                    />
                  </div>

                  <button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="mt-4 w-full bg-gradient-to-r from-accent to-[#E0F347] text-black hover:opacity-90 font-bold text-lg h-14 rounded-xl flex items-center justify-center gap-2 transition-opacity duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_0_20px_rgba(224, 243, 71,0.3)]"
                  >
                    {isSubmitting ? "Scheduling..." : (
                      <>
                        Confirm Schedule
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
                  Call Scheduled!
                </h3>
                <p className="text-white text-base leading-relaxed">
                  Thanks <span className="text-white font-medium">{formData.name}</span>. <br />
                  We will call you at your requested time.
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
