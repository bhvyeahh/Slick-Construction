"use client";

import React from 'react';
import Image from 'next/image';
import Link from "next/link";
import { 
  ShieldCheck, 
  HardHat, 
  Award, 
  Home,
  ArrowDown
} from 'lucide-react';

export default function HeroSection() {
  return (
    <main className="w-full bg-[#0A0A0A] text-white overflow-x-hidden">
      
      {/* --- TOP FOLD (100svh for stable mobile height) --- */}
      <section className="relative h-[100svh] lg:min-h-screen flex flex-col justify-center">
        
        {/* Background Image (RESTORED TO BRIGHT & NATURAL) */}
        <div className="absolute inset-0 w-full h-full z-0 overflow-hidden">
          <Image 
            src="/slick/slick-19.png" 
            alt="Luxurious Modern Home Interior"
            fill
            priority
            className="object-cover object-center animate-[pulse_1s_ease-in-out]"
          />
          {/* Empty div kept as requested, no dark gradients or blurs applied to the image itself */}
          <div className="absolute inset-0 " />
        </div>

        {/* --- CONTENT WRAPPER --- */}
        <div className="relative z-10 w-full h-full max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16 xl:px-24 flex flex-col justify-center pt-28 lg:pt-0">
          
          {/* TEXT CONTENT & BUTTON */}
          <div className="max-w-xl shrink-0">
            
            {/* UPDATED: Applied intense custom text-shadow to anchor the text over the bright image */}
            <h1 
              className="text-5xl lg:text-6xl font-bold uppercase leading-[1.05] tracking-tight mb-10 md:mb-8 animate-[fadeIn_1s_ease-out_0.2s_both]"
              style={{ textShadow: "0px 4px 25px rgba(0, 0, 0, 0.9), 0px 0px 15px rgba(0, 0, 0, 0.7)" }}
            >
              <span className="font-serif italic text-white normal-case"> Building <br /> Better Everyday</span>
            </h1>
            
            {/* UPDATED: Custom text-shadow on the paragraph for maximum legibility */}
            <p 
              className="text-white text-lg leading-relaxed mb-14 md:mb-10 lg:mb-12 font-medium animate-[fadeIn_1s_ease-out_0.4s_both]"
              style={{ textShadow: "0px 2px 10px rgba(0, 0, 0, 0.9), 0px 0px 20px rgba(0, 0, 0, 0.6)" }}
            >
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
              <span 
                className="text-[10px] font-mono uppercase tracking-[0.2em] text-white mb-3 font-semibold"
                style={{ textShadow: "0px 2px 8px rgba(0, 0, 0, 1)" }}
              >
                Scroll Below
              </span>
              <div className="p-2 rounded-full border border-white/20 bg-black/40 backdrop-blur-sm shadow-[0_0_15px_rgba(0,0,0,0.5)]">
                <ArrowDown className="w-4 h-4 text-[#D4AF37] animate-bounce" />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* --- BELOW THE FOLD --- */}
      <section className="relative z-20 border-t border-white/10 bg-[#0A0A0A] px-4 sm:px-8 lg:px-16 py-12 md:py-16">
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
      <div className="w-12 h-12 md:w-16 md:h-16 mb-4 md:mb-5 rounded-full border-2 border-white/10 flex items-center justify-center text-gray-500 transition-all duration-300 group-hover:border-[#D4AF37] group-hover:text-[#D4AF37] group-hover:shadow-[0_0_15px_rgba(212,175,55,0.2)]">
        {icon}
      </div>
      
      <span className="text-[13px] md:text-base font-bold text-white uppercase tracking-tight mb-2 transition-colors duration-300 group-hover:text-gray-100">
        {title}
      </span>
      
      <span className="hidden md:block text-[13px] md:text-sm font-medium text-gray-400 leading-relaxed transition-colors duration-300 group-hover:text-gray-300">
        {text}
      </span>
    </div>
  );
}