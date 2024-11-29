"use client";
import React from "react";
import Image from "next/image";
import Carousel from "react-multi-carousel";
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
          <div key={index} className="relative h-[70vh] w-full lg:h-screen">
            {/* Mobile Banner */}
            {index === 0 ? (
              <Image
                src={banner.mobileBannerUrl}
                alt={banner.bannerText}
                className="h-full w-full object-cover lg:hidden"
                priority // High priority for the first image
                width={768}
                height={512} // Provide explicit dimensions
              />
            ) : (
              <Image
                src={banner.mobileBannerUrl}
                alt={banner.bannerText}
                className="h-full w-full object-cover lg:hidden"
                loading="lazy"
                width={768}
                height={512}
              />
            )}
            {/* Desktop Banner */}
            {index === 0 ? (
              <Image
                src={banner.bannerUrl}
                alt={banner.bannerText}
                className="hidden h-full w-full object-cover lg:block"
                priority // High priority for the first image
                width={1920}
                height={1080} // Provide explicit dimensions
              />
            ) : (
              <Image
                src={banner.bannerUrl}
                alt={banner.bannerText}
                className="hidden h-full w-full object-cover lg:block"
                loading="lazy"
                width={1920}
                height={1080}
              />
            )}
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-40 p-4 text-center text-white">
              <h2 className="pt-36 text-4xl font-bold md:pt-0 lg:text-5xl">
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
