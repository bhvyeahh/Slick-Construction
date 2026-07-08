"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, useMotionTemplate } from "framer-motion";

export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  // scrollYProgress = 0 at top, 1 at bottom of the 250vh container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // ─────────────────────────────────────────────
  // SCROLL TIMELINE  (Shared animation timeline)
  // ─────────────────────────────────────────────
  const START = 0;      // Starts immediately on scroll
  const END = 0.50;     // Midpoint: House is fully in view
  const EXIT = 1;       // End of scroll

  /* ==========================
     HERO TEXT
  ========================== */
  const textYDesktop = useTransform(scrollYProgress, [START, END, EXIT], ["0vh", "-12vh", "-137vh"]);
  const textYMobile = useTransform(scrollYProgress, [START, END, EXIT], ["-8vh", "-25vh", "-137vh"]);

  const textOpacity = useTransform(scrollYProgress, [START, END, 0.75], [1, 0.75, 0]);
  const textScale = useTransform(scrollYProgress, [START, END, EXIT], [1, 0.82, 0.68]);
  
  const textBlur = useTransform(scrollYProgress, [START, END], [0, 8]);
  const textFilter = useMotionTemplate`blur(${textBlur}px)`;

  /* ==========================
     HOUSE
  ========================== */
  const houseYDesktop = useTransform(scrollYProgress, [START, END, EXIT], ["130vh", "5vh", "-30vh"]);
  const houseYMobile = useTransform(scrollYProgress, [START, END, EXIT], ["25vh", "5vh", "-15vh"]);

  const houseScale = useTransform(scrollYProgress, [START, END], [1, 1.08]);

  /* ==========================
     SIDE CLOUDS
  ========================== */
  const leftCloudX = useTransform(scrollYProgress, [START, END], ["0%", "-100%"]);
  const rightCloudX = useTransform(scrollYProgress, [START, END], ["0%", "100%"]);

  /* ==========================
     FOG
  ========================== */
  const fogYDesktop = useTransform(scrollYProgress, [START, END, EXIT], ["100vh", "0vh", "0vh"]);
  const fogYMobile = useTransform(scrollYProgress, [START, END, EXIT], ["25vh", "0vh", "0vh"]);
  
  // Fog stays at opacity 1 so it doesn't reveal the blue background underneath it
  const fogOpacity = useTransform(scrollYProgress, [START, END, EXIT], [1, 1, 1]);

  return (
    <main ref={containerRef} className="relative h-[250vh] w-full">
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-gradient-to-b from-[#bfe3f7] to-[#d8edf9]">
        {/* ── NAVBAR (Assumed to be placed here) ── z-[100] */}

        {/* ── SIDE CLOUD LEFT ── z-10 (Hidden on mobile for cleaner look) */}
        <motion.div
          style={{ x: leftCloudX }}
          className="absolute top-[22%] left-[6%] z-10 w-[28vw] max-w-[380px] opacity-80 pointer-events-none hidden md:block"
        >
          <Image
            src="/side-cloud.avif"
            alt="Cloud left"
            width={380}
            height={190}
            className="w-full h-auto object-contain"
          />
        </motion.div>

        {/* ── SIDE CLOUD RIGHT ── z-10 (Hidden on mobile) */}
        <motion.div
          style={{ x: rightCloudX }}
          className="absolute top-[28%] right-[4%] z-10 w-[32vw] max-w-[460px] opacity-70 pointer-events-none hidden md:block"
        >
          <Image
            src="/side-cloud.avif"
            alt="Cloud right"
            width={460}
            height={230}
            className="w-full h-auto object-contain"
          />
        </motion.div>

        {/* ── HERO TEXT ── z-20 */}
        <motion.div
          style={{ 
            "--y-desktop": textYDesktop,
            "--y-mobile": textYMobile,
            opacity: textOpacity, 
            filter: textFilter 
          } as any}
          className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center px-4 pt-[20px] md:pt-[80px] translate-y-[var(--y-mobile)] md:translate-y-[var(--y-desktop)]"
        >
          {/* Inner wrapper for scale so it doesn't overwrite Tailwind translate classes */}
          <motion.div style={{ scale: textScale }} className="flex flex-col items-center justify-center w-full">
            <h1 className="max-w-5xl text-5xl font-extrabold tracking-tight text-gray-900 sm:text-5xl md:text-8xl lg:text-[80px] leading-none">
              <span className="text-[#D4AF37]">Slick</span> Construction
            </h1>
            <p className="mt-6 max-w-2xl text-base font-medium text-gray-700 md:text-xl">
              Explore thoughtfully designed homes in premium locations, crafted to
              match modern lifestyles with comfort, elegance, and long-term value.
            </p>

            <div className="mt-8 flex flex-wrap justify-center items-center gap-4 pointer-events-auto">
              <button className="flex items-center gap-2 rounded-full bg-black px-6 py-3.5 text-sm font-semibold text-white transition-all hover:bg-gray-800">
                Explore Homes
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-white text-black">
                  →
                </span>
              </button>
              <button className="rounded-full border border-gray-900/30 bg-transparent px-6 py-3.5 text-sm font-semibold text-gray-900 transition-all hover:bg-white/20">
                Book a Visit
              </button>
            </div>
          </motion.div>
        </motion.div>

        {/* ── HOUSE ── z-30 */}
        <motion.div
          style={{ 
            "--y-desktop": houseYDesktop, 
            "--y-mobile": houseYMobile 
          } as any}
          className="absolute bottom-0 left-0 right-0 z-30 flex w-full justify-center pointer-events-none origin-bottom translate-y-[var(--y-mobile)] md:translate-y-[var(--y-desktop)]"
        >
          {/* Scale wrapper */}
          <motion.div style={{ scale: houseScale }} className="w-full origin-bottom">
            <Image
              src="/full-home.avif"
              alt="Modern Luxury Home"
              width={1920}
              height={1080}
              priority
              className="w-full h-[60vh] md:h-auto object-cover object-bottom"
            />
          </motion.div>
        </motion.div>

        {/* ── FOG CLOUD ── z-40 */}
        <motion.div
          style={{ 
            "--fog-y-desktop": fogYDesktop,
            "--fog-y-mobile": fogYMobile,
            opacity: fogOpacity 
          } as any}
          className="absolute bottom-0 left-0 right-0 z-40 flex flex-col pointer-events-none translate-y-[var(--fog-y-mobile)] md:translate-y-[var(--fog-y-desktop)]"
        >
          <Image
            src="/main-cloud.avif"
            alt="Fog transition"
            width={1920}
            height={500}
            // Removed opacity-95 and changed to object-bottom so it sits completely flush without gaps
            className="w-full h-[40vh] md:h-auto object-cover object-bottom min-w-full relative z-10"
          />
          {/* The white tail div was removed to prevent it from creating a solid gap against the next black section */}
        </motion.div>
      </div>

      {/* ── NEXT SECTION (Triggers when sticky scroll completes) ── */}
    </main>
  );
}