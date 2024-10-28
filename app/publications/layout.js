export const metadata = {
  title: "Legal Publications and Research",
  description:
    "Access a comprehensive collection of legal publications and research papers authored by Aarna Law's experts. Stay up-to-date with cutting-edge legal scholarship.",
  metadataBase: new URL("https://www.aarnalaw.com"),
  alternates: {
    canonical: "/publications",
  },
  openGraph: {
    title: "Legal Publications and Research",
    description:
      "Access a comprehensive collection of legal publications and research papers authored by Aarna Law's experts. Stay up-to-date with cutting-edge legal scholarship.",
    url: "/publications",
    images: "/aarna-law.png",
  },
};

export default function RootLayout({ children }) {
  return <>{children}</>;
}
