export async function generateMetadata({ params }) {
  console.log("Fetching data for slug:", params.slug);

  const response = await fetch(
    `https://docs.aarnalaw.com/wp-json/wp/v2/posts?embed&slug=${params.slug}`,
  );

  if (!response.ok) {
    console.error("Failed to fetch post data:", response.statusText);
    return {
      title: "Aarna News| Aarna Law",
      description: "Aarna News| Aarna Law",
      metadataBase: new URL("https://www.aarnalaw.com/"),
      openGraph: {
        url: `https://www.aarnalaw.com/aarna-news/${params.slug}`,
        title: "Aarna News| Aarna Law",
        description: "Aarna News| Aarna Law",
        images: [
          {
            url: "/aarna-law.png",
            width: 800,
            height: 600,
            alt: "Aarna News| Aarna Law",
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
      ? `${post.acf.meta_title} - Aarna News| Aarna Law`
      : "Aarna News| Aarna Law", // Assuming title is in 'rendered'
    description: post
      ? post.acf.meta_description // Assuming you want the excerpt for the description
      : "Aarna News| Aarna Law",
    metadataBase: new URL("https://www.aarnalaw.com/aarna-news/"),
    openGraph: {
      url: `https://www.aarnalaw.com/aarna-news/${params.slug}`,
      title: post
        ? `${post.acf.meta_title} - Aarna News| Aarna Law`
        : "Aarna News| Aarna Law",
      description: post
        ? post.acf.meta_description // Assuming you want the excerpt for the description
        : "Aarna News| Aarna Law",
      images:
        post && post.acf && post.acf.mobile_banner
          ? [
              {
                url: post.acf.mobile_banner.url, // Adjust to your actual structure
                width: 800,
                height: 600,
                alt: post.acf.meta_title || "Aarna News| Aarna Law",
              },
            ]
          : [
              {
                url: "/aarna-law.png",
                width: 800,
                height: 600,
                alt: "Aarna News| Aarna Law",
              },
            ],
    },
  };
}

export default function RootLayout({ children }) {
  return <>{children}</>;
}
