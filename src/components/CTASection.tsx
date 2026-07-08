"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDown, ChevronRight } from "lucide-react";
import Link from "next/link";

export default function CTASection() {
  const containerRef = useRef<HTMLDivElement>(null);

  // 300vh container for 3 distinct scroll phases
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // ─────────────────────────────────────────────────────────────────
  // SLIDE 1 (0.0 to 0.35): Intro holds, then shrinks and fades up
  // ─────────────────────────────────────────────────────────────────
  const opacity1 = useTransform(scrollYProgress, [0, 0.2, 0.35], [1, 1, 0]);
  const scale1 = useTransform(scrollYProgress, [0, 0.35], [1, 0.9]);
  const y1 = useTransform(scrollYProgress, [0, 0.35], ["0vh", "-15vh"]);

  // ─────────────────────────────────────────────────────────────────
  // SLIDE 2 (0.25 to 0.70): The Diagonal Entry
  // ─────────────────────────────────────────────────────────────────
  // Opacity peaks in the middle of its phase
  const opacity2 = useTransform(scrollYProgress, [0.25, 0.4, 0.55, 0.7], [0, 1, 1, 0]);
  
  // Text comes from the left
  const textX2 = useTransform(scrollYProgress, [0.25, 0.4, 0.55, 0.7], ["-20vw", "0vw", "0vw", "-20vw"]);
  
  // Image comes DIAGONALLY from bottom-right (X + Y movement)
  const imgX2 = useTransform(scrollYProgress, [0.25, 0.4, 0.55, 0.7], ["30vw", "0vw", "0vw", "30vw"]);
  const imgY2 = useTransform(scrollYProgress, [0.25, 0.4, 0.55, 0.7], ["30vh", "0vh", "0vh", "-30vh"]);

  // ─────────────────────────────────────────────────────────────────
  // SLIDE 3 (0.60 to 1.0): Straight Left & Bottom Behind Text
  // ─────────────────────────────────────────────────────────────────
  const opacity3 = useTransform(scrollYProgress, [0.6, 0.75, 1], [0, 1, 1]);
  
  // Image comes STRAIGHT from the left
  const imgX3 = useTransform(scrollYProgress, [0.6, 0.75, 1], ["-40vw", "0vw", "0vw"]);
  
  // Text rises from the BOTTOM
  const textY3 = useTransform(scrollYProgress, [0.6, 0.75, 1], ["40vh", "0vh", "0vh"]);
  
  // The "Bottom Behind" Watermark (Creates massive depth)
  const bgWatermarkY = useTransform(scrollYProgress, [0.6, 0.85, 1], ["100vh", "10vh", "0vh"]);
  const bgWatermarkOpacity = useTransform(scrollYProgress, [0.6, 0.85, 1], [0, 0.05, 0.05]);

  return (
    <section ref={containerRef} className="relative h-[300vh] bg-[#000000]">
      
      {/* ── STICKY VIEWPORT ── */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">
        
        {/* =========================================================================
            SLIDE 1: CENTERED INTRO 
        ========================================================================= */}
        <motion.div 
          style={{ opacity: opacity1, scale: scale1, y: y1 }}
          className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 z-10 pointer-events-none transform-gpu"
        >
          <div className="absolute inset-0 w-full h-full -z-10">
            <Image
              src="/slick/slick-1.png"
              alt="Structural Rigor"
              fill
              className="object-cover opacity-40 mix-blend-luminosity"
               
            />
            <div className="absolute inset-0 bg-black/60" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#000000_80%)]" />
          </div>

          <div className="bg-[#D4AF37] px-3 py-1 text-[11px] md:text-xs font-bold uppercase tracking-[0.15em] text-black mb-8 rounded-[2px]">
            The Slick Standard
          </div>
          
          <h2 className="text-5xl sm:text-6xl md:text-7xl lg:text-[6rem] font-bold tracking-tighter text-white leading-[1.05] max-w-5xl drop-shadow-2xl">
            Structural Rigor. <br />
            Architectural Precision. <br />
            Unmatched Trust.
          </h2>
          
          <p className="mt-8 text-base md:text-lg font-medium text-gray-400 max-w-2xl drop-shadow-lg">
            The first to bring fully integrated, transparent construction management to high-end custom homes—turning blueprints into verified legacies.
          </p>

          <div className="mt-16 flex h-12 w-12 items-center justify-center rounded-full border border-[#D4AF37]/50 text-[#D4AF37]">
            <ArrowDown size={20} className="animate-bounce" />
          </div>
        </motion.div>

        {/* =========================================================================
            SLIDE 2: LEFT TEXT, RIGHT IMAGE (DIAGONAL ENTRY)
        ========================================================================= */}
        <motion.div 
          style={{ opacity: opacity2 }}
          className="absolute inset-0 flex flex-col md:flex-row items-center justify-between max-w-[1400px] mx-auto px-6 md:px-12 z-20 pointer-events-none transform-gpu"
        >
          {/* Left Text (Straight horizontal) */}
          <motion.div style={{ x: textX2 }} className="w-full md:w-1/2 flex flex-col items-start pr-0 md:pr-12 pointer-events-auto">
            <div className="bg-[#D4AF37] px-3 py-1 text-[11px] font-bold uppercase tracking-[0.15em] text-black mb-8 rounded-[2px]">
              Master Craftsmanship
            </div>
            
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter text-white leading-[1.1] mb-8">
              We build spaces that command attention and stand the test of time.
            </h2>
            
            <Link 
              href="/portfolio"
              className="group flex items-center gap-3 rounded-[4px] border border-white/20 bg-transparent px-6 py-3 text-sm font-bold uppercase tracking-widest text-white transition-colors hover:border-[#D4AF37] hover:text-[#D4AF37]"
            >
              Explore Portfolio
              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#D4AF37] text-black transition-transform group-hover:translate-x-1">
                <ChevronRight size={14} strokeWidth={3} />
              </div>
            </Link>
          </motion.div>

          {/* Right Image (Diagonal from bottom-right) */}
          <motion.div style={{ x: imgX2, y: imgY2 }} className="relative w-full md:w-1/2 h-[400px] md:h-[600px] mt-12 md:mt-0 drop-shadow-2xl">
            <Image
              src="/slick/slick-2.png"
              alt="Craftsmanship Process"
              fill
              className="object-contain md:object-right"
               
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-transparent" />
          </motion.div>
        </motion.div>

        {/* =========================================================================
            SLIDE 3: LEFT IMAGE (STRAIGHT), RIGHT TEXT (BOTTOM BEHIND)
        ========================================================================= */}
        {/* Massive Watermark rising from bottom behind everything */}
        <motion.div 
          style={{ opacity: bgWatermarkOpacity, y: bgWatermarkY }}
          className="absolute bottom-0 left-0 w-full overflow-hidden flex justify-center z-25 pointer-events-none select-none transform-gpu"
        >
          <span className="text-[15vw] font-black text-white leading-none tracking-tighter">
            BUILD.
          </span>
        </motion.div>

        <motion.div 
          style={{ opacity: opacity3 }}
          className="absolute inset-0 flex flex-col-reverse md:flex-row items-center justify-between max-w-[1400px] mx-auto px-6 md:px-12 z-30 pointer-events-none transform-gpu"
        >
          {/* Left Image (Straight from left) */}
          <motion.div style={{ x: imgX3 }} className="relative w-full md:w-1/2 h-[400px] md:h-[600px] mt-12 md:mt-0 drop-shadow-2xl">
            <Image
              src="/slick/slick-3.png"
              alt="Start Your Project"
              fill
              className="object-contain md:object-left"
               
            />
            <div className="absolute inset-0 bg-gradient-to-l from-black via-transparent to-transparent" />
          </motion.div>

          {/* Right Text (Rising from bottom) */}
          <motion.div style={{ y: textY3 }} className="w-full md:w-1/2 flex flex-col items-start md:items-end text-left md:text-right pl-0 md:pl-12 pointer-events-auto">
            <div className="bg-[#D4AF37] px-3 py-1 text-[11px] font-bold uppercase tracking-[0.15em] text-black mb-8 rounded-[2px] shadow-[0_0_20px_rgba(212,175,55,0.3)]">
              Start Your Build
            </div>
            
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter text-white leading-[1.1] mb-8">
              Built on a foundation of traceability, engineered for your unique lifestyle.
            </h2>
            
            <Link 
              href="/contact"
              className="group flex items-center gap-3 rounded-[4px] border border-[#D4AF37] bg-[#D4AF37] px-8 py-4 text-sm font-bold uppercase tracking-widest text-black transition-all hover:bg-white hover:border-white shadow-[0_0_30px_rgba(212,175,55,0.2)]"
            >
              Get A Quote
              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-black text-[#D4AF37] transition-transform group-hover:translate-x-1 group-hover:bg-[#D4AF37] group-hover:text-black">
                <ChevronRight size={14} strokeWidth={3} />
              </div>
            </Link>
          </motion.div>
        </motion.div>

      </div>
    </section>
  );
}