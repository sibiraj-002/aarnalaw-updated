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
      </head>

      <body>
        <Header />
        {children}
        <Footer />
        <ScrollToTop />
      </body>
      <Script src="/tracking.js" />
      <Script src="https://cdn.jsdelivr.net/npm/flowbite@2.5.2/dist/flowbite.min.js"></Script>
      <Script id="gtm-ns" strategy="afterInteractive">
        {`
          <noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-WJW9WNHQ"
          height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
        `}
      </Script>
      <Script
        async
        src="https://www.googletagmanager.com/gtag/js?id=G-YWL8EWE9MB"
      ></Script>
    </html>
  );
}
