"use client";

import React, { useLayoutEffect, useRef } from 'react';
import { ArrowRight } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';
import Link from 'next/link';

// Register ScrollTrigger
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function QualityMissionSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      
      // Animate all elements with class 'reveal-up'
      const items = document.querySelectorAll('.reveal-up');
      items.forEach((item) => {
        gsap.fromTo(item, 
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: item,
              start: "top 85%", // Start animation when top of element hits 85% of viewport height
            }
          }
        );
      });

      // Image Scale Reveal
      const images = document.querySelectorAll('.reveal-img');
      images.forEach((img) => {
        gsap.fromTo(img,
          { scale: 1.1, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            duration: 1.2,
            ease: "power2.out",
            scrollTrigger: {
              trigger: img,
              start: "top 80%",
            }
          }
        );
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="w-full bg-white py-24 px-6 md:px-12 overflow-hidden">
      <div className="max-w-[1400px] mx-auto flex flex-col gap-24 lg:gap-32">
        
        {/* =======================
            ROW 1: Text Left, Image Right
        ======================== */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
          
          {/* TEXT CONTENT */}
          <div className="flex flex-col items-start lg:pr-8 order-1 lg:order-1">
            <h2 className="reveal-up text-4xl md:text-5xl font-medium leading-[1.1] text-neutral-900 mb-6 tracking-tight">
              An exceptional quality <br/> that can’t be beaten
            </h2>
            
            <p className="reveal-up text-neutral-500 text-sm md:text-base leading-7 mb-8 max-w-md">
              We don't just build structures; we craft legacies. Every detail is meticulously planned and executed to ensure your home stands the test of time, blending durability with timeless elegance.
            </p>
            
            <Link 
              href="/contact"
              className="reveal-up bg-[#111] text-white px-8 py-3.5 rounded-full text-sm font-semibold hover:bg-black transition-all hover:scale-105 flex items-center gap-2 group"
            >
              Start your project 
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* IMAGE - OPTIMIZED */}
          <div className="reveal-img relative h-[400px] lg:h-[500px] w-full rounded-sm overflow-hidden order-2 lg:order-2">
            <Image 
              src="/website-photos-10.jpg" // Renamed from "Website Photos -10.jpg"
              alt="Exceptional Quality Detail" 
              fill
              className="object-cover"
              unoptimized={true}
            />
          </div>
        </div>


        {/* =======================
            ROW 2: Image Left, Text Right
        ======================== */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
          
          {/* IMAGE (Left on Desktop, Top on Mobile) */}
          <div className="reveal-img relative h-[400px] lg:h-[500px] w-full rounded-sm overflow-hidden order-2 lg:order-1">
            <Image 
              src="/website-photos-11.jpg" // Renamed from "Website Photos -11.jpg"
              alt="Pivotal Builders Mission" 
              fill
              className="object-cover"
              unoptimized={true}
            />
          </div>

          {/* TEXT CONTENT (Right on Desktop, Bottom on Mobile) */}
          <div className="flex flex-col items-start lg:pl-8 order-1 lg:order-2">
            <h2 className="reveal-up text-4xl md:text-5xl font-medium leading-[1.1] text-neutral-900 mb-6 tracking-tight">
              Our mission is to <br/> deliver high quality work
            </h2>
            
            <p className="reveal-up text-neutral-500 text-sm md:text-base leading-7 mb-8 max-w-md">
              Our goal is to create spaces you love. From luxurious interiors to smart structural investments, we deliver excellence in every square foot. Let us guide you home.
            </p>
            
            <Link 
              href="/services"
              className="reveal-up px-8 py-3.5 rounded-full text-sm font-semibold text-neutral-900 border border-neutral-200 hover:bg-neutral-50 transition-colors"
            >
              Explore Services
            </Link>
          </div>

        </div>

      </div>
    </section>
  );
}