export const metadata = {
  title: "Legal Insights and Expertise",
  description:
    "Stay informed with the latest legal insights and expert analyses across diverse practice areas. Explore Aarna Law's thought leadership and stay ahead in the legal landscape.",
  metadataBase: new URL("https://www.aarnalaw.com"),
  alternates: {
    canonical: "/insights",
  },
  openGraph: {
    title: "Legal Insights and Expertise",
    description:
      "Stay informed with the latest legal insights and expert analyses across diverse practice areas. Explore Aarna Law's thought leadership and stay ahead in the legal landscape.",
    url: "/insights",
    images: "/aarna-law.png",
  },
};

export default function RootLayout({ children }) {
  return <>{children}</>;
}
