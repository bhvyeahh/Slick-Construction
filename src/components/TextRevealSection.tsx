"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";

// ─────────────────────────────────────────────────────────────────
// INDIVIDUAL WORD COMPONENT
// ─────────────────────────────────────────────────────────────────
function Word({
  children,
  progress,
  range,
}: {
  children: string;
  progress: MotionValue<number>;
  range: [number, number];
}) {
  const opacity = useTransform(progress, range, [0, 1]);
  const filter = useTransform(progress, range, ["blur(10px)", "blur(0px)"]);
  const y = useTransform(progress, range, ["12px", "0px"]);

  return (
    <motion.span
      style={{ opacity, filter, y }}
      className="mr-[0.25em] inline-block font-medium text-gold"
    >
      {children}
    </motion.span>
  );
}

// ─────────────────────────────────────────────────────────────────
// MAIN SECTION COMPONENT
// ─────────────────────────────────────────────────────────────────
export default function TextRevealSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Background Ambient Sphere Animations
  const sphereOneX = useTransform(scrollYProgress, [0, 0.5, 1], ["-10%", "20%", "-5%"]);
  const sphereOneY = useTransform(scrollYProgress, [0, 0.5, 1], ["-20%", "10%", "-10%"]);
  const sphereOneScale = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.3, 0.9]);

  const sphereTwoX = useTransform(scrollYProgress, [0, 0.5, 1], ["30%", "-15%", "10%"]);
  const sphereTwoY = useTransform(scrollYProgress, [0, 0.5, 1], ["20%", "-20%", "5%"]);
  const sphereTwoScale = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.2, 1.1]);

  const textContainerY = useTransform(scrollYProgress, [0, 1], ["2vh", "-2vh"]);

  const text =
    "We work with homeowners and designers to produce work we know you’ll love. Call us today to start building with quality in mind. ";

  const words = text.split(" ");
  const totalWords = words.length;

  return (
    // FIX 1: Removed overflow-hidden from the section tag so sticky works
    // FIX 2: Adjusted height to exactly 200vh
    <section ref={containerRef} className="relative h-[200vh] w-full bg-richblack">
      
      {/* Sticky Frame locks exactly to the viewport */}
      <div className="sticky top-0 flex h-screen w-full items-center justify-center overflow-hidden px-6 md:px-12">
        
        {/* ── AMBIENT REACTIVE MESH BACKGROUND ── */}
        <div className="absolute inset-0 pointer-events-none bg-radial from-transparent via-richblack/60 to-richblack z-0">
          
          {/* Gold Glowing Core Sphere */}
          <motion.div 
            style={{ x: sphereOneX, y: sphereOneY, scale: sphereOneScale }}
            className="absolute -left-1/4 -top-1/4 h-[70vh] w-[70vw] rounded-full bg-gold/10 blur-[140px] mix-blend-screen"
          />

          {/* Warm Charcoal Supporting Sphere */}
          <motion.div 
            style={{ x: sphereTwoX, y: sphereTwoY, scale: sphereTwoScale }}
            className="absolute -right-1/4 -bottom-1/4 h-[80vh] w-[80vw] rounded-full bg-gold-muted/5 blur-[160px] mix-blend-screen"
          />
        </div>

        {/* ── TIMELINE TEXT CONTENT LAYER ── */}
        <motion.div 
          style={{ y: textContainerY }}
          className="relative z-10 max-w-5xl text-center flex flex-col items-center"
        >
          {/* Accent Line Decorator */}
          <motion.div 
            initial={{ width: 0 }}
            whileInView={{ width: "40px" }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="h-[1px] bg-gold-muted mb-8"
          />

          <h3 className="text-2xl font-normal tracking-tight sm:text-3xl md:text-4xl lg:text-[2.65rem] leading-[1.45] md:leading-[1.35] drop-shadow-sm select-none">
            {words.map((word, i) => {
              const start = i / totalWords;
              const end = start + (1 / totalWords) * 1.8; 

              return (
                <Word key={i} progress={scrollYProgress} range={[start, end]}>
                  {word}
                </Word>
              );
            })}
          </h3>
          
          {/* Decorative Subtitle Hook */}
          <motion.span 
            style={{ opacity: useTransform(scrollYProgress, [0.9, 1], [0, 0.4]) }}
            className="mt-12 text-xs font-bold tracking-[0.3em] uppercase text-gold-light pointer-events-none transition-all duration-300"
          >
            Scroll Down to Explore More
          </motion.span>
        </motion.div>
      </div>
    </section>
  );
}