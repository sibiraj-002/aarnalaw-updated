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
  handleSeek, // add handleSeek function
}) => {
  if (currentPodcastIndex === null) return null; // Don't render if no podcast is playing

  const currentPodcast = podcasts[currentPodcastIndex];

  // Function to handle skipping (seek) within the audio
  const handleProgressClick = (e) => {
    const progressBar = e.target;
    const clickPosition = e.nativeEvent.offsetX; // Get click position within the progress bar
    const newProgress = (clickPosition / progressBar.offsetWidth) * 100;
    const newTime = (newProgress / 100) * duration[currentPodcastIndex];

    // Call the handleSeek function to update the audio time and progress
    handleSeek(currentPodcastIndex, newTime, newProgress);
  };

  return (
    <div className="fixed bottom-0 z-50 mx-auto w-full bg-black/60 shadow-lg">
      <div
        className="h-2.5 w-full cursor-pointer bg-gray-200"
        onClick={handleProgressClick} // Add the click event handler
      >
        <div
          className="h-2.5 bg-red-500"
          style={{ width: `${progress[currentPodcastIndex] || 0}%` }}
        />
      </div>
      <div className="mx-auto p-4 lg:w-11/12">
        <div className="flex items-center justify-between">
          <div className="flex w-full flex-col justify-between lg:flex-row ">
            <div className="w-full lg:w-1/2">
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
