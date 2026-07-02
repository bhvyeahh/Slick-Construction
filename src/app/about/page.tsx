"use client";

import React, { useLayoutEffect, useRef } from 'react';
import { ArrowDown } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Footer from '@/components/Footer'; 
import QualityMissionSection from '@/components/QualityMissionSection';
import Image from 'next/image';

// Register ScrollTrigger
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function AboutPage() {
  const mainRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const bioSectionRef = useRef<HTMLDivElement>(null);
  const bioImageRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      
      // 1. HERO TEXT REVEAL
      const heroText = heroRef.current?.querySelectorAll(".reveal-text");
      if (heroText && heroText.length > 0) {
        gsap.fromTo(heroText, 
          { y: 50, opacity: 0 },
          { 
            y: 0, 
            opacity: 1, 
            duration: 1, 
            stagger: 0.1, 
            ease: "power3.out",
            delay: 0.2
          }
        );
      }

      // 2. BIO SECTION PINNING (Desktop Only)
      ScrollTrigger.matchMedia({
        "(min-width: 1024px)": function() {
          ScrollTrigger.create({
            trigger: bioSectionRef.current,
            start: "top top",
            end: "bottom bottom",
            pin: bioImageRef.current, 
            pinSpacing: false 
          });
        }
      });

      // 3. BIO TEXT FADE IN
      const paragraphs = document.querySelectorAll(".bio-text p, .bio-text .quote-box");
      paragraphs.forEach((p) => {
        gsap.from(p, {
          scrollTrigger: {
            trigger: p,
            start: "top 85%",
            toggleActions: "play none none reverse"
          },
          y: 20,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out"
        });
      });

    }, mainRef);

    return () => ctx.revert();
  }, []);

  return (
    <main ref={mainRef} className="w-full bg-white relative selection:bg-black selection:text-white">
      
      {/* =========================================
          1. HEADER SECTION
      ========================================= */}
      <section ref={heroRef} className="pt-40 pb-20 px-6 md:px-12 bg-[#050505] text-white relative">
        <div className="max-w-[1400px] mx-auto">
           <div className="reveal-text inline-block border border-white/20 px-4 py-1.5 rounded-full mb-8 bg-white/5 backdrop-blur-md">
             <span className="text-xs font-mono uppercase tracking-[0.2em] text-neutral-300">Est. 2011 • San Francisco</span>
           </div>
           
           <h1 className="reveal-text text-5xl md:text-7xl lg:text-[6vw] font-bold tracking-tighter leading-[0.95] mb-8">
             BUILT ON TRUST & <br/>
             <span className="text-neutral-500 italic font-serif">Integrity.</span>
           </h1>
           
           <p className="reveal-text text-lg md:text-xl text-neutral-400 font-light max-w-2xl leading-relaxed">
             Meet the team dedicated to transforming the San Francisco Bay Area, one project at a time. We prioritize integrity, transparency, and results.
           </p>

           <div className="reveal-text mt-16 opacity-50">
              <ArrowDown className="animate-bounce w-6 h-6" strokeWidth={1} />
           </div>
        </div>
      </section>


      {/* =========================================
          2. BIO SECTION (Split Layout)
      ========================================= */}
      <section ref={bioSectionRef} className="relative w-full bg-white">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-2">
          
          {/* LEFT: Image Column (Sticky) */}
          <div ref={bioImageRef} className="relative w-full min-h-[50vh] lg:h-screen lg:sticky lg:top-0 flex items-center justify-center bg-neutral-50 lg:bg-transparent px-6 py-12 lg:p-0 z-10">
            
            {/* FIXED CONTAINER:
              - 'w-full' but 'max-w-[300px]' restricts the width heavily.
              - This forces the height to shrink proportionally, solving the "too tall" issue.
            */}
            <div className="relative w-full max-w-[300px] rounded-[2rem] overflow-hidden shadow-2xl group">
              
              <Image 
                src="/website-photos-9.jpg"
                alt="Paul Magill - Pivotal Builders" 
                width={1000} 
                height={1500} 
                // 'h-auto' allows height to adjust based on our restricted width
                className="w-full h-auto object-cover transition-transform duration-[2s] group-hover:scale-105"
                unoptimized={true}
              />
              
              {/* Badge */}
              <div className="absolute bottom-6 right-6 bg-white/90 backdrop-blur-xl p-5 rounded-2xl border border-white/20 shadow-xl max-w-[160px]">
                <p className="font-serif text-xl italic mb-2 text-black">Paul Magill</p>
                <div className="h-[1px] w-8 bg-black mb-3"></div>
                <p className="text-[10px] font-mono uppercase tracking-widest text-neutral-500">Owner & Founder</p>
              </div>
            </div>
          </div>


          {/* RIGHT: Text Column (Scrollable) */}
          <div className="flex flex-col justify-center px-6 py-16 md:p-16 lg:p-24 lg:min-h-screen bg-white relative z-20">
            <div className="bio-text space-y-10 max-w-2xl mx-auto lg:mx-0">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-medium text-neutral-900 leading-[1.1] tracking-tight">
                From the shores of <br/> Lough Neagh to the <span className="italic font-serif text-neutral-500">SF Bay.</span>
              </h2>

              <div className="prose prose-lg prose-neutral font-light text-lg md:text-xl leading-relaxed text-neutral-600 space-y-8">
                <p>
                  I’m Paul Magill, the owner of Pivotal Builders Inc. Born and raised in Ireland on the southern shores of Lough Neagh, I moved to San Francisco in 2011 and quickly became deeply rooted in the Bay Area construction industry.
                </p>
                <p>
                  Over the years, I’ve built my career around hands-on experience, local expertise, and a deep appreciation for the craft of building in one of the most unique markets in the country.
                </p>
                
                <div className="quote-box border-l-4 border-black pl-6 lg:pl-8 py-2 my-12 bg-neutral-50 lg:bg-transparent rounded-r-xl lg:rounded-none">
                  <p className="text-xl md:text-3xl text-neutral-900 font-medium italic leading-snug">
                    "I started Pivotal Builders with a simple goal: to build high-quality spaces while giving clients a construction experience that feels clear, honest, and well managed."
                  </p>
                </div>

                <p>
                  I stay personally involved throughout the entire process – from early planning and design conversations to the final details at completion. I believe the best results come from listening closely, setting clear expectations, and taking pride in every decision made along the way.
                </p>
                <p>
                  For me, craftsmanship isn’t just about how something looks when it’s finished but how well it functions and how confidently it was built. Building or remodeling is a major investment, and I don’t take that responsibility lightly.
                </p>
                <p>
                  At Pivotal Builders, success isn’t just measured by the final product – it’s measured by satisfied clients, lasting relationships, and work I’m proud to stand behind.
                </p>
              </div>

              {/* Signature */}
              {/* <div className="pt-8 opacity-80">
                 <img src="https://upload.wikimedia.org/wikipedia/commons/e/e4/Signature_sample.svg" alt="Signature" className="h-12 lg:h-16 w-auto opacity-60 invert-0" />
              </div> */}
            </div>
          </div>

        </div>
      </section>

      {/* 3. QUALITY & MISSION SECTION */}
      <QualityMissionSection />
      
      <Footer />
    </main>
  );
}