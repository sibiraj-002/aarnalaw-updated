"use client";
import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { play, pause, sound, mute, nextIcon, prevIcon } from "@/utils/icons";
import FloatingAudioPlayer from "./FloatingAudioPlayer";
import { initFlowbite } from "flowbite";

function AllPodCasts({ searchTerm }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [currentPodcastIndex, setCurrentPodcastIndex] = useState(null);
  const [volume, setVolume] = useState(1.0);
  const [mutedStatus, setMutedStatus] = useState({});
  const [progress, setProgress] = useState({});
  const [currentTime, setCurrentTime] = useState({});
  const [duration, setDuration] = useState({});
  const [expandedExcerpt, setExpandedExcerpt] = useState({});

  const audioRefs = useRef({});

  const handlePlayPause = (index, playerLink) => {
    const audio = audioRefs.current[index];
    if (currentPodcastIndex === index) {
      audio.pause();
      setCurrentPodcastIndex(null);
    } else {
      if (currentPodcastIndex !== null) {
        audioRefs.current[currentPodcastIndex].pause();
      }
      audio.src = playerLink;
      audio.volume = mutedStatus[index] ? 0 : volume;
      audio.play();
      setCurrentPodcastIndex(index);
    }
  };

  const handleVolumeToggle = (index) => {
    const audio = audioRefs.current[index];
    setMutedStatus((prev) => {
      const newMutedStatus = { ...prev, [index]: !prev[index] };
      audio.volume = newMutedStatus[index] ? 0 : volume;
      return newMutedStatus;
    });
  };

  const handleNext = () => {
    const nextIndex = (currentPodcastIndex + 1) % data.length;
    handlePlayPause(nextIndex, data[nextIndex].player_link);
  };

  const handlePrevious = () => {
    const prevIndex = (currentPodcastIndex - 1 + data.length) % data.length;
    handlePlayPause(prevIndex, data[prevIndex].player_link);
  };

  const handleSeek = (index, newTime, newProgress) => {
    // Update the current time and progress for the specific podcast
    setCurrentTime(prev => ({ ...prev, [index]: newTime }));
    setProgress(prev => ({ ...prev, [index]: newProgress }));
  
    // Seek audio element
    const audioElement = audioRefs.current[index];
    if (audioElement) {
      audioElement.currentTime = newTime;
    }
  };
  

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `https://docs.aarnalaw.com/wp-json/wp/v2/podcast?_embed&per_page=6&page=${page}`,
        );
        if (!response.ok) throw new Error("Failed to fetch data");
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
          setData((prevData) => [
            ...prevData,
            ...dataWithImages.filter(
              (newPost) =>
                !prevData.some(
                  (existingPost) => existingPost.id === newPost.id,
                ),
            ),
          ]);
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
    initFlowbite(); // Initialize Flowbite after the data is loaded
  }, [page]);

  useEffect(() => {
    const currentAudioRefs = audioRefs.current;
    data.forEach((_, index) => {
      currentAudioRefs[index] = new Audio();
      currentAudioRefs[index].addEventListener("timeupdate", () => {
        setCurrentTime((prev) => ({
          ...prev,
          [index]: currentAudioRefs[index].currentTime,
        }));
        setProgress((prev) => ({
          ...prev,
          [index]:
            (currentAudioRefs[index].currentTime /
              currentAudioRefs[index].duration) *
            100,
        }));
      });
      currentAudioRefs[index].addEventListener("loadedmetadata", () => {
        setDuration((prev) => ({
          ...prev,
          [index]: currentAudioRefs[index].duration,
        }));
      });
    });
    return () => {
      Object.values(currentAudioRefs).forEach((audio) => {
        audio.pause();
        audio.src = "";
      });
    };
  }, [data]);

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  const SkeletonLoader = () => (
    <div className="flex animate-pulse rounded-lg border border-gray-200 bg-white p-5 shadow dark:border-gray-700 dark:bg-gray-800">
      <div className="flex h-[400px] w-full items-center justify-center bg-gray-300"></div>
      <div className="">
        <div className="mb-2 h-20 w-3/4 rounded bg-gray-400" />
        <div className="h-20 w-full rounded bg-gray-400" />
      </div>
    </div>
  );

  const loadMorePosts = () => setPage((prevPage) => prevPage + 1);

  const filteredInsights = data.filter((data) =>
    data.title.rendered.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const toggleExcerpt = (id) => {
    setExpandedExcerpt((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <div className="flex flex-col">
      <div className="mx-auto grid w-full gap-4 p-4 md:grid-cols-2 md:p-12">
        {loading && filteredInsights.length === 0 ? (
          Array.from({ length: 4 }).map((_, index) => (
            <SkeletonLoader key={index} />
          ))
        ) : filteredInsights.length > 0 ? (
          filteredInsights.map((item, index) => (
            <div
              className={`rounded-lg border ${
                currentPodcastIndex === index
                  ? "border-red-500"
                  : "border-gray-200"
              } bg-white shadow dark:border-gray-700 dark:bg-gray-800`}
              key={item.id}
            >
              <div className="relative">
                {item.featured_image_url && (
                  <Image
                    src={item.featured_image_url}
                    alt={item.title?.rendered || "Podcast Image"}
                    className="w-full rounded-t-lg lg:h-[300px]"
                    width={500}
                    height={500}
                  />
                )}
              </div>
              <div className="p-5">
                <h5
                  className="mb-2 min-h-10 text-xl font-bold tracking-tight text-gray-900 dark:text-white"
                  dangerouslySetInnerHTML={{ __html: item.title?.rendered }}
                ></h5>
                <p
                  className="text-gray-700 dark:text-gray-300"
                  dangerouslySetInnerHTML={{
                    __html: expandedExcerpt[item.id]
                      ? item.excerpt.rendered
                      : item.excerpt.rendered.slice(0, 100),
                  }}
                ></p>
                {item.excerpt.rendered.replace(/<\/?[^>]+(>|$)/g, "").length >
                  100 && (
                  <button
                    onClick={() => toggleExcerpt(item.id)}
                    className="ml-2 text-custom-red"
                  >
                    {expandedExcerpt[item.id] ? "Read Less" : "Read More"}
                  </button>
                )}
              </div>

              {item.player_link && (
                <div className="flex items-center justify-between px-4 pb-4">
                  <button
                    className="rounded-full bg-custom-blue p-2 text-xl text-white hover:bg-custom-red"
                    onClick={() => handlePlayPause(index, item.player_link)}
                  >
                    {currentPodcastIndex === index ? pause : play}
                  </button>
                  <div className="mx-4 flex-1 rounded-lg border border-gray-200 p-2">
                    <span>
                      {formatTime(currentTime[index] || 0)} /{" "}
                      {formatTime(duration[index] || 0)}
                    </span>
                    <div
                      className="relative mb-1 h-2.5 w-full cursor-pointer rounded-full bg-gray-200"
                      onClick={(e) => {
                        const rect = e.currentTarget.getBoundingClientRect();
                        const clickPosition = e.clientX - rect.left; // Click position relative to the progress bar
                        const newTime =
                          (clickPosition / e.currentTarget.offsetWidth) *
                          (duration[index] || 0); // Calculate the new time
                        const audio = audioRefs.current[index];
                        audio.currentTime = newTime; // Seek audio
                      }}
                    >
                      <div
                        className="h-2.5 rounded-full bg-red-500"
                        style={{ width: `${progress[index] || 0}%` }}
                      />
                    </div>
                  </div>
                  <button
                    className="rounded-full bg-custom-blue p-2 text-xl text-white hover:bg-custom-red"
                    onClick={() => handleVolumeToggle(index)}
                  >
                    {mutedStatus[index] ? mute : sound}
                  </button>
                </div>
              )}
            </div>
          ))
        ) : (
          <div className="col-span-1 mt-4 text-center text-gray-500 md:col-span-2">
            No related post found
          </div>
        )}
      </div>
      {!loading && hasMore && filteredInsights.length > 0 && (
        <div className="col-span-1 mt-6 flex justify-center md:col-span-2">
          <button
            onClick={loadMorePosts}
            className="bg-custom-red px-4 py-2 text-white"
          >
            Load More
          </button>
        </div>
      )}

      <FloatingAudioPlayer
        currentPodcastIndex={currentPodcastIndex}
        podcasts={data}
        handlePlayPause={handlePlayPause}
        handleVolumeToggle={handleVolumeToggle}
        handleSeek={handleSeek}
        progress={progress}
        currentTime={currentTime}
        duration={duration}
        mutedStatus={mutedStatus}
        volume={volume}
        handleNext={handleNext}
        handlePrevious={handlePrevious}
        formatTime={formatTime}
      />
    </div>
  );
}

export default AllPodCasts;
