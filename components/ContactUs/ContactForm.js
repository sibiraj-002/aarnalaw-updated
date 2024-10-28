"use client";
import React from "react";
import ContactUs from "../../utils/HubSpotForm/ContactPartner";

export default function ContactForm() {
  return (
    <div className="mx-auto w-11/12">
      <h2 class="mb-6 text-2xl font-semibold text-custom-blue">Contact Us</h2>
      <div className="rounded-lg p-8 shadow-lg">
        <ContactUs />
      </div>
    </div>
  );
}
