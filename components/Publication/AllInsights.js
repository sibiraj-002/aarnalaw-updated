"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";

function AllInsights({ searchTerm }) {
  const [data, setData] = useState([]); // Initialize data state with an empty array
  const [loading, setLoading] = useState(true); // Initialize loading state

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true); // Start loading
      try {
        const response = await fetch(
          `https://docs.aarnalaw.com/wp-json/wp/v2/publications?_embed&per_page=100`,
        );
        const result = await response.json();
        console.log("Practice area data", result);
        // Ensure the response is an array before setting the data
        if (Array.isArray(result)) {
          // Sort the data alphabetically by title
          const sortedData = result.sort((a, b) => {
            const titleA = a.title.rendered.toLowerCase(); // Convert to lowercase for case-insensitive comparison
            const titleB = b.title.rendered.toLowerCase();
            return titleA.localeCompare(titleB); // Compare titles
          });
          setData(sortedData); // Use sortedData instead of result
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
    const date = new Date(dateString); // Create a Date object from the input string

    // Define an array of month abbreviations
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

    // Extract day, month (as an abbreviation), and year
    const day = `<p class="text-custom-red font-bold text-2xl">${date.getDate()}</p>`; // Get the day of the month
    const month = `<p class="font-bold">${monthAbbreviations[date.getMonth()]}</p>`; // Get the month abbreviation
    const year = `<p class="font-bold">${date.getFullYear()}</p>`; // Get the year

    // Return the formatted HTML string
    return `${day}\n${month}\n${year}`;
  };

  const stripHTMLAndLimit = (htmlContent) => {
    const text = htmlContent.replace(/<\/?[^>]+(>|$)/g, ""); // Remove HTML tags
    return text.length > 180 ? text.substring(0, 180) + "..." : text; // Limit to 255 characters
  };

  // Skeleton loader component
  const SkeletonLoader = () => (
    <div className="flex animate-pulse border border-gray-200 bg-white p-5 shadow dark:border-gray-700 dark:bg-gray-800">
      <div className="flex h-[200px] w-full items-center justify-center bg-gray-300 p-5">
        <div className="mb-2 h-4 w-1/4 rounded bg-gray-400" />
        <div className="h-4 w-1/4 rounded bg-gray-400" />
      </div>
      <div className="">
        <div className="mb-2 h-6 w-3/4 rounded bg-gray-400" />
        <div className="h-4 w-full rounded bg-gray-400" />
      </div>
    </div>
  );

  const filteredInsights = data.filter((data) =>
    data.title.rendered.toLowerCase().includes(searchTerm.toLowerCase()),
  );



  
  return (
    <div className="mx-auto grid w-11/12 gap-4 py-12 lg:grid-cols-2">
      {loading
        ? // Display skeleton loaders while loading
          Array.from({ length: 8 }).map((_, index) => (
            <SkeletonLoader key={index} />
          ))
        : filteredInsights.map((items, index) => (
            <div
              className="flex flex-col border border-gray-200 bg-white shadow dark:border-gray-700 dark:bg-gray-800 sm:flex-row"
              key={index}
            >
              <div className="flex items-center justify-center bg-gray-300 p-5">
                <div
                  className="flex items-center gap-1 text-center sm:text-left lg:flex-col"
                  dangerouslySetInnerHTML={{
                    __html: formatDateString(items.date),
                  }}
                />
              </div>
              <div className="p-5">
                <Link href={`/publications/${items.slug}`}>
                  <h5
                    className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-2xl"
                    dangerouslySetInnerHTML={{ __html: items.title.rendered }}
                  />
                </Link>
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                  {stripHTMLAndLimit(items.content.rendered)}
                </p>
              </div>
            </div>
          ))}
    </div>
  );
}

export default AllInsights;
