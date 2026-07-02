"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";

export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  // scrollYProgress = 0 at top, 1 at bottom of the 400vh container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // ─────────────────────────────────────────────
  // SCROLL TIMELINE  (400vh total)
  // ─────────────────────────────────────────────

  // Shared animation timeline
const START = 0;      // Starts immediately on scroll
const END = 0.50;     // Midpoint: House is fully in view
const EXIT = 1;       // End of scroll

/* ==========================
   HERO TEXT
========================== */

const textOpacity = useTransform(
  scrollYProgress,
  [START, END, 0.75], // Fades to 0 completely BEFORE the house exits
  [1, 0.75, 0]
);

const textY = useTransform(
  scrollYProgress,
  [START, END, EXIT],
  // Moves up slightly as house covers it, then moves up WITH the house (-137vh) so it never gets exposed
  ["0vh", "-12vh", "-137vh"] 
);

const textScale = useTransform(
  scrollYProgress,
  [START, END, EXIT],
  [1, 0.82, 0.68]
);

const textBlur = useTransform(
  scrollYProgress,
  [START, END],
  [0, 8]
);

/* ==========================
   HOUSE
========================== */

const houseY = useTransform(
  scrollYProgress,
  [START, END, EXIT],
  ["130vh", "5vh", "-30vh"] // House rises, settles, then flies up
);

const houseScale = useTransform(
  scrollYProgress,
  [START, END],
  [1, 1.08]
);

/* ==========================
   SIDE CLOUDS
========================== */

const leftCloudX = useTransform(
  scrollYProgress,
  [START, END],
  ["0%", "-100%"]
);

const rightCloudX = useTransform(
  scrollYProgress,
  [START, END],
  ["0%", "100%"]
);

/* ==========================
   FOG
========================== */

const fogY = useTransform(
  scrollYProgress,
  [START, END, EXIT],
  // Fog stays pinned to the bottom of the house and flies up WITH it during the exit phase
  ["100vh", "0vh", "0vh"] 
);

const fogOpacity = useTransform(
  scrollYProgress,
  [START, END, EXIT],
  [1, 1, 0]
);

  return (
    <main ref={containerRef} className="relative h-[250vh] w-full">
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-gradient-to-b from-[#bfe3f7] to-[#d8edf9]">
        {/* ── NAVBAR ── z-[100] */}
        <header className="absolute top-0 left-0 right-0 z-[100] flex w-full items-center justify-between px-6 py-6 md:px-12">
          <div className="flex items-center gap-2 font-bold text-2xl tracking-tight text-black">
            <svg viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6">
              <path d="M12 2L2 12h3v8h14v-8h3L12 2zm0 2.83l7 7V20H5v-8.17l7-7z" />
            </svg>
            Slick
          </div>
          <nav className="hidden gap-8 text-sm font-medium text-gray-900 md:flex">
            <Link href="#properties" className="hover:text-black">
              PROPERTIES
            </Link>
            <Link href="#services" className="hover:text-black">
              SERVICES
            </Link>
            <Link href="#about" className="hover:text-black">
              ABOUT
            </Link>
          </nav>
          <button className="flex items-center gap-2 rounded-full bg-black px-5 py-2.5 text-sm font-medium text-white transition-transform hover:scale-105">
            Contact us
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-white text-black">
              →
            </span>
          </button>
        </header>

        {/* ── SIDE CLOUD LEFT ── z-10 */}
        <motion.div
          style={{ x: leftCloudX }}
          className="absolute top-[22%] left-[6%] z-10 w-[28vw] max-w-[380px] opacity-80 pointer-events-none"
        >
          <Image
            src="/side-cloud.avif"
            alt="Cloud left"
            width={380}
            height={190}
            className="w-full h-auto object-contain"
          />
        </motion.div>

        {/* ── SIDE CLOUD RIGHT ── z-10 */}
        <motion.div
          style={{ x: rightCloudX }}
          className="absolute top-[28%] right-[4%] z-10 w-[32vw] max-w-[460px] opacity-70 pointer-events-none"
        >
          <Image
            src="/side-cloud.avif"
            alt="Cloud right"
            width={460}
            height={230}
            className="w-full h-auto object-contain"
          />
        </motion.div>

        {/* ── HERO TEXT ── z-20 (Moved BEHIND the house) */}
        <motion.div
          style={{ y: textY, opacity: textOpacity, scale: textScale }}
          className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center px-4 pt-[80px]"
        >
          <div className="mb-6 flex items-center gap-2 rounded-full bg-white/40 px-4 py-1.5 backdrop-blur-md border border-white/20 shadow-sm">
            <div className="flex -space-x-2">
              <div className="h-6 w-6 rounded-full bg-gray-300 border-2 border-white" />
              <div className="h-6 w-6 rounded-full bg-gray-400 border-2 border-white" />
              <div className="h-6 w-6 rounded-full bg-gray-500 border-2 border-white" />
            </div>
            <span className="text-sm font-medium text-gray-800">
              3,500+ Pro Users
            </span>
          </div>

          <h1 className="max-w-5xl text-6xl font-extrabold tracking-tight text-gray-900 sm:text-6xl md:text-8xl lg:text-[110px] leading-none">
             Slick Construction
          </h1>

          <p className="mt-6 max-w-2xl text-lg font-medium text-gray-700 md:text-xl">
            Explore thoughtfully designed homes in premium locations, crafted to
            match modern lifestyles with comfort, elegance, and long-term value.
          </p>

          <div className="mt-8 flex items-center gap-4">
            <button className="flex items-center gap-2 rounded-full bg-black px-6 py-3.5 text-sm font-semibold text-white transition-all hover:bg-gray-800 pointer-events-auto">
              Explore Homes
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-white text-black">
                →
              </span>
            </button>
            <button className="rounded-full border border-gray-900/30 bg-transparent px-6 py-3.5 text-sm font-semibold text-gray-900 transition-all hover:bg-white/20 pointer-events-auto">
              Book a Visit
            </button>
          </div>
        </motion.div>

        {/* ── HOUSE ── z-30 (Now ABOVE the text) */}
        <motion.div
          style={{ y: houseY, scale: houseScale }}
          className="absolute bottom-0 left-0 right-0 z-30 flex w-full justify-center pointer-events-none origin-bottom"
        >
          <div className="w-full">
            <Image
              src="/full-home.avif"
              alt="Modern Luxury Home"
              width={1920}
              height={1080}
              priority
              className="w-full h-auto object-cover object-bottom"
            />
          </div>
        </motion.div>

        {/* ── FOG CLOUD ── z-40 */}
        <motion.div
          style={{ y: fogY }}
          className="absolute bottom-0 left-0 right-0 z-40 flex flex-col pointer-events-none"
        >
          <Image
            src="/main-cloud.avif"
            alt="Fog transition"
            width={1920}
            height={500}
            className="w-full h-auto object-cover object-top opacity-95 min-w-full relative z-10"
          />
          {/* FIX: absolute top-full forces the white tail to hang below the image, preventing it from pushing the image up! */}
          {/* <div className="absolute top-full left-0 h-[100vh] w-full bg-white -mt-1" /> */}
        </motion.div>
      </div>

      {/* ── NEXT SECTION ── */}
    </main>
  );
}
