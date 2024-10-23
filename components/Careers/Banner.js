import React from "react";

export default function Banner() {
  return (
    <div className="relative h-[50vh] bg-[url('/PracticeArea/PracticeAreas.png')]">
      <div className="absolute bottom-0 flex h-[50vh] w-full items-center justify-center">
        <h1 className="text-5xl font-bold text-white">Careers</h1>
      </div>
    </div>
  );
}
