"use client";

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowUpRight, Instagram, Mail, MapPin, Phone } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const footerRef = useRef<HTMLDivElement>(null);

  // Cinematic Parallax for the massive text at the bottom
  const { scrollYProgress } = useScroll({
    target: footerRef,
    offset: ["start end", "end end"]
  });

  // The text slowly rises and fades in as you reach the bottom
  const textY = useTransform(scrollYProgress, [0, 1], ["30%", "0%"]);
  const textOpacity = useTransform(scrollYProgress, [0.4, 1], [0, 1]);

  return (
    <footer 
      ref={footerRef} 
      className="relative w-full bg-[#000000] text-white pt-24 pb-8 px-6 md:px-12 overflow-hidden border-t border-white/5"
    >
      {/* ── AMBIENT BACKGROUND GLOW ── */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-[50vh] bg-[radial-gradient(ellipse_at_bottom,rgba(212,175,55,0.08)_0%,rgba(0,0,0,0)_70%)] pointer-events-none" />

      <div className="max-w-[1400px] mx-auto flex flex-col justify-between min-h-[60vh] relative z-10">

        {/* =========================================================================
            TOP SECTION: MOVIE-CREDIT STYLE GRID
        ========================================================================= */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8">
          
          {/* 1. Logo & Vision (Spans 4 columns) */}
          <div className="lg:col-span-4 flex flex-col items-start gap-8">
            <div className="relative w-16 h-16 md:w-24 md:h-24 flex-shrink-0">
              <Image 
                src="/slick/slick-5.png" 
                alt="Slick Construction Symbol" 
                fill
                className="object-contain"
                unoptimized
              />
            </div>
            <p className="text-gray-400 font-medium text-lg leading-relaxed max-w-sm">
              We don't just build homes; we engineer legacies. Precision, transparency, and unmatched architectural rigor.
            </p>
          </div>

          {/* 2. Navigation (Spans 2 columns) */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            <span className="text-[10px] font-mono text-[#D4AF37] uppercase tracking-[0.2em]">
              Directory
            </span>
            <nav className="flex flex-col gap-3">
              <Link href="/services" className="text-lg font-medium text-gray-300 hover:text-white transition-colors">Services</Link>
              <Link href="/portfolio" className="text-lg font-medium text-gray-300 hover:text-white transition-colors">Portfolio</Link>
              <Link href="/about" className="text-lg font-medium text-gray-300 hover:text-white transition-colors">About Us</Link>
              <Link href="/contact" className="text-lg font-medium text-gray-300 hover:text-white transition-colors">Contact</Link>
            </nav>
          </div>

          {/* 3. Contact & Location (Spans 3 columns) */}
          <div className="lg:col-span-3 flex flex-col gap-6">
            <span className="text-[10px] font-mono text-[#D4AF37] uppercase tracking-[0.2em]">
              Headquarters
            </span>
            <div className="flex flex-col gap-4">
              <a href="tel:4156109225" className="group flex items-center gap-3 text-gray-300 hover:text-white transition-colors">
                <Phone size={16} className="text-gray-500 group-hover:text-[#D4AF37] transition-colors" />
                <span className="text-lg font-medium">(415) 610-9225</span>
              </a>
              <a href="mailto:info@pivotalbuildersinc.com" className="group flex items-center gap-3 text-gray-300 hover:text-white transition-colors">
                <Mail size={16} className="text-gray-500 group-hover:text-[#D4AF37] transition-colors" />
                <span className="text-lg font-medium">info@pivotalbuildersinc.com</span>
              </a>
              <div className="flex items-start gap-3 text-gray-300 mt-2">
                <MapPin size={16} className="text-gray-500 mt-1" />
                <p className="text-lg font-medium leading-snug">
                  2560 Geary Blvd, Unit 204 <br/>
                  San Francisco, CA
                </p>
              </div>
            </div>
          </div>

          {/* 4. License & Social (Spans 3 columns) */}
          <div className="lg:col-span-3 flex flex-col gap-6 lg:items-end lg:text-right">
            <span className="text-[10px] font-mono text-[#D4AF37] uppercase tracking-[0.2em]">
              Verification
            </span>
            
            <div className="border border-white/10 bg-white/5 px-6 py-3 rounded-md backdrop-blur-sm">
              <h3 className="text-xl md:text-2xl font-mono font-bold text-white tracking-widest">
                CA LIC 1123494
              </h3>
            </div>

            <a 
              href="https://www.instagram.com/pivotalbuilders/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-3 text-sm font-bold text-black bg-white px-6 py-3 rounded-full hover:bg-[#D4AF37] transition-all w-fit group"
            >
              <Instagram size={18} />
              <span className="uppercase tracking-widest">Follow Us</span>
              <ArrowUpRight size={16} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>
          </div>

        </div>

        {/* =========================================================================
            MIDDLE SECTION: MASSIVE CINEMATIC TITLE
        ========================================================================= */}
        <motion.div 
          style={{ y: textY, opacity: textOpacity }}
          className="w-full flex justify-center mt-32 mb-12 pointer-events-none select-none"
        >
          <h1 className="text-[22vw] leading-[0.75] font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white via-gray-300 to-[#111111]">
            SLICK
          </h1>
        </motion.div>

        {/* =========================================================================
            BOTTOM SECTION: COPYRIGHT & SIGNATURE
        ========================================================================= */}
        <div className="flex flex-col md:flex-row justify-between items-center border-t border-white/10 pt-6 text-[10px] md:text-xs font-mono text-gray-500 uppercase tracking-[0.2em]">
          <p>© {currentYear} Slick Construction Inc.</p>
          
          <a 
            href="https://www.layoutory.in" 
            target="_blank" 
            rel="noopener noreferrer"
            className="group flex items-center gap-2 mt-4 md:mt-0 hover:text-[#D4AF37] transition-colors"
          >
            Engineered by Layoutory 
            <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>
        </div>

      </div>
    </footer>
  );
}