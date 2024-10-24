"use client";
import React, { useEffect, useState } from "react";
import Banner from "@/components/Pages/Banner";
import Link from "next/link";
import ErrorPage from "@/components/404/page";

export default function Page({ params }) {
  const paramUrl = params.slug;
  const [title, setTitle] = useState(null);
  const [content, setContent] = useState(null);
  const [error, setError] = useState(false); // Error state to handle error page

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://docs.aarnalaw.com/wp-json/wp/v2/pages?_embed&slug=${paramUrl}`,
        );
        const data = await response.json();

        if (data && data.length > 0) {
          const post = data[0];
          // Set post details in state

          setTitle(post.title.rendered);
          setContent(post.content.rendered);
        } else {
          console.error("No post data found.");
          setError(true); // Set error state if no post found
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [paramUrl]);

  if (error) {
    return <ErrorPage />;
  }

  return (
    <>
      <Banner title={title} />
      <div className="mx-auto flex w-11/12 py-12">
        <span
          dangerouslySetInnerHTML={{ __html: content }}
          className="team-content"
        ></span>
      </div>
    </>
  );
}
