"use client";
import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import configData from "../../config.json";
import debounce from "lodash.debounce";

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
      if (domain === `${configData.LIVE_SITE_URL}`) {
        server = `${configData.LIVE_PRODUCTION_SERVER_ID}`;
        // console.log("live server is working");
        // console.log("Show the Production id", `${configData.LIVE_PRODUCTION_SERVER_ID}`)
      } else if (domain === `${configData.STAGING_SITE_URL}`) {
        server = `${configData.STAG_PRODUCTION_SERVER_ID}`;
        // console.log("staging server localhost is working");
        // console.log("Show the Production id", `${configData.STAG_PRODUCTION_SERVER_ID}`)
      } else {
        server = `${configData.STAG_PRODUCTION_SERVER_ID}`;
        // console.log("staging server is working");
        // console.log("show")
      }

      const [publicationsResponse, categoriesResponse] = await Promise.all([
        fetch(
          `${configData.SERVER_URL}live_staging?_embed&status[]=publish&production_mode[]=${server}&per_page=${page}`,
        ),fetch(`${configData.SERVER_URL}live_staging`),
      ]);

      const publicationsData = await publicationsResponse.json();
      const categoriesData = await categoriesResponse.json();

      if (publicationsData.length === 0) {
        setEnd(true);
      } else {
        const sortedData = publicationsData.sort(
          (a, b) => new Date(b.date) - new Date(a.date),
        );
        setData(sortedData);
        setHasMore(categoriesData.count > data.length);
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
    fetchContent();
    debouncedFetchContent();
  }, [page, debouncedFetchContent]);

  const loadMore = () => {
    if (data.length >= categoriesData.count) {
      setEnd(true);
      setHasMore(false);
    } else {
      setPage((oldPage) => oldPage + 5);
    }
  };

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
    return (
      <div className="flex flex-row items-center gap-2 lg:flex-col lg:gap-0">
        <p className="text-2xl font-bold text-custom-red">{date.getDate()}</p>
        <p className="font-bold">{monthAbbreviations[date.getMonth()]}</p>
        <p className="font-bold">{date.getFullYear()}</p>
      </div>
    );
  };

  //   const filteredInsights = data.filter((item) =>
  //     item.title.rendered.toLowerCase().includes(searchTerm.toLowerCase()),
  //   );

  return (
    <div className="mx-auto grid w-11/12 gap-4 py-12 lg:grid-cols-2">
      {data.map((item,index) => (
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
                __html: (item.content.rendered),
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
