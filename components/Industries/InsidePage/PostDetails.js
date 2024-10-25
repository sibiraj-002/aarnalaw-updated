"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import ContactModal from "@/components/ModalContact/page";

function PostDetails({ details, partnersData, slug, title }) {
  const [data, setData] = useState([]); // Initialize data state with an empty array
  const [loading, setLoading] = useState(true); // Initialize data state with true

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://docs.aarnalaw.com/wp-json/wp/v2/industries?_embed&per_page=100`,
        );
        const result = await response.json();

        console.log("Practice area data", result);

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
  }, []);

  // Check if there is any valid partner data
  const hasValidPartnerData =
    partnersData?.partnerNames?.some((name) => name) ||
    partnersData?.partnerImages?.some((image) => image) ||
    partnersData?.partnerDesignations?.some((designation) => designation);

  return (
    <div className="flex w-full">
      <div className="inner-content w-9/12 p-14">
        {/* <h1
          dangerouslySetInnerHTML={{ __html: title }}
          className="px-20 pb-12 text-3xl font-semibold"
        /> */}
        <p dangerouslySetInnerHTML={{ __html: details }} className="px-20" />

        <div className="flex w-full justify-start px-20">
          <ContactModal
            btnName="CONTACT OUR EXPERTS"
            textColor="text-black"
            modalTitle={title}
            btnType="contactPartner"
          />
        </div>
      </div>
      <div className="w-3/12 bg-gray-50">
        {partnersData?.partnerNames?.map((name, index) => (
          <div
            key={index}
            className="flex flex-col items-center justify-start p-14 text-center"
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

        {/* Only show 'CONTACT PARTNER' if there is valid partner data */}
        {hasValidPartnerData && (
          <div className="flex w-full justify-center">
            <ContactModal
              btnName="CONTACT PARTNER"
              textColor="text-black"
              modalTitle={title}
              btnType="contactPartner"
            />
          </div>
        )}

        <div className="w-full p-2 pt-10">
          <h2 className="font-bold">Quick Links</h2>
          <hr className="my-4 border-t-2 border-red-500" />
          <ul className="space-y-4 pr-10 text-left text-gray-500 dark:text-gray-400">
            {data.map((items, index) => (
              <Link
                href={`/industries/${items.slug}`}
                className={`flex border-b border-custom-red p-1 hover:text-custom-red ${
                  items.slug === slug
                    ? "font-semibold text-custom-red"
                    : " text-black"
                }`}
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
