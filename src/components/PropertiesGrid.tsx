"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function PropertiesGrid() {
  // Animation variants for smooth reveal
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }, // Custom smooth easing
    },
  };

  return (
    <section className="w-full max-w-[1400px] mx-auto px-6 py-16 bg-white text-black">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        {/* === TOP HEADER SECTION === */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.5fr_1fr] border-b border-gray-200 pb-12 mb-12">
          
          {/* 1. Heading */}
          <motion.div variants={itemVariants} className="lg:border-r border-gray-200 lg:pr-12">
            <h2 className="text-5xl md:text-7xl font-serif tracking-tight leading-[1.1]">
              Our<br />
              Properties
            </h2>
          </motion.div>

          {/* 2. Middle Subtitle */}
          <motion.div variants={itemVariants} className="lg:border-r border-gray-200 lg:px-12 pt-8 lg:pt-0 flex items-center">
            <p className="text-xs md:text-sm font-mono uppercase tracking-wide leading-relaxed font-semibold max-w-md">
              Discover our handpicked properties in prime locations, selected for their design, comfort, and long-term value.
            </p>
          </motion.div>

          {/* 3. Link / CTA */}
          <motion.div variants={itemVariants} className="lg:pl-12 pt-8 lg:pt-0 flex items-center lg:justify-end">
            <a
              href="#"
              className="group flex items-center text-xs font-mono uppercase font-bold tracking-wider hover:text-gray-500 transition-colors"
            >
              See All Properties
              {/* Custom Long Arrow */}
              <div className="ml-4 flex items-center relative w-24">
                <div className="w-full h-[1px] bg-black group-hover:bg-gray-500 transition-colors" />
                <div className="absolute right-0 w-2 h-2 border-t border-r border-black group-hover:border-gray-500 transition-colors transform rotate-45 -translate-y-[0.5px]" />
              </div>
            </a>
          </motion.div>
        </div>

        {/* === BENTO GRID SECTION (Up - Down - Up) === */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          
          {/* Left Column (UP) */}
          <motion.div variants={itemVariants} className="flex flex-col">
            <div className="relative w-full aspect-[4/3] overflow-hidden bg-gray-100">
              <Image
                src="/slick/slick-14.png"
                alt="Soriyano Residence"
                fill
                className="object-cover hover:scale-105 transition-transform duration-700 ease-in-out"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
            </div>
            <div className="flex justify-between items-center mt-4 text-[11px] font-mono font-bold uppercase tracking-widest">
              <span>2023</span>
              <span>Soriyano Residence</span>
            </div>
          </motion.div>

          {/* Middle Column (DOWN) */}
          <motion.div variants={itemVariants} className="flex flex-col">
            {/* Text pushed above image to create the 'down' layout */}
            <p className="text-[11px] font-mono uppercase tracking-wide leading-relaxed font-semibold mb-6">
              Located in a strategic area, this residence combines contemporary architecture with thoughtfully planned living spaces—perfect for families and long-term investment.
            </p>
            <div className="relative w-full aspect-[4/3] overflow-hidden bg-gray-100">
              <Image
                src="/slick/slick-17.png"
                alt="Marendra Residence"
                fill
                className="object-cover hover:scale-105 transition-transform duration-700 ease-in-out"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
            </div>
            <div className="flex justify-between items-center mt-4 text-[11px] font-mono font-bold uppercase tracking-widest">
              <span>2024</span>
              <span>Marendra Residence</span>
            </div>
          </motion.div>

          {/* Right Column (UP) */}
          <motion.div variants={itemVariants} className="flex flex-col justify-between h-full">
            <div>
              <div className="relative w-full aspect-[4/3] overflow-hidden bg-gray-100">
                <Image
                  src="/slick/slick-19.png"
                  alt="Brastana House"
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-700 ease-in-out"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
              <div className="flex justify-between items-center mt-4 text-[11px] font-mono font-bold uppercase tracking-widest">
                <span>2024</span>
                <span>Brastana House</span>
              </div>
            </div>

            {/* Pagination Controls */}
            <div className="flex justify-end mt-8 md:mt-0 gap-3">
              <button className="w-12 h-12 border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-colors">
                {/* Left Arrow SVG */}
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M19 12H5M5 12L12 19M5 12L12 5" strokeLinecap="square" strokeLinejoin="miter"/>
                </svg>
              </button>
              <button className="w-12 h-12 bg-[#111] text-white flex items-center justify-center hover:bg-black transition-colors">
                {/* Right Arrow SVG */}
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M5 12H19M19 12L12 5M19 12L12 19" strokeLinecap="square" strokeLinejoin="miter"/>
                </svg>
              </button>
            </div>
          </motion.div>
          
        </div>
      </motion.div>
    </section>
  );
}