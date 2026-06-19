import type { Metadata } from "next";
import { Lora, Inter } from "next/font/google";

import Navbar from "./Navbar";
import Footer from "./Footer";

import { cn } from "@/lib/utils";

import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

const lora = Lora({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    template: "%s | Flow Shop",
    absolute: "Flow Shop",
  },
  description: "E-commerce application for Flow Shop",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={cn(lora.className, "font-sans", inter.variable)}>
      <body>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
