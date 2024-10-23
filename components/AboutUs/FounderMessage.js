import React from "react";
import Image from "next/image";

function FounderMessage() {
  return (
    <div className="mx-auto grid w-11/12 grid-cols-2 py-12">
      <div className="">
        <Image
          src="/aboutUs/founders.png"
          width={500}
          height={500}
          className="w-full"
          alt="MESSAGE FROM OUR FOUNDERS"
        />
      </div>
      <div className="flex flex-col items-start justify-center p-2 pl-12">
        <h1 class="hidden pb-4 text-2xl font-bold text-custom-red md:block">
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
            <p className="font-bold">Kamala Naganand</p> <p>MANAGING PARTNER</p>
          </div>
          <div>
            <p className="font-bold">Shreyas Jayasimha</p>{" "}
            <p>FOUNDING PARTNER</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FounderMessage;
