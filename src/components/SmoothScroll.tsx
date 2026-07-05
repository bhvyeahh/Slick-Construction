"use client";

// This is the updated import path!
import { ReactLenis } from "lenis/react";

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  return (
    <ReactLenis 
      root 
      options={{ 
        lerp: 0.07, // Controls the smoothness (lower = smoother/slower)
        wheelMultiplier: 1, // Normal scroll speed
        smoothWheel: true,
      }}
    >
      {children}
    </ReactLenis>
  );
}