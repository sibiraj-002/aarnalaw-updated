import React, { useState, useEffect } from "react";
import Image from "next/image";

export default function Banner({ title, backgroundImage, mobileBackgroundImage, designation }) {
  const [isLoading, setIsLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Function to check if the screen is in mobile view
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768); // Adjust the width as per your breakpoint
    };

    // Initial check and event listener for resize
    handleResize();
    window.addEventListener("resize", handleResize);

    // Cleanup event listener on component unmount
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleImageLoad = () => {
    setIsLoading(false);
  };

  return (
    <div
      className="relative h-[60vh] bg-cover bg-center flex items-center justify-center"
      style={{ backgroundImage: `url(${isMobile ? mobileBackgroundImage : backgroundImage})` }}
    >
      {isLoading && (
        <div className="absolute flex h-[60vh] w-full">
          {/* Loading Skeleton */}
        </div>
      )}
      <div className="absolute inset-0 grid md:grid-cols-2 p-4 md:p-8">
      <div></div> {/* This empty div takes up the right half */}
        <div className="flex flex-col md:justify-center justify-end text-left space-y-2 md:space-y-4">
          <h1 className="text-3xl font-semibold  text-gray-400 md:text-4xl">{title}</h1>
          <p className="text-lg text-gray-400 md:text-xl">{designation}</p>
        </div>
        
      </div>
    </div>
  );
}
