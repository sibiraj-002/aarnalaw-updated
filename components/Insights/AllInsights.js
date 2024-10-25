"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

function AllInsights({ searchTerm }) {
  const [data, setData] = useState([]); // Initialize data state with an empty array
  const [loading, setLoading] = useState(true); // Initialize loading state
  const [page, setPage] = useState(1); // Initialize page state
  const [hasMore, setHasMore] = useState(true); // Track if there are more posts to load
  const [archives, setArchives] = useState([]); // Initialize archives state
  const [selectedArchive, setSelectedArchive] = useState(null); // Track the selected archive

  // Fetch posts based on the selected archive
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true); // Start loading
      try {
        let url = `https://docs.aarnalaw.com/wp-json/wp/v2/posts?_embed&per_page=6&page=${page}&categories=13`;

        // If an archive is selected, include it in the request
        if (selectedArchive) {
          url += `&archives=${selectedArchive.id}`;
        }

        const response = await fetch(url);
        const result = await response.json();

        if (Array.isArray(result)) {
          // Check if there are more posts to load
          if (result.length < 6) {
            setHasMore(false); // No more posts to load
          }

          // Fetch the featured media (image URL) for each post
          const dataWithImages = await Promise.all(
            result.map(async (item) => {
              if (item.featured_media) {
                try {
                  const mediaResponse = await fetch(
                    `https://docs.aarnalaw.com/wp-json/wp/v2/media/${item.featured_media}`,
                  );
                  const mediaResult = await mediaResponse.json();
                  item.featured_image_url = mediaResult.source_url || null;
                } catch (error) {
                  console.error(
                    `Error fetching media for post ${item.id}:`,
                    error,
                  );
                  item.featured_image_url = null;
                }
              } else {
                item.featured_image_url = null;
              }
              return item;
            }),
          );

          // Append the new data to the existing data without duplicates
          setData((prevData) => {
            const newData = dataWithImages.filter(
              (newPost) =>
                !prevData.some(
                  (existingPost) => existingPost.id === newPost.id,
                ),
            );
            return [...prevData, ...newData];
          });
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
  }, [page, selectedArchive]);

  // Fetch archives/categories
  useEffect(() => {
    const fetchArchives = async () => {
      try {
        const response = await fetch(
          `https://docs.aarnalaw.com/wp-json/wp/v2/archives`,
        );
        const archivesData = await response.json();

        setArchives(archivesData);
      } catch (error) {
        console.error("Error fetching archives:", error);
      }
    };

    fetchArchives();
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
    const day = date.getDate();
    const month = monthAbbreviations[date.getMonth()];
    const year = date.getFullYear();
    return `${day}\n${month}\n${year}`;
  };

  const stripHTMLAndLimit = (htmlContent) => {
    const text = htmlContent.replace(/<\/?[^>]+(>|$)/g, ""); // Remove HTML tags
    return text.length > 255 ? text.substring(0, 255) + "..." : text;
  };

  // Skeleton loader component
  const SkeletonLoader = () => (
    <div className="flex animate-pulse border border-gray-200 bg-white p-5 shadow dark:border-gray-700 dark:bg-gray-800">
      <div className="flex h-40 w-full items-center justify-center bg-gray-300"></div>
      <div className="">
        <div className="mb-2 h-6 w-3/4 rounded bg-gray-400" />
        <div className="h-4 w-full rounded bg-gray-400" />
      </div>
    </div>
  );

  // Handle loading more posts
  const loadMorePosts = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const filteredInsights = data.filter((data) =>
    data.title.rendered.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="flex ">
      <div className="mx-auto grid w-9/12 grid-cols-2 gap-4 p-12">
        {loading && filteredInsights.length === 0
          ? // Display skeleton loaders while loading
            Array.from({ length: 4 }).map((_, index) => (
              <SkeletonLoader key={index} />
            ))
          : filteredInsights.map((items, index) => (
              <div
                className="rounded-lg border border-gray-200 bg-white shadow dark:border-gray-700 dark:bg-gray-800"
                key={index}
              >
                <a href="#">
                  {items.featured_image_url && (
                    <Image
                      src={items.featured_image_url}
                      alt={items.title.rendered}
                      className="h-[300px] w-full rounded-t-lg"
                      width={500}
                      height={500}
                    />
                  )}
                </a>
                <div className="p-5">
                  <h5
                    className="mb-2 min-h-20 text-xl font-bold tracking-tight text-gray-900 dark:text-white"
                    dangerouslySetInnerHTML={{ __html: items.title.rendered }}
                  ></h5>

                  <p
                    className="mb-3 h-40 font-normal text-gray-700 dark:text-gray-400"
                    // dangerouslySetInnerHTML={{ __html: items.excerpt.rendered }}
                  >
                    {stripHTMLAndLimit(items.excerpt.rendered)}
                  </p>
                  <p className="pb-4 text-sm text-gray-500">
                    {formatDateString(items.date)}
                  </p>
                  <Link
                    href={`/insights/${items.slug}`}
                    className="font-semibold text-custom-red"
                  >
                    Read more
                  </Link>
                </div>
              </div>
            ))}

        {/* Load more button */}
        {!loading && hasMore && (
          <div className="col-span-2 flex justify-center">
            <button
              onClick={loadMorePosts}
              className="mt-6  bg-custom-red px-4 py-2 text-white"
            >
              Load More
            </button>
          </div>
        )}

        {/* No more posts message */}
        {!hasMore && (
          <div className="col-span-2 mt-4 text-center text-gray-500">
            {/* No more posts to load. */}
          </div>
        )}
      </div>
      <div className="mt-12 w-3/12 bg-gray-50 p-4 pb-12">
        <h2 className="font-bold">Archives</h2>
        <hr className="my-4 border-t-2 border-red-500" />
        <ul className="space-y-4 text-left text-gray-500 dark:text-gray-400">
          {archives.map((archive, index) => (
            <button
              onClick={() => {
                setData([]); // Reset posts when archive is clicked
                setSelectedArchive(archive); // Set the selected archive
                setPage(1); // Reset the page to 1
              }}
              className={`flex w-full border-b border-custom-red p-1 ${
                selectedArchive === archive
                  ? "font-bold text-custom-red"
                  : "hover:text-custom-red"
              }`} // Apply custom class when selected
              key={index}
            >
              <p dangerouslySetInnerHTML={{ __html: archive.name }} />
            </button>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default AllInsights;
