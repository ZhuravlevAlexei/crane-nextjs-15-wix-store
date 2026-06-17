import type { Metadata } from "next";
import { Lora, Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

const lora = Lora({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    template: "%s | Crane Shop",
    absolute: "Crane Shop",
  },
  description: "E-commerce application for Crane Shop",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={cn(lora.className, "font-sans", inter.variable)}>
      <body>{children}</body>
    </html>
  );
}
