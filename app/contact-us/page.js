import React from "react";
import Banner from "@/components/ContactUs/Banner";
import Address from "@/components/ContactUs/Address";
import ContactUs from "@/components/ContactUs/ContactForm";
import Testimonials from "@/components/ContactUs/Testimonials";

export const metadata = {
  title: "Get in Touch with Aarna Law | Trusted Bangalore-based Legal Experts",
  description:
    "Contact us, the premier Bangalore-based law firm, for expert legal assistance and guidance.",
  metadataBase: new URL("https://www.aarnalaw.com"),
  alternates: {
    canonical: "/contact-us",
  },
  openGraph: {
    title:
      "Get in Touch with Aarna Law | Trusted Bangalore-based Legal Experts",
    description:
      "Contact us, the premier Bangalore-based law firm, for expert legal assistance and guidance.",
    url: "/contact-us",
    images: "/aarna-law.png",
  },
};

function page() {
  return (
    <>
      <Banner />
      {/* <Testimonials /> */}
      <Address />
      <ContactUs />
    </>
  );
}

export default page;
