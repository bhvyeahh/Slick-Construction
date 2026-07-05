import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google"; 
import "./globals.css";
// Uncomment these!
// import Navbar from "@/components/Navbar";
import SmoothScroll from "@/components/SmoothScroll";
import NextTopLoader from "nextjs-toploader";
import ScrollToTop from "@/components/ScrollToTop";

// Configure Font
const spaceGrotesk = Space_Grotesk({ 
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-space" 
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
      <body className={spaceGrotesk.className}>
        <NextTopLoader
          color="#000000"     
          initialPosition={0.08}
          crawlSpeed={200}
          height={3}          
          crawl={true}
          showSpinner={false} 
          easing="ease"
          speed={200}
          shadow="0 0 10px #2299DD,0 0 5px #2299DD"
          zIndex={1600}
        />
        
        {/* Remove the comments surrounding SmoothScroll */}
        <SmoothScroll>
           
          {children}
          <ScrollToTop />
        </SmoothScroll>
        
      </body>
    </html>
  );
}