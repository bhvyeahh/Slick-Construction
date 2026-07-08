"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";

// ─────────────────────────────────────────────────────────────────
// HIGH-END ARCHITECTURAL CONTENT
// ─────────────────────────────────────────────────────────────────
const processes = [
  {
    id: "01",
    title: "Architectural Vision",
    subtitle: "Conceptualization & Alignment",
    description:
      "We initiate with a collaborative design review, aligning architects, engineers, and designers. Every foundational detail is scrutinized to lock in a unified vision before any ground is broken.",
    image: "/Slick/slick-31.png",
  },
  {
    id: "02",
    title: "Feasibility & Phasing",
    subtitle: "Transparent Assessment",
    description:
      "Precision is key. We outline exact investment parameters, material logistics, and timeline insights. You receive a complete, transparent roadmap of how your build will unfold.",
    image: "/Slick/slick-12.png",
  },
  {
    id: "03",
    title: "Master Specification",
    subtitle: "Documentation & Sourcing",
    description:
      "Leaving zero room for ambiguity. We finalize comprehensive scope documents and source premium materials, ensuring the execution adheres flawlessly to the approved architectural standards.",
    image: "/Slick/slick-23.png",
  },
  {
    id: "04",
    title: "Orchestrated Build",
    subtitle: "Execution & Site Management",
    description:
      "This is where the blueprint breathes. Our on-site project management guarantees seamless coordination between trades, upholding rigorous quality control at every structural milestone.",
    image: "/Slick/slick-15.png",
  },
  {
    id: "05",
    title: "The Handover",
    subtitle: "Final Polish & Legacy",
    description:
      "The culmination of uncompromising standards. After intensive final walkthroughs and polishing, we deliver a masterful space that stands as a testament to precision and enduring beauty.",
    image: "/Slick/slick-6.png",
  },
];

// ─────────────────────────────────────────────────────────────────
// ANIMATED CARD COMPONENT (With Fixed Mobile Gap)
// ─────────────────────────────────────────────────────────────────
const ProcessCard = ({
  step,
  index,
  total,
  progress,
}: {
  step: typeof processes[0];
  index: number;
  total: number;
  progress: MotionValue<number>;
}) => {
  const phase = 1 / (total - 1); 
  const active = index * phase;
  const enterStart = active - phase;
  const exitEnd = active + phase;

  // FIX: Changed from "50vw" to "100%". 
  // This ensures the gap scales perfectly with the card's width, eliminating overlap on mobile.
  const x = useTransform(
    progress,
    [enterStart, active, exitEnd],
    ["100%", "0%", "-100%"]
  );

  // The Squeeze Effect
  const clipPath = useTransform(
    progress,
    [enterStart, active, exitEnd],
    [
      "inset(0% 40% 0% 40% round 32px)", 
      "inset(0% 0% 0% 0% round 32px)",   
      "inset(0% 40% 0% 40% round 32px)", 
    ]
  );

  const scale = useTransform(
    progress, 
    [enterStart, active, exitEnd], 
    [0.9, 1, 0.9]
  );
  
  // Smooth fade so text doesn't look harsh when fully squeezed
  const opacity = useTransform(
    progress,
    [enterStart, enterStart + phase / 4, exitEnd - phase / 4, exitEnd],
    [0, 1, 1, 0]
  );

  return (
    <motion.div
      style={{
        x,
        scale,
        opacity,
        clipPath,
        zIndex: total - index, 
      }}
      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] md:w-[85vw] lg:w-[1100px] h-auto md:h-[65vh] min-h-[500px] max-h-[700px] bg-[#141414] border border-white/5 shadow-2xl overflow-hidden flex flex-col md:flex-row transform-gpu"
    >
      {/* ── LEFT: IMAGE HALF ── */}
      <div className="relative w-full md:w-1/2 h-[220px] md:h-full overflow-hidden shrink-0">
        <Image
          src={step.image}
          alt={step.title}
          fill
          className="object-cover"
           
        />
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-[#141414] hidden md:block" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#141414] via-transparent to-transparent md:hidden block" />
      </div>

      {/* ── RIGHT: CONTENT HALF ── */}
      {/* Reduced padding on mobile (p-6) so text has more room to breathe */}
      <div className="w-full md:w-1/2 flex flex-col justify-center p-6 md:p-12 lg:p-16 relative">
        
        <div className="flex items-center gap-4 mb-6 md:mb-8">
          <span className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white/5 tracking-tighter select-none">
            .{step.id}
          </span>
          <div className="h-[1px] flex-1 bg-gradient-to-r from-[#D4AF37]/50 to-transparent max-w-[100px]" />
        </div>

        {/* Adjusted text sizes for mobile wrapping */}
        <h3 className="text-2xl md:text-4xl lg:text-5xl font-bold tracking-tight text-white mb-2 md:mb-3 leading-[1.1]">
          {step.title}
        </h3>
        
        <h4 className="text-xs md:text-sm lg:text-base font-semibold uppercase tracking-widest text-[#D4AF37] mb-4 md:mb-8">
          {step.subtitle}
        </h4>

        <p className="text-sm md:text-base lg:text-lg text-gray-400 font-medium leading-relaxed max-w-md">
          {step.description}
        </p>
        
      </div>
    </motion.div>
  );
};

// ─────────────────────────────────────────────────────────────────
// MAIN SECTION
// ─────────────────────────────────────────────────────────────────
export default function ProcessSection() {
  const targetRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end end"],
  });

  return (
    <section ref={targetRef} className="relative h-[600vh] bg-[#0A0A0A]">
      
      {/* ── STICKY VIEWPORT ── */}
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">
        
        <div className="absolute inset-0 pointer-events-none flex items-center justify-center z-0">
          <div className="h-[50vh] w-[50vw] bg-[#D4AF37]/5 rounded-full blur-[140px]" />
        </div>

        {/* ── STATIC HEADER ── */}
        <div className="absolute top-8 left-4 md:top-16 md:left-12 z-50">
          <div className="mb-3 md:mb-4 flex items-center gap-2 md:gap-3 rounded-full border border-gray-700 bg-black/50 backdrop-blur-sm px-3 md:px-4 py-1.5 w-fit">
            <div className="h-1.5 w-1.5 md:h-2 md:w-2 rounded-full bg-[#D4AF37]" />
            <span className="text-[10px] md:text-xs font-bold tracking-[0.2em] text-gray-300 uppercase">
              The Methodology
            </span>
          </div>
          <h2 className="text-2xl md:text-4xl lg:text-5xl font-medium tracking-tight text-white leading-tight">
            A process built on <br />
            <span className="text-gray-500 italic">precision & trust.</span>
          </h2>
        </div>

        {/* ── CENTRAL STAGE FOR ANIMATED CARDS ── */}
        <div className="relative w-full h-full z-10 pt-24 md:pt-20">
          {processes.map((step, index) => (
            <ProcessCard
              key={step.id}
              step={step}
              index={index}
              total={processes.length}
              progress={scrollYProgress}
            />
          ))}
        </div>

      </div>
    </section>
  );
}