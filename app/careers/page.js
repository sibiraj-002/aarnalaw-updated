import React from "react";
import Banner from "@/components/Careers/Banner";
import Industries from "@/components/Careers/CareerLists";

export const metadata = {
  title:
    "Explore Career Opportunities | Aarna Law - Leading Bangalore Law Firm",
  description:
    "Join us, a dynamic law practice firm in Bangalore, and be part of our success story. Explore rewarding careers and internship opportunities with us now",
  metadataBase: new URL("https://www.aarnalaw.com"),
  alternates: {
    canonical: "/careers",
  },
  openGraph: {
    title:
      "Explore Career Opportunities | Aarna Law - Leading Bangalore Law Firm",
    description:
      "Join us, a dynamic law practice firm in Bangalore, and be part of our success story. Explore rewarding careers and internship opportunities with us now",
    url: "/careers",
    images: "/aarna-law.png",
  },
};

export default function page() {
  return (
    <>
      <Banner />
      <Industries />
    </>
  );
}
