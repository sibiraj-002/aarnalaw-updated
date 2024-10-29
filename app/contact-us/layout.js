export const metadata = {
  title: "Contact Us | Law Firm in India - Aarna Law",
  description:
    "Get in touch with the internationally recognised law firm in India - Aarna Law. Contact us now for professional legal assistance.",
  metadataBase: new URL("https://www.aarnalaw.com"),
  alternates: {
    canonical: "/contact-us",
  },
  openGraph: {
    title: "Contact Us | Law Firm in India - Aarna Law",
    description:
      "Get in touch with the internationally recognised law firm in India - Aarna Law. Contact us now for professional legal assistance.",
    url: "/contact-us",
    images: "/aarna-law.png",
  },
};

export default function RootLayout({ children }) {
  return <>{children}</>;
}
