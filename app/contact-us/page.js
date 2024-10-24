import React from "react";
import Banner from "@/components/ContactUs/Banner";
import Address from "@/components/ContactUs/Address";
import ContactUs from "@/components/ContactUs/ContactForm";
import Testimonials from "@/components/ContactUs/Testimonials";

function page() {
  return (
    <>
      <Banner />
      <Testimonials />
      <Address />
      <ContactUs />
    </>
  );
}

export default page;
