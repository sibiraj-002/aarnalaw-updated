import React from "react";
import Link from "next/link";
import Image from "next/image";

export default function page() {
  return (
    <div className="flex h-screen items-center justify-center">
      <div className="grid h-[80vh] w-full grid-cols-2">
        <div className="flex flex-col items-center justify-center bg-[#091F48]">
          <div>
            <h1 className="text-7xl font-bold text-custom-red">404</h1>
            <p className="py-4 text-2xl text-white">
              We couldn&apos;t find the page you are looking for.
            </p>
            <Link
              href="/"
              className="border border-custom-red p-2 text-custom-red"
            >
              Go back to the homepage
            </Link>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center ">
          <Image
            src="/images/error.png"
            width={200}
            height={200}
            className="w-[500px]"
            alt="404 Page"
          />
        </div>
      </div>
    </div>
  );
}
