import React from "react";
import Banner from "@/components/Industries/Banner";
import Industries from "@/components/Industries/IndustryLists";

export const metadata = {
  title: "Industry-Specific Legal Solutions | Aarna Law",
  description:
    "We offer tailored legal services for diverse industries, addressing unique needs across sectors with specialized expertise.",
  metadataBase: new URL("https://www.aarnalaw.com"),
  alternates: {
    canonical: "/industries",
  },
  openGraph: {
    title: "Industry-Specific Legal Solutions | Aarna Law",
    description:
      "We offer tailored legal services for diverse industries, addressing unique needs across sectors with specialized expertise.",
    url: "/industries",
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
