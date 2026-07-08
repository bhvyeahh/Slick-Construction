"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useMotionValueEvent } from "framer-motion";

export default function ScrollVideoSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [duration, setDuration] = useState(0);

  // "end start" means progress reaches 1.0 when the BOTTOM of the 300vh container 
  // hits the TOP of the screen (meaning it has completely scrolled away).
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // ─────────────────────────────────────────────────────────────────
  // SCROLL-TO-VIDEO PLAYBACK LOGIC
  // ─────────────────────────────────────────────────────────────────
  
  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration);
    }
  };

  useEffect(() => {
    if (videoRef.current) {
      // 1. Force mobile browsers to load the video data
      videoRef.current.load();

      // 2. The iOS Safari Unlock Hack:
      // We briefly play and immediately pause the video to unlock the media element 
      // without requiring a physical tap from the user.
      const playPromise = videoRef.current.play();
      if (playPromise !== undefined) {
        playPromise.then(() => {
          videoRef.current?.pause();
        }).catch(() => {
          // It's normal for this to throw a silent error if low-power mode is on,
          // but the attempt itself is often enough to unlock the scrub data.
        });
      }

      // 3. Fallback duration check
      if (videoRef.current.readyState >= 1) {
        setDuration(videoRef.current.duration);
      }
    }
  }, []);

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (videoRef.current && duration > 0) {
      requestAnimationFrame(() => {
        if (videoRef.current) {
          videoRef.current.currentTime = latest * duration;
        }
      });
    }
  });

  // ─────────────────────────────────────────────────────────────────
  // ANIMATION TRANSFORMS
  // ─────────────────────────────────────────────────────────────────
  
  const videoScale = useTransform(scrollYProgress, [0, 0.66], [0.3, 1]);
  const videoRadius = useTransform(scrollYProgress, [0, 0.66], ["80px", "0px"]);
  
  const textX = useTransform(scrollYProgress, [0, 1], ["0%", "-50%"]);

  return (
    <section ref={containerRef} className="relative h-[300vh] bg-[#FDFBF7]">
      
      {/* ── STICKY VIEWPORT ── */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">
        
        {/* =========================================================================
            BACKGROUND TEXT BELT 
        ========================================================================= */}
        <motion.div 
          style={{ x: textX }}
          className="absolute flex whitespace-nowrap text-[8vw] md:text-[6vw] font-bold tracking-tight text-[#D4AF37]/20 select-none transform-gpu will-change-transform"
        >
          <span className="pr-8">
            Precision Built • Timeless Design • Master Craftsmanship • Seamless Execution • Precision Built • Timeless Design • Master Craftsmanship • Seamless Execution • Precision Built
          </span>
        </motion.div>

        {/* =========================================================================
            SCALING & SCRUBBING VIDEO CONTAINER
        ========================================================================= */}
        <motion.div
          style={{
            scale: videoScale,
            borderRadius: videoRadius,
          }}
          className="relative h-[100vh] aspect-[9/16] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.2)] z-10 transform-gpu will-change-transform bg-gray-200"
        >
          <video 
            ref={videoRef}
            src="/scroll-vid-fixed.mp4" 
            onLoadedMetadata={handleLoadedMetadata}
            muted 
            playsInline 
            preload="auto" 
            className="w-full h-full object-cover"
          />
          
          <div className="absolute inset-0 rounded-inherit ring-1 ring-inset ring-black/10 pointer-events-none" />
        </motion.div>

      </div>
    </section>
  );
}