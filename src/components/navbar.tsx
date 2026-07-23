"use client";

import { useState, useEffect } from "react";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";

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
  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("Home");

  // Track scroll depth for background opacity and logo shrink
  useMotionValueEvent(scrollY, "change", (latest) => {
    if (latest > 50) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
  });

  // Track active section automatically on scroll to move the indicator pill
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 220; // Viewport offset

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
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Initial check

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // DO NOT show Navbar on /games page
  if (pathname?.startsWith("/games")) return null;

  return (
    <motion.nav
      initial={{ y: 0, opacity: 1 }}
      animate={{ y: 0, opacity: 1 }}
      className="fixed top-0 inset-x-0 z-50 pt-4 px-4 flex justify-center pointer-events-none"
    >
      <div
        className={cn(
          "pointer-events-auto flex items-center justify-between px-5 sm:px-7 py-3 rounded-full transition-all duration-500 w-full max-w-5xl border shadow-xl",
          isScrolled
            ? "bg-[#0A0A0A]/85 backdrop-blur-[20px] border-[#262626] shadow-black/40 py-2.5"
            : "bg-[#0A0A0A]/40 backdrop-blur-[10px] border-white/10"
        )}
      >
        {/* LOGO WITH 10% SHRINK ON SCROLL */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <motion.div
            animate={{ scale: isScrolled ? 0.9 : 1 }}
            transition={{ duration: 0.3 }}
            className="w-9 h-9 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-black text-xl group-hover:scale-110 shadow-[0_0_15px_rgba(238,255,59,0.4)] transition-transform"
          >
            G
          </motion.div>
          <span className="font-heading font-black text-lg sm:text-xl tracking-tight text-white group-hover:text-primary transition-colors">
            GMM<span className="text-primary">.</span>
          </span>
        </Link>

        {/* DESKTOP LINKS WITH MOVING ACTIVE INDICATOR PILL */}
        <div className="hidden md:flex items-center gap-1 bg-white/[0.03] p-1.5 rounded-full border border-white/5">
          {navLinks.map((link) => {
            const isActive = activeSection === link.name;

            return (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setActiveSection(link.name)}
                className={cn(
                  "relative px-4 py-1.5 text-sm font-medium transition-colors group",
                  isActive ? "text-white font-bold" : "text-[#BDBDBD] hover:text-white"
                )}
              >
                {/* Active Radius Indicator Pill that smoothly glides to current section */}
                {isActive && (
                  <motion.div
                    layoutId="activeSectionPill"
                    className="absolute inset-0 bg-primary/20 border border-primary/40 rounded-full shadow-[0_0_15px_rgba(238,255,59,0.2)]"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}

                <span className="relative z-10">{link.name}</span>

                {/* Underline grows from left on hover */}
                <span className="absolute bottom-0 left-3 right-3 h-[2px] bg-primary scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300 rounded-full" />
              </Link>
            );
          })}
        </div>

        {/* LET'S TALK BUTTON */}
        <div className="hidden md:flex">
          <Link
            href="#contact"
            className="relative group overflow-hidden px-6 py-2.5 rounded-full bg-primary text-primary-foreground font-bold text-sm transition-all duration-300 hover:scale-[1.03] hover:-translate-y-0.5 shadow-[0_4px_20px_rgba(238,255,59,0.3)] hover:shadow-[0_8px_30px_rgba(238,255,59,0.5)] active:scale-[0.96]"
          >
            <span className="relative z-10">Let&apos;s Talk</span>
            <span className="absolute -inset-full w-[200%] h-[200%] bg-gradient-to-r from-transparent via-white/40 to-transparent group-hover:animate-shine pointer-events-none" />
          </Link>
        </div>

        {/* MOBILE MENU TOGGLE */}
        <button
          className="md:hidden text-white p-2 rounded-full bg-white/5 hover:bg-white/10 transition-colors focus:outline-none"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle Navigation Menu"
        >
          {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* MOBILE MENU OVERLAY */}
      {mobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.95 }}
          className="absolute top-[80px] left-4 right-4 bg-[#0A0A0A]/95 backdrop-blur-[25px] border border-[#262626] rounded-3xl p-6 flex flex-col gap-4 pointer-events-auto shadow-2xl z-50"
        >
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={cn(
                "text-lg font-bold transition-colors py-2 border-b border-[#262626]/50 flex items-center justify-between",
                activeSection === link.name ? "text-primary" : "text-[#BDBDBD] hover:text-white"
              )}
              onClick={() => {
                setActiveSection(link.name);
                setMobileMenuOpen(false);
              }}
            >
              <span>{link.name}</span>
              <span className="text-xs text-primary">→</span>
            </Link>
          ))}
          <Link
            href="#contact"
            className="mt-2 px-6 py-3.5 rounded-full bg-primary text-primary-foreground font-black text-center w-full shadow-[0_0_20px_rgba(238,255,59,0.4)]"
            onClick={() => setMobileMenuOpen(false)}
          >
            Let&apos;s Talk
          </Link>
        </motion.div>
      )}
    </motion.nav>
  );
}
