"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Mail, MapPin } from "lucide-react";
import { useModal } from "@/lib/modal-context";

export function Footer() {
  const { openContactModal } = useModal();
  return (
    <footer className="relative w-full bg-dark-section text-white overflow-hidden pt-32 pb-10 border-t border-primary/20">

      {/* Background Glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[80vw] h-[50vh] bg-primary/20 rounded-t-full blur-[120px] pointer-events-none" />

      <div className="max-w-[1400px] mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-8 mb-24">

          {/* Brand Column */}
          <div className="lg:col-span-5 flex flex-col">
            {/* The Link has a fixed height equal to the old text, so the layout below won't shift. The image wrapper is absolute and grows upward. */}
            <Link href="/" className="relative inline-block w-full h-[50px] mb-8 group">
              <div className="absolute bottom-0 left-0 w-[280px] h-[120px] sm:w-[400px] sm:h-[160px] -ml-2">
                <Image
                  src="/FinalLogoWhite_Cropped.png"
                  alt="Good Marketing Matters"
                  fill
                  className="object-contain object-left-bottom drop-shadow-[0_0_15px_rgba(239,253,50,0.2)] transition-transform duration-500 group-hover:scale-105"
                />
              </div>
            </Link>
            <p className="text-body-text text-lg sm:text-xl font-medium max-w-md leading-relaxed">
              We engineer digital experiences that demand attention and drive uncompromising growth.
            </p>

            <div className="mt-12 flex gap-4">
              <Link href="#" className="w-12 h-12 rounded-full border border-primary/30 flex items-center justify-center text-primary hover:bg-primary hover:text-black transition-all duration-300 hover:shadow-[0_0_20px_rgba(147,51,234,0.5)]">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" x2="17.51" y1="6.5" y2="6.5" /></svg>
              </Link>
              <Link href="#" className="w-12 h-12 rounded-full border border-primary/30 flex items-center justify-center text-primary hover:bg-primary hover:text-black transition-all duration-300 hover:shadow-[0_0_20px_rgba(147,51,234,0.5)]">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" /><rect width="4" height="12" x="2" y="9" /><circle cx="4" cy="4" r="2" /></svg>
              </Link>
              <Link href="#" className="w-12 h-12 rounded-full border border-primary/30 flex items-center justify-center text-primary hover:bg-primary hover:text-black transition-all duration-300 hover:shadow-[0_0_20px_rgba(147,51,234,0.5)]">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" /></svg>
              </Link>
            </div>
          </div>

          {/* Links Columns */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-12 lg:gap-8">
            <div className="flex flex-col gap-6">
              <h4 className="text-xl font-bold uppercase tracking-widest text-primary mb-4 drop-shadow-[0_0_10px_rgba(147,51,234,0.5)]">Explore</h4>
              <nav className="flex flex-col gap-4">
                {["Services", "About Us", "Our Work", "Insights", "Contact"].map((item) => (
                  <Link
                    key={item}
                    href="#"
                    className="text-lg font-medium text-gray-300 hover:text-accent transition-colors duration-300 w-fit group flex items-center gap-2"
                  >
                    <span className="w-0 h-[2px] bg-accent transition-all duration-300 group-hover:w-4" />
                    {item}
                  </Link>
                ))}
              </nav>
            </div>

            <div className="flex flex-col gap-6">
              <h4 className="text-xl font-bold uppercase tracking-widest text-primary mb-4 drop-shadow-[0_0_10px_rgba(147,51,234,0.5)]">Contact</h4>

              <div className="flex items-start gap-4 text-gray-300 group cursor-pointer hover:text-accent transition-colors">
                <MapPin className="w-6 h-6 shrink-0 mt-1 text-primary group-hover:text-accent transition-colors" />
                <p className="text-lg font-medium leading-relaxed">
                  Walmmiki Nagar, Latur-413512
                </p>
              </div>

              <div className="flex items-center gap-4 text-gray-300 mt-4 group cursor-pointer hover:text-accent transition-colors">
                <Mail className="w-6 h-6 shrink-0 text-primary group-hover:text-accent transition-colors" />
                <p className="text-lg font-medium">goodmarketingmatters.co</p>
              </div>
            </div>
          </div>
        </div>

        {/* Massive Animated CTA */}
        <div className="w-full py-10 md:py-16 border-y border-primary/20 relative group overflow-hidden rounded-[2rem] bg-surface/30 backdrop-blur-sm mb-16">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-accent/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
          <button onClick={openContactModal} className="flex flex-col md:flex-row items-center justify-between w-full text-center md:text-left gap-6 md:gap-8 px-6 md:px-16 relative z-10 cursor-pointer">
            <h2 className="text-3xl sm:text-4xl md:text-6xl font-bold tracking-tight text-white uppercase group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-accent transition-all duration-500">
              Ready to <br className="hidden md:block" />dominate?
            </h2>
            <div className="w-20 h-20 md:w-32 md:h-32 rounded-full bg-primary flex items-center justify-center group-hover:bg-accent group-hover:scale-110 transition-all duration-500 shadow-[0_0_30px_rgba(147,51,234,0.6)] group-hover:shadow-[0_0_50px_rgba(239,253,50,0.8)] shrink-0">
              <ArrowRight className="w-10 h-10 md:w-16 md:h-16 text-black -rotate-45 group-hover:rotate-0 transition-transform duration-500" />
            </div>
          </button>
        </div>

        {/* Footer Bottom */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pt-8 border-t border-primary/20 text-gray-500 font-medium">
          <p>© {new Date().getFullYear()} GMM. All rights reserved.</p>
          <div className="flex gap-8 text-sm uppercase tracking-widest">
            <Link href="#" className="hover:text-primary transition-colors">Privacy Policy</Link>
            <Link href="#" className="hover:text-primary transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
