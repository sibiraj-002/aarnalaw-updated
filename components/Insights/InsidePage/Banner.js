import React from "react";
import Image from "next/image";

export default function Banner({ title, backgroundImage }) {
  return (
    <div
    // className="relative h-[100vh] bg-cover bg-center"
    // style={{
    //   backgroundImage: backgroundImage
    //     ? `url(${backgroundImage})`
    //     : `url('/PracticeArea/PracticeAreas.png')`,
    // }}
    >
      <Image
        src={
          backgroundImage ? backgroundImage : "/PracticeArea/PracticeAreas.png"
        }
        width={600}
        height={600}
        className="w-full"
        alt={title}
      />
    </div>
  );
}
