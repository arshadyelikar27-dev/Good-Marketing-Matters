"use client";

import { useState, useEffect } from "react";
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, ChevronRight } from "lucide-react";
import { usePathname } from "next/navigation";
import { MagneticButton } from "@/components/magnetic-button";
import { useModal } from "@/lib/modal-context";
import { useLenis } from "@/components/lenis-provider";

const navLinks = [
  { name: "Home", href: "#hero", id: "hero" },
  { name: "Services", href: "#services", id: "services" },
  { name: "About", href: "#about", id: "about" },
  { name: "Clients", href: "#clients", id: "clients" },
  { name: "Reviews", href: "#reviews", id: "reviews" },
  { name: "FAQ", href: "#faq", id: "faq" },
];

export function Navbar() {
  const pathname = usePathname();
  const lenis = useLenis();
  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("Home");
  const [hoveredTab, setHoveredTab] = useState<string | null>(null);
  const { openScheduleModal } = useModal();

  const handleNavClick = (e: React.MouseEvent, id: string, name: string) => {
    setActiveSection(name);
    if (pathname === "/" || pathname === "") {
      const el = document.getElementById(id);
      if (el) {
        e.preventDefault();
        if (lenis) {
          lenis.scrollTo(el, { offset: -90, duration: 1.4 });
        } else {
          el.scrollIntoView({ behavior: "smooth" });
        }
      }
    }
  };

  // Track scroll depth for background opacity and logo shrink
  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 50);
  });

  // Track active section automatically on scroll with requestAnimationFrame throttling (60 FPS)
  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrollPosition = window.scrollY + 220;

          for (let i = navLinks.length - 1; i >= 0; i--) {
            const element = document.getElementById(navLinks[i].id);
            if (element) {
              const top = element.offsetTop;
              if (scrollPosition >= top) {
                setActiveSection(navLinks[i].name);
                break;
              }
            }
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when bottom sheet is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [mobileMenuOpen]);

  // DO NOT show Navbar on /games page
  if (pathname?.startsWith("/games")) return null;

  return (
    <>
      <motion.nav
        initial={{ y: 0, opacity: 1 }}
        animate={{ y: 0, opacity: 1 }}
        className="fixed top-0 inset-x-0 z-50 pt-6 px-4 flex justify-center pointer-events-none"
      >
        <div
          className={cn(
            "pointer-events-auto flex items-center justify-between px-5 sm:px-7 py-3 rounded-full transition-all duration-500 w-full max-w-5xl border shadow-xl",
            isScrolled
              ? "bg-surface/95 backdrop-blur-[20px] border-white/10 shadow-[0_10px_30px_rgba(0,0,0,0.3)] py-2.5"
              : "bg-surface/80 backdrop-blur-[10px] border-white/5"
          )}
        >
          {/* LOGO */}
          <Link href="/" className="flex items-center group relative w-[60px] sm:w-[80px] h-10 sm:h-12 z-20 shrink-0">
            <motion.div
              animate={{ scale: isScrolled ? 0.9 : 1 }}
              transition={{ duration: 0.3 }}
              className="absolute left-[-20px] sm:left-[-10px] top-1/2 -translate-y-1/2 mt-2 w-[145px] h-[145px] transition-transform hover:scale-105"
            >
              <Image 
                src="/Logo.png" 
                alt="GMM Logo" 
                fill
                sizes="145px"
                className="object-contain"
                priority
              />
            </motion.div>
          </Link>

          {/* DESKTOP LINKS WITH MOVING ACTIVE INDICATOR PILL */}
          <div className="hidden md:flex items-center gap-1 bg-white/[0.03] p-1.5 rounded-full border border-white/5 overflow-visible">
            {navLinks.map((link) => {
              const isActive = activeSection === link.name;
              const isHovered = hoveredTab === link.name;

              return (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.id, link.name)}
                  onMouseEnter={() => setHoveredTab(link.name)}
                  onMouseLeave={() => setHoveredTab(null)}
                  className={cn(
                    "relative px-4 py-1.5 text-sm font-medium transition-colors group",
                    isActive ? "text-white font-bold" : "text-white/70 hover:text-white"
                  )}
                >

                  {/* Active Radius Indicator Pill */}
                  {isActive && (
                    <motion.div
                      layoutId="activeSectionPill"
                      className="absolute inset-0 bg-primary/90 border border-primary/20 rounded-full"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}

                  {/* ── ANIME MASCOT CHARACTER ── */}
                  {isActive && (
                    <motion.div
                      layoutId="nav-mascot"
                      className="absolute -top-11 left-1/2 -translate-x-1/2 pointer-events-none"
                      initial={false}
                      transition={{ type: "spring", stiffness: 320, damping: 28 }}
                    >
                      <div className="relative w-9 h-9">
                        {/* Face */}
                        <motion.div
                          className="absolute w-8 h-8 bg-white rounded-full left-1/2 -translate-x-1/2"
                          animate={
                            isHovered
                              ? { scale: [1, 1.1, 1], rotate: [0, -5, 5, 0] }
                              : { y: [0, -2, 0] }
                          }
                          transition={
                            isHovered
                              ? { duration: 0.4, ease: "easeInOut" }
                              : { duration: 2, repeat: Infinity, ease: "easeInOut" }
                          }
                        >
                          {/* Left eye */}
                          <motion.div
                            className="absolute w-1.5 h-1.5 bg-background rounded-full"
                            animate={isHovered ? { scaleY: [1, 0.15, 1] } : {}}
                            transition={{ duration: 0.2 }}
                            style={{ left: "24%", top: "38%" }}
                          />
                          {/* Right eye */}
                          <motion.div
                            className="absolute w-1.5 h-1.5 bg-background rounded-full"
                            animate={isHovered ? { scaleY: [1, 0.15, 1] } : {}}
                            transition={{ duration: 0.2 }}
                            style={{ right: "24%", top: "38%" }}
                          />
                          {/* Left blush */}
                          <div className="absolute w-1.5 h-1 bg-pink-300 rounded-full opacity-70" style={{ left: "12%", top: "56%" }} />
                          {/* Right blush */}
                          <div className="absolute w-1.5 h-1 bg-pink-300 rounded-full opacity-70" style={{ right: "12%", top: "56%" }} />
                          {/* Mouth */}
                          <motion.div
                            className="absolute w-3 h-1.5 border-b-2 border-border rounded-full"
                            animate={isHovered ? { scaleY: 1.6, y: -1 } : { scaleY: 1, y: 0 }}
                            style={{ left: "28%", top: "60%" }}
                          />
                          {/* Sparkles on hover */}
                          <AnimatePresence>
                            {isHovered && (
                              <>
                                <motion.span
                                  initial={{ opacity: 0, scale: 0 }}
                                  animate={{ opacity: 1, scale: 1 }}
                                  exit={{ opacity: 0, scale: 0 }}
                                  className="absolute -top-1 -right-1 text-[8px]"
                                >✨</motion.span>
                                <motion.span
                                  initial={{ opacity: 0, scale: 0 }}
                                  animate={{ opacity: 1, scale: 1 }}
                                  exit={{ opacity: 0, scale: 0 }}
                                  transition={{ delay: 0.08 }}
                                  className="absolute -top-2 -left-0.5 text-[8px]"
                                >✨</motion.span>
                              </>
                            )}
                          </AnimatePresence>
                        </motion.div>

                        {/* Diamond pointer below face */}
                        <motion.div
                          className="absolute -bottom-1 left-1/2 w-3 h-3 -translate-x-1/2 bg-white rotate-45"
                          animate={
                            isHovered
                              ? { y: [0, -3, 0] }
                              : { y: [0, 1.5, 0] }
                          }
                          transition={
                            isHovered
                              ? { duration: 0.3, repeat: Infinity, repeatType: "reverse" }
                              : { duration: 1.2, repeat: Infinity, ease: "easeInOut", delay: 0.4 }
                          }
                        />
                      </div>
                    </motion.div>
                  )}

                  <span className="relative z-10">{link.name}</span>

                  {/* Underline grows from left on hover */}
                  <span className="absolute bottom-0 left-3 right-3 h-[2px] bg-accent scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300 rounded-full" />
                </Link>
              );
            })}
          </div>

          {/* LET'S TALK BUTTON — MAGNETIC */}
          <MagneticButton className="hidden md:flex" strength={0.5}>
            <button
              onClick={openScheduleModal}
              className="px-6 py-2.5 rounded-full bg-primary text-white font-bold text-sm hover:border hover:border-accent hover:bg-primary transition-all duration-300 active:scale-[0.96] block"
            >
              Let&apos;s Talk
            </button>
          </MagneticButton>

          {/* MOBILE MENU TOGGLE */}
          <button
            className="md:hidden text-white p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors focus:outline-none"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </motion.nav>

      {/* MOBILE BOTTOM SHEET MENU */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              key="mobile-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-[48] bg-black/20 backdrop-blur-sm md:hidden"
              onClick={() => setMobileMenuOpen(false)}
            />

            {/* Bottom Sheet */}
            <motion.div
              key="mobile-sheet"
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", stiffness: 350, damping: 35 }}
              className="fixed bottom-0 inset-x-0 z-[49] md:hidden bg-card border-t border-border rounded-t-3xl shadow-[0_-20px_60px_rgba(0,0,0,0.1)] pointer-events-auto overflow-hidden"
              style={{ maxHeight: "85svh" }}
            >
              {/* Drag handle */}
              <div className="flex justify-center pt-3 pb-1">
                <div className="w-10 h-1 rounded-full bg-surface" />
              </div>

              {/* Top accent line */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />

              <div className="px-6 pt-2 pb-8 flex flex-col gap-2 overflow-y-auto">
                {/* Header */}
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold tracking-[0.2em] uppercase text-heading">Navigation</span>
                  <button
                    onClick={() => setMobileMenuOpen(false)}
                    className="w-8 h-8 rounded-full bg-black/5 hover:bg-black/10 flex items-center justify-center text-heading hover:text-heading transition-colors"
                  >
                    <X size={16} />
                  </button>
                </div>

                {/* Nav Links */}
                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05, duration: 0.25 }}
                  >
                    <Link
                      href={link.href}
                      className={cn(
                        "flex items-center justify-between py-3.5 px-4 rounded-2xl font-bold text-base transition-all",
                        activeSection === link.name
                          ? "text-primary bg-primary/10 border border-primary/30"
                          : "text-heading hover:text-accent hover:bg-black/5 border border-transparent"
                      )}
                      onClick={(e) => {
                        handleNavClick(e, link.id, link.name);
                        setMobileMenuOpen(false);
                      }}
                    >
                      <span>{link.name}</span>
                      <ChevronRight
                        size={16}
                        className={cn(
                          "transition-colors",
                          activeSection === link.name ? "text-primary" : "text-body-text"
                        )}
                      />
                    </Link>
                  </motion.div>
                ))}

                {/* CTA */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.35, duration: 0.3 }}
                  className="mt-3"
                >
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      openScheduleModal();
                    }}
                    className="relative overflow-hidden flex items-center justify-center px-6 py-4 rounded-2xl bg-primary text-primary-foreground font-black text-base w-full group"
                  >
                    <span className="relative z-10">Let&apos;s Talk →</span>
                    <span className="absolute -inset-full w-[200%] h-[200%] bg-gradient-to-r from-transparent via-white/30 to-transparent group-hover:animate-shine pointer-events-none" />
                  </button>
                </motion.div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
