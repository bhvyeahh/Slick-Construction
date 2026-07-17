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
    title: "Bathroom Remodeling",
    description: "Transform your daily routine with a luxury, spa-inspired bathroom. We specialize in optimizing spatial layouts, executing flawless tilework, and installing premium fixtures to create your perfect private retreat.",
    image: "/slick/slick-22.png",
    pointsTitle: "Key Upgrades",
    points: [
      "Custom walk-in showers & wet rooms",
      "Premium tile & natural stone installation",
      "Double vanity & bespoke cabinetry",
      "High-efficiency & luxury plumbing fixtures"
    ],
    link: "/portfolio"
  },
  {
    id: "02",
    title: "Kitchen Remodeling",
    description: "The heart of your home deserves a masterfully crafted upgrade. From chef-grade appliance integration to stunning custom islands, we build breathtaking kitchens engineered for both high-end entertaining and daily family life.",
    image: "/slick/slick-37.jpg", 
    pointsTitle: "Specialties",
    points: [
      "Chef-grade appliance integration",
      "Custom islands & premium stone countertops",
      "Bespoke cabinetry & intelligent storage",
      "Architectural lighting & electrical layouts"
    ],
    link: "/portfolio"
  },
  {
    id: "03",
    title: "Custom Deck Builds",
    description: "Expand your living footprint into the outdoors with a custom-engineered deck. We design and construct durable, visually stunning outdoor platforms built to withstand the elements while providing the ultimate space for hosting.",
    image: "/slick/slick-35.jpeg",
    pointsTitle: "Capabilities",
    points: [
      "Premium composite & natural wood decking",
      "Custom railing & glass balustrade systems",
      "Multi-level & complex platform design",
      "Integrated outdoor lighting & seating"
    ],
    link: "/contact"
  },
  {
    id: "05", 
    title: "Seismic Upgrades",
    description: "Protect your investment and ensure your family's safety with professional seismic retrofitting. We reinforce your home's structural framing and foundation to withstand seismic activity, providing ultimate peace of mind and long-term stability.",
    image: "/slick/slick-40.png", // Change this number to whatever your seismic image is named
    pointsTitle: "Specialties",
    points: [
      "Foundation anchor bolts & epoxy retrofitting",
      "Plywood shear wall installation",
      "Concrete foundation reinforcement & rebar",
      "Structural frame securing & cripple wall bracing"
    ],
    link: "/portfolio"
  }
];

// ─────────────────────────────────────────────────────────────────
// ANIMATION VARIANTS (Enhanced for smooth scroll reveal)
// ─────────────────────────────────────────────────────────────────
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.25, delayChildren: 0.1 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 60, filter: "blur(4px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] },
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
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
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
          {servicesData.map((service) => (
            <motion.div 
              key={service.id}
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-150px" }} // Triggers slightly earlier for a seamless feel
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
                <div className="relative w-full aspect-[4/5] md:aspect-square overflow-hidden bg-[#141414] rounded-sm">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    className="object-cover transition-transform duration-[2s] hover:scale-105"
                    sizes="(max-width: 1024px) 100vw, 40vw"
                    
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