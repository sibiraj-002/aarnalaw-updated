"use client";
import React, { useRef, useState, useEffect } from "react";
import Link from "next/link";
import InsightSlider from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { leftArrow, rightArrow, pause, play } from "../../utils/icons";
import Image from "next/image";

const Podcasts = () => {
  const sliderRef = useRef(null);
  const [podcasts, setPodcasts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPlayingId, setCurrentPlayingId] = useState(null); // State to track which podcast is playing
  const [autoPlay, setAutoPlay] = useState(true); // State to control autoplay of carousel
  const audioRefs = useRef({}); // Store refs for all audio elements

  const handlePlayPause = (id) => {
    if (currentPlayingId === id) {
      // If the same podcast is playing, pause it
      audioRefs.current[id].pause();
      setAutoPlay(true); // Resume carousel autoplay when audio is paused
      setCurrentPlayingId(null); // Reset playing state
    } else {
      // Pause any currently playing podcast
      if (currentPlayingId !== null && audioRefs.current[currentPlayingId]) {
        audioRefs.current[currentPlayingId].pause();
      }
      // Play the selected podcast
      audioRefs.current[id].play();
      setAutoPlay(false); // Stop carousel autoplay when audio is playing
      setCurrentPlayingId(id); // Set the new playing podcast
    }
  };

  useEffect(() => {
    const fetchPodcasts = async () => {
      try {
        const response = await fetch(
          "https://docs.aarnalaw.com/wp-json/wp/v2/podcast",
        );
        const data = await response.json();

        setPodcasts(
          data.map((podcast) => ({
            ...podcast,
            formattedDate: formatDate(podcast.date),
            imageUrl: podcast.episode_player_image,
          })),
        );
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };

    fetchPodcasts();
  }, []);

  const NextArrow = () => (
    <div
      className="cursor-pointer rounded-full bg-custom-blue p-3 text-xl text-white hover:bg-custom-red"
      onClick={() => sliderRef.current.slickNext()}
    >
      {rightArrow}
    </div>
  );

  const PrevArrow = () => (
    <div
      className="cursor-pointer rounded-full bg-custom-blue p-3 text-xl text-white hover:bg-custom-red"
      onClick={() => sliderRef.current.slickPrev()}
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
                  src={item.imageUrl}
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
                    {/* <p className=" text-custom-gray transition-colors duration-300 md:w-60 md:group-hover:text-white">
                      Posted On
                      <br className="block md:hidden" />
                      {item.formattedDate}
                    </p> */}
                    <button
                      className="flex size-10 items-center justify-center rounded-full bg-custom-blue text-white transition-colors duration-300 md:group-hover:bg-custom-red"
                      onClick={() => handlePlayPause(item.id)}
                    >
                      {currentPlayingId === item.id ? pause : play}
                    </button>
                  </div>
                  <audio
                    ref={(el) => (audioRefs.current[item.id] = el)} // Store ref for each podcast's audio element
                    src={item.player_link}
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
