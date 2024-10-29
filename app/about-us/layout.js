export const metadata = {
  title: "Learn About Aarna Law: Leading Legal Services in Bangalore",
  description:
    "Aarna Law: Your Go-To for Tailored Legal Solutions. Trusted Advisors Offering International Legal Expertise from India",
  metadataBase: new URL("https://www.aarnalaw.com"),
  alternates: {
    canonical: "/about-us",
  },
  openGraph: {
    title: "Learn About Aarna Law: Leading Legal Services in Bangalore",
    description:
      "Aarna Law: Your Go-To for Tailored Legal Solutions. Trusted Advisors Offering International Legal Expertise from India",
    url: "/about-us",
    images: "/aarna-law.png",
  },
};

export default function RootLayout({ children }) {
  return <>{children}</>;
}
