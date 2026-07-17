"use client";

import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, Variants } from "framer-motion";
import { LayoutGrid, Sparkles } from "lucide-react";

// Generate array for the original 30 images, explicitly skipping 4 and 5,
// and append the 3 new .jpeg images at the end.
const baseImages = Array.from({ length: 32 }, (_, i) => i + 1)
  .filter((num) => num !== 4 && num !== 5)
  .map((num) => `/slick/slick-${num}.png`);

const newImages = [
  "/slick/slick-38.jpeg",
  "/slick/slick-39.jpeg",
  "/slick/slick-40.jpeg",
];

const galleryImages = [...baseImages, ...newImages];

// ─────────────────────────────────────────────────────────────────
// MAIN PARENT COMPONENT (Handles the Toggle State)
// ─────────────────────────────────────────────────────────────────
export default function InfinityGallery() {
  const [viewMode, setViewMode] = useState<"cinematic" | "grid">("grid");
  const [isDesktop, setIsDesktop] = useState(false);
  const [mounted, setMounted] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  // Safely detect if the device is a PC/Laptop (>= 1024px) after mounting
  useEffect(() => {
    setMounted(true);
    const checkDesktop = () => setIsDesktop(window.innerWidth >= 1024);
    
    // Initial check
    checkDesktop();
    
    // Listen for window resizing
    window.addEventListener("resize", checkDesktop);
    return () => window.removeEventListener("resize", checkDesktop);
  }, []);

  // Force grid view if user resizes window down to tablet/mobile size
  useEffect(() => {
    if (!isDesktop && viewMode === "cinematic") {
      setViewMode("grid");
    }
  }, [isDesktop, viewMode]);

  const handleToggle = (mode: "cinematic" | "grid") => {
    setViewMode(mode);
    if (sectionRef.current) {
      const yOffset = sectionRef.current.getBoundingClientRect().top + window.scrollY - 100;
      window.scrollTo({ top: yOffset, behavior: "smooth" });
    }
  };

  const renderCinematic = mounted && isDesktop && viewMode === "cinematic";

  return (
    // Removed overflow-x-hidden from here so sticky positioning works again!
    <section ref={sectionRef} className="relative w-full bg-[#0A0A0A] min-h-screen pt-24">
      
      {/* ── HEADER & TOGGLE BUTTON ── */}
      <div className="sticky top-24 z-50 max-w-[1400px] mx-auto px-6 md:px-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pointer-events-none mb-12">
        
        <div className="pointer-events-auto">
          <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-white leading-[1.05]">
            The <span className="text-[#D4AF37] italic">Gallery.</span>
          </h2>
        </div>

        {/* Premium Glass Toggle - Hidden on Mobile/Tablet */}
        <div className="pointer-events-auto hidden lg:inline-flex items-center bg-white/5 backdrop-blur-xl border border-white/10 rounded-full p-1 shadow-2xl">
          <button
            onClick={() => handleToggle("grid")}
            className={`flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-bold transition-all duration-300 ${
              viewMode === "grid" 
                ? "bg-[#D4AF37] text-black shadow-[0_0_15px_rgba(212,175,55,0.4)]" 
                : "text-gray-400 hover:text-white"
            }`}
          >
            <LayoutGrid size={16} />
            Grid View
          </button>
          <button
            onClick={() => handleToggle("cinematic")}
            className={`flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-bold transition-all duration-300 ${
              viewMode === "cinematic" 
                ? "bg-[#D4AF37] text-black shadow-[0_0_15px_rgba(212,175,55,0.4)]" 
                : "text-gray-400 hover:text-white"
            }`}
          >
            <Sparkles size={16} />
            Cinematic
          </button>
        </div>
      </div>

      {/* ── CONDITIONAL RENDERER ── */}
      {renderCinematic ? <CinematicExperience /> : <BentoGallery />}

    </section>
  );
}

// ─────────────────────────────────────────────────────────────────
// SUB-COMPONENT 1: THE SMOOTH BENTO GRID
// ─────────────────────────────────────────────────────────────────
function BentoGallery() {
  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 50, scale: 0.95 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1, 
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } 
    },
  };

  return (
    <div className="max-w-[1400px] mx-auto px-6 md:px-12 pb-32 pt-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {galleryImages.map((src, idx) => {
          // Dynamic bento layout mapping
          const isFeatured = idx % 7 === 0;
          
          return (
            <motion.div
              key={idx}
              variants={itemVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              className={`relative overflow-hidden rounded-[1.5rem] bg-[#141414] border border-white/5 group ${
                isFeatured ? "md:col-span-2 md:row-span-2 aspect-[4/3] md:aspect-auto md:min-h-[400px]" : "col-span-1 aspect-[4/3]"
              }`}
            >
              <Image 
                src={src} 
                alt={`Gallery photo ${idx + 1}`} 
                fill 
                className="object-cover transition-transform duration-[2s] group-hover:scale-105" 
              />
              <div className="absolute inset-0 bg-black/10 group-hover:bg-[#D4AF37]/10 transition-colors duration-700 pointer-events-none" />
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────
// SUB-COMPONENT 2: THE INFINITY CASTLE (Now 6 Phases)
// ─────────────────────────────────────────────────────────────────
function CinematicExperience() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
  const baseScale = isMobile ? 1.2 : 1;

  // ── PHASE 1: 3D Belts (Images 0-9) ──
  const phase1Opacity = useTransform(scrollYProgress, [0, 0.15, 0.2], [1, 1, 0]);
  const beltX1 = useTransform(scrollYProgress, [0, 0.2], ["-10vw", "100vw"]);
  const beltX2 = useTransform(scrollYProgress, [0, 0.2], ["10vw", "-100vw"]);
  const rotate3D = useTransform(scrollYProgress, [0, 0.2], ["0deg", "15deg"]);

  // ── PHASE 2: Staircase (Images 14, 15, 16) ──
  const phase2Opacity = useTransform(scrollYProgress, [0.1, 0.18, 0.32, 0.38], [0, 1, 1, 0]);
  const stair1Y = useTransform(scrollYProgress, [0.15, 0.38], ["100vh", "-50vh"]);
  const stair2Y = useTransform(scrollYProgress, [0.15, 0.38], ["150vh", "-20vh"]);
  const stair3Y = useTransform(scrollYProgress, [0.15, 0.38], ["200vh", "10vh"]);

  // ── PHASE 3: Monolith Takeover (Image 2) ──
  const phase3Opacity = useTransform(scrollYProgress, [0.3, 0.38, 0.5, 0.55], [0, 1, 1, 0]);
  const monolithWidth = useTransform(scrollYProgress, [0.35, 0.45], ["40vw", "100vw"]);
  const monolithHeight = useTransform(scrollYProgress, [0.35, 0.45], ["40vh", "100vh"]);
  const monolithRadius = useTransform(scrollYProgress, [0.35, 0.45], ["2rem", "0rem"]);

  // ── PHASE 4: PARALLAX CASCADE (The remaining 12 images: 18-29) ──
  const phase4Opacity = useTransform(scrollYProgress, [0.48, 0.55, 0.72, 0.78], [0, 1, 1, 0]);
  const cascade1Y = useTransform(scrollYProgress, [0.5, 0.78], ["100vh", "-120vh"]);
  const cascade2Y = useTransform(scrollYProgress, [0.5, 0.78], ["150vh", "-80vh"]);
  const cascade3Y = useTransform(scrollYProgress, [0.5, 0.78], ["120vh", "-150vh"]);

  // ── PHASE 5: NEW TRIO FAN-OUT (The 3 new JPEG images: indices 30, 31, 32) ──
  const phase5Opacity = useTransform(scrollYProgress, [0.72, 0.78, 0.85, 0.88], [0, 1, 1, 0]);
  const trioCenterScale = useTransform(scrollYProgress, [0.75, 0.85], [0.5, 1.1]);
  const trioLeftX = useTransform(scrollYProgress, [0.75, 0.85], ["0vw", isMobile ? "-20vw" : "-25vw"]);
  const trioRightX = useTransform(scrollYProgress, [0.75, 0.85], ["0vw", isMobile ? "20vw" : "25vw"]);
  const trioSideY = useTransform(scrollYProgress, [0.75, 0.85], ["0vh", "5vh"]);
  const trioSideRotateLeft = useTransform(scrollYProgress, [0.75, 0.85], ["0deg", "-6deg"]);
  const trioSideRotateRight = useTransform(scrollYProgress, [0.75, 0.85], ["0deg", "6deg"]);

  // ── PHASE 6: Normalization & Twins (Images 6, 7) ──
  const phase6Opacity = useTransform(scrollYProgress, [0.85, 0.9, 1], [0, 1, 1]);
  const twinLeftX = useTransform(scrollYProgress, [0.85, 0.92, 1], ["-100vw", isMobile ? "0vw" : "-20vw", isMobile ? "0vw" : "-10vw"]);
  const twinRightX = useTransform(scrollYProgress, [0.85, 0.92, 1], ["100vw", isMobile ? "0vw" : "20vw", isMobile ? "0vw" : "10vw"]);
  
  const finalTextOpacity = useTransform(scrollYProgress, [0.94, 0.98], [0, 1]);
  const finalTextY = useTransform(scrollYProgress, [0.94, 0.98], ["40px", "0px"]);

  return (
    <div ref={containerRef} className="relative h-[700vh] bg-[#0A0A0A] -mt-32">
      
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center perspective-[1200px]">
        
        {/* ================= PHASE 1: BELTS ================= */}
        <motion.div 
          style={{ opacity: phase1Opacity, rotateX: rotate3D, rotateY: rotate3D, scale: baseScale }}
          className="absolute inset-0 w-full h-full flex items-center justify-center transform-gpu preserve-3d"
        >
          <motion.div style={{ x: beltX1, y: "-15vh" }} className="absolute flex gap-4 md:gap-8 z-10 w-[200vw]">
            {galleryImages.slice(0, 5).map((src, i) => (
              <div key={i} className="relative w-[60vw] md:w-[400px] aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl border border-white/10">
                <Image src={src} alt="Belt" fill className="object-cover"  loading="eager" />
              </div>
            ))}
          </motion.div>
          
          <motion.div style={{ x: beltX2, y: "15vh" }} className="absolute flex gap-4 md:gap-8 z-20 w-[200vw]">
            {galleryImages.slice(5, 10).map((src, i) => (
              <div key={i} className="relative w-[60vw] md:w-[400px] aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl border border-white/10">
                <Image src={src} alt="Belt" fill className="object-cover"  loading="eager" />
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* ================= PHASE 2: STAIRS ================= */}
        <motion.div 
          style={{ opacity: phase2Opacity }}
          className="absolute inset-0 w-full h-full flex items-center justify-center gap-4 md:gap-12 transform-gpu"
        >
          <motion.div style={{ y: stair1Y }} className="relative w-[30vw] md:w-[25vw] aspect-[4/5] rounded-2xl overflow-hidden border border-white/20">
            <Image src={galleryImages[14]} alt="Stair 1" fill className="object-cover"  loading="eager" />
          </motion.div>
          <motion.div style={{ y: stair2Y }} className="relative w-[30vw] md:w-[25vw] aspect-[4/5] rounded-2xl overflow-hidden border border-[#D4AF37]/50 mt-[10vh]">
            <Image src={galleryImages[15]} alt="Stair 2" fill className="object-cover"  loading="eager" />
          </motion.div>
          <motion.div style={{ y: stair3Y }} className="relative w-[30vw] md:w-[25vw] aspect-[4/5] rounded-2xl overflow-hidden border border-white/20 mt-[20vh] hidden md:block">
            <Image src={galleryImages[16]} alt="Stair 3" fill className="object-cover"  loading="eager" />
          </motion.div>
        </motion.div>

        {/* ================= PHASE 3: MONOLITH ================= */}
        <motion.div 
          style={{ opacity: phase3Opacity }}
          className="absolute inset-0 w-full h-full flex items-center justify-center z-40 transform-gpu pointer-events-none"
        >
          <motion.div style={{ width: monolithWidth, height: monolithHeight, borderRadius: monolithRadius }} className="relative overflow-hidden border border-white/10">
            <Image src={galleryImages[2]} alt="Monolith" fill className="object-cover"  loading="eager" />
            <div className="absolute inset-0 bg-black/20" />
          </motion.div>
        </motion.div>

        {/* ================= PHASE 4: THE CASCADE ================= */}
        <motion.div 
          style={{ opacity: phase4Opacity }}
          className="absolute inset-0 w-full h-full flex items-center justify-center gap-3 md:gap-8 transform-gpu z-40"
        >
          {/* Column 1 */}
          <motion.div style={{ y: cascade1Y }} className="flex flex-col gap-3 md:gap-8 w-[30vw] md:w-[25vw]">
            {galleryImages.slice(18, 22).map((src, i) => (
              <div key={i} className="relative w-full aspect-square rounded-2xl overflow-hidden border border-white/10">
                <Image src={src} alt="Cascade Col 1" fill className="object-cover"  loading="eager" />
              </div>
            ))}
          </motion.div>

          {/* Column 2 */}
          <motion.div style={{ y: cascade2Y }} className="flex flex-col gap-3 md:gap-8 w-[30vw] md:w-[25vw] mt-10">
            {galleryImages.slice(22, 26).map((src, i) => (
              <div key={i} className="relative w-full aspect-[4/5] rounded-2xl overflow-hidden border border-[#D4AF37]/30">
                <Image src={src} alt="Cascade Col 2" fill className="object-cover"  loading="eager" />
              </div>
            ))}
          </motion.div>

          {/* Column 3 */}
          <motion.div style={{ y: cascade3Y }} className="flex flex-col gap-3 md:gap-8 w-[30vw] md:w-[25vw] mt-20">
            {galleryImages.slice(26, 30).map((src, i) => (
              <div key={i} className="relative w-full aspect-square rounded-2xl overflow-hidden border border-white/10">
                <Image src={src} alt="Cascade Col 3" fill className="object-cover"  loading="eager" />
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* ================= PHASE 5: THE NEW TRIO FAN-OUT ================= */}
        <motion.div 
          style={{ opacity: phase5Opacity }}
          className="absolute inset-0 w-full h-full flex items-center justify-center transform-gpu z-[45]"
        >
          {/* Left Image */}
          <motion.div 
            style={{ x: trioLeftX, y: trioSideY, rotate: trioSideRotateLeft }} 
            className="absolute w-[45vw] md:w-[25vw] aspect-[4/5] rounded-2xl overflow-hidden border border-white/20 shadow-[0_0_40px_rgba(0,0,0,0.8)] z-10"
          >
            <Image src={galleryImages[30]} alt="New JPEG 1" fill className="object-cover" loading="eager" />
          </motion.div>

          {/* Right Image */}
          <motion.div 
            style={{ x: trioRightX, y: trioSideY, rotate: trioSideRotateRight }} 
            className="absolute w-[45vw] md:w-[25vw] aspect-[4/5] rounded-2xl overflow-hidden border border-white/20 shadow-[0_0_40px_rgba(0,0,0,0.8)] z-10"
          >
            <Image src={galleryImages[32]} alt="New JPEG 3" fill className="object-cover" loading="eager" />
          </motion.div>

          {/* Center Image */}
          <motion.div 
            style={{ scale: trioCenterScale }} 
            className="absolute w-[55vw] md:w-[30vw] aspect-[4/5] rounded-2xl overflow-hidden border border-[#D4AF37]/50 shadow-[0_0_60px_rgba(0,0,0,0.9)] z-20"
          >
            <Image src={galleryImages[31]} alt="New JPEG 2" fill className="object-cover" loading="eager" />
          </motion.div>
        </motion.div>

        {/* ================= PHASE 6: TWINS & REVEAL ================= */}
        <motion.div 
          style={{ opacity: phase6Opacity }}
          className="absolute inset-0 w-full h-full flex flex-col items-center justify-center z-50 transform-gpu"
        >
          <div className="relative flex flex-col md:flex-row items-center justify-center w-full h-full gap-4 md:gap-0">
            <motion.div style={{ x: twinLeftX }} className="relative w-[80vw] md:w-[35vw] aspect-[4/3] rounded-2xl overflow-hidden border border-white/20 md:absolute z-20">
              <Image src={galleryImages[6]} alt="Twin Left" fill className="object-cover"  loading="eager" />
            </motion.div>
            <motion.div style={{ x: twinRightX }} className="relative w-[80vw] md:w-[35vw] aspect-[4/3] rounded-2xl overflow-hidden border border-[#D4AF37]/30 md:absolute z-10 hidden md:block">
              <Image src={galleryImages[7]} alt="Twin Right" fill className="object-cover"  loading="eager" />
            </motion.div>
          </div>

          <motion.div style={{ opacity: finalTextOpacity, y: finalTextY }} className="absolute bottom-10 md:bottom-20 flex flex-col items-center text-center z-30 px-6">
            <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight mb-4">
              A gallery of <span className="text-[#D4AF37] italic font-serif">masterpieces.</span>
            </h2>
            <p className="text-gray-400 text-sm md:text-base font-medium max-w-md">
              Every angle, every material, every space—engineered for perfection.
            </p>
          </motion.div>
        </motion.div>

      </div>
    </div>
  );
}