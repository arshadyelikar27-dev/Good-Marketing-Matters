"use client";

import { useState, useEffect } from "react";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Services", href: "#services" },
  { name: "About", href: "#about" },
  { name: "Clients", href: "#clients" },
  { name: "Reviews", href: "#reviews" },
];

export function Navbar() {
  const pathname = usePathname();
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    
    if (latest > previous && latest > 150) {
      setHidden(true);
    } else {
      setHidden(false);
    }
    
    if (latest > 50) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
  });

  if (pathname?.startsWith("/games")) return null;

  return (
    <motion.nav
      variants={{
        visible: { y: 0 },
        hidden: { y: "-100%" },
      }}
      animate={hidden ? "hidden" : "visible"}
      transition={{ duration: 0.35, ease: "easeInOut" }}
      className="fixed top-0 inset-x-0 z-50 pt-4 px-4 flex justify-center pointer-events-none"
    >
      <div
        className={cn(
          "pointer-events-auto flex items-center justify-between px-4 sm:px-6 py-2.5 sm:py-3 rounded-full transition-all duration-300 w-full max-w-5xl border border-[#262626] shadow-sm",
          isScrolled 
            ? "bg-[#151515]/95 backdrop-blur-md shadow-lg border-[#262626]" 
            : "bg-[#0A0A0A]/80 backdrop-blur-sm"
        )}
      >
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold text-xl group-hover:scale-110 transition-transform">
            G
          </div>
          <span className="font-heading font-bold text-lg sm:text-xl tracking-tight text-white group-hover:text-primary transition-colors">
            GMM
          </span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-sm font-medium text-[#BDBDBD] hover:text-white transition-colors relative after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-primary after:transition-all hover:after:w-full"
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Let's Talk Button */}
        <div className="hidden md:flex">
          <Link
            href="#contact"
            className="px-5 py-2 rounded-full bg-primary text-primary-foreground font-medium text-sm hover:bg-primary-hover transition-colors shadow-[0_0_15px_rgba(238,255,59,0.25)] hover:shadow-[0_0_25px_rgba(238,255,59,0.5)]"
          >
            Let&apos;s Talk
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden text-white p-1 rounded-lg focus:outline-none"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle Navigation Menu"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
      
      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="absolute top-[75px] sm:top-[80px] left-4 right-4 bg-[#151515]/98 backdrop-blur-xl border border-[#262626] rounded-3xl p-6 flex flex-col gap-4 pointer-events-auto shadow-2xl max-h-[calc(100vh-100px)] overflow-y-auto">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-lg font-medium text-[#BDBDBD] hover:text-primary transition-colors py-2 border-b border-[#262626]"
              onClick={() => setMobileMenuOpen(false)}
            >
              {link.name}
            </Link>
          ))}
          <Link
            href="#contact"
            className="mt-4 px-6 py-3 rounded-full bg-primary text-primary-foreground font-bold text-center w-full"
            onClick={() => setMobileMenuOpen(false)}
          >
            Let&apos;s Talk
          </Link>
        </div>
      )}
    </motion.nav>
  );
}
