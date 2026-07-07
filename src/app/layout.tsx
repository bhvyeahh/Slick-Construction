import type { Metadata } from "next";
// import { Manrope } from "next/font/google"; // 1. Import Manrope
import { Libre_Baskerville } from "next/font/google";
import "./globals.css";
// import Navbar from "@/components/Navbar";
import SmoothScroll from "@/components/SmoothScroll";
import NextTopLoader from "nextjs-toploader";
import ScrollToTop from "@/components/ScrollToTop";
import Navbar from "@/components/Navbar";

// 2. Configure Manrope Font
// const manrope = Manrope({ 
//   subsets: ["latin"],
//   weight: ["300", "400", "500", "600", "700", "800"],
//   variable: "--font-manrope" 
// });

const libreBaskerville = Libre_Baskerville({
  subsets: ["latin"],
  weight: ["400", "700"],
  style: ["normal", "italic"],
  variable: "--font-libre-baskerville",
});

export const metadata: Metadata = {
  title: "Slick Construction",
  description: "Slick Nick",
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
      {/* <body className={manrope.className}> */}
      <body className={libreBaskerville.className}>
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
          { <Navbar /> }
          {children}
          <ScrollToTop />
        </SmoothScroll>
        
      </body>
    </html>
  );
}