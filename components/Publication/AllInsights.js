"use client";
import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import configData from "../../config.json";
import debounce from "lodash.debounce";

function AllInsights({ searchTerm }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(6); // Start with 6 items
  const [error, setError] = useState(null); // New state for error handling

  const domain = typeof window !== "undefined" ? window.location.hostname : "";

  const fetchContent = useCallback(async () => {
    setLoading(true);
    setError(null); // Reset the error state before each fetch

    try {
      let server;
      if (domain === `${configData.LIVE_SITE_URL}` || domain === `${configData.LIVE_SITE_URL_WWW}`) {
        server = `${configData.LIVE_PRODUCTION_SERVER_ID}`;
      } else if (domain === `${configData.STAGING_SITE_URL}`) {
        server = `${configData.STAG_PRODUCTION_SERVER_ID}`;
      } else {
        server = `${configData.STAG_PRODUCTION_SERVER_ID}`;
      }

      const publicationsResponse = await fetch(
        `${configData.SERVER_URL}publications?_embed&status[]=publish&production_mode[]=${server}`
      );

      if (!publicationsResponse.ok) {
        throw new Error("Failed to fetch data");
      }

      const publicationsData = await publicationsResponse.json();
      const sortedData = publicationsData.sort(
        (a, b) => new Date(b.date) - new Date(a.date)
      );
      setData(sortedData);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
      setError("Something went wrong. Please try again later.");
    }
  }, [domain]);

  useEffect(() => {
    fetchContent();
  }, [fetchContent]);

  const loadMore = () => {
    if (data.length > page) {
      setPage((prevPage) => prevPage + 6);
    }
  };

  const formatDateString = (dateString) => {
    const date = new Date(dateString);
    const monthAbbreviations = [
      "JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"
    ];
    return (
      <div className="flex flex-row items-center gap-2 lg:flex-col lg:gap-0">
        <p className="text-2xl font-bold text-custom-red">{date.getDate()}</p>
        <p className="font-bold">{monthAbbreviations[date.getMonth()]}</p>
        <p className="font-bold">{date.getFullYear()}</p>
      </div>
    );
  };

  const stripHTMLAndLimit = (htmlContent) => {
    const text = htmlContent.replace(/<\/?[^>]+(>|$)/g, "");
    return text.length > 180 ? text.substring(0, 180) + "..." : text;
  };

  const SkeletonLoader = () => (
    <div className="flex animate-pulse border border-gray-200 bg-white p-5 shadow dark:border-gray-700 dark:bg-gray-800">
      <div className="flex h-[200px] w-full items-center justify-center bg-gray-300 p-5">
        <div className="mb-2 h-4 w-1/4 rounded bg-gray-400" />
        <div className="h-4 w-1/4 rounded bg-gray-400" />
      </div>
      <div>
        <div className="mb-2 h-6 w-3/4 rounded bg-gray-400" />
        <div className="h-4 w-full rounded bg-gray-400" />
      </div>
    </div>
  );

  const filteredInsights = data
    .filter((item) =>
      item.title.rendered.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .slice(0, page); // Show only up to the current page count

  return (
    <div className="mx-auto grid w-11/12 gap-4 py-12 lg:grid-cols-2">
      {loading && filteredInsights.length === 0 ? (
        Array.from({ length: 6 }).map((_, index) => (
          <SkeletonLoader key={index} />
        ))
      ) : error ? (
        <div className="col-span-1 mt-4 text-center text-red-500 md:col-span-2">
          {error}
        </div>
      ) : filteredInsights.length > 0 ? (
        filteredInsights.map((item, index) => (
          <div
            className="flex flex-col border border-gray-200 bg-white shadow dark:border-gray-700 dark:bg-gray-800 sm:flex-row"
            key={index}
          >
            <div className="flex items-center justify-center bg-gray-300 p-5">
              {formatDateString(item.date)}
            </div>
            <div className="p-5">
              <h5
                className="mb-2 line-clamp-2 min-h-14 text-xl font-medium tracking-tight text-gray-900 dark:text-white sm:text-xl"
                dangerouslySetInnerHTML={{ __html: item.title.rendered }}
              />
              <p
                className="mb-3 min-h-20 font-normal text-gray-700 dark:text-gray-400"
                dangerouslySetInnerHTML={{
                  __html: stripHTMLAndLimit(item.content.rendered),
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
        ))
      ) : (
        <div className="col-span-1 mt-4 text-center text-gray-500 md:col-span-2">
          No related post found
        </div>
      )}

      {!loading && data.length > page && (
        <div className="col-span-1 mt-6 flex justify-center md:col-span-2">
          <button
            onClick={loadMore}
            className="bg-custom-red px-4 py-2 text-white"
          >
            Load More
          </button>
        </div>
      )}

      {!loading && data.length <= page && (
        <div className="col-span-1 mt-4 text-center text-gray-500 md:col-span-2">
          No more details available
        </div>
      )}
    </div>
  );
}


export default AllInsights;
