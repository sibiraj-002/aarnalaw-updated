"use client";
import React, { useEffect } from "react";
import Image from "next/image";
import { homeBanner } from "../../utils/data";
import { initFlowbite } from "flowbite";

export default function Banner() {
  useEffect(() => {
    initFlowbite();
  }, []);

  return (
    <div
      id="default-carousel"
      className="relative h-[70vh] w-full lg:h-screen"
      data-carousel="slide"
    >
      <div className="relative h-screen overflow-hidden">
        {homeBanner.map((banner, index) => (
          <div
            key={index}
            className={`relative w-full duration-700 ease-in-out ${
              index === 0 ? "block" : "hidden"
            }`}
            data-carousel-item
          >
            {/* Mobile Banner */}
            <Image
              src={banner.mobileBannerUrl}
              className="absolute left-1/2 top-1/2 h-[70vh] w-full -translate-x-1/2 lg:hidden"
              alt={banner.bannerText}
              width={600}
              height={500}
            />
            {/* Desktop Banner */}
            <Image
              src={banner.bannerUrl}
              className="absolute left-1/2 top-1/2 hidden h-screen w-full -translate-x-1/2 lg:block"
              alt={banner.bannerText}
              width={600}
              height={500}
            />

            <div className="absolute flex h-screen w-full flex-col items-center justify-center p-4 text-center text-white">
              <h2 className="text-4xl font-bold lg:text-5xl">
                {banner.bannerText}
              </h2>
              <p className="py-8 text-xl lg:w-7/12">{banner.bannerPara}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
