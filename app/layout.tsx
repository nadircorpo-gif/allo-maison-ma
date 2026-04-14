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
    default: "allo-maison.ma | Services à domicile de confiance au Maroc",
    template: "%s",
  },
  description:
    "Trouvez des professionnels de confiance pour tous vos services à domicile au Maroc : plomberie, électricité, ménage, peinture et plus encore.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
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
  other: {
    "google-site-verification": process.env.NEXT_PUBLIC_GSC_ID ?? "",
  },
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
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
