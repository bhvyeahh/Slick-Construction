"use client";

import React from "react";
import { motion } from "framer-motion";
// Ensure this path matches where you saved the component
import ServicesList from "@/components/ServicesList"; 
import DreamProjectCTA from "@/components/DreamProjectCTA";

export default function ServicesPage() {
  return (
    // The main wrapper has the dark background to seamlessly catch the ServicesList below
    <main className="min-h-screen flex flex-col bg-[#0A0A0A]">
      
      {/* ── LIGHT THEME HERO SECTION ── */}
      {/* The rounded-b-[3rem] creates a premium overlapping curve into the dark section */}
      <section className="relative w-full bg-[#F5F5F0] text-black pt-40 pb-32 md:pt-52 md:pb-48 overflow-hidden rounded-b-[2rem] md:rounded-b-[4rem] z-10 shadow-[0_20px_50px_rgba(0,0,0,0.3)]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-4xl"
          >
            {/* Golden Accent Tag */}
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-[2px] bg-[#D4AF37]" />
              <span className="text-[#D4AF37] font-mono text-sm font-bold uppercase tracking-[0.2em]">
                Our Expertise
              </span>
            </div>
            
            {/* Main Headline */}
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-[1.05] mb-8 text-[#111]">
              Crafting <span className="font-serif italic text-[#D4AF37]">Perfection</span> <br />
              In Every Detail.
            </h1>
            
            {/* Subtitle */}
            <p className="text-lg md:text-xl text-gray-600 font-medium max-w-2xl leading-relaxed">
              From high-end family residences to transformative remodels, we bring unparalleled precision, premium materials, and a deeply personal approach to every project we touch.
            </p>
          </motion.div>

        </div>
      </section>

      {/* ── DARK THEME SERVICES COMPONENT ── */}
      {/* The negative top margin pulls this component up slightly so it tucks under the curved light hero */}
      <div className="relative -mt-10 md:-mt-20 z-0">
        <ServicesList />
        <DreamProjectCTA />
      </div>
      
    </main>
  );
}