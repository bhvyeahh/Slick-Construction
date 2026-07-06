import React from 'react';
import AboutHeroSection from '@/components/AboutHeroSection';

import Footer from '@/components/Footer';
import QualityMissionSection from '@/components/QualityMissionSection';
import AboutVideoSection from '@/components/AboutVideoSection';
import TrustConfidenceSection from '@/components/TrustConfidenceSection';

export default function AboutPage() {
  return (
    <main className="w-full bg-[#FDFBF7] relative selection:bg-black selection:text-white">
      <TrustConfidenceSection />
      <AboutHeroSection />
      <QualityMissionSection />
      <AboutVideoSection />
      <Footer />
    </main>
  );
}