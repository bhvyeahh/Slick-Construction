"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const services = [
  {
    id: "01",
    category: "Full Remodel",
    title: "Full Home Remodel",
    description: "Transform your entire living space from the ground up. We handle everything from structural changes to fine interior detailing.",
    image: "/slick/home.avif",
  },
  {
    id: "02",
    category: "Kitchens",
    title: "Kitchen Remodel",
    description: "Upgrade the heart of your home with custom cabinetry, premium countertops, and state-of-the-art appliance integration.",
    image: "/slick/slick-25.png",
  },
  {
    id: "03",
    category: "Bathrooms",
    title: "Bathroom Remodel",
    description: "Create your personal spa retreat with modern fixtures, custom tiling, and optimized lighting and plumbing layouts.",
    image: "/slick/slick-2.png",
  },
  {
    id: "04",
    category: "Extensions",
    title: "Deck Builds",
    description: "Expand your outdoor living space with premium, weather-resistant decks designed for entertaining and relaxation.",
    image: "/slick/slick-35.jpeg",
  },
  {
    id: "05",
    category: "Upgrades",
    title: "Seismic Upgrades",
    description: "Protect your investment and your family with structural reinforcements designed to withstand major seismic activity.",
    image: "/slick/slick-40.jpeg",
  }
];

export default function FuturisticServicesTakeover() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const router = useRouter();

  // Detect if the user is on a mobile device for scroll-spy logic
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile(); // Initial check
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <section className="relative w-full min-h-screen bg-[#050505] overflow-hidden flex flex-col justify-center py-20 md:py-24">
      
      {/* ── BACKGROUND IMAGE TAKEOVER ── */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {services.map((service, index) => {
          const isActive = activeIndex === index;
          return (
            <div
              key={service.id}
              className={`absolute inset-0 transition-opacity duration-[1.5s] ease-in-out ${
                isActive ? "opacity-100 z-10" : "opacity-0 z-0"
              }`}
            >
              <Image
                src={service.image}
                alt={service.title}
                fill
                className={`object-cover object-center transition-transform duration-[10s] ease-out ${
                  isActive ? "scale-105" : "scale-100"
                }`}
                priority={index === 0}
              />
            </div>
          );
        })}

        {/* Heavy gradient overlays to ensure text is perfectly readable */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/80 to-[#050505]/40 z-20" />
        <div className="absolute inset-0 bg-black/40 backdrop-blur-[4px] z-20" />
      </div>

      {/* ── CONTENT ── */}
      <div className="relative z-30 mx-auto w-full max-w-[1200px] px-6 md:px-12 flex flex-col h-full">
        
        {/* Header */}
        <div className="mb-12 md:mb-16 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div className="w-full md:w-[55%]">
            <h2 className="text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl leading-[1.05]">
              Beyond <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white/90 to-white/40 italic font-serif">Expectations.</span>
            </h2>
          </div>
          
          <div className="w-full md:w-[40%]">
            <p className="text-base md:text-lg text-gray-300 font-medium leading-relaxed">
              Engineered for the future. We don't just remodel homes; we redefine how you experience your living space.
            </p>
          </div>
        </div>

        {/* Interactive List - Added [overflow-anchor:none] to prevent browser scroll jumping */}
        <div className="flex flex-col w-full border-t border-white/10 relative [overflow-anchor:none]">
          {services.map((service, index) => {
            const isActive = activeIndex === index;

            return (
              <motion.div
                key={service.id}
                onMouseEnter={() => !isMobile && setActiveIndex(index)}
                onViewportEnter={() => isMobile && setActiveIndex(index)}
                onClick={() => router.push("/services")}
                viewport={{ margin: "-35% 0px -35% 0px" }}
                className={`group relative cursor-pointer transition-colors duration-500 border-b ${
                  isActive ? "border-transparent z-20" : "border-white/10 z-10"
                }`}
              >
                {/* Gliding Glass Background (Smooth Layout ID Transition) */}
                {isActive && (
                  <motion.div
                    layoutId="active-pill"
                    className="absolute -inset-x-4 md:-inset-x-8 inset-y-0 bg-black/50 backdrop-blur-md border border-white/5 rounded-2xl z-0 shadow-2xl"
                    transition={{ type: "spring", bounce: 0.15, duration: 0.6 }}
                  />
                )}

                {/* Main Row Content - Consistent padding avoids all vertical stutter */}
                <div className="relative z-10 flex flex-col py-6 md:py-8">
                  
                  <div className="flex flex-col md:flex-row md:items-center justify-between w-full">
                    {/* Left Side: Number & Title */}
                    <div className="flex items-center gap-6 md:gap-10">
                      <span className={`text-xl md:text-3xl font-bold transition-colors duration-500 ${
                        isActive ? "text-[#D4AF37]" : "text-white/20 group-hover:text-white/40"
                      }`}>
                        .{service.id}
                      </span>
                      
                      <div className="flex flex-col">
                        <span className={`text-[10px] md:text-xs font-bold tracking-widest uppercase mb-1 transition-colors duration-500 ${
                          isActive ? "text-[#D4AF37]" : "text-gray-500"
                        }`}>
                          {service.category}
                        </span>
                        <h3 className={`text-2xl md:text-4xl font-bold transition-all duration-500 origin-left ${
                          isActive ? "text-white scale-[1.02]" : "text-gray-400 group-hover:text-gray-200 scale-100"
                        }`}>
                          {service.title}
                        </h3>
                      </div>
                    </div>

                    {/* Right Side: Description Reveal & Icon */}
                    <div className="mt-4 md:mt-0 flex items-center justify-end relative pl-14 md:pl-0">
                      
                      {/* Desktop Description - Absolutely positioned so it CANNOT cause layout shift */}
                      <div className="hidden md:flex absolute right-[4.5rem] justify-end w-[400px] pointer-events-none">
                        <AnimatePresence>
                          {isActive && (
                            <motion.p
                              initial={{ opacity: 0, filter: "blur(4px)", x: 15 }}
                              animate={{ opacity: 1, filter: "blur(0px)", x: 0 }}
                              exit={{ opacity: 0, filter: "blur(4px)", x: -15 }}
                              transition={{ duration: 0.4, delay: 0.1 }}
                              className="text-gray-300 text-sm leading-relaxed text-right w-full"
                            >
                              {service.description}
                            </motion.p>
                          )}
                        </AnimatePresence>
                      </div>

                      <div className={`flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-full border transition-all duration-500 shrink-0 ${
                        isActive ? "border-[#D4AF37] bg-[#D4AF37] text-black rotate-45" : "border-white/20 text-white group-hover:border-white/50"
                      }`}>
                        <ArrowUpRight size={18} className={isActive ? "scale-110" : ""} />
                      </div>
                    </div>
                  </div>

                  {/* Mobile Description Reveal - Handles its own height animation now */}
                  <AnimatePresence>
                    {isActive && isMobile && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="pl-14 overflow-hidden block md:hidden pointer-events-none"
                      >
                        <p className="text-gray-300 text-sm leading-relaxed mt-4">
                          {service.description}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>

                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}