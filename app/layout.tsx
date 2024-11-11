import type { Metadata } from "next";
import { ThemeModeScript } from "flowbite-react";
import "./globals.css";
import Header from "../components/Header/NavBar";
import Footer from "../components/Footer/Footer";
import Script from "next/script";
import ScrollToTop from "../components/ScrollToTop/ScrollToTop";

export const metadata: Metadata = {
  title: "Expert Legal Representation | Aarna Law - Advocates & Consultants",
  description:
    "Discover award-winning legal services in Bangalore. Aarna Law offers full-service representation with expertise and dedication.",
  alternates: {
    canonical: "/about-us",
  },
  openGraph: {
    title: "Expert Legal Representation | Aarna Law - Advocates & Consultants",
    description:
      "Discover award-winning legal services in Bangalore. Aarna Law offers full-service representation with expertise and dedication.",
    url: "/about-us",
    images: "/aarna-law.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.png" sizes="any" />
        <ThemeModeScript />
        <meta name="msvalidate.01" content="A827D56A91561DA21E2E94273F4D52D5" />
      </head>

      <body>
        <Header />
        {children}
        <Footer />
        <ScrollToTop />

        {/* GTM Noscript */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-WJW9WNHQ"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          ></iframe>
        </noscript>

        {/* Tracking Scripts */}
        <Script src="/tracking.js" strategy="afterInteractive" />
        <Script
          src="https://cdn.jsdelivr.net/npm/flowbite@2.5.2/dist/flowbite.min.js"
          strategy="afterInteractive"
        />
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-YWL8EWE9MB"
          strategy="afterInteractive"
          async
        />
      </body>
    </html>
  );
}
