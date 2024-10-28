export async function generateMetadata({ params }) {
  console.log("Fetching data for slug:", params.slug);

  const response = await fetch(
    `https://docs.aarnalaw.com/wp-json/wp/v2/practice-areas?embed&slug=${params.slug}`,
  );

  if (!response.ok) {
    console.error("Failed to fetch post data:", response.statusText);
    return {
      title:
        "India's leading law firm offering legal counsel in practice areas",
      description:
        "We offer legal services for a range of practice areas including corporate advisory, arbitration, mediation, litigation, IP, risk assessment, and compliance",
      metadataBase: new URL("https://www.aarnalaw.com/"),
      openGraph: {
        url: `https://www.aarnalaw.com/practice-area/${params.slug}`,
        title:
          "India's leading law firm offering legal counsel in practice areas",
        description:
          "We offer legal services for a range of practice areas including corporate advisory, arbitration, mediation, litigation, IP, risk assessment, and compliance",
        images: [
          {
            url: "/aarna-law.png",
            width: 800,
            height: 600,
            alt: "India's leading law firm offering legal counsel in practice areas",
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
      ? `${post.acf.meta_title} - India's leading law firm offering legal counsel in practice areas`
      : "India's leading law firm offering legal counsel in practice areas", // Assuming title is in 'rendered'
    description: post
      ? post.acf.meta_description // Assuming you want the excerpt for the description
      : "India's leading law firm offering legal counsel in practice areas",
    metadataBase: new URL("https://www.aarnalaw.com/practice-area/"),
    openGraph: {
      url: `https://www.aarnalaw.com/practice-area/${params.slug}`,
      title: post
        ? `${post.acf.meta_title} - India's leading law firm offering legal counsel in practice areas`
        : "India's leading law firm offering legal counsel in practice areas",
      description: post
        ? post.acf.meta_description // Assuming you want the excerpt for the description
        : "India's leading law firm offering legal counsel in practice areas",
      images:
        post && post.acf && post.acf.mobile_banner
          ? [
              {
                url: post.acf.mobile_banner.url, // Adjust to your actual structure
                width: 800,
                height: 600,
                alt:
                  post.acf.meta_title ||
                  "India's leading law firm offering legal counsel in practice areas",
              },
            ]
          : [
              {
                url: "/aarna-law.png",
                width: 800,
                height: 600,
                alt: "India's leading law firm offering legal counsel in practice areas",
              },
            ],
    },
  };
}

export default function RootLayout({ children }) {
  return <>{children}</>;
}
