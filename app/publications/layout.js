export const metadata = {
  title: "PUBLICATIONS - Aarna law",
  description:
    "News & Insights Resources INSIGHTS AARNA NEWS PUBLICATIONS PODCAST Insights",
  metadataBase: new URL("https://www.aarnalaw.com"),
  alternates: {
    canonical: "/publications",
  },
  openGraph: {
    title: "PUBLICATIONS - Aarna law",
    description:
      "News & Insights Resources INSIGHTS AARNA NEWS PUBLICATIONS PODCAST Insights",
    url: "/publications",
    images: "/aarna-law.png",
  },
};

export default function RootLayout({ children }) {
  return <>{children}</>;
}
