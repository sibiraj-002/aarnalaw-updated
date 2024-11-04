import React from "react";
import Landing from "@/components/PracticeArea/InsidePage/LandingPage";

function page({ params }) {
  return (
    <div>
      <Landing slug={params.slug} />
    </div>
  );
}

export default page;
