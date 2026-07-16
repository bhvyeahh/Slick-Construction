"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
import Link from "next/dist/client/link";

// ─────────────────────────────────────────────────────────────────
// PROPERTY DATA
// ─────────────────────────────────────────────────────────────────
const properties = [
  {
    id: 1,
    title: "Green Street",
    price: "$9,200/mo",
    beds: "4+",
    baths: "3",
    sqft: "2,400",
    image: "/Green-Street/green-4.png",
  },
  {
    id: 2,
    title: "Mission Street",
    price: "$58,000",
    beds: "3",
    baths: "2",
    sqft: "3,100",
    image: "/Mission-Street/mission-1.png",
  },
  {
    id: 3,
    title: "Noe Valley Project",
    price: "$9,800",
    beds: "3",
    baths: "2",
    sqft: "980",
    image: "/slick/slick-25.png",
  },
  {
    id: 4,
    title: "San Mateo project",
    price: "$34,000",
    beds: "4+",
    baths: "3",
    sqft: "4,200",
    image: "/Mission-Street/mission-3.png",
  },
];

// ─────────────────────────────────────────────────────────────────
// STACKING & SCATTERING CARD COMPONENT
// ─────────────────────────────────────────────────────────────────
const CinematicCard = ({
  property,
  index,
  total,
  progress,
}: {
  property: typeof properties[0];
  index: number;
  total: number;
  progress: MotionValue<number>;
}) => {
  // 1. Scatter Destinations (Where they fly off to at the very end)
  const scatterDestinations = [
    { x: "-35vw", y: "-35vh", rotate: -15 }, // Top Left
    { x: "35vw", y: "-35vh", rotate: 12 },   // Top Right
    { x: "-35vw", y: "35vh", rotate: -10 },  // Bottom Left
    { x: "35vw", y: "35vh", rotate: 18 },    // Bottom Right
  ];
  const dest = scatterDestinations[index];

  // 2. Programmatic Timeline Generation for the Stacking Effect
  const timeline: number[] = [];
  const scaleValues: number[] = [];
  const yValues: string[] = [];

  // Define entry behavior
  if (index === 0) {
    timeline.push(0);
    scaleValues.push(1);
    yValues.push("0vh");
  } else {
    // Card stays hidden at bottom, slides up to 0vh when it's its turn
    timeline.push(0, (index - 1) * 0.25 + 0.1, index * 0.25);
    scaleValues.push(1, 1, 1);
    yValues.push("100vh", "100vh", "0vh");
  }

  // Define stacking behavior (when NEW cards cover this one)
  for (let i = index + 1; i < total; i++) {
    timeline.push(i * 0.25);
    // Scales down by 4% and moves up by 4vh for each card stacked on top of it
    scaleValues.push(1 - (i - index) * 0.04);
    yValues.push(`-${(i - index) * 4}vh`);
  }

  // Define scatter finale behavior
  timeline.push(0.85, 1.0);
  const lastScale = scaleValues[scaleValues.length - 1];
  const lastY = yValues[yValues.length - 1];
  
  scaleValues.push(lastScale, 0.25);
  yValues.push(lastY, dest.y);

  // 3. Map the generated timeline arrays to useTransform
  const y = useTransform(progress, timeline, yValues);
  const scale = useTransform(progress, timeline, scaleValues);
  
  // X, Rotate, and Opacity only change during the scatter phase (t === 1.0)
  const x = useTransform(progress, timeline, timeline.map((t) => (t >= 1.0 ? dest.x : "0vw")));
  const rotate = useTransform(progress, timeline, timeline.map((t) => (t >= 1.0 ? dest.rotate : 0)));
  const opacity = useTransform(progress, timeline, timeline.map((t) => (t >= 1.0 ? 0 : 1)));

  return (
    <motion.div
      style={{
        y,
        x,
        scale,
        rotate,
        opacity,
        zIndex: 10 + index, // Ensures strict stacking order
      }}
      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[95vw] h-[95vh] overflow-hidden rounded-[2rem] shadow-[0_0_50px_rgba(0,0,0,0.5)] bg-[#141414] transform-gpu origin-center"
    >
      {/* Background Image */}
      <div className="absolute inset-0 w-full h-full">
        <Image
          src={property.image}
          alt={property.title}
          fill
          className="object-cover"
           
        />
      </div>

      {/* Heavy Cinematic Vignettes for flawless text readability */}
      <div className="absolute inset-0 bg-black/10 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/50 to-transparent opacity-95 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0A]/40 via-transparent to-transparent opacity-80 pointer-events-none" />

      {/* Top Header - Eyebrow */}
      <div className="absolute top-8 left-6 md:top-12 md:left-12 z-20 flex items-center gap-3">
        <div className="h-2 w-2 rounded-full bg-[#D4AF37] animate-pulse" />
        <span className="text-xs md:text-sm font-bold tracking-[0.2em] text-[#D4AF37] uppercase drop-shadow-md">
          Exclusive Listings
        </span>
      </div>

      {/* Main Content (Bottom Left) */}
      <div className="absolute bottom-0 left-0 w-full flex flex-col justify-end p-8 md:p-12 lg:p-16 z-20">
        
        <h2 className="text-4xl sm:text-5xl md:text-7xl lg:text-[6rem] font-extrabold tracking-tighter text-white leading-[0.95] mb-6 drop-shadow-2xl max-w-4xl">
          {property.title}
        </h2>
      </div>
    </motion.div>
  );
};

// ─────────────────────────────────────────────────────────────────
// MAIN SECTION
// ─────────────────────────────────────────────────────────────────
export default function PropertyListing() {
  const containerRef = useRef<HTMLDivElement>(null);

  // 500vh ensures a long, dramatic scroll track for the 4 cards to stack beautifully.
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // The text revealed underneath the scatter effect
  const revealScale = useTransform(scrollYProgress, [0.8, 1], [0.8, 1]);
  const revealOpacity = useTransform(scrollYProgress, [0.75, 0.9], [0, 1]);

  return (
    // Change here for card
    <section ref={containerRef} className="relative h-[500vh] bg-[#0A0A0A]">
      
      {/* The sticky theater screen base */}
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-[#0A0A0A] flex items-center justify-center">
        
        {/* ── THE REVEAL TEXT (Hidden behind the cards until they scatter) ── */}
        <motion.div 
          style={{ scale: revealScale, opacity: revealOpacity }}
          className="absolute inset-0 z-0 flex flex-col items-center justify-center text-center px-6"
        >
          <div className="h-40 w-40 absolute bg-[#D4AF37]/10 blur-[100px] rounded-full" />
          <h3 className="relative z-10 text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white leading-tight">
            Find your next <br />
            <span className="text-[#D4AF37] italic">masterpiece.</span>
          </h3>
          <Link 
  href="/portfolio" 
  className="relative z-10 mt-10 px-8 py-4 rounded-full bg-[#D4AF37] text-black font-bold uppercase tracking-widest text-sm hover:bg-white transition-colors duration-300 shadow-lg inline-block"
>
  View All Properties
</Link>
        </motion.div>

        {/* ── THE PROPERTIES (Stacking & Scattering) ── */}
        {properties.map((property, index) => (
          <CinematicCard
            key={property.id}
            property={property}
            index={index}
            total={properties.length}
            progress={scrollYProgress}
          />
        ))}
        
      </div>
    </section>
  );
}