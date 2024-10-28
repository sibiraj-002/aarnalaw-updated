export const metadata = {
  title: "News and Updates",
  description:
    "Keep up with the latest news and updates from Aarna Law. Discover firm announcements, key legal developments, and significant achievements in our practice.",
  metadataBase: new URL("https://www.aarnalaw.com"),
  alternates: {
    canonical: "/aarna-news",
  },
  openGraph: {
    title: "News and Updates",
    description:
      "Keep up with the latest news and updates from Aarna Law. Discover firm announcements, key legal developments, and significant achievements in our practice.",
    url: "/aarna-news",
    images: "/aarna-law.png",
  },
};

export default function RootLayout({ children }) {
  return <>{children}</>;
}
