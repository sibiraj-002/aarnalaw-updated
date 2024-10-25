"use client";
import React, { useState } from "react";
import Banner from "@/components/Publication/Banner";
import AllInsights from "@/components/Publication/AllInsights";
import Navigation from "@/components/InsightsNavigation/Navigation";

export default function AarnaPublication() {
  const [searchTerm, setSearchTerm] = useState("");
  return (
    <div>
      <Banner title="publication" />
      <Navigation searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <AllInsights searchTerm={searchTerm} />
    </div>
  );
}
