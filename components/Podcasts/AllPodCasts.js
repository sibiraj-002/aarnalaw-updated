"use client";
import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { play, pause, sound, mute, nextIcon, prevIcon } from "@/utils/icons";
import FloatingAudioPlayer from "./FloatingAudioPlayer";

function AllPodCasts({ searchTerm }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [currentPodcastIndex, setCurrentPodcastIndex] = useState(null);
  const [volume, setVolume] = useState(1.0);
  const [mutedStatus, setMutedStatus] = useState({}); // Track mute status for each podcast
  const [progress, setProgress] = useState({}); // Track progress for each podcast
  const [currentTime, setCurrentTime] = useState({}); // Track current time for each podcast
  const [duration, setDuration] = useState({}); // Track duration for each podcast
  const [expandedExcerpt, setExpandedExcerpt] = useState({});

  const audioRefs = useRef({}); // Store audio instances for each podcast

  const handlePlayPause = (index, playerLink) => {
    const audio = audioRefs.current[index];

    if (currentPodcastIndex === index) {
      audio.pause();
      setCurrentPodcastIndex(null);
    } else {
      // Pause any currently playing audio
      if (currentPodcastIndex !== null) {
        audioRefs.current[currentPodcastIndex].pause();
      }

      audio.src = playerLink; // Set the source of the audio
      audio.volume = mutedStatus[index] ? 0 : volume; // Set the volume based on mute state
      audio.play();
      setCurrentPodcastIndex(index);
    }
  };

  const handleVolumeToggle = (index) => {
    const audio = audioRefs.current[index];
    setMutedStatus((prev) => {
      const newMutedStatus = { ...prev, [index]: !prev[index] }; // Toggle mute status for the specific podcast
      audio.volume = newMutedStatus[index] ? 0 : volume; // Set audio volume accordingly
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

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true); // Start loading
      try {
        let url = `https://docs.aarnalaw.com/wp-json/wp/v2/podcast?_embed&per_page=6&page=${page}`;

        const response = await fetch(url);
        const result = await response.json();

        // Check if the request was successful
        if (!response.ok) {
          setHasMore(false); // Stop loading more if page number is invalid
          setLoading(false);
          return;
        }

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
  }, [page]);

  useEffect(() => {
    // Create a local variable to hold the current audioRefs
    const currentAudioRefs = audioRefs.current;

    data.forEach((_, index) => {
      // Initialize audio instance
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
      // Cleanup audio instances using the local variable
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

  // Handle loading more posts
  const loadMorePosts = () => {
    setPage((prevPage) => prevPage + 1);
  };

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
        {loading && filteredInsights.length === 0
          ? Array.from({ length: 4 }).map((_, index) => (
              <SkeletonLoader key={index} />
            ))
          : filteredInsights.map((item, index) => (
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
                  <p className="text-gray-700 dark:text-gray-300">
                    {expandedExcerpt[item.id]
                      ? item.excerpt.rendered.replace(/<\/?[^>]+(>|$)/g, "")
                      : item.excerpt.rendered
                          .replace(/<\/?[^>]+(>|$)/g, "")
                          .slice(0, 100)}
                    {item.excerpt.rendered.replace(/<\/?[^>]+(>|$)/g, "")
                      .length > 100 && (
                      <button
                        onClick={() => toggleExcerpt(item.id)}
                        className="ml-2 text-custom-red"
                      >
                        {expandedExcerpt[item.id] ? "Read Less" : "Read More"}
                      </button>
                    )}
                  </p>
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
                      <div className="mb-1 h-2.5 w-full rounded-full bg-gray-200">
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
            ))}
      </div>
      {loading && (
        <div className="flex justify-center pb-8">
          <p className="text-gray-500">Loading...</p>
        </div>
      )}
      {hasMore && !loading && (
        <div className="flex justify-center pb-8">
          <button
            onClick={loadMorePosts}
            className="hover:border-1 border border-custom-red bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:border-custom-blue hover:bg-custom-blue hover:text-white"
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
        progress={progress}
        currentTime={currentTime}
        duration={duration}
        mutedStatus={mutedStatus}
        volume={volume}
        handleNext={handleNext}
        handlePrevious={handlePrevious}
        formatTime={formatTime}
      />

      {/* {currentPodcastIndex !== null && (
        <FloatingAudioPlayer
          audioSrc={data[currentPodcastIndex]?.player_link}
          onClose={() => setCurrentPodcastIndex(null)}
        />
      )} */}
    </div>
  );
}

export default AllPodCasts;
