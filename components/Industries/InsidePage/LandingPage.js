"use client";
import React, { useEffect, useState } from "react";
import Banner from "@/components/Industries/InsidePage/Banner";
import PostDetails from "@/components/Industries/InsidePage/PostDetails";

const LandingPage = ({ slug }) => {
  const [data, setData] = useState(null);
  const [featureImage, setFeatureImage] = useState();
  const [mobileBanner, setmobileBanner] = useState();
  const [title, setTitle] = useState();
  const [description, setDescription] = useState();
  const [partnersData, setPartnersData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://docs.aarnalaw.com/wp-json/wp/v2/industries?_embed&slug=${slug}`,
        );
        const data = await response.json();
        const practiceArea = data[0];

        console.log("seo title", data);

        setFeatureImage(practiceArea.acf.banner_image.url);
        setmobileBanner(practiceArea.acf.mobile_banner.url);
        setTitle(practiceArea.title.rendered);
        setDescription(practiceArea.acf.description);

        // Combine partner-related data, filtering out empty or invalid fields
        const partnerDesignations = [
          practiceArea.acf.partner_designation,
          practiceArea.acf.partner_designation_2,
          practiceArea.acf.partner_designation_3,
        ].filter((designation) => designation); // Filters out falsy values (e.g., empty strings or null)

        const partnerImages = [
          practiceArea.acf.partner_image?.url,
          practiceArea.acf.partner_image_2?.url,
          practiceArea.acf.partner_image_3?.url,
        ].filter((image) => image); // Filters out falsy values (e.g., undefined)

        const partnerNames = [
          practiceArea.acf.partner_name,
          practiceArea.acf.partner_name_2,
          practiceArea.acf.partner_name_3,
        ].filter((name) => name); // Filters out falsy values (e.g., empty strings)

        setPartnersData({
          partnerDesignations,
          partnerImages,
          partnerNames,
        });

        setData(practiceArea);

        // console.log("Filtered partners data", {
        //   partnerDesignations,
        //   partnerImages,
        //   partnerNames,
        // });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [slug]);

  return (
    <div>
      <Banner
        backgroundImage={featureImage}
        titleText={title}
        mobileBackgroundImage={mobileBanner}
      />
      <PostDetails
        details={description}
        partnersData={partnersData}
        slug={slug}
        title={title}
      />
    </div>
  );
};

export default LandingPage;
