"use client";

import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

export default function AboutVideoSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  
  // Triggers the animation when the top of the video is 100px away from the viewport bottom
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section ref={sectionRef} className="w-full bg-[#F7F7F7] pb-24 lg:pb-32">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.95, y: 40 }}
          animate={isInView ? { opacity: 1, scale: 1, y: 0 } : {}}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full aspect-[4/3] md:aspect-video md:h-[700px] lg:h-[800px] rounded-[2rem] overflow-hidden shadow-[0_30px_60px_rgba(0,0,0,0.15)] border border-black/5 bg-[#111] transform-gpu flex flex-col justify-end"
        >
          {/* ── BACKGROUND LOOPING VIDEO ── */}
          <video 
            src="/about-vid.mp4" 
            autoPlay 
            loop 
            muted 
            playsInline 
            className="absolute inset-0 w-full h-full object-cover z-0"
          />
          
          {/* Subtle gradient at the bottom to ensure the white text on the glass cards is readable without darkening the whole video */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent z-0 pointer-events-none" />
          
          {/* ── PURE GLASSMORPHISM TEXT CARDS (Sleeker & Borderless) ── */}
          <div className="relative z-10 w-full p-6 md:p-8 lg:p-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              
              {/* Left Card: Our Mission */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
                // Borderless, dark-tinted glass with heavy blur and sleeker padding
                className="bg-black/30 backdrop-blur-2xl rounded-[1.5rem] p-6 md:p-8 shadow-lg"
              >
                <h3 className="text-2xl md:text-[1.75rem] font-bold text-white mb-3 tracking-tight">
                  Our Mission
                </h3>
                <p className="text-gray-200 text-sm md:text-base leading-relaxed font-medium">
                  To make high-end construction simple, transparent, and absolutely precise—helping clients build their architectural visions with total confidence and zero guesswork.
                </p>
              </motion.div>

              {/* Right Card: Our Vision */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="bg-black/10 backdrop-blur-2xl rounded-[1.5rem] p-6 md:p-8 shadow-lg"
              >
                <h3 className="text-2xl md:text-[1.75rem] font-bold text-white mb-3 tracking-tight">
                  Our Vision
                </h3>
                <p className="text-gray-200 text-sm md:text-base leading-relaxed font-medium">
                  To pioneer a modern building experience where bringing complex blueprints to life feels effortless, transparent, and perfectly aligned with how modern families live today.
                </p>
              </motion.div>

            </div>
          </div>

          {/* Inner ring for the main video container */}
          <div className="absolute inset-0 rounded-[2rem] ring-1 ring-inset ring-black/10 pointer-events-none z-20" />
        </motion.div>

      </div>
    </section>
  );
}