"use client";

import React, { useRef, useEffect, useLayoutEffect } from 'react';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import { CheckCircle2, ClipboardCheck, HardHat, PenTool, Ruler, ArrowRight } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Footer from '@/components/Footer';
import Image from 'next/image';
import Link from 'next/link';

// Register GSAP ScrollTrigger
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// ===========================================
// DATA: Services List
// ===========================================
const servicesData = [
  {
    title: "Full Home Remodel",
    description: "A full home remodel means an expertly curated space with custom details that elevate your daily living. We manage the complexity of whole-house renovations to deliver a cohesive, stunning result.",
    image: "/website-photos-3.jpg" 
  },
  {
    title: "Kitchen Remodel",
    description: "The kitchen is the heart of the home. We craft spaces that blend form, function, and beauty with upscale materials and custom millwork.",
    image: "/website-photos-4.jpg" 
  },
  {
    title: "Bathroom Remodel",
    description: "Thoughtfully designed and crafted with comfort and luxury in mind. We transform outdated bathrooms into spa-like retreats.",
    image: "/website-photos-5.jpg" 
  },
  {
    title: "ADU’s (Accessory Dwelling Units)",
    description: "Whether it’s a family retreat or rental unit, we transform underutilized areas into functional extensions of your home.",
    image: "/website-photos-6.jpg" 
  },
  {
    title: "Additions & Structural Work",
    description: "Expand with intention. We seamlessly integrate new square footage without compromising your home’s character.",
    image: "/website-photos-7.jpg" 
  },
  {
    title: "Custom Deck Builds",
    description: "Expertly built to enhance the way you live outdoors. We use durable materials to create the ultimate outdoor entertainment zone.",
    image: "/website-photos-8.jpg" 
  }
];

// ===========================================
// DATA: Process Steps (Condensed to 4)
// ===========================================
const processSteps = [
  {
    id: "01",
    title: "Collaborative Design",
    desc: "We align Architects, Engineers, and Designers on a single unified vision before we build.",
    icon: PenTool
  },
  {
    id: "02",
    title: "Transparent Estimating",
    desc: "Detailed scope documentation and precise cost estimates so there are no surprises.",
    icon: ClipboardCheck
  },
  {
    id: "03",
    title: "Seamless Management",
    desc: "Thoughtful coordination ensures minimal disruption and maximum efficiency on site.",
    icon: HardHat
  },
  {
    id: "04",
    title: "Timeless Craftsmanship",
    desc: "The final result: a home built to perfection, ready for you to enjoy.",
    icon: Ruler
  }
];

// ===========================================
// COMPONENT: Mobile Card Layout (GSAP Animated)
// ===========================================
const VideoProcessMobile = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const cards = document.querySelectorAll('.mobile-step-card');
      
      cards.forEach((card, index) => {
        // Alternating entrance: Left for even, Right for odd
        const xStart = index % 2 === 0 ? -50 : 50;
        
        gsap.fromTo(card, 
          { opacity: 0, x: xStart },
          {
            opacity: 1,
            x: 0,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 85%", // Triggers when top of card hits 85% of viewport
            }
          }
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="flex flex-col gap-8 px-6 pt-24 pb-16 bg-[#0A0A0A] md:hidden overflow-hidden">
      
      {/* 1. Header Text */}
      <div className="text-center mb-2">
        <h1 className="text-white text-4xl font-bold tracking-tighter leading-none mb-2">
          OUR PROCESS
        </h1>
        <p className="text-white/60 text-xs tracking-[0.2em] uppercase">
          Vision to Reality
        </p>
      </div>

      {/* 2. Video Card (Compact 50vh) */}
      <div className="relative w-full h-[50vh] rounded-[2rem] overflow-hidden shadow-2xl border border-white/10">
        <video
          className="absolute inset-0 w-full h-full object-cover opacity-80"
          src="/service-house-optimized.mp4" 
          playsInline
          muted
          autoPlay
          loop
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-black/30" />
        
        <div className="absolute bottom-6 left-6 right-6">
           <div className="text-white/80 font-mono text-xs mb-1 uppercase tracking-widest">Workflow</div>
           <div className="text-white text-xl font-medium leading-tight">
             4 Steps to your <br/> dream home.
           </div>
        </div>
      </div>

      {/* 3. Steps List (GSAP Animated) */}
      <div className="flex flex-col gap-4 mt-2">
        {processSteps.map((step, i) => (
          <div key={i} className="mobile-step-card bg-[#151515] p-6 rounded-3xl border border-white/5 shadow-lg relative z-10">
            <div className="flex items-center justify-between mb-3">
               <div className="flex items-center gap-3">
                  <span className="text-white font-mono text-xs border border-white/20 px-2 py-1 rounded-full bg-white/5">{step.id}</span>
                  <step.icon size={16} className="text-white/60" />
               </div>
               <div className="h-[1px] w-12 bg-white/10"></div>
            </div>
            <h2 className="text-white text-2xl font-medium tracking-tight mb-2">
              {step.title}
            </h2>
            <p className="text-white/50 text-sm leading-relaxed font-light">
              {step.desc}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};


// ===========================================
// COMPONENT: Desktop Scrollytelling (4 Steps)
// ===========================================
const VideoProcessDesktop = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const smoothProgress = useSpring(scrollYProgress, {
    damping: 20, mass: 0.8, stiffness: 50
  });

  useEffect(() => {
    let animationFrameId: number;
    const updateVideo = () => {
      if (videoRef.current && videoRef.current.duration) {
        const progress = smoothProgress.get();
        const duration = videoRef.current.duration;
        const targetTime = Math.max(0, Math.min(progress * duration, duration - 0.001));
        
        if (Math.abs(videoRef.current.currentTime - targetTime) > 0.05) {
          videoRef.current.currentTime = targetTime;
        }
      }
      animationFrameId = requestAnimationFrame(updateVideo);
    };
    animationFrameId = requestAnimationFrame(updateVideo);
    return () => cancelAnimationFrame(animationFrameId);
  }, [smoothProgress]);

  // --- TRANSFORMS FOR 4 STEPS ---
  
  // Hero: 0 - 0.1
  const opHero = useTransform(smoothProgress, [0, 0.1], [1, 0]);
  const yHero  = useTransform(smoothProgress, [0, 0.1], [0, -50]);

  // Step 1: 0.15 - 0.30
  const op1 = useTransform(smoothProgress, [0.15, 0.22, 0.30], [0, 1, 0]);
  const y1  = useTransform(smoothProgress, [0.15, 0.22, 0.30], [50, 0, -50]);

  // Step 2: 0.35 - 0.50
  const op2 = useTransform(smoothProgress, [0.35, 0.42, 0.50], [0, 1, 0]);
  const y2  = useTransform(smoothProgress, [0.35, 0.42, 0.50], [50, 0, -50]);

  // Step 3: 0.55 - 0.70
  const op3 = useTransform(smoothProgress, [0.55, 0.62, 0.70], [0, 1, 0]);
  const y3  = useTransform(smoothProgress, [0.55, 0.62, 0.70], [50, 0, -50]);

  // Step 4 (Final): 0.75 - 0.90
  const op4 = useTransform(smoothProgress, [0.75, 0.82, 0.90], [0, 1, 1]);
  const y4  = useTransform(smoothProgress, [0.75, 0.82, 0.90], [50, 0, 0]);

  return (
    <div ref={containerRef} className="hidden md:block relative h-[500vh] bg-[#0A0A0A]">
      <div className="sticky top-0 left-0 w-full h-screen overflow-hidden">
        <video
          ref={videoRef}
          className="absolute inset-0 w-full h-full object-cover opacity-60"
          src="/service-house-optimized.mp4" 
          playsInline
          muted
          preload="auto"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/40 pointer-events-none" />

        {/* HERO */}
        <motion.div style={{ opacity: opHero, y: yHero }} className="absolute inset-0 flex flex-col items-center justify-center text-center z-10 pointer-events-none">
          <h1 className="text-white text-[9vw] font-bold tracking-tighter leading-none mb-6 drop-shadow-lg">OUR PROCESS</h1>
          <p className="text-white/90 text-2xl font-light tracking-[0.2em] uppercase">Vision to Reality</p>
          <div className="mt-12 animate-pulse text-white/60 text-sm tracking-widest uppercase border border-white/20 px-4 py-2 rounded-full backdrop-blur-sm">Scroll to Begin</div>
        </motion.div>

        {/* STEP 1 (Left) */}
        <motion.div style={{ opacity: op1, y: y1 }} className="absolute bottom-24 left-24 max-w-xl z-10 pointer-events-none">
          <div className="flex items-center gap-4 mb-4"><span className="text-white font-mono text-sm border border-white/30 px-3 py-1 rounded-full bg-black/20 backdrop-blur-sm">01</span><div className="h-[1px] w-12 bg-white/40"></div></div>
          <h2 className="text-white text-6xl font-medium tracking-tight mb-4">Collaborative <br/> Design</h2>
          <p className="text-white/80 text-xl leading-relaxed font-light">We align Architects, Engineers, and Designers on a single unified vision before we build.</p>
        </motion.div>

        {/* STEP 2 (Right) */}
        <motion.div style={{ opacity: op2, y: y2 }} className="absolute top-32 right-24 max-w-xl text-right z-10 pointer-events-none">
          <div className="flex items-center gap-4 mb-4 justify-end"><div className="h-[1px] w-12 bg-white/40"></div><span className="text-white font-mono text-sm border border-white/30 px-3 py-1 rounded-full bg-black/20 backdrop-blur-sm">02</span></div>
          <h2 className="text-white text-6xl font-medium tracking-tight mb-4">Transparent <br/> Estimating</h2>
          <p className="text-white/80 text-xl leading-relaxed font-light">Detailed scope documentation and precise cost estimates so there are no surprises.</p>
        </motion.div>

        {/* STEP 3 (Left) */}
        <motion.div style={{ opacity: op3, y: y3 }} className="absolute bottom-24 left-24 max-w-xl z-10 pointer-events-none">
          <div className="flex items-center gap-4 mb-4"><span className="text-white font-mono text-sm border border-white/30 px-3 py-1 rounded-full bg-black/20 backdrop-blur-sm">03</span><div className="h-[1px] w-12 bg-white/40"></div></div>
          <h2 className="text-white text-6xl font-medium tracking-tight mb-4">Seamless <br/> Management</h2>
          <p className="text-white/80 text-xl leading-relaxed font-light">Thoughtful coordination ensures minimal disruption and maximum efficiency on site.</p>
        </motion.div>

        {/* STEP 4 (Center - Final) */}
        <motion.div style={{ opacity: op4, y: y4 }} className="absolute inset-0 flex flex-col items-center justify-center text-center z-10 pointer-events-none">
           <span className="text-white/60 font-mono text-sm mb-4 block uppercase tracking-widest border border-white/20 px-3 py-1 rounded-full w-fit mx-auto">04</span>
           <h2 className="text-white text-7xl font-medium tracking-tight mb-6">Timeless <br/> Craftsmanship</h2>
           <p className="text-white/80 text-xl max-w-2xl mx-auto font-light">The final result: a home built to perfection, ready for you to enjoy.</p>
        </motion.div>
      </div>
    </div>
  );
};


// ===========================================
// MAIN PAGE COMPONENT
// ===========================================
export default function ServicesPage() {
  return (
    <main className="w-full bg-white relative selection:bg-black selection:text-white">
      
      {/* 1. Mobile Process (GSAP Animated Cards) */}
      <VideoProcessMobile />

      {/* 2. Desktop Process (Video Scroll) */}
      <VideoProcessDesktop />

      {/* 3. Detailed Services List */}
      <section id="services-list" className="py-24 md:py-32 px-6 md:px-12 bg-white relative z-20">
        <div className="max-w-[1400px] mx-auto">
          
          <div className="mb-24 text-center">
             <span className="text-sm font-mono uppercase tracking-[0.2em] text-neutral-400 mb-4 block">What We Do</span>
             <h2 className="text-4xl md:text-6xl lg:text-7xl font-medium text-neutral-900 tracking-tight">
               Crafting spaces for <br/> <span className="text-neutral-400 italic font-serif">modern living.</span>
             </h2>
          </div>

          <div className="flex flex-col gap-24 lg:gap-32">
            {servicesData.map((service, index) => (
              <div 
                key={index} 
                className={`flex flex-col lg:flex-row gap-12 lg:gap-24 items-center ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}
              >
                {/* Image */}
                <div className="w-full lg:w-1/2">
                   <div className="relative aspect-[4/3] rounded-[2rem] overflow-hidden shadow-2xl group">
                      <Image 
                        src={service.image} 
                        alt={service.title} 
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                        unoptimized={true}
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500" />
                   </div>
                </div>

                {/* Content */}
                <div className="w-full lg:w-1/2 flex flex-col items-start">
                   <div className="w-12 h-12 bg-black text-white rounded-full flex items-center justify-center mb-6 md:mb-8 text-lg font-serif italic">
                      {index + 1}
                   </div>
                   <h3 className="text-3xl md:text-5xl font-medium text-neutral-900 mb-4 md:mb-6 leading-tight">
                     {service.title}
                   </h3>
                   <p className="text-base md:text-lg text-neutral-500 leading-relaxed font-light mb-8 max-w-md">
                     {service.description}
                   </p>
                   
                   <ul className="flex flex-col gap-3 mb-10">
                      <li className="flex items-center gap-3 text-neutral-800 text-sm font-medium">
                        <CheckCircle2 size={18} className="text-black shrink-0" /> Expert Consultation
                      </li>
                      <li className="flex items-center gap-3 text-neutral-800 text-sm font-medium">
                        <CheckCircle2 size={18} className="text-black shrink-0" /> Custom Material Selection
                      </li>
                      <li className="flex items-center gap-3 text-neutral-800 text-sm font-medium">
                        <CheckCircle2 size={18} className="text-black shrink-0" /> Dedicated Project Manager
                      </li>
                   </ul>

                   <Link href="/contact" className="text-sm font-bold uppercase tracking-widest border-b border-black pb-1 hover:opacity-60 transition-opacity flex items-center gap-2">
                     Start Project <ArrowRight size={16} />
                   </Link>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      <Footer />
    </main>
  );
}