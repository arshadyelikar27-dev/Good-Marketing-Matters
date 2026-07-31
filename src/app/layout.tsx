import type { Metadata } from "next";
import { Outfit, Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { LenisProvider } from "@/components/lenis-provider";
import { Navbar } from "@/components/navbar";
import { CustomCursor } from "@/components/cursor";
import { GamesToggle } from "@/components/games-toggle";
import { ScrollProgress } from "@/components/scroll-progress";
import { AnimatedBackground } from "@/components/animated-background";
import { FloatingContactButtons } from "@/components/floating-contact-buttons";
import { ScrollToTop } from "@/components/scroll-to-top";
import { CookieConsent } from "@/components/cookie-consent";
import { PageTransition } from "@/components/page-transition";
import { ModalProvider } from "@/lib/modal-context";
import { ContactModal } from "@/components/contact-modal";
import { ScheduleModal } from "@/components/schedule-modal";
import { ProjectModal } from "@/components/project-modal";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const siteUrl = "https://gmmagency.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "GMM — Good Marketing Matters | Digital Agency",
    template: "%s | GMM Agency",
  },
  description:
    "GMM is a premium digital agency delivering extraordinary brand experiences, intelligent SEO optimization, and high-converting web & mobile apps tailored for rapid business growth.",
  keywords: [
    "digital agency",
    "web development",
    "SEO optimization",
    "brand marketing",
    "mobile apps",
    "UI/UX design",
    "GMM agency",
  ],
  authors: [{ name: "GMM Agency" }],
  creator: "GMM Agency",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "GMM Agency",
    title: "GMM — Good Marketing Matters | Digital Agency",
    description:
      "Premium digital agency providing Web Development, SEO, and Brand Marketing to help businesses scale rapidly.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "GMM Agency — Good Marketing Matters",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "GMM — Good Marketing Matters | Digital Agency",
    description:
      "Premium digital agency providing Web Development, SEO, and Brand Marketing to help businesses scale rapidly.",
    images: ["/og-image.png"],
    creator: "@gmmagency",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "GMM Agency",
  description:
    "Premium digital agency providing Web Development, SEO optimization, and Brand Marketing.",
  url: siteUrl,
  logo: `${siteUrl}/favicon.ico`,
  sameAs: [],
  address: {
    "@type": "PostalAddress",
    addressCountry: "IN",
  },
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "customer service",
    availableLanguage: ["English", "Hindi"],
  },
  offers: {
    "@type": "AggregateOffer",
    description:
      "Web Development, SEO Optimization, Brand Marketing, Mobile App Development",
  },
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
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <link rel="canonical" href={siteUrl} />
      </head>
      <body className="min-h-full flex flex-col font-sans bg-background text-foreground overflow-x-hidden selection:bg-primary selection:text-primary-foreground cursor-none md:cursor-auto">
        <ScrollProgress />
        <AnimatedBackground />
        <CustomCursor />
        <PageTransition />
        <ModalProvider>
          <LenisProvider>
            <Navbar />
            {children}
            <FloatingContactButtons />
            <GamesToggle />
            <ScrollToTop />
            <CookieConsent />
          </LenisProvider>
          <ContactModal />
          <ScheduleModal />
          <ProjectModal />
        </ModalProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
