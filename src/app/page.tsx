import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";
import HeroSection from "@/components/HeroSection";
import Navbar from "@/components/Navbar";
import ProcessSection from "@/components/ProcessSection";
import RecentProjects from "@/components/RecentProjects";
import ServicesSection from "@/components/ServicesSection";
import StatsAboutSection from "@/components/StatsAboutSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import { Stats } from "fs";
import Image from "next/image";

export default function Home() {
  return (
    <>
    
    <HeroSection />
    <StatsAboutSection />
    <ServicesSection />
    <RecentProjects />
    <CTASection />
    <ProcessSection />
    <TestimonialsSection  />
    <Footer />
    </>
  );
}
