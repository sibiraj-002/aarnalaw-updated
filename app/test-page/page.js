"use client";
import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import configData from "../../config.json";

function AllInsights() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(10);
  const [end, setEnd] = useState(false);

  const domain = typeof window !== "undefined" ? window.location.hostname : "";

  const fetchContent = useCallback(async () => {
    setLoading(true);

    try {
      let server;

      // Check if the domain is localhost for local development
      if (domain === `${configData.LIVE_SITE_URL}`) {
        server = `${configData.LIVE_PRODUCTION_SERVER_ID}`;
      } else if (domain === `${configData.STAGING_SITE_URL}`) {
        server = `${configData.STAG_PRODUCTION_SERVER_ID}`;
      } else {
        server = `${configData.STAG_PRODUCTION_SERVER_ID}`;
      }

      console.log("Using server:", server);

      const publicationsUrl = `${configData.SERVER_URL}live_staging?_embed&status[]=publish&production_mode[]=${server}&per_page=${page}`;

      console.log("Fetching publications from:", publicationsUrl);

      const publicationsResponse = await fetch(publicationsUrl);

      if (!publicationsResponse.ok) {
        console.error("Failed to fetch publications:", publicationsResponse.status);
        return;
      }

      const publicationsData = await publicationsResponse.json();

      console.log("Publications data:", publicationsData);

      if (publicationsData.length === 0) {
        setEnd(true);
      } else {
        const sortedData = publicationsData.sort(
          (a, b) => new Date(b.date) - new Date(a.date)
        );
        setData(sortedData);
        setHasMore(publicationsData.length > data.length);
      }
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  }, [page, domain, data.length]);

  useEffect(() => {
    fetchContent();
  }, [fetchContent]);

  return (
    <div className="mx-auto grid w-11/12 gap-4 py-12 lg:grid-cols-2">
      {data.map((item, index) => (
        <div
          className="flex flex-col border border-gray-200 bg-white shadow dark:border-gray-700 dark:bg-gray-800 sm:flex-row"
          key={index}
        >
          <div className="flex items-center justify-center bg-gray-300 p-5"></div>
          <div className="p-5">
            <h5
              className="mb-2 line-clamp-2 min-h-14 text-xl font-medium tracking-tight text-gray-900 dark:text-white sm:text-xl"
              dangerouslySetInnerHTML={{ __html: item.title.rendered }}
            />
            <p
              className="mb-3 min-h-20 font-normal text-gray-700 dark:text-gray-400"
              dangerouslySetInnerHTML={{
                __html: item.content.rendered,
              }}
            ></p>
            <Link
              href={`/publications/${item.slug}`}
              className="font-semibold text-custom-red"
            >
              Read more
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}

export default AllInsights;
