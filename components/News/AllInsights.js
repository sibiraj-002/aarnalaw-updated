"use client";
import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { initFlowbite } from "flowbite";
import debounce from "lodash.debounce";
import configData from "../../config.json";

const domain = typeof window !== "undefined" ? window.location.hostname : "";

function AllNews({ searchTerm }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(6);
  const [hasMore, setHasMore] = useState(true);

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
  
      const response = await fetch(
        `${configData.SERVER_URL}posts?_embed&categories[]=9&status[]=publish&production_mode[]=${server}&per_page=${page}`
      );
      const newsData = await response.json();
  
      if (newsData.length === 0) {
        setHasMore(false);
      } else {
        const enrichedData = newsData.map((item) => {
          const featuredImage =
            item._embedded?.['wp:featuredmedia']?.[0]?.source_url;
          return {
            ...item,
            featured_image_url: featuredImage || null,
          };
        });
        const sortedData = enrichedData.sort(
          (a, b) => new Date(b.date) - new Date(a.date)
        );
        setData(sortedData);
        setHasMore(sortedData.length === page);
      }
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  }, [page]);
  

  const debouncedFetchContent = useCallback(debounce(fetchContent, 500), [
    page,
  ]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      initFlowbite();
    }
  }, []);

  useEffect(() => {
    fetchContent();
    debouncedFetchContent();
  }, [page, debouncedFetchContent]);

  const formatDateString = (dateString) => {
    const date = new Date(dateString);
    const monthAbbreviations = [
      "JAN",
      "FEB",
      "MAR",
      "APR",
      "MAY",
      "JUN",
      "JUL",
      "AUG",
      "SEP",
      "OCT",
      "NOV",
      "DEC",
    ];
    const day = date.getDate();
    const month = monthAbbreviations[date.getMonth()];
    const year = date.getFullYear();
    return `${day}\n${month}\n${year}`;
  };

  const stripHTMLAndLimit = (htmlContent) => {
    const text = htmlContent.replace(/<\/?[^>]+(>|$)/g, "");
    return text.length > 300 ? text.substring(0, 300) + "..." : text;
  };

  const SkeletonLoader = () => (
    <div className="flex w-full animate-pulse border border-gray-200 bg-white p-5 shadow dark:border-gray-700 dark:bg-gray-800">
      <div className="flex h-[200px] w-full items-center justify-center rounded-lg bg-gray-300 md:h-[400px]"></div>
      <div className="mt-4 space-y-2">
        <div className="h-6 w-3/4 rounded bg-gray-400" />
        <div className="h-4 w-full rounded bg-gray-400" />
      </div>
    </div>
  );

  const loadMorePosts = () => setPage((prevPage) => prevPage + 6);

  const filteredInsights = data.filter((data) =>
    data.title.rendered.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-4 md:p-8 lg:p-12">
      <div className="mx-auto grid grid-cols-1 gap-4 p-4 lg:grid-cols-2 lg:p-0">
        {loading && filteredInsights.length === 0 ? (
          Array.from({ length: 4 }).map((_, index) => (
            <SkeletonLoader key={index} />
          ))
        ) : filteredInsights.length > 0 ? (
          filteredInsights.map((items) => (
            <div
              className="rounded-lg border border-gray-200 bg-white shadow dark:border-gray-700 dark:bg-gray-800"
              key={items.id}
            >
              <a href="#">
                {items.featured_image_url ? (
                  <Image
                    src={items.featured_image_url}
                    alt={items.title.rendered}
                    className="h-[200px] w-full rounded-t-lg object-cover md:h-[300px]"
                    width={500}
                    height={300}
                  />
                ) : (
                  <div className="h-[300px] w-full rounded-t-lg bg-gray-200">
                    <Image
                      src="/PracticeArea/Aarna-Law-Banner-img.png" // Path to your default image
                      alt="Default Image"
                      className="h-full w-full object-cover"
                      width={500}
                      height={300}
                    />
                  </div>
                )}
              </a>

              <div className="p-5">
                <h5
                  className="mb-2 min-h-20 text-lg font-bold tracking-tight text-gray-900 dark:text-white md:text-xl"
                  dangerouslySetInnerHTML={{ __html: items.title.rendered }}
                ></h5>

                <p
                  className="mb-3 min-h-28 text-sm font-normal text-gray-700 dark:text-gray-400 md:h-20"
                  dangerouslySetInnerHTML={{
                    __html: stripHTMLAndLimit(items.excerpt.rendered),
                  }}
                ></p>
                <p className="pb-4 text-xs text-gray-500 md:text-sm">
                  {formatDateString(items.date)}
                </p>
                <Link
                  href={`/aarna-news/${items.slug}`}
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

        {/* Load More Button */}
        {!loading && data.length >= 6 && hasMore && (
          <div
            className={`col-span-1 mt-6 justify-center md:col-span-2 ${
              filteredInsights.length === 0 ? "hidden" : "flex"
            }`}
          >
            <button
              onClick={loadMorePosts}
              className="bg-custom-red px-4 py-2 text-white"
            >
              Load More
            </button>
          </div>
        )}

        {/* No More Details Message */}
        {!loading && (!hasMore || data.length < 6) && (
          <div className="col-span-1 mt-4 text-center text-gray-500 md:col-span-2">
            No more details available
          </div>
        )}
      </div>
    </div>
  );
}

export default AllNews;
