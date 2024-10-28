export const metadata = {
  title: "AARNA NEWS - Aarna law",
  description:
    "News & Insights Resources INSIGHTS AARNA NEWS PUBLICATIONS PODCAST Insights",
  metadataBase: new URL("https://www.aarnalaw.com"),
  alternates: {
    canonical: "/aarna-news",
  },
  openGraph: {
    title: "AARNA NEWS - Aarna law",
    description:
      "News & Insights Resources INSIGHTS AARNA NEWS PUBLICATIONS PODCAST Insights",
    url: "/aarna-news",
    images: "/aarna-law.png",
  },
};

export default function RootLayout({ children }) {
  return <>{children}</>;
}
