"use client";
import React, { useState } from "react";
import Banner from "@/components/Insights/Banner";
import AllInsights from "@/components/Insights/AllInsights";
import Navigation from "@/components/InsightsNavigation/Navigation";

export default function AarnaInsights() {
  const [searchTerm, setSearchTerm] = useState("");
  return (
    <div>
      <Banner title="insight" />
      <Navigation searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <AllInsights searchTerm={searchTerm} />
    </div>
  );
}
