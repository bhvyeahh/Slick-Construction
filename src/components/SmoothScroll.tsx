"use client";

import { ReactLenis } from "@studio-freight/react-lenis";

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