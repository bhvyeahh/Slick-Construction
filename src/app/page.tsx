import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";
import HeroSection from "@/components/HeroSection";
// import Navbar from "@/components/Navbar";
import ProcessSection from "@/components/ProcessSection";
import PropertyListing from "@/components/PropertyListing";
import CraftsmanshipSection from "@/components/CraftsmanshipSection";
import ServicesAccordion from "@/components/ServicesAccordion";
import StatsAboutSection from "@/components/StatsAboutSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import TextRevealSection from "@/components/TextRevealSection";
import { Stats } from "fs";
import Image from "next/image";

export default function Home() {
  return (
    <>
    
    <HeroSection />
    <StatsAboutSection />
    <TextRevealSection />
    <ServicesAccordion />
    <PropertyListing />
    <CraftsmanshipSection />
    <CTASection />
    <ProcessSection />
    <TestimonialsSection  />
    <Footer />
    </>
  );
}
