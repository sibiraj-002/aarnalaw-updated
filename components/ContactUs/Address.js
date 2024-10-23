import React from "react";
import Link from "next/link";
import { contactAddress } from "@/utils/data";
import { location, phone } from "@/utils/icons";

function Address() {
  return (
    <>
      <div className="mx-auto w-11/12 py-12">
        <p class="font-montserrat mb-4 border-b-2 border-[#EE3C23] pb-[15px] text-left text-[26px] font-semibold leading-normal tracking-[1.6px] text-[#1C386A]">
          Aarna Law
        </p>
        <div className="grid grid-cols-3 gap-10">
          {contactAddress.map((items, index) => (
            <div className="rounded-lg bg-white p-8 shadow-lg" key={index}>
              <h2 className="text-xl font-bold">{items.location}</h2>
              <p className="flex gap-2 py-2">
                {location} {items.address}
              </p>
              <p className="flex items-center gap-2 py-2">
                {phone}
                {items.phone}
              </p>
              <Link href={items.direction} className="text-custom-red">
                Get direction
              </Link>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Address;
