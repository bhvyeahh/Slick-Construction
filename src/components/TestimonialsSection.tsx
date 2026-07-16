"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";

// ─────────────────────────────────────────────────────────────────
// DUMMY DATA FOR SLICK CONSTRUCTION (Text Only)
// ─────────────────────────────────────────────────────────────────
const testimonials = [
  {
    id: 1,
    quote: "Slick Construction kept the site incredibly clean and actually finished a week ahead of schedule. Highly recommend Nick and his team.",
    name: "Michael Vance",
    role: "Homeowner",
  },
  {
    id: 2,
    quote: "No hidden fees and no endless delays. Nick told us what the remodel would cost upfront and delivered perfectly.",
    name: "Lisa Chen",
    role: "Property Owner",
  },
  {
    id: 3,
    quote: "The custom tile work in our master bath is flawless. You can tell Nick really care about the small details.",
    name: "Robert Gallagher",
    role: "Residential Client",
  },
  {
    id: 4,
    quote: "Renovating is usually a nightmare, but Nick's crew at Slick Construction made the entire process completely painless from start to finish.",
    name: "Anita Desai",
    role: "Real Estate Investor",
  },
];

export default function TestimonialsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  // Duplicated for the infinite scrolling loop
  const duplicatedTestimonials = [...testimonials, ...testimonials];

  return (
    <section 
      ref={sectionRef} 
      className="w-full overflow-hidden bg-[#0A0A0A] py-24 md:py-32"
    >
      <div className="mx-auto max-w-[1400px] px-6 md:px-12">
        
        {/* ── HEADER ── */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-16 flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-end"
        >
          <div className="max-w-2xl">
            {/* Golden Eyebrow */}
            <div className="mb-6 flex w-fit items-center gap-3 rounded-full border border-gray-700 bg-black/50 px-4 py-1.5">
              <div className="h-2 w-2 rounded-full bg-[#D4AF37]" />
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#D4AF37]">
                Client Reviews
              </span>
            </div>
            
            <h2 className="text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl leading-[1.1]">
              What clients say about <br />
              <span className="text-gray-500 italic">their new spaces.</span>
            </h2>
          </div>
          
          <div className="max-w-sm">
            <p className="text-base md:text-lg font-medium leading-relaxed text-gray-400">
              Real feedback from clients who trusted us to build it right with absolute confidence.
            </p>
          </div>
        </motion.div>

        {/* ── SPLIT LAYOUT: STATIC IMAGE (Left) & SCROLLING RAIL (Right) ── */}
        <div className="flex flex-col gap-8 lg:flex-row lg:items-center mt-12">
          
          {/* 1. STATIC IMAGE CARD */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full h-[400px] lg:h-[500px] lg:w-[400px] shrink-0 overflow-hidden rounded-[2rem] border border-white/10 shadow-2xl"
          >
            <Image
              src="/slick/slick-4.png"
              alt="Slick Construction Craftsmanship"
              fill
              className="object-cover"
               
            />
            {/* Premium Gold Vignette over the static image */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/40 to-transparent opacity-90" />
            
            <div className="absolute bottom-0 left-0 p-8">
              <h3 className="text-2xl font-bold text-white mb-1">
                Built on Trust
              </h3>
              <p className="text-sm font-medium text-[#D4AF37]">
                Delivering Excellence
              </p>
            </div>
          </motion.div>

          {/* 2. SCROLLING TESTIMONIALS RAIL (Right to Left) */}
          <div className="relative flex w-full overflow-hidden rounded-[2rem] lg:h-[500px] items-center">
            
            {/* Fade masks for the edges of the scrolling area */}
            <div className="absolute left-0 top-0 z-10 h-full w-16 bg-gradient-to-r from-[#0A0A0A] to-transparent md:w-32" />
            <div className="absolute right-0 top-0 z-10 h-full w-16 bg-gradient-to-l from-[#0A0A0A] to-transparent md:w-32" />

            <motion.div
              className="flex w-max gap-6 px-4"
              // Moves from 0% to -50%, ensuring a strict Right to Left motion
              animate={{ x: ["0%", "-50%"] }}
              transition={{
                ease: "linear",
                duration: 35, // Adjust this to make it faster or slower
                repeat: Infinity,
              }}
            >
              {duplicatedTestimonials.map((item, index) => (
                <div
                  key={index}
                  className="flex h-[350px] w-[300px] shrink-0 flex-col justify-between rounded-3xl bg-[#141414] border border-white/5 p-8 transition-colors hover:border-[#D4AF37]/30 md:h-[400px] md:w-[400px] md:p-10"
                >
                  <div>
                    {/* Gold Decorative Quote Marks */}
                    <span className="font-serif text-6xl leading-none text-[#D4AF37]/40 block mb-4">
                      &ldquo;
                    </span>
                    <p className="text-base font-medium leading-relaxed text-gray-300 md:text-lg">
                      {item.quote}
                    </p>
                  </div>

                  <div className="flex flex-col mt-8 border-t border-white/10 pt-6">
                    <span className="text-lg font-bold text-white mb-1">
                      {item.name}
                    </span>
                    <span className="text-sm font-semibold uppercase tracking-wider text-[#D4AF37]">
                      {item.role}
                    </span>
                  </div>
                </div>
              ))}
            </motion.div>

          </div>
        </div>
      </div>
    </section>
  );
}