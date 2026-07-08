"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

const services = [
  {
    id: "01",
    category: "Full Remodel",
    title: "Full Home Remodel",
    image: "/slick/slick-6.png",
  },
  {
    id: "02",
    category: "Kitchens",
    title: "Kitchen Remodel",
    image: "/slick/slick-25.png",
  },
  {
    id: "03",
    category: "Bathrooms",
    title: "Bathroom Remodel",
    image: "/slick/slick-2.png",
  },
  {
    id: "04",
    category: "Extensions",
    title: "ADU Builds",
    image: "/slick/slick-12.png",
  },
];

export default function ServicesAccordion() {
  // Start with the first card expanded
  const [expandedIndex, setExpandedIndex] = useState<number>(0);

  return (
    <section className="w-full bg-richblack py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6 md:px-12">
        
        {/* ── HEADER ── */}
        <div className="mb-12 flex flex-col items-start justify-between gap-8 md:flex-row md:items-end">
          <div className="w-full md:w-1/2">
            <div className="mb-6 flex w-fit items-center gap-2 rounded-full border border-gold/30 bg-gold/10 px-4 py-1.5 text-sm font-semibold tracking-wide text-gold uppercase">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4">
                <circle cx="12" cy="12" r="10" />
                <circle cx="12" cy="12" r="4" />
              </svg>
              Our Services
            </div>
            <h2 className="text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl leading-[1.1]">
              Everything you <br />
              need for your home
            </h2>
          </div>
          
          <div className="w-full md:w-1/3">
            <p className="text-lg text-gray-400 font-medium">
              Built to simplify your home search with clear insights, better options, and confident decisions.
            </p>
          </div>
        </div>

        {/* ── ACCORDION GRID ── */}
        <div className="flex h-[800px] flex-col gap-4 md:h-[600px] md:flex-row md:gap-6">
          {services.map((service, index) => {
            const isActive = expandedIndex === index;

            return (
              <motion.div
                key={service.id}
                layout
                onClick={() => setExpandedIndex(index)}
                className={`relative cursor-pointer overflow-hidden rounded-[2rem] transition-all duration-500 ${
                  isActive 
                    ? "bg-[#050505] border border-gold/40 shadow-lg shadow-gold/10" 
                    : "bg-charcoal border border-white/5 hover:border-gold/30"
                }`}
                style={{
                  flex: isActive ? 3 : 1,
                }}
                transition={{ type: "spring", bounce: 0.2, duration: 0.8 }}
              >
                
                {/* ── INACTIVE STATE ── */}
                <AnimatePresence mode="wait">
                  {!isActive && (
                    <motion.div
                      key="inactive"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="absolute inset-0 flex h-full w-full flex-col p-8"
                    >
                      {/* Giant Number in Center */}
                      <div className="flex flex-1 items-center justify-center">
                        <span className="text-7xl font-bold text-white/5 md:text-8xl">
                          .{service.id}
                        </span>
                      </div>
                      
                      {/* Bottom Text */}
                      <div className="flex flex-col">
                        <span className="mb-2 text-xs font-semibold text-gold-muted">
                          {service.category}
                        </span>
                        <h3 className="text-xl font-bold text-gray-300 leading-tight">
                          {service.title}
                        </h3>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* ── ACTIVE STATE ── */}
                <AnimatePresence mode="wait">
                  {isActive && (
                    <motion.div
                      key="active"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.4, delay: 0.2 }}
                      className="absolute inset-0 h-full w-full"
                    >
                      {/* Top Content Row */}
                      <div className="absolute top-0 left-0 right-0 z-20 flex justify-between p-8 md:p-10">
                        <div className="flex flex-col">
                          <span className="mb-2 text-sm font-medium text-gold-muted">
                            {service.category}
                          </span>
                          <h3 className="text-2xl md:text-3xl font-bold text-white max-w-[200px] leading-tight">
                            {service.title}
                          </h3>
                        </div>
                        <span className="text-6xl md:text-7xl font-bold text-gold">
                          .{service.id}
                        </span>
                      </div>

                      {/* Image Container (Takes up bottom portion) */}
                      <div className="absolute bottom-0 left-0 right-0 h-[65%] w-full overflow-hidden rounded-t-[2rem]">
                        <Image
                          src={service.image}
                          alt={service.title}
                          fill
                          className="object-cover object-bottom"
                          unoptimized
                        />
                        {/* Gradient to blend image into the dark background */}
                        <div className="absolute inset-0 bg-gradient-to-t from-transparent via-transparent to-[#050505]" />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}