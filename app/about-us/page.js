import React from "react";
import Banner from "../../components/AboutUs/Banner";
import WhatWeDo from "@/components/AboutUs/WhatWeDo";
import PracticeArea from "@/components/AboutUs/PracticeArea";
import OurLegacy from "@/components/AboutUs/OurLegacy";
import Partners from "@/components/AboutUs/Partners";
import FounderMessage from "@/components/AboutUs/FounderMessage";
import JayasimhaFoundation from "@/components/AboutUs/JayasimhaFoundation";
import JoinTeam from "@/components/AboutUs/JoinTeam";

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

export default function page() {
  return (
    <>
      <Banner />
      <WhatWeDo />
      <PracticeArea />
      <OurLegacy />
      <Partners />
      <FounderMessage />
      <JayasimhaFoundation />
      <JoinTeam />
    </>
  );
}
