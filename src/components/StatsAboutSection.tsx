"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";

// ─────────────────────────────────────────────────────────────────
// CUSTOM ODOMETER COMPONENT (Kept from previous for the sick animation)
// ─────────────────────────────────────────────────────────────────
function RollingNumber({ text, delay = 0 }: { text: string; delay?: number }) {
  return (
    <div className="flex font-semibold text-white text-6xl sm:text-7xl md:text-[5rem] tracking-tighter">
      {text.split("").map((char, index) => {
        const isNumber = !isNaN(parseInt(char)) && char !== " ";
        const num = parseInt(char);

        if (!isNumber) {
          return <span key={index} className="inline-block">{char}</span>;
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
              className="flex flex-col text-gold"
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
      value: "$4.6M+",
      description: "Total value of projects delivered successfully.",
      delay: 0.2,
    },
    {
      id: "02",
      value: "320+",
      description: "Active homes and commercial spaces built.",
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
    <section className="w-full bg-richblack py-24 md:py-32" ref={ref}>
      <div className="mx-auto max-w-7xl px-6 md:px-12">
        
        {/* ── TOP ROW: EYEBROW & HEADLINE ── */}
        <div className="flex flex-col lg:flex-row justify-between items-start gap-8 lg:gap-16">
          
          {/* Eyebrow (Top Left) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-3 lg:w-1/3 pt-2"
          >
            <div className="h-2 w-2 rounded-full bg-gold-muted" />
            <span className="text-sm font-medium text-gold-muted uppercase tracking-wider">
              Built on experience and craft
            </span>
          </motion.div>

          {/* Large Headline (Top Right) */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-[56px] font-medium leading-[1.15] tracking-tight lg:w-2/3"
          >
            <span className="text-white">
              We deliver architecture and renovation projects focused on quality.{" "}
            </span>
            <span className="text-gray-500">
              Our work blends design with expertise.
            </span>
          </motion.h2>
        </div>

        {/* ── MIDDLE ROW: TESTIMONIAL & PARAGRAPH ── */}
        <div className="mt-16 mb-20 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-12">
          
          {/* Testimonial Block (Left) */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-col sm:flex-row items-start sm:items-center gap-6 lg:w-1/2"
          >
            <p className="max-w-[280px] text-lg font-medium leading-snug text-white">
              “A smooth process from start to finish. Highly professional team!”
            </p>
            
            {/* Vertical Divider */}
            <div className="hidden sm:block h-14 w-[1px] bg-white/10" />
            
            {/* Avatar Profile */}
            <div className="flex items-center gap-4">
              <div className="relative h-12 w-12 overflow-hidden rounded-full bg-charcoal border border-white/5">
                <Image
                  src="/website-photos-3.jpg" // Swap with your actual client avatar image
                  alt="Alisson Backer"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-medium text-white">
                  Alisson Backer
                </span>
                <span className="text-sm text-gold-muted">
                  Client
                </span>
              </div>
            </div>
          </motion.div>

          {/* Descriptive Text (Right - Replaces Video) */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="lg:w-1/3"
          >
            <p className="text-base font-medium leading-relaxed text-gray-400">
              We collaborate with clients to ensure every project meets their goals, budget, and timeline.
            </p>
          </motion.div>
        </div>

        {/* ── BOTTOM ROW: STATS CARDS ── */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: stat.delay, ease: "easeOut" }}
              className="flex flex-col justify-between rounded-[2rem] bg-charcoal border border-white/5 p-8 md:p-10 transition-colors hover:border-gold/30 min-h-[300px]"
            >
              {/* Top Number */}
              <span className="text-sm font-medium text-gold-muted mb-12">
                /{stat.id}
              </span>
              
              {/* Bottom Content */}
              <div className="mt-auto">
                <RollingNumber text={stat.value} delay={stat.delay} />
                <p className="mt-4 text-sm font-medium leading-relaxed text-gray-400 max-w-[200px]">
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