"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

function PracticeLists() {
  const [data, setData] = useState([]); // Initialize data state with an empty array
  const [loading, setLoading] = useState(true); // Loading state for skeleton

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://docs.aarnalaw.com/wp-json/wp/v2/industries?_embed&per_page=100`,
        );
        const result = await response.json();

        // console.log("Practice area data", result);

        // Ensure the response is an array before setting the data
        if (Array.isArray(result)) {
          // Sort the data alphabetically by title
          const sortedData = result.sort((a, b) => {
            const titleA = a.title.rendered.toLowerCase(); // Convert to lowercase for case-insensitive comparison
            const titleB = b.title.rendered.toLowerCase();
            return titleA.localeCompare(titleB); // Compare titles
          });
          setData(sortedData);
        } else {
          console.error("Expected an array but got:", result);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false); // Set loading to false once data is fetched
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <div className="mx-auto w-11/12 py-12">
        <p className="py-4 text-center font-bold text-gray-500">
          INDUSTRIES WE SERVE
        </p>
        <p className="mx-auto text-center text-3xl lg:w-8/12">
          Our progressive practice provides expert assistance to clients across
          industry.
        </p>
        <div className="grid gap-4 pt-12 lg:grid-cols-4">
          {loading
            ? // Render skeletons while loading
              [...Array(12)].map((_, index) => (
                <div key={index} className="animate-pulse">
                  <div className="h-[200px] w-full bg-gray-300"></div>
                  <div className="h-[65px] bg-[#233876]"></div>
                </div>
              ))
            : // Render actual data once loaded
              data.map((items, index) => (
                <div className="group" key={index}>
                  <div className="overflow-hidden">
                    <Image
                      src={items.acf.banner_image.url}
                      width={400}
                      height={400}
                      className="h-[200px] w-full transition-transform duration-500 ease-in-out group-hover:scale-110"
                      alt={items.title.rendered}
                    />
                  </div>
                  <Link
                    href={`/industries/${items.slug}`}
                    className="flex h-[65px] items-center justify-center bg-[#233876] p-1 text-center font-semibold text-white"
                  >
                    <p
                      dangerouslySetInnerHTML={{ __html: items.title.rendered }}
                    />
                  </Link>
                </div>
              ))}
        </div>
      </div>
    </div>
  );
}

export default PracticeLists;
