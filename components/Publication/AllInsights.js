"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";

function AllInsights({ searchTerm }) {
  const [data, setData] = useState([]); // Initialize data state with an empty array
  const [loading, setLoading] = useState(true); // Initialize loading state
  const [hasMore, setHasMore] = useState(true); // Initialize hasMore state

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true); // Start loading
      try {
        const response = await fetch(
          `https://docs.aarnalaw.com/wp-json/wp/v2/publications?_embed&per_page=100`,
        );
        const result = await response.json();
        // console.log("Practice area data", result);

        // Ensure the response is an array before setting the data
        if (Array.isArray(result)) {
          // Sort the data alphabetically by title
          const sortedData = result.sort((a, b) => {
            const titleA = a.title.rendered.toLowerCase();
            const titleB = b.title.rendered.toLowerCase();
            return titleA.localeCompare(titleB);
          });
          setData(sortedData);
        } else {
          console.error("Expected an array but got:", result);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false); // Stop loading
      }
    };

    fetchData();
  }, []);

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

  const stripHTMLAndLimit = (htmlContent) => {
    const text = htmlContent.replace(/<\/?[^>]+(>|$)/g, "");
    return text.length > 180 ? text.substring(0, 180) + "..." : text;
  };

  // Skeleton loader component
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

  const filteredInsights = data.filter((item) =>
    item.title.rendered.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="mx-auto grid w-11/12 gap-4 py-12 lg:grid-cols-2">
      {loading && filteredInsights.length === 0 ? (
        Array.from({ length: 8 }).map((_, index) => (
          <SkeletonLoader key={index} />
        ))
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
              <Link href={`/publications/${item.slug}`}>
                <h5
                  className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-xl"
                  dangerouslySetInnerHTML={{ __html: item.title.rendered }}
                />
              </Link>
              <p
                className="mb-3 font-normal text-gray-700 dark:text-gray-400"
                dangerouslySetInnerHTML={{
                  __html: stripHTMLAndLimit(item.content.rendered),
                }}
              ></p>
            </div>
          </div>
        ))
      ) : (
        <div className="col-span-1 mt-4 text-center text-gray-500 md:col-span-2">
          No related post found
        </div>
      )}

      {!loading && hasMore && filteredInsights.length > 0 && (
        <div className="col-span-1 mt-6 flex justify-center md:col-span-2">
          <button
            onClick={() => setHasMore(false)} // Adjust to implement a real load more function
            className="bg-custom-red px-4 py-2 text-white"
          >
            Load More
          </button>
        </div>
      )}

      {!hasMore && (
        <div className="col-span-1 mt-4 text-center text-gray-500 md:col-span-2">
          No more details available
        </div>
      )}
    </div>
  );
}

export default AllInsights;
