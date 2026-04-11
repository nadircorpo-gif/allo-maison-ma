import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";

const inter = Inter({
  subsets: ["latin", "latin-ext"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://allo-maison.ma"),
  title: "allo-maison.ma — Services a domicile de confiance au Maroc",
  description:
    "Trouvez des professionnels de confiance pour tous vos services a domicile au Maroc : plomberie, electricite, menage, jardinage et plus encore.",
};

const GA4_ID = process.env.NEXT_PUBLIC_GA4_ID;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" dir="ltr">
      <body className={`${inter.variable} font-sans bg-surface text-ink antialiased`}>
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
