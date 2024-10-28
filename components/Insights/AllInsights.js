"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

function AllInsights({ searchTerm }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [archives, setArchives] = useState([]);
  const [selectedArchive, setSelectedArchive] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        let url = `https://docs.aarnalaw.com/wp-json/wp/v2/posts?_embed&per_page=6&page=${page}&categories=13`;
        if (selectedArchive) {
          url += `&archives=${selectedArchive.id}`;
        }

        const response = await fetch(url);
        const result = await response.json();

        if (Array.isArray(result)) {
          if (result.length < 6) setHasMore(false);

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
        setLoading(false);
      }
    };

    fetchData();
  }, [page, selectedArchive]);

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
    const text = htmlContent.replace(/<\/?[^>]+(>|$)/g, "");
    return text.length > 255 ? text.substring(0, 255) + "..." : text;
  };

  const SkeletonLoader = () => (
    <div className="flex animate-pulse border border-gray-200 bg-white p-5 shadow dark:border-gray-700 dark:bg-gray-800">
      <div className="flex h-40 w-full items-center justify-center bg-gray-300"></div>
      <div className="">
        <div className="mb-2 h-6 w-3/4 rounded bg-gray-400" />
        <div className="h-4 w-full rounded bg-gray-400" />
      </div>
    </div>
  );

  const loadMorePosts = () => setPage((prevPage) => prevPage + 1);

  const filteredInsights = data.filter((data) =>
    data.title.rendered.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="flex w-full flex-col md:flex-row">
      <div className="mx-auto grid w-full grid-cols-1 gap-4 p-4 sm:grid-cols-2 lg:w-9/12 lg:p-12">
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
                {items.featured_image_url && (
                  <Image
                    src={items.featured_image_url}
                    alt={items.title.rendered}
                    className="h-[200px] w-full rounded-t-lg object-cover md:h-[300px]"
                    width={500}
                    height={300}
                  />
                )}
              </a>
              <div className="p-5">
                <h5
                  className="mb-2 min-h-20 text-lg font-bold tracking-tight text-gray-900 dark:text-white md:text-xl"
                  dangerouslySetInnerHTML={{ __html: items.title.rendered }}
                ></h5>

                <p className="mb-3 h-28 text-sm font-normal text-gray-700 dark:text-gray-400 md:h-40">
                  {stripHTMLAndLimit(items.excerpt.rendered)}
                </p>
                <p className="pb-4 text-xs text-gray-500 md:text-sm">
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
          ))
        ) : (
          <div className="col-span-1 mt-4 text-center text-gray-500 md:col-span-2">
            No related post found
          </div>
        )}

        {!loading && hasMore && (
          <div
            className={`col-span-1 mt-6 justify-center md:col-span-2 ${filteredInsights.length === 0 ? "hidden" : "flex"}`}
          >
            <button
              onClick={loadMorePosts}
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

      <div className="mt-8 w-full bg-gray-50 p-4 pb-12 md:mt-0 md:w-3/12 md:p-4 lg:ml-8">
        <h2 className="font-bold">Archives</h2>
        <hr className="my-4 border-t-2 border-red-500" />
        <ul className="space-y-4 text-left text-gray-500 dark:text-gray-400">
          {archives
            .slice()
            .reverse()
            .map((archive) => (
              <button
                onClick={() => {
                  setData([]);
                  setSelectedArchive(archive);
                  setPage(1);
                }}
                className={`flex w-full border-b border-custom-red p-1 ${
                  selectedArchive === archive
                    ? "font-bold text-custom-red"
                    : "hover:text-custom-red"
                }`}
                key={archive.id}
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
