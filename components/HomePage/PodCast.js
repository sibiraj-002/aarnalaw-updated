"use client";
import React, { useRef, useState, useEffect, useCallback } from "react";
import Link from "next/link";
import InsightSlider from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { leftArrow, rightArrow, pause, play } from "../../utils/icons";
import Image from "next/image";
import configData from "../../config.json";

const Podcasts = () => {
  const sliderRef = useRef(null);
  const [podcasts, setPodcasts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPlayingId, setCurrentPlayingId] = useState(null);
  const [autoPlay, setAutoPlay] = useState(true);
  const audioRefs = useRef({});
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(10);
  const [end, setEnd] = useState(false);
  const [error, setError] = useState(null);

  const domain = typeof window !== "undefined" ? window.location.hostname : "";

  const setAudioRef = (id) => (element) => {
    if (element) audioRefs.current[id] = element;
  };

  const handlePlayPause = (id) => {
    if (currentPlayingId === id) {
      audioRefs.current[id].pause();
      setAutoPlay(true);
      setCurrentPlayingId(null);
    } else {
      if (currentPlayingId !== null && audioRefs.current[currentPlayingId]) {
        audioRefs.current[currentPlayingId].pause();
      }
      audioRefs.current[id].play();
      setAutoPlay(false);
      setCurrentPlayingId(id);
    }
  };

  const handleAudioEnd = (id) => {
    if (currentPlayingId === id) {
      setCurrentPlayingId(null);
      setAutoPlay(true);
    }
  };

  const fetchContent = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
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

      const podcastResponse = await fetch(
        `${configData.SERVER_URL}podcast?_embed&status[]=publish&production_mode[]=${server}`
      );

      if (!podcastResponse.ok) {
        throw new Error("Failed to fetch data");
      }

      const podcastData = await podcastResponse.json();
      console.log("Podcast Data", podcastData);

      if (podcastData.length === 0) {
        setEnd(true);
      } else {
        const sortedData = podcastData.sort(
          (a, b) => new Date(b.date) - new Date(a.date)
        );

        // Map the data to include the cover image
        const transformedData = sortedData.map((item) => ({
          ...item,
          imageUrl: item.meta?.cover_image || "", // Use meta.cover_image as imageUrl
        }));

        setPodcasts(transformedData);
        setHasMore(podcastData.length === page);
      }

      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
      setError("Something went wrong. Please try again later.");
    }
  }, [page, domain]);

  useEffect(() => {
    if (!end && hasMore) {
      const debounceFetch = setTimeout(() => {
        fetchContent();
      }, 300); // Debounce API calls
      return () => clearTimeout(debounceFetch);
    }
  }, [page, fetchContent, end, hasMore]);

  const NextArrow = () => (
    <div
      className="cursor-pointer rounded-full bg-custom-blue p-3 text-xl text-white hover:bg-custom-red"
      onClick={() => sliderRef?.current?.slickNext()}
    >
      {rightArrow}
    </div>
  );

  const PrevArrow = () => (
    <div
      className="cursor-pointer rounded-full bg-custom-blue p-3 text-xl text-white hover:bg-custom-red"
      onClick={() => sliderRef?.current?.slickPrev()}
    >
      {leftArrow}
    </div>
  );

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    }).format(date);
  };

  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 2,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 2,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 1,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  return (
    <div className="mx-auto w-11/12 py-12 lg:p-10 lg:py-10">
      <h1 className="mb-8 text-center text-2xl font-semibold text-custom-blue">
        Podcasts
      </h1>

      <div>
        <InsightSlider
          ref={sliderRef}
          responsive={responsive}
          showDots={false}
          infinite={true}
          autoPlaySpeed={5000}
          autoPlay={autoPlay} // Control autoplay with state
          itemClass="p-1"
          keyBoardControl={true}
          removeArrowOnDeviceType={["tablet", "mobile", "desktop"]}
        >
          {podcasts.slice(0, 4).map((item) => (
            <div
              className={`${currentPlayingId === item.id ? "border-custom-red" : "border-gray-200"}  gap-4 border bg-white lg:flex  lg:h-[236px]`}
              key={item.id}
            >
              <div className="flex flex-col gap-4 md:w-full lg:flex-row">
                <Image
                  src={item.imageUrl || "/default-fallback-image.jpg"} // Use cover_image or a fallback
                  width={201}
                  height={150}
                  alt="Podcast Thumbnail"
                  className="h-auto w-full lg:h-[236px] lg:w-[400px]"
                />
                <div className="w-full flex-col p-8 lg:p-10">
                  <h1
                    className="mb-4 mt-4 w-full text-lg font-semibold text-custom-blue transition-colors duration-300 md:line-clamp-3 md:h-[100px] md:text-start md:text-2xl md:group-hover:text-white"
                    dangerouslySetInnerHTML={{ __html: item.title.rendered }}
                  />
                  <div className="flex flex-row items-center justify-between">
                    <button
                      className="flex size-10 items-center justify-center rounded-full bg-custom-blue text-white transition-colors duration-300 md:group-hover:bg-custom-red"
                      onClick={() => handlePlayPause(item.id)}
                    >
                      {currentPlayingId === item.id ? pause : play}
                    </button>
                  </div>
                  <audio
                    ref={(el) => (audioRefs.current[item.id] = el)} // Store ref for each podcast's audio element
                    src={item.meta?.audio_file}
                    className="hidden md:block"
                  />
                </div>
              </div>
            </div>
          ))}
        </InsightSlider>
      </div>
      <div className="mt-10 flex justify-center">
        <Link
          href="/podcasts"
          className="border border-custom-blue px-6 py-2 text-custom-blue md:hover:bg-custom-blue md:hover:text-white"
        >
          View all
        </Link>
      </div>
    </div>
  );
};

export default Podcasts;
