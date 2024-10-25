import React from "react";
import Link from "next/link";

export default function JoinTeam() {
  return (
    <div className="mx-auto flex w-11/12 flex-col items-center py-8 lg:flex-row">
      <div className="flex flex-col justify-center lg:w-9/12">
        <p className="text-3xl font-semibold leading-normal">
          Would You Like To Join Our Team?
        </p>
        <p>
          We are an innovative organisation that empowers one another to grow
          and thrive. Integrity, efficiency, teamwork, and altruism are the
          cornerstones of our boutique practice.
        </p>
      </div>
      <div className="flex items-end justify-end pt-8 lg:w-3/12 lg:pt-0">
        <Link
          href="/careers"
          className="ml-4 rounded-lg border-2 border-custom-red bg-white px-8 py-3 font-bold text-black transition-colors duration-300 hover:bg-custom-red hover:text-white md:ml-0"
        >
          View Current Openings
        </Link>
      </div>
    </div>
  );
}
