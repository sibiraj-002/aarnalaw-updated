"use client";
import React, { useEffect } from "react";
import Image from "next/image";
import { homeBanner } from "../../utils/data";
import { initFlowbite } from "flowbite";

export default function Banner() {
  useEffect(() => {
    initFlowbite();
  });

  return (
    <div
      id="default-carousel"
      className="relative h-screen w-full"
      data-carousel="slide"
    >
      <div className="relative h-screen overflow-hidden ">
        {homeBanner.map((banner, index) => (
          <div
            key={index}
            className="relative hidden w-full  duration-700 ease-in-out"
            data-carousel-item
          >
            <Image
              src={banner.bannerUrl}
              className="absolute left-1/2 top-1/2 block h-screen w-full -translate-x-1/2 "
              alt={banner.bannerText}
              width={600}
              height={500}
            />
            <div className="absolute flex h-screen w-full flex-col items-center justify-center p-4 text-white">
              <h2 className="text-5xl font-bold">{banner.bannerText}</h2>
              <p className="w-7/12 py-8 text-xl">{banner.bannerPara}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
