"use client";

import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

export default function QualityMissionSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section ref={sectionRef} className="w-full bg-[#F7F7F7] py-24 lg:py-32">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 md:gap-16 lg:gap-24">
          
          {/* Left: Bold Heading */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="w-full md:w-1/2"
          >
            <h2 className="text-3xl md:text-4xl lg:text-[2.75rem] font-medium tracking-tight text-[#111111] leading-[1.2] max-w-md">
              Smarter choices behind every home decision
            </h2>
          </motion.div>

          {/* Right: Explanatory Paragraph */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="w-full md:w-1/2"
          >
            <p className="text-base md:text-lg text-[#666666] font-medium leading-relaxed max-w-lg">
              Designed to make your home search simple, clear, and more confident at every step, helping you explore properties with better understanding and make decisions that truly fit your lifestyle.
            </p>
          </motion.div>

        </div>
      </div>
    </section>
  );
}