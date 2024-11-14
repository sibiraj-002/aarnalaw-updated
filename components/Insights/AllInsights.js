import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { initFlowbite } from "flowbite";
import configData from "../../config.json";
import debounce from "lodash.debounce";

const domain = typeof window !== "undefined" ? window.location.hostname : "";

function AllInsights({ searchTerm }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(6);
  const [hasMore, setHasMore] = useState(true);
  const [archives, setArchives] = useState([]);
  const [selectedArchive, setSelectedArchive] = useState(null);

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
  
      const archiveQuery = selectedArchive ? `&archives=${selectedArchive}` : "";
  
      const [publicationsResponse, categoriesResponse] = await Promise.all([
        fetch(
          `${configData.SERVER_URL}posts?_embed&categories[]=13&status[]=publish&production_mode[]=${server}&per_page=${page}${archiveQuery}`,
        ),
        fetch(`${configData.SERVER_URL}categories/13`),
      ]);
  
      const publicationsData = await publicationsResponse.json();
      const categoriesData = await categoriesResponse.json();
  
      if (publicationsData.length === 0) {
        setHasMore(false);
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
  }, [page, selectedArchive]);
  

  const debouncedFetchContent = useCallback(debounce(fetchContent, 500), [
    page,
    selectedArchive,
  ]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      initFlowbite();
    }
  }, []);

  useEffect(() => {
    fetchContent();
    debouncedFetchContent();
  }, [page, selectedArchive, debouncedFetchContent]);

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

  const loadMorePosts = () => setPage((prevPage) => prevPage + 6);

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
                {items._embedded?.["wp:featuredmedia"]?.[0]?.source_url ? (
                  <Image
                    src={items._embedded["wp:featuredmedia"][0].source_url}
                    alt={items.title.rendered}
                    className="h-[200px] w-full rounded-t-lg object-cover"
                    width={500}
                    height={300}
                  />
                ) : null}
              </a>
              <div className="p-5">
                <h5
                  className="mb-2 line-clamp-2 min-h-10 text-lg font-bold tracking-tight text-gray-900 dark:text-white md:text-xl"
                  dangerouslySetInnerHTML={{ __html: items.title.rendered }}
                ></h5>

                <p
                  className="my-5 min-h-28 text-sm font-normal text-gray-700 dark:text-gray-400 md:h-40"
                  dangerouslySetInnerHTML={{
                    __html: stripHTMLAndLimit(items.excerpt.rendered),
                  }}
                ></p>
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
              // Update the onClick handler in your Archive buttons
              <button
                onClick={() => {
                  setData([]); // Clear previous data
                  setSelectedArchive(archive.id); // Set the selected archive by ID
                  setPage(6); // Reset page for fresh fetch
                }}
                className={`flex w-full border-b border-custom-red p-1 ${
                  selectedArchive === archive.id
                    ? "border-b-2 font-bold text-custom-red"
                    : "hover:border-b-2 hover:text-custom-red"
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
