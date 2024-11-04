"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import ContactModal from "@/components/ModalContact/page";
import { initFlowbite } from "flowbite";

function PostDetails({ details, partnersData, slug, titleText }) {
  const [data, setData] = useState([]); // Initialize data state with an empty array
  const [loading, setLoading] = useState([]); // Initialize data state with an empty array

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://docs.aarnalaw.com/wp-json/wp/v2/practice-areas?_embed&per_page=100`,
        );
        const result = await response.json();

        // console.log("Practice area data", result);

        // Ensure the response is an array before setting the data
        if (Array.isArray(result)) {
          // Sort the data alphabetically by title
          const sortedData = result.sort((a, b) => {
            const titleA = a.title.rendered.toLowerCase(); // Convert to lowercase for case-insensitive comparison
            const titleB = b.title.rendered.toLowerCase();
            return titleA.localeCompare(titleB); // Compare titles
          });
          setData(sortedData);
        } else {
          console.error("Expected an array but got:", result);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false); // Set loading to false once data is fetched
      }
    };

    fetchData();
    initFlowbite(); // Initialize Flowbite after the data is loaded
  }, []);

  return (
    <div className="flex w-full flex-col py-5 lg:flex-row">
      <div className="inner-content w-full px-6 md:w-9/12 md:p-14 ">
        <p dangerouslySetInnerHTML={{ __html: details }} className="md:px-20" />
        {/* <div className="mt-8 w-9/12 md:px-20">
          <Link
            className="mt-6  bg-custom-red px-4 py-2 text-white"
            href="/practice-area/"
          >
            Back to Practice Area
          </Link>
        </div> */}
      </div>

      <div className="w-full bg-gray-50 md:w-3/12">
        {partnersData?.partnerNames?.map((name, index) => (
          <div
            key={index}
            className="flex flex-col items-center justify-start pt-10 text-center md:px-14 md:pt-14"
          >
            {partnersData.partnerImages?.[index] && (
              <Image
                src={partnersData.partnerImages[index]}
                alt={name}
                className="mb-4 size-[200px] rounded-full bg-[#0e1333]"
                width={200}
                height={200}
              />
            )}
            {/* Name */}
            {name && (
              <p className="text-lg font-bold text-custom-red">{name}</p>
            )}
            {/* Designation */}
            {partnersData.partnerDesignations?.[index] && (
              <p className="text-sm font-semibold">
                {partnersData.partnerDesignations[index]}
              </p>
            )}
          </div>
        ))}
        <div className="flex w-full justify-center">
          <ContactModal
            btnName="CONTACT PARTNER"
            textColor="text-black"
            modalTitle={titleText}
            btnType="contactPartner"
            id="contactPartner"
          />
        </div>

        <div className="w-full p-2 pt-10">
          <h2 className="font-bold">Quick Links</h2>
          <hr className="my-4 border-t-2 border-red-500" />
          <ul className="space-y-4 text-left text-gray-500 dark:text-gray-400 md:pr-10">
            {data.map((items, index) => (
              <Link
                href={`/practice-areas/${items.slug}`}
                className={`flex border-b border-custom-red p-1 hover:text-custom-red ${items.slug === slug ? "font-semibold text-custom-red" : " text-black"}`}
                key={index}
              >
                <p dangerouslySetInnerHTML={{ __html: items.title.rendered }} />
              </Link>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default PostDetails;
