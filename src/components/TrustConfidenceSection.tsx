"use client";

import React, { useRef } from 'react';
import Image from 'next/image';
import { motion, useInView } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

// Dummy gallery images (using the slick series you provided)
const galleryImages = [
  "/slick/slick-1.png",
  "/slick/slick-2.png",
  "/slick/slick-3.png",
  "/slick/slick-5.png",
];

export default function TrustConfidenceSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  // Duplicate the array for a seamless infinite scroll loop
  const duplicatedGallery = [...galleryImages, ...galleryImages];

  return (
    <section ref={sectionRef} className="w-full bg-[#FDFBF7] py-24 md:py-32">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        
        {/* ── HEADER ── */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col md:flex-row items-start md:items-end justify-between gap-8 mb-16"
        >
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 mb-6">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4 text-gray-500">
                <circle cx="12" cy="12" r="10" />
                <circle cx="12" cy="12" r="4" />
              </svg>
              <span className="text-xs font-bold uppercase tracking-[0.15em] text-gray-500">
                Trust & Confidence
              </span>
            </div>
            
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-[#111111] leading-[1.05]">
              Confidence behind <br className="hidden md:block" />
              every property decision
            </h2>
          </div>
          
          <div className="max-w-sm">
            <p className="text-base font-medium text-gray-500 leading-relaxed">
              Built to make modern home discovery simple, transparent, and more confident for every user.
            </p>
          </div>
        </motion.div>

        {/* ── 3-COLUMN GRID ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-auto lg:h-[750px]">
          
          {/* ==========================================
              LEFT COLUMN: STATS & CTA (Spans 3 cols)
          ========================================== */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-3 flex flex-col gap-6"
          >
            {/* Stats Card */}
            <div className="bg-[#F4F4F4] rounded-[2rem] p-6 flex flex-col gap-4 flex-grow">
              <span className="text-sm font-bold text-gray-500 mb-2">Real Results</span>
              
              <div className="bg-white rounded-2xl p-5 shadow-sm border border-black/5">
                <span className="block text-xs font-semibold text-gray-500 mb-1">Total Value</span>
                <span className="block text-3xl font-bold text-[#111111]">$4.6M+</span>
              </div>
              
              <div className="bg-white rounded-2xl p-5 shadow-sm border border-black/5">
                <span className="block text-xs font-semibold text-gray-500 mb-1">Active Homes</span>
                <span className="block text-3xl font-bold text-[#111111]">320+</span>
              </div>
              
              <div className="bg-white rounded-2xl p-5 shadow-sm border border-black/5">
                <span className="block text-xs font-semibold text-gray-500 mb-1">Happy Clients</span>
                <span className="block text-3xl font-bold text-[#111111]">98%</span>
              </div>
            </div>

            {/* Bottom CTA Card */}
            <div className="relative bg-gray-200 rounded-[2rem] p-6 overflow-hidden min-h-[220px] flex flex-col justify-between group">
              <div className="absolute inset-0 z-0">
                <Image src="/slick/slick-5.png" alt="Background" fill className="object-cover opacity-30 mix-blend-multiply" unoptimized />
                <div className="absolute inset-0 bg-gradient-to-b from-white/90 to-white/60" />
              </div>
              
              <div className="relative z-10">
                <h4 className="text-lg font-bold text-[#111111] mb-2">Built for Better Living</h4>
                <p className="text-xs font-medium text-gray-600 leading-relaxed mb-6">
                  We do more than list homes - we create a smoother way to discover spaces that feel right for your lifestyle.
                </p>
              </div>
              
              <Link href="/contact" className="relative z-10 self-start flex items-center gap-2 bg-[#111111] text-white text-xs font-bold px-4 py-2.5 rounded-full hover:bg-black transition-colors">
                Contact Us <ArrowRight size={14} />
              </Link>
            </div>
          </motion.div>

          {/* ==========================================
              CENTER COLUMN: OWNER PORTRAIT (Spans 6 cols)
          ========================================== */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 relative rounded-[2rem] overflow-hidden min-h-[500px] lg:min-h-full shadow-xl border border-black/5"
          >
            <Image 
              src="/slick/slick-4.png" 
              alt="Nick - Owner" 
              fill 
              className="object-cover object-center"
              unoptimized
            />
            {/* Cinematic bottom gradient for text readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent pointer-events-none" />
            
            <div className="absolute bottom-0 left-0 w-full p-8 md:p-12">
              <h3 className="text-3xl md:text-4xl font-bold text-white mb-4 tracking-tight">
                Guidance you can trust <br /> in your home search
              </h3>
              <p className="text-sm md:text-base text-gray-300 font-medium leading-relaxed max-w-lg">
                With the right expertise and a clear approach, explore homes with confidence and move closer to finding a space that truly fits your lifestyle.
              </p>
            </div>
          </motion.div>

          {/* ==========================================
              RIGHT COLUMN: SCROLLING GALLERY (Spans 3 cols)
          ========================================== */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-3 bg-[#F4F4F4] rounded-[2rem] p-6 flex flex-col relative overflow-hidden h-[500px] lg:h-full"
          >
            <div className="relative z-20 mb-6">
              <h4 className="text-base font-bold text-[#111111] leading-snug">
                Loved by people who found their home
              </h4>
            </div>

            {/* Vertical Scroll Container */}
            <div className="relative flex-grow overflow-hidden rounded-xl">
              
              {/* Fade Masks at Top & Bottom */}
              <div className="absolute top-0 left-0 right-0 h-16 bg-gradient-to-b from-[#F4F4F4] to-transparent z-10" />
              <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-[#F4F4F4] to-transparent z-10" />

              {/* Scrolling Content (Bottom to Top) */}
              <motion.div
                className="flex flex-col gap-4"
                // Animating Y from 0% to -50% creates the infinite upward scroll
                animate={{ y: ["0%", "-50%"] }}
                transition={{
                  ease: "linear",
                  duration: 25, // Adjust speed here (higher is slower)
                  repeat: Infinity,
                }}
              >
                {duplicatedGallery.map((img, idx) => (
                  <div key={idx} className="relative w-full aspect-[4/3] rounded-xl overflow-hidden shadow-sm flex-shrink-0">
                    <Image 
                      src={img} 
                      alt={`Gallery image ${idx}`} 
                      fill 
                      className="object-cover" 
                      unoptimized 
                    />
                  </div>
                ))}
              </motion.div>

            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}