"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion , Variants } from "framer-motion";
import { ArrowRight } from "lucide-react";

// Using 6 images from your slick folder for the grid
const gridImages = [
  "/slick/slick-17.png",
  "/slick/slick-18.png",
  "/slick/slick-19.png",
  "/slick/slick-20.png",
  "/slick/slick-29.png",
  "/slick/slick-23.png", // Skipping 22 as it was used in services
];

// ─────────────────────────────────────────────────────────────────
// ANIMATION VARIANTS
// ─────────────────────────────────────────────────────────────────
const containerVariants : Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
};

const imageVariants: Variants = {
  hidden: { opacity: 0, scale: 0.95, y: 20 },
  visible: { 
    opacity: 1, 
    scale: 1, 
    y: 0, 
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } 
  },
};

const textVariants : Variants = {
  hidden: { opacity: 0, x: 30 },
  visible: { 
    opacity: 1, 
    x: 0, 
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.3 } 
  },
};

export default function DreamProjectCTA()  {
  return (
    <section className="w-full bg-[#0A0A0A] py-24 md:py-32 overflow-hidden border-t border-white/5">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          
          {/* ==========================================
              LEFT SIDE: 3x2 IMAGE GRID
          ========================================== */}
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4 w-full"
          >
            {gridImages.map((src, index) => (
              <motion.div 
                key={index} 
                variants={imageVariants}
                className="relative w-full aspect-square overflow-hidden bg-[#141414] rounded-none border border-white/5 group"
              >
                <Image
                  src={src}
                  alt={`Project inspiration ${index + 1}`}
                  fill
                  className="object-cover transition-transform duration-[2s] group-hover:scale-110"
                  sizes="(max-width: 768px) 50vw, 33vw"
                   
                />
                {/* Subtle dark overlay that lifts on hover */}
                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-700 pointer-events-none" />
              </motion.div>
            ))}
          </motion.div>

          {/* ==========================================
              RIGHT SIDE: TEXT CONTENT & CTA
          ========================================== */}
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={textVariants}
            className="flex flex-col items-start max-w-xl"
          >
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.1] mb-6">
              Start Your <span className="text-[#D4AF37] italic font-serif">Dream</span> Project Today
            </h2>
            
            <p className="text-gray-400 text-sm md:text-base leading-relaxed mb-10">
              Whether you're envisioning a custom home, a commercial space, or a major renovation, our team of experienced professionals is here to guide you every step of the way. With a commitment to quality, innovation, & client satisfaction.
            </p>
            
            <Link 
              href="/contact" 
              className="inline-flex items-center gap-3 bg-[#D4AF37] text-black px-8 py-4 text-xs font-bold font-mono uppercase tracking-widest hover:bg-white transition-all duration-300 hover:shadow-[0_0_20px_rgba(212,175,55,0.4)] group"
            >
              Contact Us
              <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </motion.div>

        </div>
      </div>
    </section>
  );
}