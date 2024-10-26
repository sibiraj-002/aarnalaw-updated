import React from "react";
import Image from "next/image";
import Link from "next/link";

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
            alt="Our Legacy"
          />
        </div>
        <div className="flex flex-col items-start justify-center lg:px-8">
          <h1 className="pb-1 text-2xl font-bold text-custom-red mt-4 lg:mt-0">
            What We Do
          </h1>
          <h2 className="lg:mt-4 py-8 text-2xl font-semibold text-custom-blue md:mt-0 lg:text-4xl">
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
          <Link
            href="/practice-area"
            className="mx-auto mt-4 block border border-custom-red px-6 py-2 text-custom-red hover:bg-custom-red hover:text-white md:mx-0"
          >
            Our Services
          </Link>
        </div>
      </div>

      <div className="mx-auto  grid w-11/12 lg:grid-cols-2">
        <div className="order-2 flex flex-col items-start justify-center lg:order-1 lg:p-12">
          <h1 className="text-2xl font-bold text-custom-blue mt-4 lg:mt-0">
            Our Legacy
          </h1>
          <h2 className="lg:mt-4 py-12 text-2xl font-semibold text-custom-blue md:mt-0 lg:text-4xl">
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
          <Link
            href="/about-us"
            className="mx-auto mt-4 border border-custom-blue px-4 py-2 text-custom-blue hover:bg-custom-blue hover:text-white md:mx-0 md:mt-0"
          >
            Our Firm
          </Link>
        </div>
        <div className="order-1">
          <Image
            src="/whatWeDo/Our_legacy.jpg"
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
