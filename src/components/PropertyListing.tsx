"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";

const properties = [
  {
    id: 1,
    title: "Hillside View House",
    price: "$9,200",
    beds: "4+",
    baths: "3",
    sqft: "2,400",
    status: "For Rent",
    image: "/website-photos-3.jpg",
  },
  {
    id: 2,
    title: "Modern Hillside Home",
    price: "$58,000",
    beds: "3",
    baths: "2",
    sqft: "3,100",
    status: "For Buy",
    image: "/website-photos-4.jpg",
  },
  {
    id: 3,
    title: "Dallas Townhouse",
    price: "$9,800",
    beds: "3",
    baths: "2",
    sqft: "980",
    status: "For Buy",
    image: "/website-photos-5.jpg",
  },
  {
    id: 4,
    title: "Urban Modern House",
    price: "$34,000",
    beds: "4+",
    baths: "3",
    sqft: "4,200",
    status: "For Buy",
    image: "/website-photos-6.jpg",
  },
];

export default function PropertyListing() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  // Animation variants for staggered card reveal
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <section className="w-full bg-richblack py-24 md:py-32" ref={containerRef}>
      <div className="mx-auto max-w-7xl px-6 md:px-12">
        
        {/* ── HEADER ── */}
        <div className="mb-16 flex flex-col items-start justify-between gap-8 md:flex-row md:items-end">
          <div className="w-full md:w-1/2">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl leading-[1.1]"
            >
              Discover homes <br />
              {/* Updated to vibrant gold to match the new image */}
              <span className="text-gold">that fit your lifestyle</span>
            </motion.h2>
          </div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="w-full flex flex-col items-start md:items-end md:w-1/3"
          >
            <p className="mb-6 text-lg text-gray-400 font-medium md:text-right">
              Explore a range of properties built for comfort, location, and everyday living.
            </p>
            <button className="group flex items-center gap-3 rounded-full bg-white px-6 py-3 text-sm font-semibold text-black transition-all hover:bg-gray-200">
              Explore All
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-black text-white transition-transform group-hover:translate-x-1">
                →
              </span>
            </button>
          </motion.div>
        </div>

        {/* ── PROPERTY GRID ── */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 gap-6 md:grid-cols-2"
        >
          {properties.map((property) => (
            <motion.div
              key={property.id}
              variants={cardVariants}
              className="group relative h-[420px] w-full overflow-hidden rounded-[2rem] bg-charcoal cursor-pointer"
            >
              {/* Image Background */}
              <div className="absolute inset-0 h-full w-full">
                <Image
                  src={property.image}
                  alt={property.title}
                  fill
                  className="object-cover transition-transform duration-1000 group-hover:scale-105"
                  unoptimized
                />
                {/* Premium Frosted Glass / Foggy Blur Overlay */}
<div className="absolute bottom-0 left-0 right-0 h-[45%] bg-gradient-to-t from-[#050505]/90 via-[#050505]/40 to-transparent pointer-events-none backdrop-blur-sm [mask-image:linear-gradient(to_top,black_50%,transparent_100%)]" />
              </div>

              {/* Status Badge */}
              <div className="absolute top-6 right-6 z-20 flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-medium text-white backdrop-blur-md transition-colors group-hover:border-white/40 group-hover:bg-white/20">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4">
                  <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                  <polyline points="9 22 9 12 15 12 15 22" />
                </svg>
                {property.status}
              </div>

              {/* ── TEXT CONTENT (Sitting directly over the gradient) ── */}
              <div className="absolute bottom-0 left-0 right-0 flex flex-col p-6 md:p-8 z-10">
                
                <div className="transform transition-transform duration-500 group-hover:-translate-y-2">
                  <h3 className="mb-1 text-base font-medium text-gray-300">
                    {property.title}
                  </h3>
                  <span className="mb-4 block text-3xl font-bold tracking-tight text-white">
                    {property.price}
                  </span>
                  
                  {/* Property Specs */}
                  <div className="flex items-center gap-3 text-sm font-medium text-gray-400">
                    
                    <div className="flex items-center gap-1.5">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4 text-gold-muted">
                        <path d="M3 14h18" />
                        <path d="M4 14v7" />
                        <path d="M20 14v7" />
                        <path d="M4 14a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2" />
                        <path d="M6 10V8a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v2" />
                      </svg>
                      {property.beds}
                    </div>
                    
                    <span className="text-gray-600">|</span>
                    
                    <div className="flex items-center gap-1.5">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4 text-gold-muted">
                        <path d="M9 6 6.5 3.5a1.5 1.5 0 0 0-1-.5C4.683 3 4 3.683 4 4.5V17a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-5" />
                        <line x1="10" y1="5" x2="8" y2="7" />
                        <line x1="2" y1="12" x2="22" y2="12" />
                        <line x1="7" y1="19" x2="7" y2="21" />
                        <line x1="17" y1="19" x2="17" y2="21" />
                      </svg>
                      {property.baths}
                    </div>

                    <span className="text-gray-600">|</span>
                    
                    <div className="flex items-center gap-1.5">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4 text-gold-muted">
                        <path d="M4 4h16v16H4z" />
                        <path d="M4 14h4v6" />
                        <path d="M14 4v6h6" />
                      </svg>
                      {property.sqft} sq ft
                    </div>
                    
                  </div>
                </div>
              </div>
              
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}