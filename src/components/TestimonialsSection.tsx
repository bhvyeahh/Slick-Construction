"use client";

import React, { useRef, useState, useLayoutEffect } from 'react';
import { ArrowRight, ArrowLeft, Quote } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Link from 'next/link';

// Register ScrollTrigger
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const testimonials = [
  {
    id: 1,
    quote: "They did an amazing work for our home",
    text: "Pivotal Builders transformed our outdated property into a modern sanctuary. Their attention to detail, from the custom millwork to the lighting design, was simply flawless. We felt supported every step of the way.",
    name: "John Carter",
    role: "Homeowner, San Francisco",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop"
  },
  {
    id: 2,
    quote: "A seamless process from start to finish",
    text: "Construction can be stressful, but the team made it effortless. The project management was transparent, and they finished two weeks ahead of schedule. Truly professional partners.",
    name: "Sarah Jenkins",
    role: "Real Estate Developer",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop"
  },
  {
    id: 3,
    quote: "Exceeded our expectations in every way",
    text: "We hired them for an ADU addition, and the quality of craftsmanship is indistinguishable from the main house. They respected our budget and delivered a luxury product.",
    name: "Michael Chen",
    role: "Architect, Bay Area",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop"
  },
  {
    id: 4,
    quote: "Attention to detail is their superpower",
    text: "I've worked with many builders, but Pivotal stands out. Their ability to solve complex structural challenges without compromising the design intent is why I keep coming back.",
    name: "Elena Rodriguez",
    role: "Interior Designer",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=200&auto=format&fit=crop"
  }
];

export default function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  
  // Refs for animated elements
  const quoteRef = useRef<HTMLHeadingElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  const animateContent = (direction: 'next' | 'prev', nextIndex: number) => {
    const tl = gsap.timeline();
    
    // 1. Exit Animations (Fade Out & Slide)
    tl.to([quoteRef.current, textRef.current, infoRef.current], {
      y: direction === 'next' ? -20 : 20,
      opacity: 0,
      duration: 0.3,
      stagger: 0.05,
      ease: "power2.in"
    })
    .to(imageRef.current, {
        scale: 0.8,
        opacity: 0,
        duration: 0.3
    }, "<") // Run simultaneously
    
    // 2. State Update (Change Content)
    .call(() => setCurrentIndex(nextIndex))
    
    // 3. Entrance Animations (Fade In & Slide)
    .fromTo([quoteRef.current, textRef.current, infoRef.current], 
      { y: direction === 'next' ? 20 : -20, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.5,
        stagger: 0.1,
        ease: "power2.out"
      }
    )
    .fromTo(imageRef.current,
        { scale: 1.2, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.5, ease: "back.out(1.7)" },
        "<0.1" // Small overlap
    );
  };

  const handleNext = () => {
    const nextIndex = (currentIndex + 1) % testimonials.length;
    animateContent('next', nextIndex);
  };

  const handlePrev = () => {
    const prevIndex = (currentIndex - 1 + testimonials.length) % testimonials.length;
    animateContent('prev', prevIndex);
  };

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Initial Scroll Trigger Reveal for the whole section
      gsap.from(containerRef.current!.children, {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
        },
        y: 50,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power3.out"
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const currentTestimonial = testimonials[currentIndex];

  return (
    <section ref={containerRef} className="w-full bg-white py-24 px-6 md:px-12 relative overflow-hidden">
      <div className="max-w-[1400px] mx-auto">
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          
          {/* =======================
              LEFT COLUMN: Static Header
          ======================== */}
          <div className="flex flex-col items-start relative z-10">
            <h2 className="text-4xl md:text-5xl lg:text-[64px] font-medium leading-[1] text-neutral-900 mb-8 tracking-tight">
              What our great <br/> clients say
            </h2>
            
            <p className="text-neutral-500 text-lg leading-relaxed mb-10 max-w-md">
              Hear from those who have trusted us to build their dreams. Our reputation is built on their satisfaction.
            </p>
            <Link href="/contact"><button className="bg-black text-white px-8 py-4 rounded-full text-sm font-semibold hover:bg-neutral-800 transition-all hover:scale-105 flex items-center gap-2 group shadow-xl">
              Get a quote 
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </button></Link>
            
          </div>


          {/* =======================
              RIGHT COLUMN: Animated Slider Card
          ======================== */}
          <div ref={cardRef} className="relative w-full bg-[#F9F9F9] rounded-3xl p-8 md:p-16 flex items-center shadow-sm min-h-[500px]">
            
            {/* Background Decor (Subtle Quote Icon) */}
            <div className="absolute top-8 right-8 text-neutral-200">
               <Quote size={80} fill="currentColor" strokeWidth={0} />
            </div>

            {/* Navigation Arrows (Absolute Positioning) */}
            <button 
                onClick={handlePrev}
                className="hidden md:flex absolute left-0 top-1/2 -translate-x-1/2 w-14 h-14 bg-white rounded-full items-center justify-center hover:scale-110 active:scale-95 transition-all shadow-lg text-neutral-900 z-20 border border-neutral-100"
            >
              <ArrowLeft size={20} strokeWidth={1.5} />
            </button>

            <button 
                onClick={handleNext}
                className="hidden md:flex absolute right-0 top-1/2 translate-x-1/2 w-14 h-14 bg-white rounded-full items-center justify-center hover:scale-110 active:scale-95 transition-all shadow-lg text-neutral-900 z-20 border border-neutral-100"
            >
              <ArrowRight size={20} strokeWidth={1.5} />
            </button>


            {/* Content Container */}
            <div className="w-full md:px-8 relative z-10">
              
              {/* Dynamic Quote Title */}
              <h3 ref={quoteRef} className="text-2xl md:text-3xl font-medium text-neutral-900 mb-6 leading-tight">
                “{currentTestimonial.quote}”
              </h3>
              
              {/* Dynamic Body Text */}
              <p ref={textRef} className="text-neutral-500 text-base md:text-lg leading-relaxed mb-10 font-light">
                {currentTestimonial.text}
              </p>

              {/* Divider Line */}
              <div className="w-full h-[1px] bg-neutral-200 mb-8" />

              {/* Dynamic Profile Info */}
              <div ref={infoRef} className="flex items-center gap-5">
                <div className="w-14 h-14 rounded-full overflow-hidden bg-neutral-200 border border-white shadow-sm">
                  <img 
                    ref={imageRef}
                    src={currentTestimonial.image} 
                    alt={currentTestimonial.name} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex flex-col">
                  <span className="text-base font-bold text-neutral-900">{currentTestimonial.name}</span>
                  <span className="text-sm text-neutral-500">{currentTestimonial.role}</span>
                </div>
              </div>

              {/* Mobile Navigation (Visible only on small screens) */}
              <div className="flex md:hidden gap-4 mt-8">
                 <button onClick={handlePrev} className="w-10 h-10 rounded-full border border-neutral-300 flex items-center justify-center"><ArrowLeft size={16}/></button>
                 <button onClick={handleNext} className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center"><ArrowRight size={16}/></button>
              </div>

            </div>

          </div>

        </div>
      </div>
    </section>
  );
}