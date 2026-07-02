"use client";

import React from 'react';
import { ArrowUpRight, Instagram } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-[#050505] text-white py-16 px-6 md:px-12 border-t border-white/10">
      <div className="max-w-[1400px] mx-auto flex flex-col justify-between min-h-[50vh]">

        {/* =======================
            TOP SECTION: SYMBOL + HEADER + LICENSE
        ======================== */}
        <div className="flex flex-col md:flex-row justify-between items-start gap-12 mb-10">
           
           {/* LEFT: Symbol + Heading */}
           <div className="flex items-start gap-6 md:gap-8">
              
              {/* Circular Symbol Logo */}
              <div className="relative w-12 h-12 md:w-20 md:h-20 flex-shrink-0 mt-2">
                 <Image 
                   src="/logo-symbol.PNG" 
                   alt="Pivotal Symbol" 
                   fill
                   className="object-contain"
                 />
              </div>

              <h2 className="text-4xl md:text-6xl font-bold tracking-tighter leading-none text-white">
                LET'S DISCUSS <br/> <span className="text-neutral-500">YOUR PROJECT</span>
              </h2>
           </div>

           {/* RIGHT: PROMINENT LICENSE BADGE */}
           <div className="flex flex-col items-start md:items-end">
              <span className="text-xs font-mono text-neutral-400 uppercase tracking-widest mb-2">License</span>
              <div className="border border-white/20 bg-white/5 px-5 py-2 rounded-lg backdrop-blur-sm">
                 <h3 className="text-xl md:text-2xl font-mono font-bold text-white tracking-widest">
                   CA LIC 1123494
                 </h3>
              </div>
           </div>

        </div>

        {/* =======================
            MIDDLE: LINKS & INFO GRID
        ======================== */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 border-t border-white/10 pt-10">
           
           {/* 1. Contact Info */}
           <div className="flex flex-col gap-4">
              <span className="text-xs font-mono uppercase tracking-widest text-neutral-500">Contact</span>
              <div className="flex flex-col gap-1">
                <a href="tel:4156109225" className="text-lg font-medium hover:text-neutral-300 transition-colors">
                  (415) 610-9225
                </a>
                <a href="mailto:info@pivotalbuildersinc.com" className="text-lg font-medium hover:text-neutral-300 transition-colors">
                  info@pivotalbuildersinc.com
                </a>
              </div>
           </div>

           {/* 2. Office & Social */}
           <div className="flex flex-col gap-4">
              <span className="text-xs font-mono uppercase tracking-widest text-neutral-500">Office</span>
              <p className="text-neutral-300 leading-snug">
                2560 Geary Blvd, Unit 204 <br/>
                San Francisco, CA
              </p>
              
              {/* Instagram Button */}
              <a 
                href="https://www.instagram.com/pivotalbuilders/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="mt-2 inline-flex items-center gap-2 text-sm font-bold text-white border border-white/20 px-4 py-2 rounded-full hover:bg-white hover:text-black transition-all w-fit group"
              >
                <Instagram size={16} />
                <span>Instagram</span>
                <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>
           </div>

           {/* 3. Quick Links & Copy */}
           <div className="flex flex-col gap-4 md:items-end md:text-right justify-between">
              <div className="flex flex-col gap-2">
                 <Link href="/services" className="text-neutral-400 hover:text-white transition-colors">Services</Link>
                 <Link href="/portfolio" className="text-neutral-400 hover:text-white transition-colors">Portfolio</Link>
                 <Link href="/contact" className="text-neutral-400 hover:text-white transition-colors">Contact</Link>
              </div>
              
              <div className="mt-8 md:mt-0">
                <p className="text-xs text-neutral-600">
                  © {currentYear} Pivotal Builders Inc.
                </p>

                <a 
                  href="https://www.layoutory.in" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-[10px] text-neutral-700 hover:text-neutral-500 transition-colors uppercase tracking-wider"
                >
                  Website by Layoutory
                </a>
              </div>
           </div>

        </div>

      </div>
    </footer>
  );
}