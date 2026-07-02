"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";

// ─────────────────────────────────────────────────────────────────
// CUSTOM ODOMETER COMPONENT
// ─────────────────────────────────────────────────────────────────
function RollingNumber({ text, delay = 0 }: { text: string; delay?: number }) {
  return (
    // Replaced #D4AF37 with text-gold
    <div className="flex font-extrabold text-gold text-5xl sm:text-6xl md:text-7xl tracking-tighter drop-shadow-md">
      {text.split("").map((char, index) => {
        const isNumber = !isNaN(parseInt(char)) && char !== " ";
        const num = parseInt(char);

        if (!isNumber) {
          return (
            <span key={index} className="inline-block">
              {char}
            </span>
          );
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
              className="flex flex-col"
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
    { value: "$4.6M+", label: "TOTAL VALUE", delay: 0.2 },
    { value: "320+", label: "ACTIVE HOMES", delay: 0.4 },
    { value: "98%", label: "HAPPY CLIENTS", delay: 0.6 },
  ];

  return (
    // Replaced #0A0A0A with bg-richblack
    <section className="w-full bg-richblack py-24 md:py-32" ref={ref}>
      <div className="mx-auto max-w-7xl px-6 md:px-12">
        
        {/* ── HEADER AREA ── */}
        <div className="mb-16 grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-16 items-end">
          
          <div className="flex flex-col items-start gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              // Replaced hex codes with border-gold/30, bg-gold/10, text-gold
              className="flex items-center gap-2 rounded-full border border-gold/30 bg-gold/10 px-4 py-1.5 text-sm font-semibold tracking-wide text-gold uppercase"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4">
                <circle cx="12" cy="12" r="10" />
                <circle cx="12" cy="12" r="4" />
              </svg>
              Our Impact
            </motion.div>

            <h2 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl md:text-6xl leading-[1.1]">
              <span className="block overflow-hidden">
                <motion.span
                  initial={{ y: "100%" }}
                  whileInView={{ y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  className="block"
                >
                  Real insights behind
                </motion.span>
              </span>
              <span className="block overflow-hidden pb-2">
                <motion.span
                  initial={{ y: "100%" }}
                  whileInView={{ y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
                  // Replaced #C5A059 with text-gold-muted
                  className="block text-gold-muted" 
                >
                  every property decision
                </motion.span>
              </span>
            </h2>
          </div>

          <motion.p
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
            className="text-lg font-medium text-gray-400 md:text-xl max-w-md pb-2 md:ml-auto"
          >
            Built to make modern home discovery simple, transparent, and more confident for every user.
          </motion.p>
        </div>

        {/* ── GRID AREA ── */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
          
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            // Replaced #141414 with bg-charcoal
            className="relative h-[400px] lg:h-auto w-full overflow-hidden rounded-3xl bg-charcoal border border-white/5"
          >
            <motion.div
              className="h-full w-full opacity-80" 
              initial={{ scale: 1.2 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
            >
              <Image
                src="/website-photos-3.jpg"
                alt="Modern property design"
                fill
                className="object-cover"
              />
            </motion.div>
          </motion.div>

          <div className="flex flex-col justify-between gap-4 md:gap-6">
            {stats.map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: stat.delay, ease: "easeOut" }}
                // Utilized bg-charcoal and hover:border-gold/40
                className="group flex flex-1 items-center justify-between rounded-3xl bg-charcoal border border-white/5 px-6 py-10 md:px-10 hover:border-gold/40 transition-all duration-500 cursor-default"
              >
                <RollingNumber text={stat.value} delay={stat.delay} />
                <span className="w-24 text-right text-sm font-bold uppercase tracking-wider text-gray-500 group-hover:text-gray-300 transition-colors">
                  {stat.label}
                </span>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            // Replaced #141414 with bg-charcoal
            className="relative h-[400px] lg:h-auto w-full overflow-hidden rounded-3xl bg-charcoal border border-white/5"
          >
            <motion.div
              className="h-full w-full opacity-80"
              initial={{ scale: 1.2 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            >
              <Image
                src="/website-photos-4.jpg"
                alt="Modern property design interior"
                fill
                className="object-cover"
              />
            </motion.div>
          </motion.div>
          
        </div>
      </div>
    </section>
  );
}