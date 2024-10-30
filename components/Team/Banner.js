import React, { useState, useEffect } from "react";
import Image from "next/image";

export default function Banner({ title, backgroundImage, designation }) {
  const [isLoading, setIsLoading] = useState(true); // State to track if the image is loading

  // Handle the image load event to stop the skeleton loader
  const handleImageLoad = () => {
    setIsLoading(false); // Set loading to false once the image has loaded
  };

  return (
    <div className="grid h-[80vh] grid-cols-1 bg-[#0e1333] md:grid-cols-2">
      <div className="relative flex items-center justify-center md:items-end md:justify-end">
        {isLoading && (
          <div className="absolute flex h-[40vh] w-full animate-pulse bg-gray-50 md:h-[40vh]">
            {/* <p className="text-[50px] text-white">Profile Loading..</p> */}
          </div>
        )}
        {backgroundImage && (
          <Image
            src={backgroundImage}
            width={400}
            height={400}
            className="h-auto w-full md:size-[500px]"
            alt="background"
            onLoadingComplete={handleImageLoad}
          />
        )}
      </div>
      <div className="flex items-center justify-center md:items-end">
        <div className="h-auto w-full px-4 md:h-[40vh] md:px-0">
          <h1 className="text-3xl font-semibold text-white md:text-4xl">
            {title}
          </h1>
          <p className="text-lg text-white md:text-xl">{designation}</p>
        </div>
      </div>
    </div>
  );
}
