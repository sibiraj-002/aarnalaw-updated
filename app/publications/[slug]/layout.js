export async function generateMetadata({ params }) {
  console.log("Fetching data for slug:", params.slug);

  const response = await fetch(
    `https://docs.aarnalaw.com/wp-json/wp/v2/publications?embed&slug=${params.slug}`,
  );

  if (!response.ok) {
    console.error("Failed to fetch post data:", response.statusText);
    return {
      title: "Publications| Aarna Law",
      description: "Publications| Aarna Law",
      metadataBase: new URL("https://www.aarnalaw.com/"),
      openGraph: {
        url: `https://www.aarnalaw.com/publications/${params.slug}`,
        title: "Publications| Aarna Law",
        description: "Publications| Aarna Law",
        images: [
          {
            url: "/aarna-law.png",
            width: 800,
            height: 600,
            alt: "Publications| Aarna Law",
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
      ? `${post.acf.meta_title} - Publications| Aarna Law`
      : "Publications| Aarna Law", // Assuming title is in 'rendered'
    description: post
      ? post.acf.meta_description // Assuming you want the excerpt for the description
      : "Publications| Aarna Law",
    metadataBase: new URL("https://www.aarnalaw.com/publications/"),
    openGraph: {
      url: `https://www.aarnalaw.com/publications/${params.slug}`,
      title: post
        ? `${post.acf.meta_title} - Publications| Aarna Law`
        : "Publications| Aarna Law",
      description: post
        ? post.acf.meta_description // Assuming you want the excerpt for the description
        : "Publications| Aarna Law",
      images:
        post && post.acf && post.acf.mobile_banner
          ? [
              {
                url: post.acf.mobile_banner.url, // Adjust to your actual structure
                width: 800,
                height: 600,
                alt: post.acf.meta_title || "Publications| Aarna Law",
              },
            ]
          : [
              {
                url: "/aarna-law.png",
                width: 800,
                height: 600,
                alt: "Publications| Aarna Law",
              },
            ],
    },
  };
}

export default function RootLayout({ children }) {
  return <>{children}</>;
}
