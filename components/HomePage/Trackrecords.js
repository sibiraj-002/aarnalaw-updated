"use client";
import React from "react";
import CountUp from "react-countup";

export default function Trackrecords() {
  return (
    <div className="py-12">
      <div className="mx-auto w-11/12">
        <h1 class="text-center text-2xl font-semibold text-custom-red">
          Our Track Record by Numbers
        </h1>
        <div className="grid grid-cols-3 py-12">
          <div className="text-center text-5xl text-custom-blue">
            <CountUp start={1} end={100} duration={2.75} suffix=" +"></CountUp>
            <p class="text-center text-xl text-custom-gray">
              Years of Our Legacy
            </p>
          </div>
          <div className="text-center text-5xl text-custom-blue">
            <CountUp start={1} end={1500} duration={2.75} suffix=" +"></CountUp>
            <p class="text-center text-xl text-custom-gray">Clients Served</p>
          </div>
          <div className="text-center text-5xl text-custom-blue">
            <CountUp
              start={1}
              end={6}
              duration={2.75}
              decimal=","
              prefix="$ "
              suffix=" billion+"
            ></CountUp>
            <p class="text-center text-xl text-custom-gray">
              of Disputes Resolved
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
