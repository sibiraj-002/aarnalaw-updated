export async function generateMetadata({ params }) {
  console.log("Fetching data for slug:", params.slug);

  const response = await fetch(
    `https://docs.aarnalaw.com/wp-json/wp/v2/industries?embed&slug=${params.slug}`,
  );

  if (!response.ok) {
    console.error("Failed to fetch post data:", response.statusText);
    return {
      title: "Industry-Specific Legal Solutions | Aarna Law",
      description: "Industry-Specific Legal Solutions | Aarna Law",
      metadataBase: new URL("https://www.aarnalaw.com/"),
      openGraph: {
        url: `https://www.aarnalaw.com/industries/${params.slug}`,
        title: "Industry-Specific Legal Solutions | Aarna Law",
        description: "Industry-Specific Legal Solutions | Aarna Law",
        images: [
          {
            url: "/social.png",
            width: 800,
            height: 600,
            alt: "Industry-Specific Legal Solutions | Aarna Law",
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
      ? `${post.acf.meta_title} - Industry-Specific Legal Solutions | Aarna Law`
      : "Industry-Specific Legal Solutions | Aarna Law", // Assuming title is in 'rendered'
    description: post
      ? post.acf.meta_description // Assuming you want the excerpt for the description
      : "Industry-Specific Legal Solutions | Aarna Law",
    metadataBase: new URL("https://www.aarnalaw.com/industries/"),
    openGraph: {
      url: `https://www.aarnalaw.com/industries/${params.slug}`,
      title: post
        ? `${post.acf.meta_title} - Industry-Specific Legal Solutions | Aarna Law`
        : "Industry-Specific Legal Solutions | Aarna Law",
      description: post
        ? post.acf.meta_description // Assuming you want the excerpt for the description
        : "Industry-Specific Legal Solutions | Aarna Law",
      images:
        post && post.acf && post.acf.mobile_banner
          ? [
              {
                url: post.acf.mobile_banner.url, // Adjust to your actual structure
                width: 800,
                height: 600,
                alt:
                  post.acf.meta_title ||
                  "Industry-Specific Legal Solutions | Aarna Law",
              },
            ]
          : [
              {
                url: "/aarna-law.png",
                width: 800,
                height: 600,
                alt: "Industry-Specific Legal Solutions | Aarna Law",
              },
            ],
    },
  };
}

export default function RootLayout({ children }) {
  return <>{children}</>;
}
