import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../assets/styles/globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AuthProvider from "@/components/AuthProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "PropertyPulse | Find The Best Rental",
  description:
    "Find the best rental or properties for you or your family or anyone else.",
  keywords:
    "Find best properties, Find best rental, Best rental, Best properties, Cheap properties",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AuthProvider>
      <html lang="en">
        <body>
          <Navbar />
          {children}
          <Footer />
        </body>
      </html>
    </AuthProvider>
  );
}
