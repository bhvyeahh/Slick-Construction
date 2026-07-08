"use client";

import React, { useRef } from 'react';
import Image from 'next/image';
import { motion, useInView, Variants } from 'framer-motion';

export default function AboutHeroSection() {
  const heroRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(heroRef, { once: true, margin: "-50px" });

  // ─────────────────────────────────────────────────────────────────
  // ANIMATION VARIANTS
  // ─────────────────────────────────────────────────────────────────
  const containerVariants: Variants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.15, delayChildren: 0.1 },
    },
  };

  const fadeUpVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } 
    },
  };

  const imageRevealVariants: Variants = {
    hidden: { opacity: 0, scale: 1.05 },
    visible: { 
      opacity: 1, 
      scale: 1, 
      transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] } 
    },
  };

  return (
    <section ref={heroRef} className="pt-32 pb-20 px-6 md:px-12 relative z-10">
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="max-w-[1400px] mx-auto"
      >
        
        {/* Main Asymmetrical Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 min-h-[75vh]">
          
          {/* LEFT COLUMN (Spans 5 cols) - Text on top, Image on bottom */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            
            {/* Text Block */}
            <div className="mb-12 lg:mb-0 pt-4">
              <motion.div variants={fadeUpVariants} className="flex items-center gap-2 mb-6">
                {/* Target/Concentric Circles Icon */}
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4 text-gray-400">
                  <circle cx="12" cy="12" r="10" />
                  <circle cx="12" cy="12" r="4" />
                </svg>
                <span className="text-xs font-bold uppercase tracking-[0.15em] text-gray-500">
                  About Us
                </span>
              </motion.div>

              <motion.h1 variants={fadeUpVariants} className="text-5xl md:text-6xl lg:text-[4.25rem] font-bold tracking-tighter text-[#0A0A0A] leading-[1.05] mb-6">
                Discover homes that fit your lifestyle
              </motion.h1>

              <motion.p variants={fadeUpVariants} className="text-lg text-gray-500 font-medium leading-relaxed max-w-md">
                We help people discover, explore, and choose homes with clarity - combining design, data, and a modern real estate experience.
              </motion.p>
            </div>

            {/* Bottom Left Image (Horizontal) */}
            <motion.div variants={imageRevealVariants} className="relative w-full aspect-[4/3] rounded-[2rem] overflow-hidden shadow-lg border border-black/5 mt-auto hidden lg:block">
              <Image 
                src="/slick/slick-5.png" 
                alt="Modern Home Exterior" 
                fill
                className="object-cover"
                 
              />
            </motion.div>
          </div>

          {/* RIGHT COLUMN (Spans 7 cols) - Massive Vertical Image */}
          <motion.div variants={imageRevealVariants} className="lg:col-span-7 relative w-full h-[500px] lg:h-full min-h-[600px] rounded-[2rem] overflow-hidden shadow-xl border border-black/5">
             <Image 
                src="/slick/slick-2.png" 
                alt="Luxury A-Frame Home" 
                fill
                className="object-cover"
                 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />
          </motion.div>

          {/* Bottom Left Image (Mobile Fallback) */}
          <motion.div variants={imageRevealVariants} className="relative w-full aspect-[4/3] rounded-[2rem] overflow-hidden shadow-lg border border-black/5 block lg:hidden">
            <Image 
              src="/slick/slick-5.png" 
              alt="Modern Home Exterior" 
              fill
              className="object-cover"
               
            />
          </motion.div>

        </div>
      </motion.div>
    </section>
  );
}