"use client";
import React, { useRef, useState, useEffect } from "react";
import Link from "next/link";
import Credentials from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { credentials } from "../../utils/data";
import Image from "next/image";

const Podcasts = () => {
  const sliderRef = useRef(null);

  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 4,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 4,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  return (
    <div className="bg-[#EFEFEF] py-12">
      <div className="mx-auto w-11/12 ">
        <h1 className="mb-10 text-center text-2xl font-semibold text-custom-red">
          Our Credentials
        </h1>

        <Credentials
          ref={sliderRef}
          responsive={responsive}
          showDots={false}
          infinite={true}
          autoPlaySpeed={3000}
          autoPlay={true} // Control autoplay with state
          itemClass="p-1"
          keyBoardControl={true}
          removeArrowOnDeviceType={["tablet", "mobile", "desktop"]}
        >
          {credentials.map((item, index) => (
            <div
              className="inset-0 flex h-[200px] flex-col items-center justify-center"
              key={index}
            >
              <Image
                src={item.imageUrl}
                width={500}
                height={500}
                className="h-[100px] w-[200px]"
                alt={item.title}
              />
              <h2 className="font-bold">{item.title}</h2>
              <p className="text-center text-sm">{item.desc}</p>
            </div>
          ))}
        </Credentials>
      </div>
    </div>
  );
};

export default Podcasts;
