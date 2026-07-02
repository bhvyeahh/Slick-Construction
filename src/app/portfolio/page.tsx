"use client";

import React, { useLayoutEffect, useRef } from 'react';
import { ArrowDown } from 'lucide-react';
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
// DATA: FEATURED PROJECTS
// ===========================================
const projects = [
  {
    id: "01",
    location: "Menlo Park",
    category: "Bathroom Remodel",
    year: "2023",
    description: "A complete transformation blending modern luxury with timeless details, featuring a spa-inspired bathroom and custom vanity spaces.",
    theme: "light",
    images: ["/website-photos-20.jpg", "/website-photos-21.jpg", "/website-photos-41.jpg"]
  },
  {
    id: "02",
    location: "Mill Valley",
    category: "Custom Build & Interiors",
    year: "2024",
    description: "An expansive project featuring open-concept living, a chef's kitchen with a large island, and custom architectural details throughout.",
    theme: "dark",
    images: ["/website-photos-30.jpg", "/website-photos-32.jpg", "/website-photos-28.jpg", "/website-photos-25.jpg"]
  },
  {
    id: "03",
    location: "Potrero Hill",
    category: "Kitchen & Structural",
    year: "2023",
    description: "Modern kitchen update utilizing warm wood tones, open shelving, and structural enhancements to open up the space.",
    theme: "light",
    images: ["/website-photos-16.jpg", "/website-photos-14.jpg", "/website-photos-13.jpg"]
  },
  {
    id: "04",
    location: "Custom Decks",
    category: "Outdoor Living",
    year: "2023",
    description: "Architectural deck builds designed with precision carpentry to maximize outdoor living space and integrate seamlessly with the environment.",
    theme: "dark",
    images: ["/website-photos-35.jpg", "/website-photos-36.jpg"]
  }
];

// ===========================================
// DATA: GALLERY ARCHIVE (Fixed Layout Logic)
// ===========================================
const generateGallery = () => {
  const items = [];
  const skip = [2, 9, 24, 39, 40]; 

  for (let i = 1; i <= 41; i++) {
    if (skip.includes(i)) continue; 
    
    let spanClass = "col-span-1 md:col-span-1 md:row-span-1"; // Mobile Small / Desktop Small

    if (items.length % 3 === 2) { 
        spanClass = "col-span-2 md:col-span-1 md:row-span-2"; 
    }
    
    if (i % 7 === 0) {
        spanClass = "col-span-1 md:col-span-2 md:row-span-2"; 
    }

    items.push({
      id: i,
      src: `/website-photos-${i}.jpg`,
      span: spanClass
    });
  }
  return items;
};

const galleryItems = generateGallery();

export default function PortfolioPage() {
  const mainRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      
      // 1. HERO: Instant appearance (no delay)
      const heroLines = document.querySelectorAll('.hero-line');
      gsap.fromTo(heroLines,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: "power3.out" }
      );

      // 2. SECTIONS
      const sections = document.querySelectorAll('.project-section');
      sections.forEach((section) => {
        const imgContainer = section.querySelector('.project-img-container');
        const text = section.querySelector('.project-text');
        
        if (imgContainer) {
          const images = imgContainer.querySelectorAll('.reveal-img');
          gsap.fromTo(images,
            { scale: 1.1, opacity: 0 },
            {
              scale: 1, opacity: 1, duration: 1, stagger: 0.1, ease: "power3.out",
              scrollTrigger: { trigger: section, start: "top 70%" }
            }
          );
        }

        if (text) {
          gsap.fromTo(text,
            { x: -30, opacity: 0 },
            {
              x: 0, opacity: 1, duration: 1, ease: "power3.out",
              scrollTrigger: { trigger: section, start: "top 70%" }
            }
          );
        }
      });

      // 3. GALLERY: Fade in batch
      const galleryNodes = document.querySelectorAll('.gallery-img-wrapper');
      ScrollTrigger.batch(galleryNodes, {
        onEnter: batch => gsap.to(batch, { opacity: 1, y: 0, stagger: 0.05, duration: 0.6, ease: "power3.out" }),
        start: "top 90%",
      });

    }, mainRef);

    return () => ctx.revert();
  }, []);

  return (
    <main ref={mainRef} className="w-full relative selection:bg-neutral-500 selection:text-white">
      
      {/* =======================
          1. HERO SECTION
      ======================== */}
      <section className="relative pt-32 pb-12 px-6 md:px-12 bg-[#050505] text-white">
        <div className="max-w-[1400px] mx-auto w-full">
          
          <div className="overflow-hidden mb-4">
            <span className="hero-line block text-neutral-400 font-mono text-xs tracking-[0.2em] uppercase">
              Selected Works
            </span>
          </div>
          
          <div className="overflow-hidden mb-8">
            <h1 className="hero-line text-6xl md:text-8xl lg:text-[9vw] font-bold tracking-tighter leading-[0.9]">
              OUR <br/> PORTFOLIO
            </h1>
          </div>
          
          <div className="border-t border-white/20 pt-8 flex flex-col md:flex-row justify-between items-start md:items-end gap-8">
            <div className="max-w-xl overflow-hidden">
              <p className="hero-line text-neutral-400 text-lg md:text-xl font-light leading-relaxed">
                Where precision engineering meets timeless design. A curated selection of projects across the Bay Area.
              </p>
            </div>
            
            <div className="hero-line animate-bounce text-white/50 hidden md:block">
               <ArrowDown size={32} strokeWidth={1} />
            </div>
          </div>

        </div>
      </section>

      {/* =======================
          2. FEATURED PROJECTS
      ======================== */}
      <div className="flex flex-col">
        {projects.map((project, index) => {
          const isDark = project.theme === 'dark';
          const imageCount = project.images.length;
          
          return (
            <section 
              key={index}
              className={`project-section py-20 md:py-32 px-6 md:px-12 w-full flex items-center ${isDark ? 'bg-[#050505] text-white' : 'bg-white text-black'}`}
            >
              <div className="max-w-[1400px] mx-auto w-full">
                <div className={`flex flex-col lg:flex-row gap-12 lg:gap-16 items-stretch ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}>
                  
                  {/* TEXT */}
                  <div className="project-text w-full lg:w-5/12 flex flex-col items-start justify-center py-4 md:py-8">
                    <div className="flex items-center gap-4 mb-6 md:mb-8 w-full">
                        <span className={`font-mono text-sm border px-3 py-1 rounded-full ${isDark ? 'border-white/20 text-white/60' : 'border-black/10 text-black/60'}`}>
                          {project.id}
                        </span>
                        <div className={`h-[1px] flex-grow origin-left ${isDark ? 'bg-white/20' : 'bg-black/10'}`}></div>
                        <span className={`font-mono text-xs uppercase tracking-widest ${isDark ? 'text-white/60' : 'text-black/60'}`}>
                          {project.year}
                        </span>
                    </div>
                    <h2 className="text-4xl md:text-6xl font-medium tracking-tight mb-6 leading-[1.1]">{project.location}</h2>
                    <p className={`text-lg md:text-xl leading-relaxed font-light mb-8 ${isDark ? 'text-neutral-400' : 'text-neutral-600'}`}>{project.description}</p>
                    <div className="flex flex-wrap gap-4">
                      <span className={`text-xs font-bold uppercase tracking-widest ${isDark ? 'text-white' : 'text-black'}`}>{project.category}</span>
                    </div>
                  </div>

                  {/* IMAGES */}
                  <div className={`w-full lg:w-7/12 ${index % 2 === 0 ? 'lg:pl-12' : 'lg:pr-12'}`}>
                    <div className="project-img-container w-full h-full">
                      {imageCount === 2 && (
                        <div className="grid grid-cols-2 gap-4 h-[40vh] lg:h-[50vh]">
                          {project.images.map((src, i) => (
                             <div key={i} className="reveal-img relative w-full h-full overflow-hidden rounded-sm group">
                               <Image 
                                 src={src} 
                                 alt={project.location} 
                                 fill 
                                 className="object-cover hover:scale-105 transition-transform duration-1000" 
                                 sizes="(max-width: 768px) 100vw, 50vw" // <--- ADDED SIZES
                                 priority={index === 0} // <--- PRIORITY FOR FIRST PROJECT
                               />
                             </div>
                          ))}
                        </div>
                      )}
                      {imageCount >= 3 && (
                          <div className="grid grid-cols-2 grid-rows-2 gap-4 h-[50vh] lg:h-[70vh]">
                           {project.images.slice(0, 4).map((src, i) => {
                             const spanClasses = (imageCount === 3 && i === 0) ? 'row-span-2' : '';
                             return (
                              <div key={i} className={`reveal-img relative w-full h-full overflow-hidden rounded-sm group ${spanClasses}`}>
                                <Image 
                                  src={src} 
                                  alt={project.location} 
                                  fill 
                                  className="object-cover hover:scale-105 transition-transform duration-1000" 
                                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" // <--- ADDED SIZES
                                  priority={index === 0} // <--- PRIORITY FOR FIRST PROJECT
                                />
                              </div>
                             )
                           })}
                          </div>
                      )}
                    </div>
                  </div>

                </div>
              </div>
            </section>
          );
        })}
      </div>

      {/* =======================
          3. VISUAL ARCHIVE
      ======================== */}
      <section className="py-24 md:py-32 px-4 md:px-8 bg-[#050505] text-white">
        <div className="max-w-[1400px] mx-auto">
          <div className="flex items-end justify-between border-b border-white/10 pb-8 mb-12">
            <h3 className="text-3xl md:text-5xl font-medium tracking-tight">Visual Archive</h3>
            <span className="text-neutral-500 font-mono text-xs tracking-widest hidden md:block">ALL DETAILS</span>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 auto-rows-[200px] md:auto-rows-[300px] grid-flow-dense">
            {galleryItems.map((item, i) => (
              <div 
                key={i} 
                className={`gallery-img-wrapper relative group overflow-hidden rounded-sm cursor-pointer opacity-0 translate-y-10 ${item.span}`}
              >
                <Image 
                  src={item.src} 
                  alt={`Archive ${item.id}`} 
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw" // <--- ADDED SIZES
                />
                <div className="absolute bottom-4 left-4 opacity-0 group-hover:opacity-100 transition-opacity text-xs font-mono bg-black/50 text-white px-2 py-1 rounded backdrop-blur-sm z-10 pointer-events-none">
                   IMG_{item.id}
                </div>
              </div>
            ))}
          </div>
          
        </div>
      </section>

      {/* =======================
          4. FOOTER CTA
      ======================== */}
      <section className="py-24 md:py-32 px-6 text-center bg-white text-black border-t border-neutral-100">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-5xl md:text-8xl font-bold tracking-tighter mb-12">
              LET’S DISCUSS YOUR <br/> <span className="text-neutral-400">PROJECT</span>
            </h2>
            <Link href="/contact" className="inline-block bg-black text-white px-12 py-5 rounded-full text-lg md:text-xl font-bold hover:bg-neutral-800 transition-all hover:scale-105 shadow-xl">
              Contact Us
            </Link>
          </div>
      </section>

      <Footer />
    </main>
  );
}