export const metadata = {
  title: "INSIGHTS - Aarna law",
  description:
    "News & Insights Resources INSIGHTS AARNA NEWS PUBLICATIONS PODCAST Insights",
  metadataBase: new URL("https://www.aarnalaw.com"),
  alternates: {
    canonical: "/insights",
  },
  openGraph: {
    title: "INSIGHTS - Aarna law",
    description:
      "News & Insights Resources INSIGHTS AARNA NEWS PUBLICATIONS PODCAST Insights",
    url: "/insights",
    images: "/aarna-law.png",
  },
};

export default function RootLayout({ children }) {
  return <>{children}</>;
}
