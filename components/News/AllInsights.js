"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

function AllInsights({ searchTerm }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        let url = `https://docs.aarnalaw.com/wp-json/wp/v2/posts?_embed&per_page=6&page=${page}&categories=9`;
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
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [page]);

  const formatDateString = (dateString) => {
    const date = new Date(dateString);
    const monthAbbreviations = [
      "JAN", "FEB", "MAR", "APR", "MAY", "JUN",
      "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"
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
    <div className="flex animate-pulse border border-gray-200 bg-white p-5 shadow dark:border-gray-700 dark:bg-gray-800 w-full">
      <div className="flex h-[200px] md:h-[400px] w-full items-center justify-center bg-gray-300 rounded-lg"></div>
      <div className="mt-4 space-y-2">
        <div className="h-6 w-3/4 rounded bg-gray-400" />
        <div className="h-4 w-full rounded bg-gray-400" />
      </div>
    </div>
  );

  const loadMorePosts = () => setPage((prevPage) => prevPage + 1);

  const filteredInsights = data.filter((data) =>
    data.title.rendered.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="p-4 md:p-8 lg:p-12">
      <div className="mx-auto grid grid-cols-1 lg:grid-cols-2 gap-4 p-4 lg:p-0">
        {loading && filteredInsights.length === 0
          ? Array.from({ length: 4 }).map((_, index) => (
              <SkeletonLoader key={index} />
            ))
          : filteredInsights.map((items, index) => (
              <div
                className="rounded-lg border border-gray-200 shadow dark:border-gray-700 dark:bg-gray-800"
                key={index}
              >
                {items.featured_image_url && (
                  <Image
                    src={items.featured_image_url}
                    alt={items.title.rendered}
                    className="h-[200px] md:h-[300px] w-full rounded-t-lg object-cover"
                    width={500}
                    height={500}
                  />
                )}
                <div className="p-4 md:p-5">
                  <h5
                    className="mb-2 text-lg md:text-xl font-bold tracking-tight text-gray-900 dark:text-white"
                    dangerouslySetInnerHTML={{ __html: items.title.rendered }}
                  ></h5>
                  <p
                    className="mb-3 text-sm md:text-base text-gray-700 dark:text-gray-400"
                  >
                    {stripHTMLAndLimit(items.excerpt.rendered)}
                  </p>
                  <p className="pb-2 text-xs md:text-sm text-gray-500">
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
            ))}
      </div>

      {!loading && hasMore && (
        <div className="mt-6 flex justify-center">
          <button
            onClick={loadMorePosts}
            className="rounded-lg bg-custom-red px-4 py-2 text-white"
          >
            Load More
          </button>
        </div>
      )}

      {!hasMore && (
        <div className="mt-4 text-center text-gray-500">
          No more posts to load.
        </div>
      )}
    </div>
  );
}

export default AllInsights;
