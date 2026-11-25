import React from "react";
import type { Metadata } from "next";
import { Playfair_Display, Inter, DM_Sans } from "next/font/google";
import "./globals.css";

import Providers from "./providers";
import { Navbar } from "./components/layout/Navbar";
import { Footer } from "./components/layout/Footer";
import { BackgroundBlobs } from "./components/layout/BackgroundBlobs";

const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-playfair",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-dm-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Bello - Sustainable Kitchen Essentials",
  description: "Discover sustainable kitchen essentials designed to elevate your everyday life while caring for the planet.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body
        className={`${playfairDisplay.variable} ${inter.variable} ${dmSans.variable} font-body antialiased`}
      >
        <BackgroundBlobs />
        <Providers>
          <Navbar />
          <main>
            {children}
          </main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
