"use client";

import React, { useRef } from 'react';
import { motion, useInView, Variants } from 'framer-motion'; // 1. Imported Variants type
import { 
  ArrowRight, 
  Facebook, 
  Instagram, 
  Linkedin, 
  Twitter 
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

const RecentProjects = () => {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  // 2. Applied ': Variants' type to all animation objects
  const containerVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
      }
    }
  };

  const fadeUp: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.8, ease: "easeOut" } 
    }
  };

  const imageReveal: Variants = {
    hidden: { scale: 1.05, opacity: 0 },
    visible: { 
      scale: 1, 
      opacity: 1, 
      transition: { duration: 1, ease: "easeOut" } 
    }
  };

  return (
    <section className="w-full bg-[#F9F9F9] py-24 px-8 md:px-12" ref={containerRef}>
      <motion.div 
        className="max-w-[1400px] mx-auto"
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={containerVariants}
      >
        
        {/* =======================
            TOP ROW (Image + Text)
        ======================== */}
        <div className="flex flex-col lg:flex-row gap-8 mb-8">
          
          {/* Top Left: Large Image */}
          <motion.div 
            className="w-full lg:w-1/2 overflow-hidden rounded-sm relative aspect-[4/3] group cursor-pointer"
            variants={imageReveal}
          >
            <Image 
              src="/website-photos-21.jpg"
              alt="Recent Project 1" 
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              unoptimized={true}
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500" />
          </motion.div>

          {/* Top Right: Text Content */}
          <motion.div 
            className="w-full lg:w-1/2 bg-white p-8 md:p-12 lg:p-16 flex flex-col justify-center rounded-sm"
            variants={fadeUp}
          >
            <h2 className="text-4xl lg:text-5xl font-medium text-neutral-900 mb-6 leading-tight tracking-tight">
              Take a look at our <br/> recent projects
            </h2>
            
            <p className="text-neutral-500 text-sm leading-relaxed mb-10 max-w-md">
              From the first conversation to the final walkthrough, we deliver a transparent, collaborative process and
craftsmanship our clients trust completely.
            </p>

            {/* Buttons */}
            <div className="flex flex-wrap items-center gap-4 mb-12">
              <Link 
                href="/contact"
                className="bg-black text-white px-8 py-3.5 rounded-full text-sm font-semibold hover:bg-neutral-800 transition-colors flex items-center gap-2 group"
              >
                Get a quote 
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              
              <Link 
                href="/portfolio"
                className="px-8 py-3.5 rounded-full text-sm font-semibold text-neutral-900 border border-neutral-200 hover:bg-neutral-50 transition-colors"
              >
                Browse portfolio
              </Link>
            </div>

            {/* Divider & Socials */}
            <div className="border-t border-neutral-100 pt-8 flex items-center justify-between">
              <span className="text-xs font-semibold text-neutral-900">Follow our work on:</span>
              <div className="flex gap-5 text-neutral-900">
                
                <a href="https://www.instagram.com/pivotalbuilders/" className="hover:opacity-60 transition-opacity"><Instagram size={16} /></a>
                
              </div>
            </div>
          </motion.div>
        </div>


        {/* =======================
            BOTTOM ROW (Asymmetric Grid)
        ======================== */}
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Bottom Left: Narrower Image (approx 40%) */}
          <motion.div 
            className="w-full lg:w-[40%] overflow-hidden rounded-sm relative aspect-[3/4] lg:aspect-[4/3] group cursor-pointer"
            variants={imageReveal}
          >
             <Image 
               src="/website-photos-22.jpg" 
               alt="Recent Project 2" 
               fill
               className="object-cover transition-transform duration-700 group-hover:scale-105"
               unoptimized={true}
             />
             <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500" />
          </motion.div>

          {/* Bottom Right: Wider Image (approx 60%) */}
          <motion.div 
            className="w-full lg:w-[60%] overflow-hidden rounded-sm relative aspect-[4/3] group cursor-pointer"
            variants={imageReveal}
          >
             <Image 
               src="/website-photos-31.jpg" 
               alt="Recent Project 3" 
               fill
               className="object-cover transition-transform duration-700 group-hover:scale-105"
               unoptimized={true}
             />
             <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500" />
          </motion.div>

        </div>

      </motion.div>
    </section>
  );
};

export default RecentProjects;