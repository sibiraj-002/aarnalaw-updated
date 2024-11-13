"use client";
import React from "react";
import Image from "next/image";
import Carousel from "react-multi-carousel";
// import "react-multi-carousel/lib/styles.css";
import { homeBanner } from "../../utils/data";

export default function Banner() {
  // Carousel responsive settings
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 1,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 1,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  return (
    <div className="relative h-[70vh] w-full lg:h-screen">
      <Carousel
        responsive={responsive}
        infinite={true}
        autoPlay={true}
        autoPlaySpeed={5000}
        keyBoardControl={true}
        showDots={false}
        arrows={false}
        className="h-full"
        containerClass="carousel-container"
      >
        {homeBanner.map((banner, index) => (
          <div key={index} className="relative w-full h-[70vh] lg:h-screen">
            {/* Mobile Banner */}
            <Image
              src={banner.mobileBannerUrl}
              alt={banner.bannerText}
              className="lg:hidden object-cover w-full h-full"
              layout="fill"
              loading="lazy"
            />
            {/* Desktop Banner */}
            <Image
              src={banner.bannerUrl}
              alt={banner.bannerText}
              className="hidden lg:block object-cover w-full h-full"
              layout="fill"
              loading="lazy"
            />
            <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center text-white bg-black bg-opacity-40">
              <h2 className="text-4xl font-bold lg:text-5xl pt-36 md:pt-0">
                {banner.bannerText}
              </h2>
              <p className="py-8 text-xl lg:w-7/12">{banner.bannerPara}</p>
            </div>
          </div>
        ))}
      </Carousel>
    </div>
  );
}
