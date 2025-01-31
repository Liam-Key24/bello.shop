import { Roboto } from "next/font/google"
import "./globals.css"
import type React from "react" // Import React

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  variable: "--font-roboto",
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={roboto.variable}>
      <body className="font-sans bg-primary-50">{children}</body>
    </html>
  )
}

