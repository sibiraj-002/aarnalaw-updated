import React from "react";

export default function Banner({ title }) {
  const getTitle = () => {
    switch (title) {
      case "insight":
        return "Insight";
      case "aarna-news":
        return "Aarna News";
      case "publication":
        return "Publications";
      case "podcast":
        return "Podcasts";
      default:
        return "Aarna Law"; // Fallback title if input is not recognized
    }
  };

  return (
    <div className="relative h-[60vh] bg-[url('/PracticeArea/PracticeAreas.png')] bg-cover bg-center">
      <div className="absolute bottom-0 flex h-[50vh] w-full items-center justify-center bg-black/50">
        <h1 className="text-5xl font-bold tracking-wide text-white">
          {getTitle()}
        </h1>
      </div>
    </div>
  );
}
