export const metadata = {
  title: "Legal Conversations Podcast",
  description:
    "Tune into Aarna Law's podcast for insightful conversations with legal professionals. Explore in-depth discussions on current legal issues and emerging trends.",
  metadataBase: new URL("https://www.aarnalaw.com"),
  alternates: {
    canonical: "/podcasts",
  },
  openGraph: {
    title: "Legal Conversations Podcast",
    description:
      "Tune into Aarna Law's podcast for insightful conversations with legal professionals. Explore in-depth discussions on current legal issues and emerging trends.",
    url: "/podcasts",
    images: "/aarna-law.png",
  },
};

export default function RootLayout({ children }) {
  return <>{children}</>;
}
