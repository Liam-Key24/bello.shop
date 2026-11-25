import React from "react";
import type { Metadata } from "next";
import { Young_Serif, Nunito_Sans } from "next/font/google";
import "./globals.css";

import Providers from "./providers";
import { Navbar } from "./components/layout/Navbar";
import { Footer } from "./components/layout/Footer";
import { BackgroundBlobs } from "./components/layout/BackgroundBlobs";
import { DecorativeLines } from "./components/layout/DecorativeLines";
import { DecorativeSparkles } from "./components/layout/DecorativeSparkles";

const youngSerif = Young_Serif({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-young-serif",
  display: "swap",
});

const nunitoSans = Nunito_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-nunito-sans",
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
    <html
      lang="en"
      className={`h-full ${youngSerif.variable} ${nunitoSans.variable}`}
    >
      <body className="font-body antialiased">
        <BackgroundBlobs />
        <DecorativeLines />
        <DecorativeSparkles />
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
