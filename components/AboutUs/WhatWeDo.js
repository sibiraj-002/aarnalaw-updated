import React from "react";
import Image from "next/image";

const WhatWeDo = () => {
  return (
    <>
      <div className="mx-auto grid w-11/12 py-12 lg:grid-cols-2">
        <div className="">
          <Image
            src="/whatWeDo/What_we_do.jpg"
            width={500}
            height={500}
            className="w-full"
            alt="What We Do"
          />
        </div>
        <div className="flex flex-col items-start justify-center p-2 lg:pl-12">
          <h1 className="hidden pb-4 text-2xl font-bold text-custom-red md:block">
            What We Do
          </h1>
          <h2 className="mt-4 py-4 text-4xl font-semibold text-custom-blue md:mt-0">
            We are an award-winning advisory with an international perspective.
          </h2>
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
};

export default WhatWeDo;
