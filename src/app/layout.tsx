import type { Metadata } from "next";
import { Manrope } from "next/font/google"; // 1. Import Manrope
import "./globals.css";
// import Navbar from "@/components/Navbar";
import SmoothScroll from "@/components/SmoothScroll";
import NextTopLoader from "nextjs-toploader";
import ScrollToTop from "@/components/ScrollToTop";

// 2. Configure Manrope Font
const manrope = Manrope({ 
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-manrope" 
});

export const metadata: Metadata = {
  title: "Pivotal Builders",
  description: "Your pivotal partner in building what matters.",
  icons: {
    icon: "/icon.png", 
    shortcut: "/icon.png",
    apple: "/icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      {/* 3. Apply Manrope to the body */}
      <body className={manrope.className}>
        <NextTopLoader
          color="#D4AF37"     // Updated to premium gold
          initialPosition={0.08}
          crawlSpeed={200}
          height={3}          
          crawl={true}
          showSpinner={false} 
          easing="ease"
          speed={200}
          shadow="0 0 10px #D4AF37,0 0 5px #D4AF37" // Updated shadow to gold
          zIndex={1600}
        />
        
        <SmoothScroll>
          {/* <Navbar />  */}
          {children}
          <ScrollToTop />
        </SmoothScroll>
        
      </body>
    </html>
  );
}