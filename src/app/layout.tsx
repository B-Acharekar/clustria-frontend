import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ToastContainer } from "@/components/ui/Toast"; // path to your Toast.tsx

import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Clustria – Personalised Storage & AI Organising App",
  description:
    "Clustria is your smart, personalised storage and AI-powered organising app. Seamlessly manage, categorise, and access your files with intelligent automation.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <ToastContainer />
      </body>
    </html>
  );
}
