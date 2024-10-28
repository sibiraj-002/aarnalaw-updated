export async function generateMetadata({ params }) {
  console.log("Fetching data for slug:", params.slug);

  const response = await fetch(
    `https://docs.aarnalaw.com/wp-json/wp/v2/posts?embed&slug=${params.slug}`,
  );

  if (!response.ok) {
    console.error("Failed to fetch post data:", response.statusText);
    return {
      title: "Insights | Aarna Law",
      description: "Insights | Aarna Law",
      metadataBase: new URL("https://www.aarnalaw.com/"),
      openGraph: {
        url: `https://www.aarnalaw.com/insights/${params.slug}`,
        title: "Insights | Aarna Law",
        description: "Insights | Aarna Law",
        images: [
          {
            url: "/aarna-law.png",
            width: 800,
            height: 600,
            alt: "Insights | Aarna Law",
          },
        ],
      },
    };
  }

  const postData = await response.json();

  // Ensure postData has data
  const post = postData[0];

  console.log("Fetched post data:", post);

  return {
    title: post
      ? `${post.acf.meta_title} - Insights | Aarna Law`
      : "Insights | Aarna Law", // Assuming title is in 'rendered'
    description: post
      ? post.acf.meta_description // Assuming you want the excerpt for the description
      : "Insights | Aarna Law",
    metadataBase: new URL("https://www.aarnalaw.com/insights/"),
    openGraph: {
      url: `https://www.aarnalaw.com/insights/${params.slug}`,
      title: post
        ? `${post.acf.meta_title} - Insights | Aarna Law`
        : "Insights | Aarna Law",
      description: post
        ? post.acf.meta_description // Assuming you want the excerpt for the description
        : "Insights | Aarna Law",
      images:
        post && post.acf && post.acf.mobile_banner
          ? [
              {
                url: post.acf.mobile_banner.url, // Adjust to your actual structure
                width: 800,
                height: 600,
                alt: post.acf.meta_title || "Insights | Aarna Law",
              },
            ]
          : [
              {
                url: "/aarna-law.png",
                width: 800,
                height: 600,
                alt: "Insights | Aarna Law",
              },
            ],
    },
  };
}

export default function RootLayout({ children }) {
  return <>{children}</>;
}
