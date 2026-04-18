import type { Metadata } from "next";
import { Inter, Fraunces } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";

const inter = Inter({
  subsets: ["latin", "latin-ext"],
  variable: "--font-inter",
});

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://allo-maison.ma"),
  title: {
    default: "Allo Maison · 1 000+ Artisans Vérifiés au Maroc | WhatsApp",
    template: "%s",
  },
  description:
    "Marketplace marocaine des services à domicile. 1 000+ pros vérifiés : plombier, électricien, ménage, peintre. Devis WhatsApp 24/7 — Casa, Rabat, Marrakech.",
  alternates: {
    canonical: "https://allo-maison.ma",
    languages: {
      "fr-MA": "https://allo-maison.ma",
      "x-default": "https://allo-maison.ma",
    },
  },
  openGraph: {
    title: "Allo Maison — 1 000+ artisans vérifiés au Maroc, devis WhatsApp 24/7",
    description:
      "La marketplace marocaine des services à domicile. Plombier, électricien, ménage, peintre : 1 000+ pros vérifiés à Casablanca, Rabat, Marrakech, Tanger. Devis gratuit WhatsApp.",
    siteName: "Allo-Maison",
    locale: "fr_MA",
    type: "website",
    url: "https://allo-maison.ma",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Allo Maison — Artisans vérifiés et certifiés depuis 2017",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/opengraph-image"],
  },
  ...(process.env.NEXT_PUBLIC_GSC_ID
    ? { other: { "google-site-verification": process.env.NEXT_PUBLIC_GSC_ID } }
    : {}),
};

const GA4_ID = process.env.NEXT_PUBLIC_GA4_ID;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" dir="ltr">
      <head>
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://images.unsplash.com" />
        <link rel="preconnect" href="https://images.unsplash.com" crossOrigin="anonymous" />
      </head>
      <body className={`${inter.variable} ${fraunces.variable} font-sans bg-cream text-ink antialiased`}>
        <a href="#main-content" className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-50 focus:px-4 focus:py-2 focus:bg-ink focus:text-cream focus:rounded-lg focus:shadow-lg">Aller au contenu principal</a>
        {GA4_ID && GA4_ID !== "G-XXXXXXXXXX" && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${GA4_ID}`}
              strategy="afterInteractive"
            />
            <Script id="ga4-init" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${GA4_ID}');
              `}
            </Script>
          </>
        )}
        <Navbar />
        <main id="main-content">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
