import React from "react";

function OurNetwork() {
  return (
    <div className="mx-auto w-11/12">
      <h1 className="pb-8 pt-12 text-center text-xl font-semibold text-custom-blue md:text-2xl">
        A Network of Lawyers Around The Worlds
      </h1>
      <div className="w-full bg-gray-800 py-1 text-white">
        <p className="p-2 font-semibold">Aarna Law - Our Networks</p>
        <div className="w-full overflow-hidden">
          <iframe
            src="https://www.google.com/maps/d/embed?mid=1VcQJ5rncecjuzGEyGAVCekUkRYoLUpQ&ehbc=2E312F"
            width="100%"
            height="600"
            className="mt-[-61px] border-0"
          ></iframe>
        </div>
      </div>
    </div>
  );
}

export default OurNetwork;
