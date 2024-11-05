"use client";
import React, { useState, useRef, useEffect } from "react";
import { leftArrow, rightArrow } from "../../utils/icons";
import InsightSlider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Link from "next/link";
import Image from "next/image";

export default function HomeInsights() {
  const [insightsData, setInsightsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const sliderRef = useRef(null);

  useEffect(() => {
    const fetchInsights = async () => {
      try {
        const response = await fetch(
          "https://docs.aarnalaw.com/wp-json/wp/v2/posts?_embed&categories=13",
        );
        const posts = await response.json();

        console.log("data insights", posts);

        const fetchMedia = async (mediaId) => {
          const mediaResponse = await fetch(
            `https://docs.aarnalaw.com/wp-json/wp/v2/media/${mediaId}`,
          );
          const mediaData = await mediaResponse.json();
          return mediaData.source_url;
        };

        const latestInsights = await Promise.all(
          posts
            .sort((a, b) => new Date(b.date) - new Date(a.date))
            .slice(0, 8)
            .map(async (item) => {
              const imageUrl = await fetchMedia(item.featured_media);
              return {
                ...item,
                imageUrl: imageUrl,
                title: item.title.rendered,
                desc: item.excerpt.rendered,
              };
            }),
        );

        setInsightsData(latestInsights);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchInsights();
  }, []);

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

  const settings = {
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    arrows: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
        },
      },
    ],
  };

  return (
    <div className="lg:h-[80vh]">
      <div className="z-40 flex h-[650px] flex-col bg-white lg:absolute lg:right-0 lg:-mt-20 lg:w-11/12 lg:flex-row ">
        <div className="flex justify-between lg:w-2/12">
          <div className="flex w-full items-center justify-evenly gap-7 lg:flex-col">
            <h2 className="m-0 py-5 text-2xl font-bold text-custom-red md:p-0 md:text-[80px] lg:-rotate-90">
              Insights
            </h2>
            {/* Visible only on desktop */}
            <div className="hidden gap-4 md:flex">
              <PrevArrow />
              <NextArrow />
            </div>
          </div>
        </div>
        <div className="mx-auto w-11/12 lg:w-10/12">
          {loading ? (
            <div className="grid justify-between lg:grid-cols-2">
              {[...Array(2)].map((_, index) => (
                <div key={index} className="w-full p-2">
                  <div className="mb-4 h-[300px] animate-pulse bg-gray-200"></div>
                  <div className="mb-2 h-12 animate-pulse bg-gray-200"></div>
                  <div className="h-10 animate-pulse bg-gray-200"></div>
                  <div className="h-10 animate-pulse bg-gray-200"></div>
                </div>
              ))}
            </div>
          ) : (
            <InsightSlider ref={sliderRef} {...settings}>
              {insightsData.map((item, index) => (
                <div key={index} className="w-full ">
                  <div className="lg:ms-5 lg:p-4">
                    <div className="group relative my-auto h-[450px] w-full flex-col border border-gray-200 bg-white shadow transition-colors duration-300 dark:border-gray-700 dark:bg-gray-800 md:hover:bg-custom-red md:hover:text-white lg:flex lg:h-[620px]">
                      <Image
                        src={item.imageUrl}
                        className="h-[200px] w-full object-cover md:h-[280px]"
                        alt={item.title}
                        width={600}
                        height={500}
                      />
                      <div className="flex grow flex-col items-start p-5 text-black transition-colors duration-300 md:group-hover:text-white">
                        <h5
                          className="mb-3 line-clamp-2 max-h-[4.5rem] min-h-12 overflow-hidden text-lg font-semibold text-custom-blue transition-colors duration-300 md:text-2xl md:group-hover:text-white"
                          dangerouslySetInnerHTML={{ __html: item.title }}
                        />
                        {item.desc && (
                          <p
                            className="mb-5 line-clamp-3 justify-start overflow-hidden text-left text-sm font-normal text-custom-gray transition-colors duration-300 md:text-base md:group-hover:text-white lg:mt-10"
                            dangerouslySetInnerHTML={{ __html: item.desc }}
                          />
                        )}
                        <Link
                          href={`/insights/${item.slug}`}
                          className="absolute bottom-0 left-[35%] m-5 mx-auto block border border-custom-red p-2 text-custom-red transition-colors duration-300 hover:bg-white hover:text-black md:left-5 md:mx-0 md:px-6 md:group-hover:bg-white md:group-hover:text-black"
                        >
                          View Article
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </InsightSlider>
          )}
        </div>
        {/* Mobile view navigation arrows and View All button */}
        <div className="flex items-center justify-center gap-4 pt-8 lg:hidden">
          <PrevArrow />
          <NextArrow />
        </div>
      </div>
      {/* Desktop */}
      <div className="bottom-0 flex items-end justify-center lg:h-[80vh]">
        <Link
          href="/insights"
          className="border border-custom-blue px-6 py-2 text-custom-blue md:hover:bg-custom-blue md:hover:text-white"
        >
          View all
        </Link>
      </div>
    </div>
  );
}
