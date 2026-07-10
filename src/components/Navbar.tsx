"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { 
  ArrowRight, 
  Menu, 
  X,
  Instagram 
} from 'lucide-react';

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Services", href: "/services" },
  { name: "Portfolio", href: "/portfolio" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Lock Body Scroll when Mobile Menu is Open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  // Mobile Menu Animation Variants
  const menuVariants: Variants = {
    closed: { 
      opacity: 0,
      y: "-20px",
      transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] }
    },
    open: { 
      opacity: 1,
      y: "0%",
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1], staggerChildren: 0.08, delayChildren: 0.1 }
    }
  };

  const linkVariants: Variants = {
    closed: { opacity: 0, y: 20 },
    open: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } }
  };

  return (
    <>
      {/* ── SPLIT LIQUID GLASS NAVBAR ── */}
      <div className="absolute top-6 left-0 w-full z-50 flex justify-center px-4 pointer-events-none">
        
        {/* 70vw Container holding both sides */}
        <div className="w-full md:w-[70vw] max-w-[1200px] flex items-center justify-between pointer-events-auto">
          
          {/* ==========================================
              LEFT: LOGO (HIDDEN ON MOBILE, VISIBLE ON DESKTOP)
          ========================================== */}
          <Link href="/" className="hidden md:block relative md:w-40 md:h-20 shrink-0 transition-transform duration-500 hover:scale-110">
            <Image 
              src="/slick/slick-logo.png" 
              alt="Logo" 
              fill
              className="object-contain drop-shadow-md"
              priority
            />
          </Link>

          {/* ==========================================
              RIGHT: LIQUID GLASS NAV PANEL (Desktop)
          ========================================== */}
          <nav className="hidden md:flex items-center gap-8 bg-white/30 backdrop-blur-xl backdrop-saturate-150 border border-white/40 shadow-[0_8px_32px_rgba(0,0,0,0.1)] rounded-full px-8 py-3.5">
            {navLinks.map((link) => (
              <Link 
                key={link.name} 
                href={link.href} 
                className="text-[12px] uppercase tracking-[0.15em] font-extrabold font-mono text-black hover:text-[#D4AF37] transition-colors duration-300"
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* ==========================================
              RIGHT: MOBILE TOGGLE (Liquid Glass)
          ========================================== */}
          {/* ml-auto ensures it stays on the right side when the logo is hidden */}
          <button 
            className="md:hidden ml-auto flex items-center justify-center p-3 rounded-full bg-white/30 backdrop-blur-xl backdrop-saturate-150 border border-white/40 shadow-lg text-black hover:bg-white/40 transition-colors"
            onClick={() => setIsMobileMenuOpen(true)}
            aria-label="Open Mobile Menu"
          >
            <Menu size={24} strokeWidth={2} />
          </button>

        </div>
      </div>

      {/* ── LUXURY FULL SCREEN OVERLAY MOBILE ENTRY ── */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial="closed"
            animate="open"
            exit="closed"
            variants={menuVariants}
            className="fixed inset-0 z-[60] bg-[#0A0A0A] flex flex-col w-screen h-[100dvh] overflow-hidden"
          >
            {/* Mobile Header Elements */}
            <div className="flex justify-between items-center p-6 shrink-0 border-b border-white/10">
              <div className="flex items-center gap-3">
                {/* LARGER LOGO FOR MOBILE MENU OVERLAY */}
                <div className="relative w-32 h-16">
                  <Image
                    src="/slick/slick-5.png" 
                    alt="Logo" 
                    fill
                    className="object-contain"
                  />
                </div>
              </div>

              <button 
                onClick={() => setIsMobileMenuOpen(false)} 
                className="text-[#D4AF37] p-2 border border-[#D4AF37]/30 rounded-full hover:bg-[#D4AF37]/10 transition-colors"
              >
                <X size={22} />
              </button>
            </div>

            {/* Vertical Flow Navigation Routes */}
            <motion.nav 
              variants={menuVariants}
              className="flex flex-col gap-6 flex-grow justify-center px-8 md:px-16"
            >
              {navLinks.map((link) => (
                <Link 
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block w-fit"
                >
                  <motion.div 
                    variants={linkVariants}
                    className="text-4xl font-bold tracking-tight text-white hover:text-[#D4AF37] transition-colors duration-300 flex items-center gap-4 group"
                  >
                    {link.name}
                    <ArrowRight size={20} className="opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 text-[#D4AF37]" />
                  </motion.div>
                </Link>
              ))}

              {/* Secondary Utility Channels */}
              <motion.div variants={linkVariants} className="mt-8 pt-8 border-t border-white/10 flex flex-col gap-3 font-mono text-xs uppercase tracking-widest">
                <a href="mailto:info@slickconstruction.com" className="text-gray-400 hover:text-[#D4AF37] transition-colors duration-300">
                  info@slickconstruction.com
                </a>
                <a href="tel:4156109225" className="text-gray-400 hover:text-[#D4AF37] transition-colors duration-300">
                  (415) 610-9225
                </a>
              </motion.div>
            </motion.nav>

            {/* Footer Segment */}
            <motion.div 
              variants={linkVariants}
              className="mt-auto border-t border-white/10 p-6 shrink-0 pb-10 bg-[#111111]"
            >
              <div className="flex flex-row items-center justify-between gap-6">
                <a 
                  href="https://www.instagram.com/slick_constsf/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-white hover:text-[#D4AF37] transition-colors duration-300 w-fit"
                >
                  <div className="bg-white/5 p-3 rounded-full border border-white/10">
                    <Instagram size={16} />
                  </div>
                </a>

                <div className="flex flex-col gap-1 font-mono text-right">
                  <span className="text-gray-500 text-[10px] tracking-widest uppercase">
                    Architectural Operations
                  </span>
                  <span className="text-[#D4AF37] text-sm font-bold tracking-wider">
                    CA LIC 1123494
                  </span>
                </div>
              </div>
            </motion.div>

          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}