"use client";
import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import configData from "../../config.json";

function PracticeLists() {
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
        `${configData.SERVER_URL}practice-areas?_embed&status[]=publish&production_mode[]=${server}&per_page=${page}`,
      );

      const practiceAreaData = await practiceAreaResponse.json();

      if (practiceAreaData.length === 0) {
        setHasMore(false);
      } else {
        const sortedData = practiceAreaData.sort((a, b) =>
          a.title.rendered.localeCompare(b.title.rendered)
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

  return (
    <div>
      <div className="mx-auto w-11/12 py-12">
        <p className="py-4 text-center font-bold text-gray-500">
          PRACTICE AREAS
        </p>
        <p className="mx-auto text-center text-3xl lg:w-8/12">
          Our dynamic team provides experienced counsel on a diverse range of
          practice areas.
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
                    href={`/practice-areas/${items.slug}`}
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
