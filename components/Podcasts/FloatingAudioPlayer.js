import React from "react";
import { play, pause, sound, mute, next, prev } from "@/utils/icons";

const FloatingAudioPlayer = ({
  currentPodcastIndex,
  podcasts,
  handlePlayPause,
  handleVolumeToggle,
  progress,
  currentTime,
  duration,
  mutedStatus,
  volume,
  handleNext,
  handlePrevious,
  formatTime,
}) => {
  if (currentPodcastIndex === null) return null; // Don't render if no podcast is playing

  const currentPodcast = podcasts[currentPodcastIndex];

  return (
    <div className="fixed bottom-0 z-50 mx-auto w-full bg-black/60 shadow-lg">
      <div className="h-2.5 w-full  bg-gray-200">
        <div
          className="h-2.5  bg-red-500"
          style={{ width: `${progress[currentPodcastIndex] || 0}%` }}
        />
      </div>
      <div className="mx-auto w-11/12 p-4">
        <div className="flex items-center justify-between">
          <div className="flex w-full justify-between ">
            <div className="w-1/2">
              <h5
                className="text-sm font-bold text-white"
                dangerouslySetInnerHTML={{
                  __html: currentPodcast?.title?.rendered,
                }}
              ></h5>
              <span className="text-sm text-white">
                {formatTime(currentTime[currentPodcastIndex] || 0)} /{" "}
                {formatTime(duration[currentPodcastIndex] || 0)}
              </span>
            </div>
            <div>
              <div className="flex w-full justify-around gap-2">
                <div>
                  <button
                    onClick={handlePrevious}
                    className="flex size-10 items-center justify-center rounded-full bg-white text-2xl"
                  >
                    {prev}
                  </button>
                </div>
                <div>
                  <button
                    onClick={() =>
                      handlePlayPause(
                        currentPodcastIndex,
                        currentPodcast.player_link,
                      )
                    }
                    className="flex size-10 items-center justify-center rounded-full bg-white text-2xl"
                  >
                    {currentPodcastIndex !== null ? pause : play}
                  </button>
                </div>
                <div>
                  {" "}
                  <button
                    onClick={handleNext}
                    className="flex size-10 items-center justify-center rounded-full bg-white text-2xl"
                  >
                    {next}
                  </button>
                </div>
                <div>
                  <button
                    onClick={() => handleVolumeToggle(currentPodcastIndex)}
                    className="flex size-10 items-center justify-center rounded-full bg-white text-2xl"
                  >
                    {mutedStatus[currentPodcastIndex] ? mute : sound}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* <div className="mt-4">
        <h6 className="font-semibold">Playlist</h6>
        <ul>
          {podcasts.map((podcast, index) => (
            <li
              key={podcast.id}
              className={`cursor-pointer ${
                index === currentPodcastIndex ? "font-bold text-red-500" : ""
              }`}
              onClick={() => handlePlayPause(index, podcast.player_link)}
            >
              {podcast.title?.rendered}
            </li>
          ))}
        </ul>
      </div> */}
    </div>
  );
};

export default FloatingAudioPlayer;
