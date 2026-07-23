import type { Metadata } from "next";
import { Outfit, Inter } from "next/font/google";
import { LenisProvider } from "@/components/lenis-provider";
import { Navbar } from "@/components/navbar";
import { CustomCursor } from "@/components/cursor";
import { GamesToggle } from "@/components/games-toggle";
import { ScrollProgress } from "@/components/scroll-progress";
import { AnimatedBackground } from "@/components/animated-background";
import { LoadingScreen } from "@/components/loading-screen";
import { FloatingContactButtons } from "@/components/floating-contact-buttons";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "GMM - Great Marketing Matters",
  description: "Premium Digital Agency providing Web Dev, SEO, and Brand Marketing.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`dark ${outfit.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans bg-background text-foreground overflow-x-hidden selection:bg-primary selection:text-primary-foreground cursor-none md:cursor-auto">
        <LoadingScreen />
        <ScrollProgress />
        <AnimatedBackground />
        <CustomCursor />
        <LenisProvider>
          <Navbar />
          {children}
          <FloatingContactButtons />
          <GamesToggle />
        </LenisProvider>
      </body>
    </html>
  );
}

