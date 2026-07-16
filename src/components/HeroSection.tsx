"use client";

import React from 'react';
import Image from 'next/image';
import Link from "next/link";
import { 
  ShieldCheck, 
  HardHat, 
  Award, 
  Home,
  ArrowDown // <-- Added ArrowDown icon here
} from 'lucide-react';

export default function HeroSection() {
  return (
    <main className="w-full bg-[#0A0A0A] text-white overflow-x-hidden">
      
      {/* --- TOP FOLD (100vh) --- */}
      <section className="relative h-[100dvh] lg:min-h-screen flex flex-col justify-center">
        
        {/* Background Image & Intelligent Gradients (BRIGHTENED) */}
        <div className="absolute inset-0 w-full h-full z-0 overflow-hidden">
          <Image 
            src="/slick/slick-19.png" 
            alt="Luxurious Modern Home Interior"
            fill
            priority
            className="object-cover object-center animate-[pulse_1s_ease-in-out]"
            unoptimized
          />
         <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/80 to-transparent lg:bg-gradient-to-r lg:from-[#0A0A0A]/90 lg:from-[20%] lg:via-[#0A0A0A]/60 lg:via-[45%] lg:to-[#0A0A0A]/20" />
        </div>

        {/* --- CONTENT WRAPPER --- */}
        {/* Removed logos completely and centered the content block vertically */}
        <div className="relative z-10 w-full h-full max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16 xl:px-24 flex flex-col justify-center">
          
          {/* TEXT CONTENT & BUTTON */}
          <div className="max-w-xl shrink-0">
           
            
            {/* Increased bottom margin on mobile (mb-10) for better spacing */}
            <h1 className="text-5xl lg:text-6xl font-bold uppercase leading-[1.05] tracking-tight mb-10 md:mb-8 animate-[fadeIn_1s_ease-out_0.2s_both]">
              <span className="font-serif italic text-gray-200 normal-case"> To Building <br /> Better Everyday.</span>
            </h1>
            
            {/* Increased bottom margin on mobile (mb-14) to push the button down nicely */}
            <p className="text-gray-300 text-lg leading-relaxed mb-14 md:mb-10 lg:mb-12 font-medium animate-[fadeIn_1s_ease-out_0.4s_both]">
              Seamless builds and precision finishes. We deliver your vision from concept to completion.
            </p>
            
            <div className="flex w-full animate-[fadeIn_1s_ease-out_0.6s_both]">
              <Link 
                href="/portfolio" 
                className="w-full lg:w-auto text-center px-10 py-4 bg-[#D4AF37] text-black font-bold font-mono text-xs uppercase tracking-widest rounded-sm transition-all duration-300 hover:bg-white hover:shadow-[0_0_20px_rgba(212,175,55,0.4)] active:scale-95 lg:active:scale-100"
              >
                View Our Portfolio
              </Link>
            </div>
            
            {/* --- MOBILE ONLY SCROLL INDICATOR --- */}
            <div className="flex md:hidden flex-col items-center mt-12 animate-[fadeIn_1s_ease-out_1s_both]">
              <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-gray-400 mb-3">
                Scroll Below
              </span>
              {/* The arrow is wrapped in a subtle ring and uses Tailwind's animate-bounce */}
              <div className="p-2 rounded-full border border-white/10 bg-white/5">
                <ArrowDown className="w-4 h-4 text-[#D4AF37] animate-bounce" />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* --- BELOW THE FOLD (Restored Black Layout with Image Content) --- */}
      <section className="relative z-20 border-t border-white/10 bg-[#0A0A0A] px-4 sm:px-8 lg:px-16 py-12 md:py-16">
        {/* Grid renders 2x2 on mobile layout, 4 columns on desktop */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-10 max-w-[1400px] mx-auto">
          
          <StatBlock 
            icon={<Home className="w-6 h-6 sm:w-8 sm:h-8" />} 
            title="DESIGN + BUILD" 
            text="Seamless solutions from concept to completion." 
          />
          <StatBlock 
            icon={<HardHat className="w-6 h-6 sm:w-8 sm:h-8" />} 
            title="GENERAL CONTRACTING" 
            text="Expert project management with clear communication every step of the way." 
          />
          <StatBlock 
            icon={<Award className="w-6 h-6 sm:w-8 sm:h-8" />} 
            title="QUALITY CRAFTSMANSHIP" 
            text="Built to last with attention to detail and the highest standards." 
          />
          <StatBlock 
            icon={<ShieldCheck className="w-6 h-6 sm:w-8 sm:h-8" />} 
            title="LICENSED + PREMIUM INSURED" 
            text="Fully licensed, insured, and committed to your peace of mind." 
          />
          
        </div>
      </section>

    </main>
  );
}

// --- SUB-COMPONENTS FOR CLEANER CODE ---

interface StatBlockProps {
  icon: React.ReactNode;
  title: string;
  text: string;
}

function StatBlock({ icon, title, text }: StatBlockProps) {
  return (
    <div className="flex flex-col items-center text-center group cursor-default">
      {/* Icon frame slightly smaller on mobile to keep the 2x2 grid neat */}
      <div className="w-12 h-12 md:w-16 md:h-16 mb-4 md:mb-5 rounded-full border-2 border-white/10 flex items-center justify-center text-gray-500 transition-all duration-300 group-hover:border-[#D4AF37] group-hover:text-[#D4AF37] group-hover:shadow-[0_0_15px_rgba(212,175,55,0.2)]">
        {icon}
      </div>
      
      <span className="text-[13px] md:text-base font-bold text-white uppercase tracking-tight mb-2 transition-colors duration-300 group-hover:text-gray-100">
        {title}
      </span>
      
      {/* ADDED hidden md:block: This entirely removes the description text on phones */}
      <span className="hidden md:block text-[13px] md:text-sm font-medium text-gray-400 leading-relaxed transition-colors duration-300 group-hover:text-gray-300">
        {text}
      </span>
    </div>
  );
}