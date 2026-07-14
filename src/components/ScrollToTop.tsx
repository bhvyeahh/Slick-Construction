"use client";

import { useEffect, useState } from 'react';
import { ArrowUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  // Toggle visibility based on scroll position
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    // Added { passive: true } for better scroll performance
    window.addEventListener('scroll', toggleVisibility, { passive: true });
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  // Scroll to top handler
  const scrollToTop = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault(); // Prevents default browser behaviors from interrupting the click
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          type="button"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.5 }}
          onClick={scrollToTop}
          /* 
            FIX: Changed standard hover to lg:hover to prevent the iOS double-tap bug.
            Added active:bg-black for instant feedback on mobile devices.
          */
          className="fixed bottom-8 right-8 z-[9999] p-3 rounded-full bg-white/10 text-black backdrop-blur-md border border-black/10 transition-colors shadow-lg group lg:hover:bg-black lg:hover:text-white active:bg-black active:text-white cursor-pointer"
          aria-label="Scroll to top"
        >
          <ArrowUp 
            size={24} 
            strokeWidth={2}
            className="lg:group-hover:-translate-y-1 transition-transform duration-300" 
          />
        </motion.button>
      )}
    </AnimatePresence>
  );
}