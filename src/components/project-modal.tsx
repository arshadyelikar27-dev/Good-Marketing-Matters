"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, CheckCircle2 } from "lucide-react";
import { useModal } from "@/lib/modal-context";

const SERVICES = [
  "Performance Marketing",
  "Website Development",
  "App Development",
  "Graphic Designing",
  "Content Writing",
  "SEO Optimization",
  "Brand Marketing",
];

export function ProjectModal() {
  const { isProjectOpen, openProjectModal, closeProjectModal } = useModal();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    service: "Performance Marketing",
    message: "",
  });

  useEffect(() => {
    const handleHashChange = () => {
      if (window.location.hash === "#project") {
        openProjectModal();
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
  }, [openProjectModal]);

  const handleClose = () => {
    closeProjectModal();
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({
        name: "",
        email: "",
        service: "Performance Marketing",
        message: "",
      });
    }, 300);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, send data to backend here
    setIsSubmitted(true);
  };

  return (
    <AnimatePresence>
      {isProjectOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center px-4 py-8">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="absolute inset-0 bg-black/20 backdrop-blur-sm overflow-y-auto"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-card border border-border rounded-[2rem] shadow-xl custom-scrollbar"
          >
            {/* Header */}
            {!isSubmitted && (
              <div className="flex items-center justify-between p-6 md:p-8 pb-4">
                <div>
                  <h3 className="text-3xl font-semibold text-heading tracking-tight">
                    Start Your Project
                  </h3>
                  <p className="text-body-text text-sm md:text-base mt-1">
                    Let's Create Something Amazing Together
                  </p>
                </div>
                <button
                  onClick={handleClose}
                  className="w-10 h-10 flex items-center justify-center rounded-full bg-black/5 hover:bg-black/10 text-heading hover:text-heading transition-colors shrink-0"
                >
                  <X size={20} />
                </button>
              </div>
            )}

            {!isSubmitted ? (
              <form
                onSubmit={handleSubmit}
                className="p-6 md:p-8 pt-0 flex flex-col gap-6"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Name */}
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-medium text-heading/80 pl-1">
                      Your Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Enter your Name"
                      className="w-full bg-surface border border-border rounded-xl px-4 py-3.5 text-heading placeholder:text-body-text/30 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all"
                    />
                  </div>
                  {/* Email */}
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-medium text-heading/80 pl-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Enter your Email"
                      className="w-full bg-surface border border-border rounded-xl px-4 py-3.5 text-heading placeholder:text-body-text/30 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all"
                    />
                  </div>
                </div>

                {/* Services Pills */}
                <div className="flex flex-col gap-3">
                  <label className="text-sm font-medium text-heading/80 pl-1">
                    Service Interested In
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {SERVICES.map((srv) => (
                      <button
                        key={srv}
                        type="button"
                        onClick={() =>
                          setFormData((prev) => ({ ...prev, service: srv }))
                        }
                        className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                          formData.service === srv
                            ? "bg-primary text-white"
                            : "bg-surface text-heading border border-border hover:bg-primary/5 hover:text-primary"
                        }`}
                      >
                        {srv}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Message */}
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium text-heading/80 pl-1">
                    Your Message
                  </label>
                  <textarea
                    name="message"
                    required
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us about your project..."
                    rows={4}
                    className="w-full bg-surface border border-border rounded-xl px-4 py-4 text-heading placeholder:text-body-text/30 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all resize-none"
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={!formData.name || !formData.email || !formData.message}
                  className="mt-2 w-full bg-primary text-white font-medium py-4 rounded-xl hover:bg-primary-hover transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Send Message
                </button>
              </form>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-10 md:p-16 flex flex-col items-center text-center gap-4"
              >
                <div className="w-24 h-24 bg-green-500/20 rounded-full flex items-center justify-center mb-4">
                  <CheckCircle2 className="w-12 h-12 text-green-500" />
                </div>
                <h3 className="text-3xl font-semibold text-heading tracking-tight">
                  Project Request Sent!
                </h3>
                <p className="text-body-text text-base leading-relaxed max-w-sm">
                  Thank you, <span className="text-heading font-medium">{formData.name}</span>. We've received your project inquiry regarding <span className="text-heading font-medium">{formData.service}</span> and will get back to you shortly.
                </p>
                <button
                  onClick={handleClose}
                  className="mt-8 w-full max-w-[200px] bg-white text-black font-medium py-3.5 rounded-xl hover:bg-gray-200 transition-colors"
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
