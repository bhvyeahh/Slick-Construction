"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
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
  const pathname = usePathname();

  // Check if we are on the Home page
  const isHome = pathname === "/";

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

  // Mobile Menu Animation Variants (UNTOUCHED)
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
        
        {/* Container holding both sides */}
        <div className="w-full md:w-[70vw] max-w-[1400px] flex items-center justify-between pointer-events-auto">
          
          {/* ==========================================
              LEFT: LOGO (ALWAYS VISIBLE - MOBILE & DESKTOP)
          ========================================== */}
          <Link href="/" className="relative w-48 h-28 md:w-72 md:h-28 shrink-0 transition-transform duration-500 hover:scale-105 group">
            
            {/* AMBIENT GLOW BACKLIGHT */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] h-[70%] bg-white/50 md:bg-white/20 blur-[20px] md:blur-[25px] rounded-[100%] pointer-events-none opacity-100 md:opacity-50 group-hover:opacity-60 transition-opacity duration-500 z-0" />
            
            <div className="relative w-full h-full z-10">
              {/* Home Page Logo - Instantly hides on mobile, smooth fades on desktop */}
              <Image 
                src="/logo.png" 
                alt="Logo" 
                fill
                className={`object-contain object-left drop-shadow-[0_0_25px_rgba(255,255,255,0.8)] md:drop-shadow-[0_0_15px_rgba(255,255,255,0.4)] md:transition-opacity md:duration-500 ${
                  isHome ? 'opacity-100' : 'opacity-0'
                }`}
                priority
              />
              
              {/* Internal Pages Logo - Instantly shows on mobile, smooth fades on desktop */}
              <Image 
                src="/slick/slick-logo.png" 
                alt="Logo" 
                fill
                className={`object-contain object-left drop-shadow-[0_0_25px_rgba(255,255,255,0.8)] md:drop-shadow-[0_0_15px_rgba(255,255,255,0.4)] md:transition-opacity md:duration-500 ${
                  !isHome ? 'opacity-100' : 'opacity-0'
                }`}
                priority
              />
            </div>
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
            /* Swoop down entry with fluid curve, dive-in exit */
            initial={{ y: "-100%", borderBottomLeftRadius: "100%", borderBottomRightRadius: "100%" }}
            animate={{ 
              y: "0%", 
              borderBottomLeftRadius: "0%", 
              borderBottomRightRadius: "0%",
              transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } 
            }}
            exit={{ 
              scale: 1.15, 
              opacity: 0, 
              filter: "blur(15px)",
              transition: { duration: 0.6, ease: [0.76, 0, 0.24, 1] } 
            }}
            className="fixed inset-0 z-[60] bg-[#050505] flex flex-col w-screen h-[100dvh] overflow-hidden origin-center"
          >
            {/* --- Minimalist Header (Black/Default) --- */}
            <div className="flex justify-end items-center p-6 md:p-10 shrink-0 relative z-20">
              
              <button 
                onClick={() => setIsMobileMenuOpen(false)} 
                className="group flex items-center gap-3 text-white transition-all duration-300"
              >
                <span className="hidden sm:block text-[10px] uppercase tracking-widest font-mono group-hover:text-[#D4AF37] transition-colors">
                  Close
                </span>
                <div className="p-4 bg-white/5 border border-white/10 rounded-full group-active:scale-90 group-active:bg-[#D4AF37] group-active:text-black transition-all">
                  <X size={18} strokeWidth={2} />
                </div>
              </button>
              
            </div>

            {/* --- Massive Typography Navigation --- */}
            <div className="flex-1 flex flex-col justify-center px-6 md:px-16 lg:px-24 w-full relative z-10">
              <motion.div 
                initial="closed"
                animate="open"
                exit="closed"
                variants={{
                  open: { transition: { staggerChildren: 0.08, delayChildren: 0.3 } },
                  closed: { transition: { staggerChildren: 0.04, staggerDirection: -1 } }
                }}
                className="flex flex-col gap-2 w-full"
              >
                {navLinks.map((link, i) => (
                  <div key={link.name} className="overflow-hidden w-full border-b border-white/5 pb-2 md:pb-4">
                    <motion.div
                      variants={{
                        closed: { y: "120%", rotate: 2, opacity: 0 },
                        open: { y: "0%", rotate: 0, opacity: 1, transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } }
                      }}
                      className="origin-bottom-left"
                    >
                      <Link 
                        href={link.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="group flex items-baseline gap-6 w-full"
                      >
                        {/* Number Indicator */}
                        <span className="text-gray-600 font-mono text-sm md:text-lg group-hover:text-[#D4AF37] transition-colors duration-500">
                          0{i + 1}
                        </span>
                        
                        {/* Giant Link Text */}
                        <span className="text-5xl md:text-7xl font-black uppercase tracking-tighter text-white group-hover:translate-x-4 group-hover:text-[#D4AF37] transition-all duration-500 ease-[0.76,0,0.24,1]">
                          {link.name}
                        </span>
                      </Link>
                    </motion.div>
                  </div>
                ))}
              </motion.div>
            </div>

            {/* --- Sophisticated Footer --- */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0, transition: { delay: 0.8, duration: 0.8, ease: [0.76, 0, 0.24, 1] } }}
              exit={{ opacity: 0, transition: { duration: 0.3 } }}
              className="p-6 md:p-10 shrink-0 flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6 relative z-20"
            >
              <div className="flex flex-col gap-2 font-mono text-[10px] uppercase tracking-widest text-gray-500">
                <a href="mailto:info@slickconstruction.com" className="hover:text-[#D4AF37] transition-colors duration-300 block">
                  info@slickconstruction.com
                </a>
                <a href="tel:4156109225" className="hover:text-[#D4AF37] transition-colors duration-300 block">
                  (415) 610-9225
                </a>
              </div>
              
              <div className="flex items-center gap-4">
                <span className="font-mono text-[10px] uppercase tracking-widest text-gray-500">
                  Follow
                </span>
                <a 
                  href="https://www.instagram.com/slick_constsf/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-white p-3 border border-white/10 rounded-full hover:bg-white/10 hover:text-[#D4AF37] hover:border-[#D4AF37]/30 transition-all duration-300"
                >
                  <Instagram size={16} strokeWidth={1.5} />
                </a>
              </div>
            </motion.div>

          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}