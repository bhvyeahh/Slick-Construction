"use client";

import Image from "next/image";
import { motion, Variants } from "framer-motion";

export default function PropertiesGrid() {
  // Animation variants for smooth reveal
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }, // Custom smooth easing
    },
  };

  return (
    <section className="w-full max-w-[1400px] mx-auto px-6 py-36 md:py-38 bg-white text-black">
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
            {/* Removed font-serif, added font-light and tracking-tighter for a modern luxury feel */}
            <h2 className="text-5xl md:text-7xl font-light tracking-tighter leading-[1.1]">
              Our<br />
              Properties
            </h2>
          </motion.div>

          {/* 2. Middle Subtitle */}
          <motion.div variants={itemVariants} className="lg:border-r border-gray-200 lg:px-12 pt-8 lg:pt-0 flex items-center">
            {/* Removed font-mono and uppercase. Made it a clean, soft paragraph. */}
            <p className="text-sm md:text-base text-gray-600 leading-relaxed max-w-md font-normal">
              Discover our handpicked properties in prime locations, selected for their design, comfort, and long-term value.
            </p>
          </motion.div>

          {/* 3. Link / CTA */}
          <motion.div variants={itemVariants} className="lg:pl-12 pt-8 lg:pt-0 flex items-center lg:justify-end">
            {/* Removed font-mono, kept it clean and medium weight */}
            <a
              href="#"
              className="group flex items-center text-sm font-medium tracking-wide hover:text-gray-500 transition-colors"
            >
              See All Properties - Scroll Down
            </a>
          </motion.div>
        </div>

        {/* === BENTO GRID SECTION (Up - Down - Up) === */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          
          {/* Left Column (UP) */}
          <motion.div variants={itemVariants} className="flex flex-col">
            <div className="relative w-full aspect-[4/3] overflow-hidden bg-gray-100">
              <Image
                src="/Green-Street/green-4.png"
                alt="Green Street Residence"
                fill
                className="object-cover hover:scale-105 transition-transform duration-700 ease-in-out"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
            </div>
            {/* Removed font-mono, adjusted to small, medium-weight uppercase for elegant labels */}
            <div className="flex justify-between items-center mt-4 text-xs font-medium uppercase tracking-widest text-gray-900">
              <span></span>
              <span>Green Street</span>
            </div>
          </motion.div>

          {/* Middle Column (DOWN) */}
          <motion.div variants={itemVariants} className="flex flex-col">
            {/* Softened the description text to match the default luxury font styling */}
            
            <div className="relative w-full aspect-[4/3] overflow-hidden bg-gray-100">
              <Image
                src="/Mission-Street/mission-1.png"
                alt="Mission Street Residence"
                fill
                className="object-cover hover:scale-105 transition-transform duration-700 ease-in-out"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
            </div>
            <div className="flex justify-between items-center mt-4 text-xs font-medium uppercase tracking-widest text-gray-900">
              <span></span>
              <span>Mission Street</span>
            </div>
          </motion.div>

          {/* Right Column (UP) */}
          <motion.div variants={itemVariants} className="flex flex-col justify-between h-full">
            <div>
              <div className="relative w-full aspect-[4/3] overflow-hidden bg-gray-100">
                <Image
                  src="/slick/slick-19.png"
                  alt="Twin Peaks Project"
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-700 ease-in-out"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
              <div className="flex justify-between items-center mt-4 text-xs font-medium uppercase tracking-widest text-gray-900">
                <span></span>
                <span>Twin Peaks Project</span>
              </div>
            </div>
          </motion.div>
          
        </div>
      </motion.div>
    </section>
  );
}