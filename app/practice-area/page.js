import React from "react";
import Banner from "@/components/PracticeArea/Banner";
import Practices from "@/components/PracticeArea/PracticeLists";

export const metadata = {
  title: "India's leading law firm offering legal counsel in practice areas",
  description:
    "We offer legal services for a range of practice areas including corporate advisory, arbitration, mediation, litigation, IP, risk assessment, and compliance",
  metadataBase: new URL("https://www.aarnalaw.com"),
  alternates: {
    canonical: "/practice-area",
  },
  openGraph: {
    title: "India's leading law firm offering legal counsel in practice areas",
    description:
      "We offer legal services for a range of practice areas including corporate advisory, arbitration, mediation, litigation, IP, risk assessment, and compliance",
    url: "/practice-area",
    images: "/aarna-law.png",
  },
};

export default function page() {
  return (
    <>
      <Banner />
      <Practices />
    </>
  );
}
