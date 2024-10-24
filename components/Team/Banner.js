import React, { useState, useEffect } from "react";
import Image from "next/image";

export default function Banner({ title, backgroundImage, designation }) {
  const [isLoading, setIsLoading] = useState(true); // State to track if the image is loading

  // Handle the image load event to stop the skeleton loader
  const handleImageLoad = () => {
    setIsLoading(false); // Set loading to false once the image has loaded
  };

  return (
    <div className="grid h-[80vh] grid-cols-2 bg-[#0e1333]">
      <div className="relative flex items-end justify-end">
        {isLoading && (
          <div className="absolute flex h-[40vh] animate-pulse justify-center bg-gray-50">
            {/* <p className="text-[50px] text-white">Profile Loading..</p> */}
          </div>
        )}
        {backgroundImage && ( // Check if backgroundImage is not null or undefined
          <Image
            src={backgroundImage}
            width={400}
            height={400}
            className="size-[500px]"
            alt="background"
            onLoadingComplete={handleImageLoad} // Trigger when the image is fully loaded
          />
        )}
      </div>
      <div className="flex items-end justify-center">
        <div className="h-[40vh] w-full">
          <h1 className="flex text-4xl font-semibold text-white">{title}</h1>
          <p className="text-xl text-white">{designation}</p>
        </div>
      </div>
    </div>
  );
}
