import React from "react";
import Landing from "@/components/Industries/InsidePage/LandingPage";

function page({ params }) {
  return (
    <div>
      <Landing slug={params.slug} />
    </div>
  );
}

export default page;
