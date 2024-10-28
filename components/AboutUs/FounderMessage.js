import React from "react";
import Image from "next/image";

function FounderMessage() {
  return (
    <div className="mx-auto grid w-11/12 py-12 lg:grid-cols-2">
      <div className="flex flex-col items-start justify-center p-2 lg:hidden lg:pl-12">
        <div className="">
          <Image
            src="/images/quote-png.png"
            width={100}
            height={100}
            className="h-[30px] w-full lg:-mt-10"
            alt="MESSAGE FROM OUR FOUNDERS"
          />
        </div>
        <h1 className="pb-4 text-xl font-bold text-custom-blue lg:text-2xl">
          MESSAGE FROM OUR FOUNDERS
        </h1>
      </div>
      <div className="">
        <Image
          src="/aboutUs/founders.png"
          width={500}
          height={500}
          className="w-full"
          alt="MESSAGE FROM OUR FOUNDERS"
        />
      </div>
      <div className="flex flex-col items-start justify-center p-2 lg:pl-12">
        <div className="hidden lg:block">
          <Image
            src="/images/quote-png.png"
            width={100}
            height={100}
            className="h-[30px] w-full lg:-mt-10"
            alt="MESSAGE FROM OUR FOUNDERS"
          />
        </div>
        <h1 className="hidden pb-4 text-xl font-bold text-custom-blue lg:block lg:text-2xl">
          MESSAGE FROM OUR FOUNDERS
        </h1>

        <p className="mt-4 text-custom-gray md:mt-0 ">
          We are very grateful for having had the privilege of serving clients
          across industries, small medium and large, and to have been on the
          counsel for the Republic of India. We humbly acknowledge the blessings
          and tall shoulders of previous generations. The deep values they have
          instilled continue to inspire us to create a platform that brings out
          the best versions of our selves collectively, while we seek to serve
          our clients and further the cause of justice
        </p>
        <div className="flex w-full justify-between py-8">
          <div>
            <p className="font-bold text-custom-blue">Kamala Naganand</p>{" "}
            <p>MANAGING PARTNER</p>
          </div>
          <div>
            <p className="font-bold text-custom-blue">Shreyas Jayasimha</p>{" "}
            <p>FOUNDING PARTNER</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FounderMessage;
