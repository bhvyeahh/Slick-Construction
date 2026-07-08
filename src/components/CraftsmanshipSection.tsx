"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const principles = [
  {
    id: "01",
    title: "Precision Engineering",
    description:
      "Every joint, measurement, and foundation is calculated with absolute accuracy. We don't rely on guesswork; we build with mathematical precision to ensure absolute structural longevity.",
    image: "/Slick/slick-11.png",
  },
  {
    id: "02",
    title: "Curated Materials",
    description:
      "We source only the highest caliber materials. From exotic hardwoods to premium stone and industrial-grade steel, our selections are designed to age beautifully and withstand the test of time.",
    image: "/Slick/slick-29.png",
  },
  {
    id: "03",
    title: "Timeless Architecture",
    description:
      "Trends fade, but true craftsmanship endures. We blend modern sensibilities with classic architectural principles to create spaces that remain striking and relevant for generations.",
    image: "/Slick/slick-13.png",
  },
];

export default function CraftsmanshipSection() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section className="w-full bg-richblack py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6 md:px-12">
        
        {/* ── HEADER ── */}
        <div className="mb-16 md:mb-20 flex flex-col items-start">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-6 flex items-center gap-2 rounded-full border border-gold/30 bg-gold/10 px-4 py-1.5 text-xs font-semibold tracking-wide text-gold uppercase"
          >
            <div className="h-1.5 w-1.5 rounded-full bg-gold" />
            The Pivotal Standard
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl max-w-2xl leading-[1.1]"
          >
            Uncompromising quality in <span className="text-gold-muted italic">every detail.</span>
          </motion.h2>
        </div>

        {/* ── RESPONSIVE LAYOUT ── */}
        {/* Changed to flex-col for mobile so the list dictates the flow */}
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 relative">
          
          {/* LEFT: Interactive Accordion / List */}
          <div className="w-full lg:w-1/2 flex flex-col justify-center">
            {principles.map((principle, index) => {
              const isActive = activeIndex === index;

              return (
                <div
                  key={principle.id}
                  onMouseEnter={() => setActiveIndex(index)}
                  onClick={() => setActiveIndex(index)}
                  className="group relative cursor-pointer border-b border-white/10 py-8 md:py-10 transition-all duration-500 last:border-b-0"
                >
                  <div className="flex items-start justify-between">
                    
                    {/* Content Group */}
                    <div className="flex gap-4 md:gap-10 items-start w-full">
                      {/* Animated Number */}
                      <span
                        className={`text-sm md:text-base font-medium transition-colors duration-500 mt-1 md:mt-2 ${
                          isActive ? "text-gold" : "text-gray-600 group-hover:text-gray-400"
                        }`}
                      >
                        /{principle.id}
                      </span>
                      
                      {/* Title & Description */}
                      <div className="flex flex-col w-full pr-4">
                        <h3
                          className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-medium tracking-tight transition-colors duration-500 ${
                            isActive ? "text-white" : "text-gray-600 group-hover:text-gray-300"
                          }`}
                        >
                          {principle.title}
                        </h3>
                        
                        {/* Smooth Height Reveal for Description & Mobile Image */}
                        <AnimatePresence>
                          {isActive && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.4, ease: "easeOut" }}
                              className="overflow-hidden"
                            >
                              <div className="pt-6">
                                
                                {/* ── MOBILE ONLY: Inline Image Reveal ── */}
                                <div className="block lg:hidden relative w-full h-[220px] sm:h-[300px] mb-6 rounded-2xl overflow-hidden shadow-lg border border-white/5">
                                  <Image
                                    src={principle.image}
                                    alt={principle.title}
                                    fill
                                    className="object-cover"
                                     
                                  />
                                  <div className="absolute inset-0 bg-gradient-to-t from-richblack/80 via-transparent to-transparent opacity-80" />
                                </div>

                                {/* Text Description */}
                                <p className="text-gray-400 text-sm md:text-base leading-relaxed max-w-md pb-2">
                                  {principle.description}
                                </p>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </div>

                    {/* Interactive Arrow Indicator (Visible on Mobile & Desktop) */}
                    <div
                      className={`flex shrink-0 h-10 w-10 md:h-12 md:w-12 items-center justify-center rounded-full border transition-all duration-500 mt-1 ${
                        isActive
                          ? "border-gold bg-gold text-richblack"
                          : "border-transparent text-gray-600 group-hover:border-white/20 group-hover:text-white bg-white/5 md:bg-transparent"
                      }`}
                    >
                      <ArrowUpRight 
                        size={20} 
                        strokeWidth={isActive ? 2 : 1.5} 
                        // Rotates to point down when active to signal the accordion opening
                        className={`transition-transform duration-500 ${isActive ? "rotate-45" : ""}`} 
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* RIGHT: Cinematic Sticky Image Reveal (DESKTOP ONLY) */}
          <div className="hidden lg:block w-full lg:w-1/2 lg:sticky lg:top-32 h-[600px] rounded-3xl overflow-hidden bg-charcoal border border-white/5 shadow-2xl shadow-black">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="absolute inset-0 w-full h-full"
              >
                <Image
                  src={principles[activeIndex].image}
                  alt={principles[activeIndex].title}
                  fill
                  className="object-cover"
                   
                />
                {/* Premium Dark Vignette over the image */}
                <div className="absolute inset-0 bg-gradient-to-t from-richblack/80 via-transparent to-transparent opacity-80" />
                <div className="absolute inset-0 bg-gold/5 mix-blend-overlay pointer-events-none" />
              </motion.div>
            </AnimatePresence>
          </div>

        </div>
      </div>
    </section>
  );
}