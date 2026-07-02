"use client";

import React, { useLayoutEffect, useRef } from 'react';
import { ArrowUpRight } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';

// Register ScrollTrigger
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// MAPPED TO LOCAL FILES
const services = [
  {
    id: "01",
    title: "Full Home Remodel",
    description: "A full home remodel with Pivotal Builders means an expertly curated space with custom details that elevate your daily living.",
    image: "/website-photos-3.jpg"
  },
  {
    id: "02",
    title: "Kitchen Remodel",
    description: "The kitchen is the heart of the home, and we craft spaces that blend form, function and beauty with upscale materials and custom millwork.",
    image: "/website-photos-4.jpg"
  },
  {
    id: "03",
    title: "Bathroom Remodel",
    description: "Thoughtfully designed and crafted with comfort and luxury in mind, transforming daily routines into spa-like experiences.",
    image: "/website-photos-5.jpg"
  },
  {
    id: "04",
    title: "ADU’s",
    description: "Whether it’s a family retreat, rental unit or additional living space, we transform underutilized areas into functional extensions of your home.",
    image: "/website-photos-6.jpg"
  },
  {
    id: "05",
    title: "Additions & Structural",
    description: "Expand with intention by adding space. Seamlessly integrate new square footage without compromising your home’s character.",
    image: "/website-photos-7.jpg"
  },
  {
    id: "06",
    title: "Custom Deck Builds",
    description: "Custom decks thoughtfully designed and expertly built to enhance the way you live outdoors, blending nature with architecture.",
    image: "/website-photos-8.jpg"
  }
];

export default function ServicesSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const leftColRef = useRef<HTMLDivElement>(null);
  const rightColRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      
      // DESKTOP "STAIR GAME" PARALLAX EFFECT
      if (window.innerWidth >= 1024) {
        
        // Left Column goes DOWN slowly
        gsap.to(leftColRef.current, {
          y: 100, 
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1, 
          }
        });

        // Right Column goes UP (creating the shear/stair effect)
        gsap.to(rightColRef.current, {
          y: -150, 
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1, 
          }
        });

        // Reveal Cards Fade-In
        gsap.from(".service-card", {
          y: 50,
          opacity: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 70%",
          }
        });
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} id="services" className="w-full bg-[#111] text-white py-24 px-6 md:px-12 overflow-hidden">
      <div className="max-w-[1400px] mx-auto">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 md:mb-24 gap-8">
           <div className="max-w-2xl">
              <h2 className="text-4xl md:text-5xl lg:text-[64px] font-medium leading-[1] mb-6 tracking-tight">
                Our expertise <br/>
                <span className="text-neutral-500">at your service.</span>
              </h2>
           </div>
           <div className="hidden md:block">
              <span className="text-sm text-neutral-400 uppercase tracking-widest border border-neutral-700 px-4 py-2 rounded-full">
                 Scroll to explore ↓
              </span>
           </div>
           {/* Mobile Swipe Hint */}
           <div className="md:hidden">
              <span className="text-xs text-neutral-400 uppercase tracking-widest flex items-center gap-2">
                 Swipe to explore →
              </span>
           </div>
        </div>

        {/* =======================
            MOBILE VIEW: Horizontal Swipe
        ======================== */}
        <div className="lg:hidden flex overflow-x-auto snap-x snap-mandatory gap-6 pb-8 -mx-6 px-6 scrollbar-hide">
           {services.map((service) => (
              <div 
                key={service.id} 
                className="snap-center shrink-0 w-[85vw] sm:w-[400px] bg-neutral-900 rounded-xl overflow-hidden flex flex-col"
              >
                 {/* Image Area - High Res */}
                 <div className="h-[250px] w-full relative overflow-hidden">
                    <Image 
                      src={service.image} 
                      alt={service.title} 
                      fill
                      className="object-cover"
                      unoptimized={true} // Full Resolution
                    />
                    <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-md p-2 rounded-full z-10">
                       <ArrowUpRight size={20} className="text-white" />
                    </div>
                 </div>
                 {/* Content Area */}
                 <div className="p-8 flex flex-col flex-grow">
                    <span className="text-xs text-neutral-500 font-mono mb-4">/ {service.id}</span>
                    <h3 className="text-2xl font-medium mb-4">{service.title}</h3>
                    <p className="text-neutral-400 text-sm leading-relaxed">{service.description}</p>
                 </div>
              </div>
           ))}
        </div>


        {/* =======================
            DESKTOP VIEW: Stair-Step Layout (Animated)
        ======================== */}
        <div className="hidden lg:flex gap-12 relative items-start">
           
           {/* LEFT COLUMN (Moves Down) */}
           <div ref={leftColRef} className="w-1/2 flex flex-col gap-12 -mt-12">
              {services.filter((_, i) => i % 2 === 0).map((service) => (
                 <ServiceCardDesktop key={service.id} service={service} />
              ))}
           </div>

           {/* RIGHT COLUMN (Moves Up/Offset) */}
           <div ref={rightColRef} className="w-1/2 flex flex-col gap-12 pt-12">
              {services.filter((_, i) => i % 2 !== 0).map((service) => (
                 <ServiceCardDesktop key={service.id} service={service} />
              ))}
           </div>

        </div>

      </div>
    </section>
  );
}

// Sub-component for Desktop Card
function ServiceCardDesktop({ service }: { service: any }) {
  return (
    <div className="service-card group relative w-full aspect-[4/3] bg-neutral-900 overflow-hidden cursor-pointer border-t border-white/10">
      
      {/* Background Image - High Res & No Zoom */}
      <div className="absolute inset-0 w-full h-full">
         <Image 
           src={service.image} 
           alt={service.title} 
           fill
           className="object-cover opacity-60 group-hover:opacity-100 transition-opacity duration-700 ease-out" // Removed scale-105
           unoptimized={true} // Forces original quality
         />
      </div>
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-90 group-hover:opacity-60 transition-opacity duration-500 pointer-events-none" />

      {/* Content Positioned Bottom Left */}
      <div className="absolute bottom-0 left-0 w-full p-10 flex flex-col justify-end items-start transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 z-10">
        
        <div className="flex justify-between w-full items-end border-b border-white/20 pb-6 mb-6">
           <div>
              <span className="text-xs font-mono text-neutral-400 block mb-2">/ {service.id}</span>
              <h3 className="text-3xl font-medium text-white">{service.title}</h3>
           </div>
           <div className="w-12 h-12 rounded-full border border-white/30 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all duration-300">
              <ArrowUpRight size={24} strokeWidth={1} />
           </div>
        </div>
        
        <p className="text-neutral-300 text-sm leading-relaxed max-w-md opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100 transform translate-y-4 group-hover:translate-y-0">
           {service.description}
        </p>
      </div>
    </div>
  )
}