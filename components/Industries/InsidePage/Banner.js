import React, { useState, useEffect } from "react";

export default function Banner({ backgroundImage, titleText }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate a data loading delay
    const timer = setTimeout(() => {
      setLoading(false);
    }, 200); // Adjust the delay as needed

    return () => clearTimeout(timer); // Cleanup on component unmount
  }, []);

  if (loading) {
    return (
      <div className="relative h-screen animate-pulse bg-gray-300">
        <div className="absolute bottom-0 flex h-screen w-full items-center justify-center">
          <div className="flex h-12 w-48 animate-pulse items-center justify-center bg-gray-500 text-white">
            Loading
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className="relative h-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="absolute bottom-0 flex h-screen w-full items-center justify-center">
        <h1
          className="text-5xl font-bold text-white"
          dangerouslySetInnerHTML={{ __html: titleText }}
        />
      </div>
    </div>
  );
}
