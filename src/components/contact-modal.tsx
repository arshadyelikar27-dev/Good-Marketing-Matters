"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Calendar, Clock, CheckCircle2 } from "lucide-react";
import { useModal } from "@/lib/modal-context";

export function ContactModal() {
  const { isContactOpen, openContactModal, closeContactModal } = useModal();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    date: "",
    time: "",
    notes: "",
  });

  const timeSlots = [
    "09:00 AM",
    "10:30 AM",
    "12:00 PM",
    "02:00 PM",
    "03:30 PM",
    "05:00 PM",
  ];

  useEffect(() => {
    const handleHashChange = () => {
      if (window.location.hash === "#contact") {
        openContactModal();
        window.history.replaceState(
          null,
          "",
          window.location.pathname + window.location.search
        );
      }
    };

    handleHashChange();
    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, [openContactModal]);

  const handleClose = () => {
    closeContactModal();
    setTimeout(() => {
      setStep(1);
      setFormData({
        name: "",
        email: "",
        phone: "",
        date: "",
        time: "",
        notes: "",
      });
    }, 300);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleNext = () => setStep(2);
  const handleSubmit = () => setStep(3);

  return (
    <AnimatePresence>
      {isContactOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
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
            className="relative w-full max-w-md bg-[#0B0B0E] border border-white/10 rounded-[2rem] shadow-2xl overflow-hidden"
          >
            {/* Header */}
            {step !== 3 && (
              <div className="flex items-center justify-between p-6 pb-2">
                <div>
                  <h3 className="text-2xl font-semibold text-white tracking-tight">
                    Schedule a Call
                  </h3>
                  <p className="text-[#86868B] text-sm mt-1">
                    Let's discuss your project in detail.
                  </p>
                </div>
                <button
                  onClick={handleClose}
                  className="w-8 h-8 flex items-center justify-center rounded-full bg-white/5 hover:bg-white/10 text-[#86868B] hover:text-white transition-colors"
                >
                  <X size={18} />
                </button>
              </div>
            )}

            {/* Step 1: Contact Details */}
            {step === 1 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="p-6 pt-4 flex flex-col gap-4"
              >
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-medium text-[#86868B] uppercase tracking-wider pl-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="John Doe"
                    className="w-full bg-[#1A1A20] border border-white/5 rounded-xl px-4 py-3 text-white placeholder:text-white/20 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-medium text-[#86868B] uppercase tracking-wider pl-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="john@example.com"
                    className="w-full bg-[#1A1A20] border border-white/5 rounded-xl px-4 py-3 text-white placeholder:text-white/20 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-medium text-[#86868B] uppercase tracking-wider pl-1">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+1 (555) 000-0000"
                    className="w-full bg-[#1A1A20] border border-white/5 rounded-xl px-4 py-3 text-white placeholder:text-white/20 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all"
                  />
                </div>

                <button
                  onClick={handleNext}
                  disabled={!formData.name || !formData.email}
                  className="mt-4 w-full bg-gradient-to-r from-primary to-accent text-white font-medium py-3.5 rounded-xl hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_0_20px_rgba(147,51,234,0.2)]"
                >
                  Continue to Date & Time
                </button>
              </motion.div>
            )}

            {/* Step 2: Date & Time */}
            {step === 2 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="p-6 pt-4 flex flex-col gap-5"
              >
                {/* Date Picker */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-medium text-[#86868B] uppercase tracking-wider pl-1 flex items-center gap-1.5">
                    <Calendar size={12} /> Select Date
                  </label>
                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    className="w-full bg-[#1A1A20] border border-white/5 rounded-xl px-4 py-3 text-white placeholder:text-white/20 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all [color-scheme:dark]"
                  />
                </div>

                {/* Time Slots */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-medium text-[#86868B] uppercase tracking-wider pl-1 flex items-center gap-1.5">
                    <Clock size={12} /> Available Slots
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {timeSlots.map((time) => (
                      <button
                        key={time}
                        onClick={() =>
                          setFormData((prev) => ({ ...prev, time }))
                        }
                        className={`py-2 rounded-lg text-sm font-medium transition-all ${
                          formData.time === time
                            ? "bg-primary text-white shadow-[0_0_15px_rgba(147,51,234,0.3)]"
                            : "bg-[#1A1A20] text-[#BDBDBD] border border-white/5 hover:bg-white/5 hover:text-white"
                        }`}
                      >
                        {time}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Notes */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-medium text-[#86868B] uppercase tracking-wider pl-1">
                    Additional Notes (Optional)
                  </label>
                  <textarea
                    name="notes"
                    value={formData.notes}
                    onChange={handleChange}
                    placeholder="Tell us a bit about your project..."
                    rows={2}
                    className="w-full bg-[#1A1A20] border border-white/5 rounded-xl px-4 py-3 text-white placeholder:text-white/20 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all resize-none"
                  />
                </div>

                <div className="flex items-center gap-3 mt-2">
                  <button
                    onClick={() => setStep(1)}
                    className="px-4 py-3.5 rounded-xl bg-white/5 text-white hover:bg-white/10 font-medium transition-colors"
                  >
                    Back
                  </button>
                  <button
                    onClick={handleSubmit}
                    disabled={!formData.date || !formData.time}
                    className="flex-1 bg-gradient-to-r from-primary to-accent text-white font-medium py-3.5 rounded-xl hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_0_20px_rgba(147,51,234,0.2)]"
                  >
                    Confirm Call Schedule
                  </button>
                </div>
              </motion.div>
            )}

            {/* Step 3: Success Screen */}
            {step === 3 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-10 flex flex-col items-center text-center gap-4"
              >
                <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mb-2 shadow-[0_0_30px_rgba(34,197,94,0.3)]">
                  <CheckCircle2 className="w-10 h-10 text-green-500" />
                </div>
                <h3 className="text-3xl font-semibold text-white tracking-tight">
                  Call Scheduled!
                </h3>
                <p className="text-[#86868B] text-base leading-relaxed">
                  Thank you, <span className="text-white font-medium">{formData.name}</span>. <br />
                  We'll call you on <span className="text-white font-medium">{formData.date}</span> at <span className="text-white font-medium">{formData.time}</span>.
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
