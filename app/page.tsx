import Banner from "../components/HomePage/Banner";
import Insights from "../components/HomePage/HomeInsights";
import Podcast from "../components/HomePage/PodCast";
import WhatWeDo from "../components/HomePage/WhatWeDo";
import TrackRecords from "../components/HomePage/Trackrecords";
import Testimonials from "../components/HomePage/Testimonials";
import OurCredentials from "../components/HomePage/OurCredentials";
import OurNetwork from "../components/HomePage/OurNetwork";

export default function Home() {
  return (
    <>
      <Banner />
      <Insights />
      <Podcast />
      <WhatWeDo />
      <TrackRecords />
      <Testimonials />
      <OurCredentials />
      <OurNetwork />
    </>
  );
}
