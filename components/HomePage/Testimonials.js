"use client";

import React, { useRef } from "react";
import InsightSlider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { testimonials } from "../../utils/data";
// import TestimonialsCard from "./TestimonialsCard";
import { leftArrow, rightArrow } from "../../utils/icons";
import Link from "next/link";
import Image from "next/image";

const Testimonials = () => {
  const sliderRef = useRef(null);

  const NextArrow = () => (
    <div
      className="cursor-pointer rounded-full bg-custom-blue p-3 text-xl text-white hover:bg-custom-red"
      onClick={() => sliderRef.current.slickNext()}
    >
      {rightArrow}
    </div>
  );

  const PrevArrow = () => (
    <div
      className="cursor-pointer rounded-full bg-custom-blue p-3 text-xl text-white hover:bg-custom-red"
      onClick={() => sliderRef.current.slickPrev()}
    >
      {leftArrow}
    </div>
  );

  var setting = {
    speed: 500,
    slidesToShow: 2,
    initialSlide: 1,
    slidesToScroll: 1,
    fade: false,
    autoplay: true,
    arrows: false,
    dots: false,

    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: false,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <>
      <div className="relative mx-auto mb-14 w-11/12">
        <h2 className="block py-5 text-center text-2xl font-semibold text-custom-blue md:hidden">
          Client’s Testimonials
        </h2>

        <div className="mr-1 flex justify-end ">
          <Image
            src="/images/quotes.svg"
            className="hidden md:block"
            width={276}
            height={215}
            alt="testimonials"
          />
        </div>
        <div className="mt-2 flex justify-between md:-mt-36">
          <div className="h-96 w-[260px] bg-custom-blue md:h-[437px] md:w-[559px]"></div>
          <div className="mr-1 space-y-6 self-end text-right md:mr-28">
            <h2 className="hidden p-2 text-xl font-semibold text-custom-blue md:block md:text-2xl">
              Client’s <br /> Testimonials
            </h2>
            <div className="flex justify-end gap-2">
              <PrevArrow />
              <NextArrow />
            </div>
          </div>
        </div>

        <div className="absolute bottom-10 w-full gap-10 md:bottom-28 md:right-[200px] md:w-3/4">
          <InsightSlider ref={sliderRef} {...setting}>
            {testimonials.map((item) => (
              <div key={item.id} className="h-full">
                <div className="mx-2 mb-10 flex h-[250px] w-auto flex-col justify-center gap-1 bg-white p-5 shadow-lg md:w-[460px]">
                  <div className="flex items-center gap-4">
                    <div className="flex-1">
                      <div className="h-32">
                        <h3 className="text-xl font-semibold text-custom-blue md:text-2xl">
                          {item.name}
                        </h3>
                        <p className="text-sm text-custom-gray md:text-lg">
                          {item.post}
                        </p>
                        <p className="text-sm text-custom-gray md:text-lg">
                          {item.desingnation}
                        </p>
                      </div>
                    </div>
                    <div className="mb-8">
                      <Image
                        src={item.imageUrl}
                        width={90}
                        height={90}
                        className="object-cover"
                        alt={item.name}
                      />
                    </div>
                  </div>
                  <div className="flex-1">
                    <p className="line-clamp-2 text-sm leading-tight text-custom-gray">
                      {item.desc}
                    </p>
                  </div>
                  <Link href="/testimonials" className="text-custom-blue">
                    Read more
                  </Link>
                </div>
              </div>
            ))}
          </InsightSlider>
        </div>
      </div>
    </>
  );
};

export default Testimonials;
