"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Mail, Phone, MapPin } from "lucide-react";
import { motion } from "framer-motion";

export function Footer() {
  return (
    <footer className="relative w-full bg-[#050505] text-white pt-24 pb-12 px-6 md:px-12 border-t border-white/10 z-50 overflow-hidden">
      <div className="w-full max-w-7xl mx-auto flex flex-col gap-16">
        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-16">
          
          {/* Left Column */}
          <div className="flex flex-col items-start justify-between">
            <div>
              <h2 className="text-4xl md:text-6xl font-medium tracking-tighter mb-6">
                Let's build <br/>
                <span className="text-primary italic">something great.</span>
              </h2>
              <Link 
                href="#project"
                className="group inline-flex items-center gap-4 px-8 py-4 bg-white text-black rounded-full text-lg font-medium hover:bg-white/90 transition-colors"
              >
                Start a project
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
            
            <div className="mt-20 flex gap-12 text-white/50">
              <div className="flex flex-col gap-2">
                <span className="text-white font-medium mb-2">Socials</span>
                <a href="#" className="hover:text-white transition-colors">Instagram</a>
                <a href="#" className="hover:text-white transition-colors">Twitter (X)</a>
                <a href="#" className="hover:text-white transition-colors">LinkedIn</a>
                <a href="#" className="hover:text-white transition-colors">Awwwards</a>
              </div>
              <div className="flex flex-col gap-2">
                <span className="text-white font-medium mb-2">Sitemap</span>
                <Link href="#services" className="hover:text-white transition-colors">Services</Link>
                <Link href="#about" className="hover:text-white transition-colors">About</Link>
                <Link href="#reviews" className="hover:text-white transition-colors">Work</Link>
                <Link href="#contact" className="hover:text-white transition-colors">Contact</Link>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="flex flex-col items-start md:items-end justify-between">
            <div className="flex flex-col gap-8 w-full max-w-sm">
              <div className="flex gap-4 items-start">
                <MapPin className="w-6 h-6 text-primary shrink-0" />
                <div>
                  <h4 className="text-white font-medium mb-1">Headquarters</h4>
                  <p className="text-white/50 leading-relaxed">
                    123 Innovation Drive,<br/>
                    Tech District, NY 10001
                  </p>
                </div>
              </div>
              <div className="flex gap-4 items-start">
                <Mail className="w-6 h-6 text-primary shrink-0" />
                <div>
                  <h4 className="text-white font-medium mb-1">Inquiries</h4>
                  <p className="text-white/50">hello@gmmagency.com</p>
                </div>
              </div>
              <div className="flex gap-4 items-start">
                <Phone className="w-6 h-6 text-primary shrink-0" />
                <div>
                  <h4 className="text-white font-medium mb-1">Phone</h4>
                  <p className="text-white/50">+1 (555) 123-4567</p>
                </div>
              </div>
            </div>
          </div>

        </div>

        <div className="w-full mt-16 md:mt-0 flex flex-col items-start md:flex-row md:items-end justify-between border-t border-white/10 pt-8 max-w-7xl mx-auto">
          <div className="h-32 sm:h-40 md:h-48">
            <Image 
              src="/FinalLogoWhite_Cropped.png"
              alt="GMM Logo"
              width={1024}
              height={1536}
              className="h-full w-auto object-contain object-left-bottom"
              priority
            />
          </div>
          <div className="flex w-full md:w-auto justify-between md:justify-end items-end mt-12 md:mt-0 gap-6 text-sm text-white/40 pb-4">
            <span>© {new Date().getFullYear()} Good Marketing Matters.</span>
            <Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link>
          </div>
        </div>

      </div>
    </footer>
  );
}
