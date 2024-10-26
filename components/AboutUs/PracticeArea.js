"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { practiceArea } from "../../utils/data";

export default function PracticeArea() {
  const [data, setData] = useState([]); // Initialize data state with an empty array
  const [loading, setLoading] = useState([]); // Initialize data state with an empty array

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://docs.aarnalaw.com/wp-json/wp/v2/practice-areas?_embed&per_page=100`,
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

  return (
    <div className="bg-[#151C4A] py-12">
      <div className="mx-auto w-10/12">
        <h2 className="mb-12 text-center text-3xl font-bold text-white">
          Practice Areas
        </h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {data.map((item, index) => (
            <div
              key={index}
              className=" bg-white lg:p-1 p-4 text-black hover:text-custom-red"
            >
              <Link href={`/practice-area/${item.slug}`}>
                <p
                  dangerouslySetInnerHTML={{ __html: item.title.rendered }} className="font-semibold lg:font-normal"
                ></p>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
