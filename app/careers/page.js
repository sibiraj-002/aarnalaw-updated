"use client";
import React, { useEffect } from "react";
import Banner from "@/components/Careers/Banner";
import Industries from "@/components/Careers/CareerLists";
import { initFlowbite } from "flowbite";

export default function Careers() {
  useEffect(() => {
    initFlowbite(); // Initialize Flowbite after the data is loaded
  }, []);

  return (
    <>
      <Banner />
      <Industries />
    </>
  );
}
