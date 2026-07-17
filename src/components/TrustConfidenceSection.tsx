"use client";

import React from 'react';
import Image from 'next/image';
import { motion, Variants } from 'framer-motion';
import { Quote } from 'lucide-react';

export default function TrustConfidenceSection() {
  const revealVariant: Variants = {
    hidden: { opacity: 0, y: 40, filter: 'blur(10px)' },
    visible: { 
      opacity: 1, 
      y: 0, 
      filter: 'blur(0px)',
      transition: { duration: 1, ease: [0.16, 1, 0.3, 1] } 
    }
  };

  return (
    <section className="w-full bg-[#FAFAFA] text-[#111111] py-45 md:py-32 px-6 md:px-12 relative overflow-hidden">
      <div className="max-w-[1300px] mx-auto">
        
        {/* ── MAIN LAYOUT WRAPPER ── */}
        {/* FIX: Removed 'items-start' from here so the left column stretches to full height, enabling sticky */}
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20">
          
          {/* ==========================================
              LEFT SIDE: STICKY IMAGE CONTAINER
          ========================================== */}
          <div className="w-full lg:w-5/12 relative">
            
            {/* The sticky wrapper now has room to slide down the tall parent column */}
            <div className="lg:sticky lg:top-32 z-10 flex flex-col">
              
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                className="relative w-full aspect-[4/5] max-w-[450px] mx-auto lg:mx-0 rounded-2xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.08)] bg-white"
              >
                <Image 
                  src="/slick/slick-4.png" 
                  alt="Nicholas Coleman - Owner" 
                  fill 
                  className="object-cover object-center"
                  priority
                />
                
                <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 via-black/40 to-transparent">
                  <div className="bg-white/95 backdrop-blur-md inline-flex flex-col py-3 px-6 rounded-xl shadow-lg border border-white/20">
                    <span className="text-[#111111] font-bold text-lg tracking-tight">
                      Nicholas Coleman
                    </span>
                    <span className="text-[10px] uppercase tracking-[0.15em] font-bold text-[#D4AF37] mt-0.5">
                      Owner & Founder
                    </span>
                  </div>
                </div>
              </motion.div>

            </div>
          </div>

          {/* ==========================================
              RIGHT SIDE: SCROLLING TEXT CONTENT
          ========================================== */}
          <div className="w-full lg:w-7/12 flex flex-col gap-8 md:gap-12 pt-4 lg:pt-12">
            
            <motion.div 
              initial="hidden" 
              whileInView="visible" 
              viewport={{ once: true, margin: "-100px" }} 
              variants={{
                visible: { transition: { staggerChildren: 0.15 } }
              }}
              className="flex flex-col gap-10"
            >
              
              <motion.h2 
  variants={revealVariant}
  className="text-4xl md:text-5xl lg:text-4xl leading-[1.1] font-bold tracking-tight text-[#111111] uppercase"
>
  From a small coastal village in Ireland, <br className="hidden md:block" />
  to the <span className="font-serif italic text-[#D4AF37] normal-case">California Coast.</span>
  
  <span className="block mt-6 text-3xl md:text-3xl text-gray-600 font-medium normal-case tracking-normal">
    Bringing authentic Irish craftsmanship to the San Francisco Bay Area.
  </span>
</motion.h2>

              <div className="space-y-6 text-lg md:text-xl text-gray-600 font-normal leading-relaxed">
                <motion.p variants={revealVariant}>
                  I'm Nick Coleman, the owner of Slick Construction. Born and raised in a small village in Ireland, I grew up learning and mastering my carpentry trade passed down through three generations of my family.
                </motion.p>

                <motion.p variants={revealVariant}>
                  Moving to the San Francisco Bay Area over 20 years ago, I quickly became deeply rooted in the local construction industry. Over the years, I've built my career around hands-on experience, local expertise, and a deep appreciation for the craft of building in one of the most unique markets in the country.
                </motion.p>
              </div>

              <motion.div 
                variants={revealVariant}
                className="relative bg-white rounded-3xl p-8 md:p-10 shadow-sm border border-gray-100 my-4"
              >
                <Quote className="absolute top-6 left-6 w-12 h-12 text-[#D4AF37] opacity-20" />
                <p className="relative z-10 text-xl md:text-2xl text-[#111111] font-serif italic leading-snug pt-4">
                  "My ultimate goal is simple: to make every new client's dream a reality and meticulously turn a house into a true home, providing an experience that feels clear, honest, and well-managed."
                </p>
              </motion.div>

              <div className="space-y-6 text-lg md:text-xl text-gray-600 font-normal leading-relaxed">
                <motion.p variants={revealVariant}>
                  I stay personally involved throughout the entire process—from early planning and design conversations to the final details at completion. For me, craftsmanship isn't just about how something looks when it's finished, but how well it functions and how confidently it was built. 
                </motion.p>

                <motion.p variants={revealVariant} className="text-gray-800 font-medium">
                  At Slick Construction, success isn't just measured by the final product—it's measured by satisfied clients and relationships I'm proud to stand behind. And if you don't find me on a roof or installing a custom kitchen, you will definitely find me on the golf course trying to break 80.
                </motion.p>
              </div>

            </motion.div>

          </div>
        </div>

      </div>
    </section>
  );
}