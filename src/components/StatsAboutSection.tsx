"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";

// ─────────────────────────────────────────────────────────────────
// CUSTOM ODOMETER COMPONENT (Refined sizing for a sleeker look)
// ─────────────────────────────────────────────────────────────────
function RollingNumber({ text, delay = 0 }: { text: string; delay?: number }) {
  return (
    <div className="flex font-semibold text-white text-5xl sm:text-6xl md:text-[4rem] tracking-tighter">
      {text.split("").map((char, index) => {
        const isNumber = !isNaN(parseInt(char)) && char !== " ";
        const num = parseInt(char);

        if (!isNumber) {
          return <span key={index} className="inline-block text-[#D4AF37]">{char}</span>;
        }

        return (
          <span
            key={index}
            className="relative inline-block h-[1em] overflow-hidden align-bottom leading-[1em]"
          >
            <motion.div
              initial={{ y: "0em" }}
              whileInView={{ y: `-${num}em` }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{
                duration: 1.5,
                ease: [0.22, 1, 0.36, 1],
                delay: delay + index * 0.1,
              }}
              className="flex flex-col text-white"
            >
              {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((n) => (
                <span key={n} className="h-[1em] leading-[1em]">
                  {n}
                </span>
              ))}
            </motion.div>
          </span>
        );
      })}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────
// MAIN SECTION COMPONENT
// ─────────────────────────────────────────────────────────────────
export default function StatsAboutSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const stats = [
    {
      id: "01",
      value: "15+",
      description: "Years of master craftsmanship.",
      delay: 0.2,
    },
    {
      id: "02",
      value: "45+",
      description: "Successful projects.",
      delay: 0.4,
    },
    {
      id: "03",
      value: "98%",
      description: "Client satisfaction in post-project reviews.",
      delay: 0.6,
    },
  ];

  return (
    <section className="w-full bg-[#050505] py-24 md:py-32" ref={ref}>
      <div className="mx-auto max-w-7xl px-6 md:px-12">
        
        {/* ── TOP ROW: EYEBROW & HEADLINE ── */}
        <div className="flex flex-col lg:flex-row justify-between items-start gap-8 lg:gap-16">
          
          {/* Eyebrow (Top Left) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-4 lg:w-1/3 pt-2"
          >
            <div className="h-[2px] w-8 bg-[#D4AF37]" />
            <span className="text-xs font-semibold text-[#D4AF37] uppercase tracking-[0.2em]">
              Built on experience
            </span>
          </motion.div>

          {/* Large Headline (Top Right) */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-[52px] font-medium leading-[1.2] tracking-tight lg:w-2/3"
          >
            <span className="text-white">
              We deliver architecture and renovation projects focused on quality.{" "}
            </span>
            <span className="text-[#666666]">
              Our work blends design with expertise.
            </span>
          </motion.h2>
        </div>

        {/* ── MIDDLE ROW: TESTIMONIAL & PARAGRAPH ── */}
        <div className="mt-20 mb-24 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-12">
          
          {/* Testimonial Block (Left) */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-col sm:flex-row items-start sm:items-center gap-8 lg:w-1/2"
          >
            <p className="max-w-[300px] text-lg font-light italic leading-relaxed text-gray-300 border-l border-[#D4AF37]/30 pl-6">
              “A smooth process from start to finish. Highly professional team!”
            </p>
            
            {/* Avatar Profile */}
            <div className="flex items-center gap-4">
              <div className="relative h-12 w-12 overflow-hidden rounded-full border border-white/10">
                <Image
                  src="/slick-33.png" // Swap with your actual client avatar image
                  alt="Alisson Backer"
                  fill
                  className="object-cover grayscale hover:grayscale-0 transition-all duration-500"
                />
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-medium text-white tracking-wide">
                  Alisson Backer
                </span>
                <span className="text-xs text-[#888888] uppercase tracking-wider mt-0.5">
                  Client
                </span>
              </div>
            </div>
          </motion.div>

          {/* Descriptive Text (Right) */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="lg:w-1/3"
          >
            <p className="text-sm font-light leading-relaxed text-gray-400">
              We collaborate tightly with our clients to ensure every single project strictly meets their goals, budget, and timeline without compromising on the architectural integrity.
            </p>
          </motion.div>
        </div>

        {/* ── BOTTOM ROW: SLIM STATS CARDS ── */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: stat.delay, ease: "easeOut" }}
              className="group relative flex flex-col justify-between rounded-2xl bg-gradient-to-b from-[#161616] to-[#0a0a0a] border border-white/5 p-8 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_8px_30px_rgb(0,0,0,0.5)] hover:border-white/10 overflow-hidden"
            >
              {/* Subtle top border highlight on hover */}
              <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#D4AF37]/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              {/* Top Number */}
              <div className="flex justify-between items-center mb-10">
                <span className="text-xs font-mono text-[#D4AF37] tracking-[0.2em]">
                  /{stat.id}
                </span>
                <div className="h-[1px] flex-grow ml-6 bg-gradient-to-r from-white/10 to-transparent" />
              </div>
              
              {/* Bottom Content */}
              <div className="mt-auto">
                <RollingNumber text={stat.value} delay={stat.delay} />
                <p className="mt-5 text-sm font-light leading-relaxed text-[#888888] pr-4">
                  {stat.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
        
      </div>
    </section>
  );
}