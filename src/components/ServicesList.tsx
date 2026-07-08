"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, Variants } from "framer-motion";
import { ArrowUpRight, Check } from "lucide-react";

// ─────────────────────────────────────────────────────────────────
// SERVICES DATA
// ─────────────────────────────────────────────────────────────────
const servicesData = [
  {
    id: "01",
    title: "Proud of Perfection",
    description: "Slick Construction prides itself on high-end family residences and home remodels, taking your vision from bare studs to a flawless turn-key finish.",
    image: "/slick/slick-1.png",
    pointsTitle: "Key Points",
    points: [
      "Kitchen & bathroom remodels",
      "Comprehensive seismic upgrades",
      "Custom stair installation",
      "Precision window & door fitting"
    ],
    link: "/portfolio"
  },
  {
    id: "02",
    title: "Kitchen & Bathroom",
    description: "Alongside new builds and expert carpentry, we specialize in transforming kitchens and bathrooms. We guide you through everything—from choosing the perfect stone island to integrating the latest appliances.",
    image: "/slick/slick-22.png", // Explicitly requested image
    pointsTitle: "Specialties",
    points: [
      "New building construction",
      "Expert custom carpentry skills",
      "Premium stone & material selection",
      "High-end appliance integration"
    ],
    link: "/portfolio"
  },
  {
    id: "03",
    title: "The Personal Approach",
    description: "We pride ourselves on customer relationships. Dedicated 100% to each project, we resolve unexpected problems calmly and efficiently, ensuring safety and clear communication every step of the way.",
    image: "/slick/slick-14.png",
    pointsTitle: "Our Commitment",
    points: [
      "100% dedicated project management",
      "Calm & efficient problem resolution",
      "Strict safety & timeline adherence",
      "Constant communication with clients & architects"
    ],
    link: "/contact"
  }
];

// ─────────────────────────────────────────────────────────────────
// ANIMATION VARIANTS
// ─────────────────────────────────────────────────────────────────
const containerVariants : Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 },
  },
};

const itemVariants : Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
  },
};

// ─────────────────────────────────────────────────────────────────
// MAIN COMPONENT
// ─────────────────────────────────────────────────────────────────
export default function ServicesList() {
  return (
    <section className="w-full bg-[#0A0A0A] text-white py-24 md:py-32 overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        
        {/* ── SECTION HEADER ── */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-20 md:mb-32"
        >
          <h4 className="text-[#D4AF37] text-xs uppercase tracking-[0.2em] mb-4 font-mono font-bold">
            What We Do
          </h4>
          <h2 className="text-5xl md:text-7xl font-bold tracking-tight text-white leading-[1.1]">
            Our Services
          </h2>
        </motion.div>

        {/* ── SERVICES LIST ── */}
        <div className="flex flex-col gap-24 md:gap-40">
          {servicesData.map((service, index) => (
            <motion.div 
              key={service.id}
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              className="grid grid-cols-1 lg:grid-cols-[1fr_1.2fr_1fr] gap-12 lg:gap-16 items-start"
            >
              
              {/* LEFT COLUMN: Number, Title, Desc, Button */}
              <motion.div variants={itemVariants} className="flex flex-col h-full">
                <span className="text-[#D4AF37] font-mono text-xl md:text-2xl mb-6 md:mb-10">
                  {service.id}
                </span>
                
                <h3 className="text-3xl md:text-4xl font-bold tracking-tight mb-6">
                  {service.title}
                </h3>
                
                <p className="text-gray-400 text-sm md:text-base leading-relaxed mb-10 max-w-md">
                  {service.description}
                </p>
                
                <div className="mt-auto pt-4">
                  <Link 
                    href={service.link}
                    className="inline-flex items-center gap-3 bg-[#D4AF37] text-black px-6 py-3.5 text-xs font-bold font-mono uppercase tracking-widest hover:bg-white transition-colors duration-300 group"
                  >
                    Learn More
                    <ArrowUpRight size={16} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </Link>
                </div>
              </motion.div>

              {/* MIDDLE COLUMN: Image */}
              <motion.div variants={itemVariants} className="w-full">
                <div className="relative w-full aspect-[4/5] md:aspect-square overflow-hidden bg-[#141414]">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    className="object-cover transition-transform duration-[2s] hover:scale-105"
                    sizes="(max-width: 1024px) 100vw, 40vw"
                      // Prevents Next.js aggressive lazy loading blur issues
                  />
                  {/* Subtle glass overlay to blend perfectly with dark theme */}
                  <div className="absolute inset-0 bg-black/10 pointer-events-none" />
                </div>
              </motion.div>

              {/* RIGHT COLUMN: Key Points List */}
              <motion.div variants={itemVariants} className="flex flex-col lg:pl-4">
                <h4 className="text-xl md:text-2xl font-bold mb-8 tracking-tight">
                  {service.pointsTitle}
                </h4>
                
                <ul className="flex flex-col gap-6">
                  {service.points.map((point, i) => (
                    <li key={i} className="flex items-start gap-4">
                      {/* Premium Gold Checkmark Icon */}
                      <div className="w-5 h-5 rounded-full bg-[#D4AF37] text-black flex items-center justify-center shrink-0 mt-0.5 shadow-[0_0_10px_rgba(212,175,55,0.3)]">
                        <Check size={12} strokeWidth={4} />
                      </div>
                      <span className="text-gray-300 text-sm md:text-base leading-snug">
                        {point}
                      </span>
                    </li>
                  ))}
                </ul>
              </motion.div>

            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}