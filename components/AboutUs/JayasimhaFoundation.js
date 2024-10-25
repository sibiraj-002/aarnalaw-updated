import React from "react";
import Image from "next/image";

export default function JayasimhaFoundation() {
  return (
    <div className="bg-[#151c4a]">
      <div className="mx-auto  grid w-11/12 py-12 lg:grid-cols-2">
        <div className="order-2 flex flex-col items-start justify-center lg:order-1 lg:p-12">
          <h1 className="hidden pb-2 text-2xl font-bold text-gray-300 md:block">
            JAYASIMHA FOUNDATION
          </h1>

          <p className="mt-4 py-2 text-white md:mt-0">
            Established in memory of Late Justice R Jayasimha Babu (1942-2015),
            the Jayasimha Foundation carries forward an illustrious legacy
            rooted in the pursuit of excellence through a spirit of service.
          </p>
          <p className="mt-4 py-2 text-white md:mt-0">
            The foundation embodies the guiding principles of integrity, courage
            and discipline that exemplified Justice Jayasimha Babu.
          </p>
          <p className="mt-4 py-2 text-white md:mt-0">
            Through his distinguished appointments as Judge of the High Court of
            Madras, and earlier of the High Court of Karnataka, Justice
            Jayasimha Babu delivered widely cited judgments on constitutional
            law, company and commercial law, and taxation. Further, his astute
            approach to conflict resolution as an arbitrator in domestic and
            international disputes was widely regarded in high esteem.
          </p>
          <p className="mt-4 py-2 text-white md:mt-0">
            A connoisseur of Carnatic, Hindustani and Western classical music,
            Justice Babu was keen on encouraging and empowering young talents in
            the law.
          </p>
        </div>
        <div className="order-1 lg:order-2">
          <Image
            src="/aboutUs/Jayasimha-Foundation.png"
            width={500}
            height={500}
            className="w-full"
            alt="JAYASIMHA FOUNDATION"
          />
        </div>
      </div>
    </div>
  );
}
