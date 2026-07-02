"use client";

import React from 'react';
import Image from 'next/image'; // <--- Import Image

const steps = [
  {
    id: "01",
    title: "Collaborative Design",
    subtitle: "Architects, Engineers & Pros",
    description: "We initiate with a collaborative design review, bringing together architects, engineers, and design professionals to align on a unified vision before ground is broken.",
    bgClass: "bg-[#F7F5F2]", // Alabaster
    textClass: "text-neutral-900",
    borderClass: "border-neutral-200"
  },
  {
    id: "02",
    title: "Investment & Timeline",
    subtitle: "Assessment & Estimations",
    description: "We provide a detailed investment and timeline assessment, outlining precise cost estimates and project duration insights to ensure total transparency.",
    bgClass: "bg-[#E6E4E0]", // Warm Stone
    textClass: "text-neutral-900",
    borderClass: "border-neutral-300"
  },
  {
    id: "03",
    title: "Comprehensive Scope",
    subtitle: "Detailed Documentation",
    description: "Every detail is accounted for in our comprehensive scope documentation, eliminating ambiguity and ensuring the build adheres strictly to your specifications.",
    bgClass: "bg-[#D1D5DB]", // Cool Grey
    textClass: "text-neutral-900",
    borderClass: "border-neutral-400"
  },
  {
    id: "04",
    title: "Project Management",
    subtitle: "Seamless Coordination",
    description: "Our seamless project management provides thoughtful coordination, ensuring minimal disruption to your life and maximum efficiency on the job site.",
    bgClass: "bg-[#333333]", // Charcoal
    textClass: "text-white",
    borderClass: "border-neutral-700"
  },
  {
    id: "05",
    title: "Timeless Craftsmanship",
    subtitle: "The Final Result",
    description: "The culmination of our process is timeless craftsmanship—delivering a home that stands as a testament to precision, quality, and enduring beauty.",
    bgClass: "bg-[#0A0A0A]", // Black
    textClass: "text-white",
    borderClass: "border-neutral-800"
  }
];

export default function ProcessSection() {
  return (
    <section className="w-full bg-white py-24 px-6 md:px-12 relative z-10">
      <div className="max-w-[1400px] mx-auto">
        
        {/* =======================
            HEADER
        ======================== */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-8">
          <div className="max-w-2xl">
            <h2 className="text-4xl md:text-5xl lg:text-[64px] font-medium text-neutral-900 mb-6 leading-[1] tracking-tight">
              A process built on <br/>
              <span className="text-neutral-400">precision & trust.</span>
            </h2>
            <p className="text-neutral-500 text-lg leading-relaxed max-w-lg">
              Whether you’re building a luxurious custom home or transforming your existing space to better reflect
your lifestyle, Pivotal Builders is your trusted partner every step of the way.
            </p>
          </div>
        </div>


        {/* =======================
            CONTENT GRID
        ======================== */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 relative">
          
          {/* LEFT: Sticky Image Column (Span 5) */}
          <div className="hidden lg:block lg:col-span-5 relative">
              <div className="sticky top-12 h-[calc(100vh-6rem)] flex items-center justify-center py-8">
                 <div className="w-full h-full max-h-[700px] rounded-2xl overflow-hidden shadow-2xl relative group">
                    {/* OPTIMIZED IMAGE */}
                    <Image 
                      src="/website-photos-12.jpg" // Renamed from "Website Photos -12.jpg"
                      alt="Architectural Blueprint Meeting" 
                      fill
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                      unoptimized={true}
                    />
                    <div className="absolute inset-0 bg-black/10"></div>
                    
                    {/* Optional Overlay Text */}
                    <div className="absolute bottom-8 left-8 text-white max-w-xs z-10">
                       <p className="font-mono text-xs uppercase tracking-widest opacity-80 mb-2">The Standard</p>
                       <p className="text-xl font-medium">Built for perfection.</p>
                    </div>
                 </div>
              </div>
          </div>


          {/* RIGHT: Stacking Cards (Span 7) */}
          <div className="lg:col-span-7 flex flex-col gap-8 pb-24">
            {steps.map((step, index) => (
              <div 
                key={index}
                className={`sticky top-32 lg:top-40 w-full ${step.bgClass} ${step.textClass} p-12 md:p-16 rounded-3xl shadow-xl border ${step.borderClass} transform transition-all duration-500 hover:-translate-y-2`}
                style={{ 
                    // Subtle rotation for the "stack" feel
                    transform: `rotate(${index % 2 === 0 ? '-0.5deg' : '0.5deg'})` 
                }}
              >
                <div className="flex flex-col h-full justify-between gap-16 min-h-[300px]">
                  
                  {/* Card Header */}
                  <div className="flex justify-between items-start">
                      <div>
                         <span className="block font-mono text-xs uppercase tracking-widest opacity-60 mb-3">
                            Step {step.id}
                         </span>
                         <h3 className="text-3xl md:text-5xl font-medium tracking-tight leading-tight">
                            {step.title}
                         </h3>
                         {step.subtitle && (
                            <p className="text-lg md:text-xl opacity-60 mt-2 font-light">
                               {step.subtitle}
                            </p>
                         )}
                      </div>
                      
                      {/* Decorative Icon or Number */}
                      <div className="hidden md:flex w-14 h-14 rounded-full border border-current opacity-20 items-center justify-center text-xl font-serif italic">
                         {index + 1}
                      </div>
                   </div>
                   
                   {/* Card Body */}
                   <div className="max-w-xl">
                      <p className="text-lg md:text-2xl font-light leading-relaxed opacity-90">
                         {step.description}
                      </p>
                   </div>

                </div>
              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}