import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import configData from "../../config.json";

function AllInsights({ searchTerm }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [archives, setArchives] = useState([]);
  const [selectedArchive, setSelectedArchive] = useState(null);
  const [visibleItems, setVisibleItems] = useState(6);
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(searchTerm);

  const loadMore = () => {
    setVisibleItems((prev) => prev + 6);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 500);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  const cat1 = 12;
  const cat2 = 13;

  const fetchData = async (year) => {
    setLoading(true);
    let web_url = "https://docs.aarnalaw.com/wp-json/wp/v2/posts";
    try {
      const after = `${year}-01-01T00:00:00`;
      const before = `${year}-12-31T23:59:59`;

      const domain =
        typeof window !== "undefined" ? window.location.hostname : "";

      let server;

      if (
        domain === `${configData.LIVE_SITE_URL}` ||
        domain === `${configData.LIVE_SITE_URL_WWW}`
      ) {
        server = `${configData.LIVE_PRODUCTION_SERVER_ID}`;
      } else if (domain === `${configData.STAGING_SITE_URL}`) {
        server = `${configData.STAG_PRODUCTION_SERVER_ID}`;
      } else {
        server = `${configData.STAG_PRODUCTION_SERVER_ID}`;
      }

      const url = `https://docs.aarnalaw.com/wp-json/wp/v2/posts?_embed&per_page=100&categories=${cat1},${cat2}&after=${after}&before=${before}&status[]=publish&production_mode[]=${server}`;
      const response = await fetch(url);
      const result = await response.json();
      console.log(result);

      if (Array.isArray(result)) {
        const sortedData = result.sort(
          (a, b) => new Date(b.date) - new Date(a.date),
        );

        setData(
          sortedData.map((item) => ({
            ...item,
            featured_image_url: null,
            isImageLoading: true,
          })),
        );
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchArchives = async () => {
      try {
        const response = await fetch(
          `https://docs.aarnalaw.com/wp-json/wp/v2/archives`,
        );
        const archivesData = await response.json();

        const sortedArchives = archivesData.sort((a, b) => {
          const yearA = parseInt(a.name, 10);
          const yearB = parseInt(b.name, 10);
          return yearB - yearA;
        });

        setArchives(sortedArchives);

        const defaultArchive =
          sortedArchives.find((archive) => archive.name === "2025") ||
          sortedArchives[0];

        setSelectedArchive(defaultArchive);
        fetchData(defaultArchive.name);
      } catch (error) {
        console.error("Error fetching archives:", error);
      }
    };

    fetchArchives();
  }, []);

  useEffect(() => {
    if (selectedArchive) {
      fetchData(selectedArchive.name);
    }
  }, [selectedArchive]);

  const stripHTMLAndLimit = (htmlContent) => {
    const text = htmlContent.replace(/<\/?[^>]+(>|$)/g, "");
    return text.length > 255 ? text.substring(0, 255) + "..." : text;
  };

  const filteredInsights = data
    .filter(
      (item) =>
        item.title.rendered
          .toLowerCase()
          .includes(debouncedSearchTerm.toLowerCase()) ||
        item.excerpt.rendered
          .toLowerCase()
          .includes(debouncedSearchTerm.toLowerCase()),
    )
    .slice(0, visibleItems);

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

  const SkeletonLoader = () => (
    <div className="flex animate-pulse border border-gray-200 bg-white p-5 shadow dark:border-gray-700 dark:bg-gray-800">
      <div className="flex h-40 w-full items-center justify-center bg-gray-300"></div>
      <div className="">
        <div className="mb-2 h-6 w-3/4 rounded bg-gray-400" />
        <div className="h-4 w-full rounded bg-gray-400" />
      </div>
    </div>
  );

  return (
    <div className="flex w-full flex-col md:flex-row">
      <div className="mx-auto grid w-full grid-cols-1 gap-4 p-4 sm:grid-cols-2 lg:w-9/12 lg:p-12">
        {loading ? (
          Array(4)
            .fill()
            .map((_, index) => <SkeletonLoader key={index} />)
        ) : filteredInsights.length > 0 ? (
          filteredInsights.map((item) => (
            <div
              className="rounded-lg border border-gray-200 bg-white shadow"
              key={item.id}
            >
              <Image
                src={
                  item.isImageLoading
                    ? "/PracticeArea/Aarna-Law-Banner-img.png"
                    : item._embedded?.["wp:featuredmedia"]?.[0]?.source_url ||
                      "/PracticeArea/Aarna-Law-Banner-img.png"
                }
                alt={item.title.rendered}
                className="h-[200px] w-full rounded-t-lg object-cover"
                width={500}
                height={300}
                onLoadingComplete={() =>
                  setData((prevData) => {
                    const updatedData = prevData.map((p) =>
                      p.id === item.id ? { ...p, isImageLoading: false } : p,
                    );
                    return updatedData;
                  })
                }
              />
              <div className="p-5">
                <h5
                  className="mb-2 line-clamp-2 min-h-10 text-lg font-bold tracking-tight text-gray-900"
                  dangerouslySetInnerHTML={{ __html: item.title.rendered }}
                ></h5>
                <p
                  className="my-5 min-h-28 text-sm font-normal text-gray-700"
                  dangerouslySetInnerHTML={{
                    __html: stripHTMLAndLimit(item.excerpt.rendered),
                  }}
                ></p>
                <p className="pb-4 text-xs text-gray-500">
                  {formatDateString(item.date)}
                </p>
                <Link href={`/insights/${item.slug}`} className="text-red-500">
                  Read more
                </Link>
              </div>
            </div>
          ))
        ) : (
          <div>No results found</div>
        )}
        {data.length > visibleItems && (
          <div className="col-span-1 mt-6 text-center sm:col-span-2">
            <button
              onClick={loadMore}
              className="bg-custom-red px-4 py-2 text-white"
            >
              Load More
            </button>
          </div>
        )}
      </div>
      <div className="mt-8 w-full bg-gray-50 p-4 pb-12 md:mt-0 md:w-3/12 md:p-4 lg:ml-8">
        <h2 className="font-bold">Archives</h2>
        <hr className="my-4 border-t-2 border-red-500" />
        <ul className="space-y-4 text-left text-gray-500">
          {archives.map((archive) => (
            <button
              onClick={() => setSelectedArchive(archive)}
              className={`flex w-full border-b border-red-500 p-1 ${
                selectedArchive?.id === archive.id
                  ? "font-bold text-red-500"
                  : "hover:text-red-500"
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
