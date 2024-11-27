// Import statements remain unchanged
"use client";
import React, { useRef, useState, useEffect, useCallback } from "react";
import Credentials from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Link from "next/link";
import Image from "next/image";
import configData from "../../config.json"; 

export default function Partners() {
  const sliderRef = useRef(null);
  const [data, setData] = useState([]); // Initialize data state with an empty array
  const [loading, setLoading] = useState(true); // Loading state for skeleton
  const [page, setPage] = useState(100);

  const domain = typeof window !== "undefined" ? window.location.hostname : "";

  const fetchContent = useCallback(async () => {
    setLoading(true);
    try {
      let server;
      if (domain === `${configData.LIVE_SITE_URL}`) {
        server = `${configData.LIVE_PRODUCTION_SERVER_ID}`;
      } else if (domain === `${configData.STAGING_SITE_URL}`) {
        server = `${configData.STAG_PRODUCTION_SERVER_ID}`;
      } else {
        server = `${configData.STAG_PRODUCTION_SERVER_ID}`;
      }

      const practiceAreaResponse = await fetch(
        `${configData.SERVER_URL}team?_embed&status[]=publish&production_mode[]=${server}&per_page=${page}`,
      );

      const practiceAreaData = await practiceAreaResponse.json();

      if (practiceAreaData.length === 0) {
        setHasMore(false);
      } else {
        const sortedData = practiceAreaData.sort(
          (a, b) => new Date(b.date) - new Date(a.date),
        );
        setData(sortedData);
        setHasMore(practiceAreaData.length === page); // Check if more pages are available
      }

      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  }, [page, domain]);

  useEffect(() => {
    fetchContent();
  }, [page, fetchContent]);

  
  
  
  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 4,
      slidesToSlide: 4,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 4,
      slidesToSlide: 4,
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

  const CustomRightArrow = ({ onClick }) => (
    <button
      onClick={onClick}
      className="absolute right-2 top-1/2 -translate-y-1/2 transform rounded-full bg-gray-200 p-2 shadow hover:bg-gray-300"
    >
      →
    </button>
  );

  const CustomLeftArrow = ({ onClick }) => (
    <button
      onClick={onClick}
      className="absolute left-2 top-1/2 -translate-y-1/2 transform rounded-full bg-gray-200 p-2 shadow hover:bg-gray-300"
    >
      ←
    </button>
  );

  return (
    <div className="bg-bgDark3 py-12">
      <div className="text-center">
        <p className="mb-4 text-2xl font-bold tracking-wider text-custom-red">
          PARTNERS
        </p>
        <p className="mx-auto mb-4 px-4 leading-normal text-white md:w-[1200px] md:text-center md:text-3xl">
          The expertise of our accomplished team anchors our practice in thought
          leadership, mentorship, and the pursuit of excellence...
        </p>
        <div className="mx-auto w-11/12 gap-4">
          <Credentials
            ref={sliderRef}
            responsive={responsive}
            showDots={false}
            infinite={true}
            autoPlaySpeed={3000}
            autoPlay={true}
            itemClass="p-1"
            keyBoardControl={true}
            // removeArrowOnDeviceType={["tablet", "mobile"]}
            customRightArrow={<CustomRightArrow />}
            customLeftArrow={<CustomLeftArrow />}
          >
            {data.map((item, index) => {
              const imageUrl =
                item._embedded?.["wp:featuredmedia"]?.[0]?.source_url ||
                "/default-image.jpg";

              return (
                <div className="bg-white p-6" key={index}>
                  <Image
                    src={imageUrl}
                    className="mx-auto size-48 rounded-full bg-[#0e1333]"
                    alt="team member"
                    width={200}
                    height={200}
                  />
                  <h2 className="mb-2 min-h-[55px] text-center text-lg font-semibold text-blue-900">
                    {item.title.rendered}
                  </h2>
                  <p className="mb-4 min-h-[60px] text-center text-sm text-black">
                    {item.acf?.designation || "Designation not available"}
                  </p>
                  <p
                    className="line-clamp-2 min-h-[50px] text-center text-base text-gray-700"
                    dangerouslySetInnerHTML={{
                      __html: item.acf?.description || "",
                    }}
                  ></p>
                  <Link
                    href={`/team/${item.slug}`}
                    className="mt-2 inline-block rounded bg-custom-red px-4 py-2 text-white hover:bg-red-800"
                  >
                    Read More
                  </Link>
                </div>
              );
            })}
          </Credentials>
        </div>
      </div>
    </div>
  );
}
