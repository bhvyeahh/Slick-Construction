"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, Variants } from "framer-motion";

// ─────────────────────────────────────────────────────────────────
// PARALLAX IMAGE COMPONENT (For the continuous scroll-driven effect)
// ─────────────────────────────────────────────────────────────────
const ParallaxImage = ({ src, alt }: { src: string; alt: string }) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Moves the image slightly up/down as you scroll past it
  const y = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  return (
    <div ref={ref} className="relative w-full h-full overflow-hidden rounded-[1.5rem] bg-[#141414] border border-white/5 group">
      <motion.div style={{ y }} className="absolute inset-0 w-full h-[120%] -top-[10%]">
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-105"
          unoptimized
        />
      </motion.div>
      
      {/* Luxury Gold/Dark Vignette on Hover */}
      <div className="absolute inset-0 bg-black/20 group-hover:bg-[#D4AF37]/10 transition-colors duration-700 pointer-events-none" />
    </div>
  );
};

// ─────────────────────────────────────────────────────────────────
// PROPERTY DATA
// ─────────────────────────────────────────────────────────────────
const properties = [
  {
    id: "green-street",
    title: "Green Street",
    location: "San Francisco, CA",
    description: "A masterclass in modern architecture, blending seamless indoor-outdoor living with uncompromising structural rigor.",
    images: [
      // Hero (Large)
      { src: "/Green-Street/green-1.png", style: "md:col-span-3 md:row-span-2 h-[400px] md:h-[600px]" },
      // Top Right
      { src: "/Green-Street/green-2.png", style: "md:col-span-1 md:row-span-1 h-[250px] md:h-[288px]" },
      // Bottom Right
      { src: "/Green-Street/green-3.png", style: "md:col-span-1 md:row-span-1 h-[250px] md:h-[288px]" },
      // Wide Footer
      { src: "/Green-Street/green-4.png", style: "md:col-span-4 md:row-span-1 h-[300px] md:h-[400px]" },
    ],
  },
  {
    id: "mission-street",
    title: "Mission Street",
    location: "San Francisco, CA",
    description: "Urban elegance redefined. This property showcases our commitment to high-performance materials and timeless design.",
    images: [
      // Tall Left
      { src: "/Mission-Street/mission-1.png", style: "md:col-span-1 md:row-span-2 h-[400px] md:h-[600px]" },
      // Top Right Wide
      { src: "/Mission-Street/mission-2.png", style: "md:col-span-2 md:row-span-1 h-[250px] md:h-[288px]" },
      // Bottom Right Wide
      { src: "/Mission-Street/mission-3.png", style: "md:col-span-2 md:row-span-1 h-[250px] md:h-[288px]" },
    ],
  },
];

// ─────────────────────────────────────────────────────────────────
// MAIN COMPONENT
// ─────────────────────────────────────────────────────────────────
export default function FeaturedProperties() {
  const containerVariants : Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 },
    },
  };

  const itemVariants : Variants = {
    hidden: { opacity: 0, y: 40, scale: 0.98 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <section className="w-full bg-[#0A0A0A] py-24 md:py-32 overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        
        {/* ── HEADER ── */}
        <div className="mb-20 flex flex-col items-start justify-between gap-8 md:flex-row md:items-end border-b border-white/10 pb-12">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 mb-6">
              <div className="h-2 w-2 rounded-full bg-[#D4AF37]" />
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#D4AF37]">
                Featured Builds
              </span>
            </div>
            
            <h2 className="text-4xl md:text-5xl lg:text-7xl font-bold tracking-tight text-white leading-[1.05]">
              Signature <br />
              <span className="text-gray-500 italic">Portfolios.</span>
            </h2>
          </div>
          
          <div className="max-w-sm pb-2">
            <p className="text-sm md:text-base font-medium text-gray-400 leading-relaxed">
              Explore our most defining projects, engineered with precision and designed for extraordinary living.
            </p>
          </div>
        </div>

        {/* ── PROPERTIES LOOP ── */}
        <div className="flex flex-col gap-32">
          {properties.map((property, propIndex) => (
            <motion.div 
              key={property.id}
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              className="flex flex-col gap-8"
            >
              
              {/* Property Info Header */}
              <motion.div variants={itemVariants} className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                  <h3 className="text-3xl md:text-4xl font-bold text-white tracking-tight mb-2">
                    {property.title}
                  </h3>
                  <div className="flex items-center gap-2 text-[#D4AF37] text-sm font-bold uppercase tracking-widest">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                      <circle cx="12" cy="10" r="3" />
                    </svg>
                    {property.location}
                  </div>
                </div>
                <p className="text-gray-400 text-sm md:text-base max-w-md font-medium leading-relaxed md:text-right">
                  {property.description}
                </p>
              </motion.div>

              {/* Bento Grid */}
              <div 
                className={`grid grid-cols-1 gap-4 md:gap-6 ${
                  propIndex === 0 ? "md:grid-cols-4" : "md:grid-cols-3"
                }`}
              >
                {property.images.map((img, idx) => (
                  <motion.div 
                    key={idx} 
                    variants={itemVariants} 
                    className={`relative w-full ${img.style}`}
                  >
                    <ParallaxImage src={img.src} alt={`${property.title} - View ${idx + 1}`} />
                  </motion.div>
                ))}
              </div>

            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}