// Import statements remain unchanged
"use client";
import React, { useRef, useState, useEffect } from "react";
import Credentials from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Link from "next/link";
import Image from "next/image";

export default function Partners() {
  const sliderRef = useRef(null);
  const [data, setData] = useState([]); // Initialize data state with an empty array
  const [loading, setLoading] = useState(true); // Loading state for skeleton

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://docs.aarnalaw.com/wp-json/wp/v2/team?_embed&per_page=100`,
        );
        const result = await response.json();
        setData(result);
        console.log("Practice area data", result);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false); // Set loading to false once data is fetched
      }
    };

    fetchData();
  }, []);

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

  const CustomRightArrow = ({ onClick, ...rest }) => {
    const {
      onMove,
      carouselState: { currentSlide, deviceType },
    } = rest;
    // onMove means if dragging or swiping in progress.
    return <button onClick={() => onClick()} />;
  };

  return (
    <div className="bg-bgDark3 py-12">
      <div className="text-center">
        <p className=" mb-4 text-2xl font-bold tracking-wider text-custom-red">
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
            autoPlay={true} // Control autoplay with state
            itemClass="p-1"
            keyBoardControl={true}
            removeArrowOnDeviceType={["tablet", "mobile"]}
            arrows={false}
            customRightArrow={<CustomRightArrow />}
          >
            {data.map((item, index) => {
              // Get the featured media URL from the embedded media if available
              const imageUrl =
                item._embedded?.["wp:featuredmedia"]?.[0]?.source_url ||
                "/default-image.jpg"; // Fallback image URL

              return (
                <div className=" bg-white p-6" key={index}>
                  <Image
                    src={imageUrl}
                    className="mx-auto size-48 rounded-full bg-[#0e1333]"
                    alt="team member"
                    width={200}
                    height={200}
                  />
                  <h2 className="mb-2 text-center text-lg font-semibold text-blue-900">
                    {item.title.rendered}
                  </h2>
                  <p className="mb-4 min-h-[40px] text-center text-sm text-black">
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
