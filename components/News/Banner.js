import React from "react";

export default function Banner({ title }) {
  return (
    <div className="relative h-[60vh] bg-[url('/PracticeArea/PracticeAreas.png')] bg-cover bg-center">
      <div className="absolute bottom-0 flex h-[50vh] w-full items-center justify-center bg-black/50">
        <h1 className="text-5xl font-bold tracking-wide text-white">
          Aarna News
        </h1>
      </div>
    </div>
  );
}
