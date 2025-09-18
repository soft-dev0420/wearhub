import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/header/Header";
import Footer from "@/components/footer/Footer";
import NavProvider from "@/contexts/Nav";
import { AuthProvider } from "@/contexts/AuthContext";
import { LangProvider } from "@/contexts/LangContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "WearHub — the B2B marketplace for fashion",
  description: "Verified buyers & sellers, wholesale-first checkout, tiered pricing, and logistics built in. Start sourcing smarter.",
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
        <AuthProvider>
          <LangProvider>
            <NavProvider>
              <Header />
            </NavProvider>
            <div className="mt-16">
              {children}
            </div>
            <Footer />
          </LangProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
