import React from "react";
import Image from "next/image";

export default function OurLegacy() {
  return (
    <>
      <div className="mx-auto  grid w-11/12 py-12 lg:grid-cols-2">
        <div className="order-2 flex flex-col items-start justify-center lg:order-1 lg:p-12">
          <h1 className="hidden text-2xl font-bold text-custom-blue md:block">
            Our Legacy
          </h1>
          <h2 className="mt-4 py-4 text-2xl font-semibold text-custom-red md:mt-0 lg:text-xl">
            Across varied domains, industries and international borders, our
            legal services and solutions maintain the highest standards of
            integrity and confidentiality.
          </h2>

          <p className="mt-4 py-2 text-custom-gray md:mt-0">
            Above all, our award-winning practice is founded on the enduring
            relationships we cultivate with every client. And, the legal and
            commercial advice we provide reflects this conscious understanding
            of our clients’ best interests.
          </p>
        </div>
        <div className="order-1 lg:order-2">
          <Image
            src="/aboutUs/OurLegacy.png"
            width={500}
            height={500}
            className="w-full"
            alt="Our Legacy"
          />
        </div>
      </div>
      <div className="mx-auto grid w-11/12 py-12 lg:grid-cols-2">
        <div className="">
          <Image
            src="/aboutUs/Whatwedo.png"
            width={500}
            height={500}
            className="w-full"
            alt="Our Legacy"
          />
        </div>
        <div className="flex flex-col items-start justify-center p-2 lg:pl-12">
          <h1 className="hidden pb-4 text-2xl font-bold text-custom-red md:block">
            What We Do
          </h1>

          <p className="mt-4 text-custom-gray md:mt-0 ">
            Our counsel-led, tech-enabled practice envisions justice as an
            essential service in this global economy of international trade and
            fluid borders.
          </p>
          <p className="mt-4 py-8 text-custom-gray md:mt-0">
            We counsel domestic, foreign, and diasporic clients on a range of
            issues. From minimizing regulatory, financial, and legal risk to
            navigating highly specialized areas of national and international
            law, we advise with uncompromising integrity.
          </p>
        </div>
      </div>
    </>
  );
}
