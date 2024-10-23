"use client";
import React, { useState } from "react";
import Banner from "@/components/Podcasts/Banner";
import AllPodCasts from "@/components/Podcasts/AllPodCasts";
import Navigation from "@/components/InsightsNavigation/Navigation";

export default function AarnaPodcast() {
  const [searchTerm, setSearchTerm] = useState("");
  return (
    <div>
      <Banner title="podcast" />
      <Navigation searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <AllPodCasts searchTerm={searchTerm} />
    </div>
  );
}
