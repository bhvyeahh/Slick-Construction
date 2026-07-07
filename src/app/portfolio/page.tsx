import React from 'react';
import Footer from '@/components/Footer';
import PropertiesGrid from '@/components/PropertiesGrid';
import FeaturedProperties from '@/components/FeaturedProperties';
import InfinityGallery from '@/components/InfinityGallery';
export default function AboutPage() {
  return (
    <main className="w-full bg-[#FDFBF7] relative selection:bg-black selection:text-white">
      <PropertiesGrid />
      <FeaturedProperties />
      <InfinityGallery />
      <Footer />
    </main>
  );
}