import React from 'react';
import Footer from '@/components/Footer';
import PropertiesGrid from '@/components/PropertiesGrid';
export default function AboutPage() {
  return (
    <main className="w-full bg-[#FDFBF7] relative selection:bg-black selection:text-white">
      <PropertiesGrid />
      <Footer />
    </main>
  );
}