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
    <>
      <div
        id="default-carousel"
        className="relative lg:h-screen h-[70vh] w-full "
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
                src={banner.mobileBannerUrl}
                className="absolute left-1/2 top-1/2 h-[70vh] w-full -translate-x-1/2 lg:hidden"
                alt={banner.bannerText}
                width={600}
                height={500}
              />
              <Image
                src={banner.bannerUrl}
                className="absolute left-1/2 top-1/2 h-screen w-full -translate-x-1/2 lg:block hidden"
                alt={banner.bannerText}
                width={600}
                height={500}
              />
              
              <div className="absolute flex h-screen w-full flex-col items-center justify-center p-4 text-white text-center">
                <h2 className="lg:text-5xl text-4xl font-bold">{banner.bannerText}</h2>
                <p className="lg:w-7/12 py-8 text-xl">{banner.bannerPara}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

     
    </>
  );
}
