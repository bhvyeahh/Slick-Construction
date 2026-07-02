import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google"; 
import "./globals.css";
import Navbar from "@/components/Navbar";
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
  // ADDED: Explicit Icon Configuration
  icons: {
    // Adding the leading slash ensures Vercel finds it in the public folder
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
        <SmoothScroll>
        <NextTopLoader
          color="#000000"     // Color of the bar
          initialPosition={0.08}
          crawlSpeed={200}
          height={3}          // Height of the bar
          crawl={true}
          showSpinner={false} // Cleaner look
          easing="ease"
          speed={200}
          shadow="0 0 10px #2299DD,0 0 5px #2299DD"
          zIndex={1600}
        />
        <Navbar /> 
        {children}
        <ScrollToTop />
        </SmoothScroll>
      </body>
    </html>
  );
}