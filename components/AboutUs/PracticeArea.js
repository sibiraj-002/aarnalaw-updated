"use client";
import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { practiceArea } from "../../utils/data";
import configData from "../../config.json";

export default function PracticeArea() {
  const [data, setData] = useState([]); // Initialize data state with an empty array
  const [loading, setLoading] = useState([]); // Initialize data state with an empty array
  const [page, setPage] = useState(100);

  const domain = typeof window !== "undefined" ? window.location.hostname : "";

  const fetchContent = useCallback(async () => {
    setLoading(true);
    try {
      // Determine the server ID based on the domain
      let server;
      if (domain === `${configData.LIVE_SITE_URL}`) {
        server = `${configData.LIVE_PRODUCTION_SERVER_ID}`;
      } else if (domain === `${configData.STAGING_SITE_URL}`) {
        server = `${configData.STAG_PRODUCTION_SERVER_ID}`;
      } else {
        server = `${configData.STAG_PRODUCTION_SERVER_ID}`;
      }
  
      // Fetch data from the API
      const response = await fetch(
        `${configData.SERVER_URL}practice-areas?_embed&status[]=publish&production_mode[]=${server}&per_page=${page}`,
      );
      const result = await response.json();
  
      // Check if the response contains data
      if (Array.isArray(result)) {
        // Sort the data alphabetically by title
        const sortedData = result.sort((a, b) => {
          const titleA = a.title.rendered.toLowerCase(); // Case-insensitive comparison
          const titleB = b.title.rendered.toLowerCase();
          return titleA.localeCompare(titleB);
        });
  
        setData(sortedData);
        setHasMore(result.length === page); // Determine if more pages are available
      } else {
        console.error("Expected an array but got:", result);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false); // Set loading to false after the process
    }
  }, [page, domain]);
  

  useEffect(() => {
    fetchContent();
  }, [page, fetchContent]);



  return (
    <div className="bg-[#151C4A] py-12">
      <div className="mx-auto w-10/12">
        <h2 className="mb-12 text-center text-3xl font-bold text-white">
          Practice Areas
        </h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {data.map((item, index) => (
            <div
              key={index}
              className=" bg-white lg:p-1 p-4 text-black hover:text-custom-red"
            >
              <Link href={`/practice-area/${item.slug}`}>
                <p
                  dangerouslySetInnerHTML={{ __html: item.title.rendered }} className="font-semibold lg:font-normal"
                ></p>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
