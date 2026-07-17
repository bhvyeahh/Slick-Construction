"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
// Ensure this path matches where you saved the component
import ServicesList from "@/components/ServicesList"; 
import DreamProjectCTA from "@/components/DreamProjectCTA";
import Footer from "@/components/Footer";

export default function ServicesPage() {
  return (
    // The main wrapper has the dark background to seamlessly catch the ServicesList below
    <main className="min-h-screen flex flex-col bg-[#0A0A0A]">
      
      {/* ── LIGHT THEME HERO SECTION ── */}
      {/* The rounded-b-[3rem] creates a premium overlapping curve into the dark section */}
      <section className="relative w-full bg-[#F5F5F0] text-black pt-40 pb-32 md:pt-52 md:pb-48 overflow-hidden rounded-b-[2rem] md:rounded-b-[4rem] z-10 shadow-[0_20px_50px_rgba(0,0,0,0.3)]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-20">
          
          {/* LEFT: Text Content (Made smaller/tighter to fit the image) */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="w-full lg:w-1/2 max-w-lg"
          >
            {/* Golden Accent Tag - Reduced to text-xs */}
            <div className="flex items-center gap-4 mb-6 md:mb-8">
              <div className="w-10 md:w-12 h-[2px] bg-[#D4AF37]" />
              <span className="text-[#D4AF37] font-mono text-xs font-bold uppercase tracking-[0.2em]">
                Our Expertise
              </span>
            </div>
            
            {/* Main Headline - Scaled down to 4xl/5xl/6xl for a less chunky look */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1] mb-6 md:mb-8 text-[#111] uppercase">
              Mastering <br />
              The <span className="font-serif italic text-[#D4AF37] normal-case">Details.</span>
            </h1>
            
            {/* Subtitle - Reduced size and added max-w-md to control line length */}
            <p className="text-base md:text-lg text-gray-600 font-medium leading-relaxed max-w-md">
              Flawless execution and premium materials. We deliver high-end custom homes and transformative remodels.
            </p>
          </motion.div>

          {/* RIGHT: Image with Reveal Animation */}
          <motion.div 
            initial={{ clipPath: "inset(0% 100% 0% 0%)", scale: 1.05 }}
            animate={{ clipPath: "inset(0% 0% 0% 0%)", scale: 1 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            className="w-full lg:w-1/2 relative h-[400px] md:h-[500px] rounded-2xl md:rounded-[2rem] overflow-hidden shadow-2xl"
          >
            <Image 
              src="/slick/slick-42.png" // Update this path to your preferred image
              alt="Slick Construction Expertise" 
              fill
              priority
              className="object-cover object-center"
            />
          </motion.div>

        </div>
      </section>

      {/* ── DARK THEME SERVICES COMPONENT ── */}
      {/* The negative top margin pulls this component up slightly so it tucks under the curved light hero */}
      <div className="relative -mt-10 md:-mt-20 z-0">
        <ServicesList />
        <DreamProjectCTA />
      </div>
      <Footer />
    </main>
  );
}