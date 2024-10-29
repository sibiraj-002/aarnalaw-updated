"use client";
import React, { useEffect } from "react";
import Banner from "../../components/AboutUs/Banner";
import WhatWeDo from "@/components/AboutUs/WhatWeDo";
import PracticeArea from "@/components/AboutUs/PracticeArea";
import OurLegacy from "@/components/AboutUs/OurLegacy";
import Partners from "@/components/AboutUs/Partners";
import FounderMessage from "@/components/AboutUs/FounderMessage";
import JayasimhaFoundation from "@/components/AboutUs/JayasimhaFoundation";
import JoinTeam from "@/components/AboutUs/JoinTeam";
import { initFlowbite } from "flowbite";

export default function AboutUs() {
  useEffect(() => {
    initFlowbite(); // Initialize Flowbite after the data is loaded
  }, []);

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
