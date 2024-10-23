import React from "react";
import Image from "next/image";

const WhatWeDo = () => {
  return (
    <>
      <div className="mx-auto grid w-11/12 grid-cols-2">
        <div className="">
          <Image
            src="/whatWeDo/What_we_do.jpg"
            width={500}
            height={500}
            className="w-full"
            alt="Our Legacy"
          />
        </div>
        <div className="flex flex-col items-start justify-center p-12">
          <h1 className="hidden pb-12 text-2xl font-bold text-custom-red md:block">
            What We Do
          </h1>
          <h2 className="mt-4 py-12 text-4xl font-semibold text-custom-blue md:mt-0">
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
          <button className="mx-auto mt-4 block border border-custom-red px-6 py-2 text-custom-red hover:bg-custom-red hover:text-white md:mx-0">
            Our Services
          </button>
        </div>
      </div>

      <div className="mx-auto  grid w-11/12 grid-cols-2">
        <div className="flex flex-col items-start justify-center p-12">
          <h1 className="hidden text-2xl font-bold text-custom-blue md:block">
            Our Legacy
          </h1>
          <h2 className="mt-4 py-12 text-4xl font-semibold text-custom-blue md:mt-0">
            Founded on over nine decades of commitment and service
          </h2>
          <p className="mt-4 text-custom-gray md:mt-0 ">
            Across varied domains, industries, and international borders, our
            legal services and solutions are tailor-made to represent our
            clients’ best interests without compromising on our principles of
            natural law, justice, and compassion.
          </p>
          <p className="mt-4 py-8 text-custom-gray md:mt-0">
            We counsel domestic, foreign, and diasporic clients on a range of
            issues. From minimizing regulatory, financial, and legal risk to
            navigating highly specialized areas of national and international
            law, we advise with uncompromising integrity.
          </p>
          <button className="mx-auto mt-4 border border-custom-blue px-4 py-2 text-custom-blue hover:bg-custom-blue hover:text-white md:mx-0 md:mt-0">
            Our Firm
          </button>
        </div>
        <div className="">
          <Image
            src="/whatWeDo/What_we_do.jpg"
            width={500}
            height={500}
            className="w-full"
            alt="Our Legacy"
          />
        </div>
      </div>
    </>
  );
};

export default WhatWeDo;
