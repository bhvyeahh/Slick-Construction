"use client";

import React, { useLayoutEffect, useRef } from 'react';
import { 
  ArrowRight, 
  Hexagon, 
  Boxes, 
  Component, 
  Layers, 
  Triangle, 
  Zap 
} from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';
import Link from 'next/link';

// Register ScrollTrigger
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const stats = [
  { value: 40, suffix: '+', label: 'Successful projects' },
  { value: 50, suffix: '+', label: 'Happy clients' }
];

export default function StatsAboutSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);
  const imageContainerRef = useRef<HTMLDivElement>(null);
  const statsContainerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      
      // 1. CINEMATIC IMAGE EXPANSION
      const tlExpand = gsap.timeline({
        scrollTrigger: {
          trigger: imageContainerRef.current,
          start: "top 80%",
          end: "center 50%",
          scrub: 1,
        }
      });

      tlExpand.fromTo(imageContainerRef.current, 
        { 
          clipPath: "inset(0% 10% 0% 10% round 20px)",
          scale: 0.95 
        },
        { 
          clipPath: "inset(0% 0% 0% 0% round 0px)",
          scale: 1,
          ease: "power2.inOut" 
        }
      );

      // Parallax effect on the Image itself
      gsap.to(".parallax-image", {
        yPercent: 20,
        ease: "none",
        scrollTrigger: {
          trigger: imageContainerRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true
        }
      });

      // 2. NUMBER COUNTER ANIMATION
      const statItems = statsContainerRef.current?.children;
      
      if (statItems && statItems.length > 0) {
        Array.from(statItems).forEach((item, index) => {
          const numElement = item.querySelector('.stat-num');
          const targetVal = stats[index].value;
          const counter = { val: 0 };

          gsap.to(counter, {
            val: targetVal,
            duration: 2, 
            ease: "power3.out",
            scrollTrigger: {
              trigger: statsContainerRef.current,
              start: "top 80%", 
            },
            onUpdate: () => {
              if (numElement) {
                numElement.textContent = Math.ceil(counter.val).toString();
              }
            }
          });
          
          gsap.from(item, {
            y: 40,
            opacity: 0,
            duration: 1,
            delay: index * 0.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: statsContainerRef.current,
              start: "top 80%",
            }
          });
        });
      }

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="w-full bg-white py-24 md:py-32 relative overflow-hidden">
      
      {/* =======================
          TEXT CONTENT
      ======================== */}
      <div className="max-w-[1280px] mx-auto px-6 md:px-12 mb-20 flex flex-col md:flex-row items-end justify-between gap-12">
        <div className="max-w-2xl">
           <h2 className="text-5xl md:text-7xl font-medium leading-[0.95] tracking-tight text-neutral-900 mb-8">
             Modernity <span className="text-neutral-300">&</span> <br/>
             Simplicity.
           </h2>
        </div>
        <div className="max-w-md pb-2">
           <p className="text-neutral-500 text-lg leading-relaxed mb-8">
             Pivotal Builders is a full-service construction company serving the San Francisco Bay Area specializing
in all types of residential and commercial projects.
           </p>
           <Link href = "/services"><button className="group flex items-center gap-3 text-sm font-bold uppercase tracking-widest text-neutral-900 border-b border-neutral-900 pb-1 hover:opacity-60 transition-opacity">
             Explore Our Approach <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform"/>
           </button></Link>
        </div>
      </div>


      {/* =======================
          EXPANDING IMAGE & STATS
      ======================== */}
      <div className="relative w-full h-[80vh] md:h-screen">
         
         {/* The Expanding Image Container */}
         <div ref={imageContainerRef} className="absolute inset-0 w-full h-full overflow-hidden z-0">
            
            {/* OPTIMIZED IMAGE: "unoptimized" prop forces 100% original quality */}
            <Image 
              src="/website-photos-34-copy.jpg" 
              alt="Award Winning Interior" 
              fill
              className="parallax-image object-cover object-center scale-[1.2]" 
              unoptimized={true} // <--- This disables compression entirely
              priority={true}
            />
            
            {/* Dark Gradient Overlay for text readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10"></div>
         </div>

         {/* Overlay Stats */}
         <div className="absolute bottom-0 left-0 w-full z-20 px-6 md:px-12 pb-16 md:pb-24">
            <div ref={statsContainerRef} className="max-w-[1280px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 border-t border-white/20 pt-12">
               
               {stats.map((stat, index) => (
                 <div key={index} className="flex flex-col text-white">
                    <div className="flex items-baseline gap-1 mb-2">
                       {/* The Counter */}
                       <span className="stat-num text-6xl md:text-8xl font-medium tracking-tighter">0</span>
                       <span className="text-4xl md:text-6xl font-light opacity-60">{stat.suffix}</span>
                    </div>
                    <span className="text-sm font-mono uppercase tracking-widest opacity-80 pl-2">
                       {stat.label}
                    </span>
                 </div>
               ))}

            </div>
         </div>

      </div>

    </section>
  );
}