"use client";

import React from 'react';
import Image from 'next/image';
import { 
  ShieldCheck, 
  HardHat, 
  Handshake, 
  Award 
} from 'lucide-react';

export default function HeroSection() {
  return (
    <main className="w-full bg-[#0A0A0A] text-white overflow-x-hidden">
      
      {/* --- TOP FOLD (100vh) --- */}
      <section className="relative h-[100dvh] lg:min-h-screen flex flex-col lg:justify-center">
        
        {/* Background Image & Intelligent Gradients */}
        <div className="absolute inset-0 w-full h-full z-0 overflow-hidden">
          <Image 
            src="/slick/slick-19.png" 
            alt="Luxurious Modern Home Interior"
            fill
            priority
            className="object-cover object-center animate-[pulse_1s_ease-in-out]"
            unoptimized
          />
          {/* THE SEAMLESS BLEND:
            Mobile: Darker gradient from bottom to top to protect the text and button.
            Desktop: Solid black stops at 35%, blends until 55%, revealing the image much further left.
          */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/80 to-[#0A0A0A]/30 lg:bg-gradient-to-r lg:from-[#0A0A0A] lg:from-[35%] lg:via-[#0A0A0A]/70 lg:via-[55%] lg:to-transparent" />
        </div>

        {/* --- CONTENT WRAPPER --- */}
        <div className="relative z-10 w-full h-full max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16 xl:px-24 flex flex-col pt-24 pb-12 lg:py-20 lg:justify-center">
          
          {/* 1. MOBILE LOGO (Upper Middle) */}
          {/* flex-1 pushes the text block down so the logo sits centered in the upper space */}
          <div className="lg:hidden flex justify-center items-center flex-1 animate-[fadeIn_1s_ease-out]">
            {/* Increased width to 85vw and height to 40 (10rem) for a much bigger presence */}
            <div className="relative w-[85vw] max-w-[400px] h-40">
              <Image 
                src="/logo.png" 
                alt="Slick Construction Logo"
                fill
                className="object-contain drop-shadow-2xl"
                priority
                unoptimized
              />
            </div>
          </div>

          {/* 2. TEXT CONTENT & BUTTON (Lower Middle) */}
          <div className="max-w-xl shrink-0">
            <span className="block text-[#D4AF37] font-mono font-bold uppercase tracking-[0.2em] text-xs md:text-sm mb-6 animate-[fadeIn_1s_ease-out]">
              SF Design-Build
            </span>
            
            <h1 className="text-5xl lg:text-7xl font-bold uppercase leading-[1.05] tracking-tight mb-8 animate-[fadeIn_1s_ease-out_0.2s_both]">
              The Art Of <br />
              <span className="font-serif italic text-gray-300 normal-case">Execution.</span>
            </h1>
            
            <p className="text-gray-400 text-lg leading-relaxed mb-8 lg:mb-12 font-medium animate-[fadeIn_1s_ease-out_0.4s_both]">
              Seamless builds and precision finishes. We deliver your vision from concept to completion.
            </p>
            
            {/* Responsive Button (Sits right under the text) */}
            <div className="flex w-full animate-[fadeIn_1s_ease-out_0.6s_both]">
              <a 
                href="#portfolio" 
                className="w-full lg:w-auto text-center px-10 py-4 bg-[#D4AF37] text-black font-bold font-mono text-xs uppercase tracking-widest rounded-sm transition-all duration-300 hover:bg-white hover:shadow-[0_0_20px_rgba(212,175,55,0.4)] active:scale-95 lg:active:scale-100"
              >
                View Our Portfolio
              </a>
            </div>
          </div>

        </div>
      </section>

      {/* --- BELOW THE FOLD (Stats extending to ~120vh+) --- */}
      <section className="relative z-20 border-t border-white/10 bg-[#0A0A0A] px-8 lg:px-16 py-16">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-10 max-w-[1400px] mx-auto">
          
          <StatBlock 
            icon={<ShieldCheck className="w-8 h-8" />} 
            value="15+ YEARS" 
            label="Of Experience" 
          />
          <StatBlock 
            icon={<HardHat className="w-8 h-8" />} 
            value="45+" 
            label="Projects Completed" 
          />
          <StatBlock 
            icon={<Handshake className="w-8 h-8" />} 
            value="Design-Build" 
            label="Seamless Delivery" 
          />
          <StatBlock 
            icon={<Award className="w-8 h-8" />} 
            value="Licensed" 
            label="CA License #1044915" 
          />
          
        </div>
      </section>

    </main>
  );
}

// --- SUB-COMPONENTS FOR CLEANER CODE ---

interface StatBlockProps {
  icon: React.ReactNode;
  value: string;
  label: string;
}

function StatBlock({ icon, value, label }: StatBlockProps) {
  return (
    <div className="flex flex-col items-center text-center group cursor-default">
      <div className="w-16 h-16 mb-5 rounded-full border-2 border-white/10 flex items-center justify-center text-gray-500 transition-all duration-300 group-hover:border-[#D4AF37] group-hover:text-[#D4AF37] group-hover:shadow-[0_0_15px_rgba(212,175,55,0.2)]">
        {icon}
      </div>
      <span className="text-xl md:text-2xl font-bold text-white uppercase tracking-tight mb-1 transition-colors duration-300 group-hover:text-gray-100">
        {value}
      </span>
      <span className="text-[10px] md:text-xs font-mono font-bold text-gray-500 uppercase tracking-widest transition-colors duration-300 group-hover:text-gray-400">
        {label}
      </span>
    </div>
  );
}