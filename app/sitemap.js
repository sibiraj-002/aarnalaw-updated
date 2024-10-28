// app/api/sitemap/route.js
export default async function sitemap() {
  const mainUrl = "https://www.aarnalaw.com/";
  const pages = [
    "about-us",
    "practice-area",
    "industries",
    "insights",
    "aarna-news",
    "publications",
    "podcasts",
    "careers",
    "contact-us",
  ];

  // Generate static URLs dynamically from the pages array
  const staticUrls = [
    {
      url: mainUrl,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 1,
    },
    ...pages.map((page) => ({
      url: `${mainUrl}${page}`, // Dynamically constructing the URL
      lastModified: new Date(),
      changeFrequency: "monthly", // Adjust this as needed
      priority: 0.8, // Adjust this as needed
    })),
  ];

  // Dynamic URLs from APIs
  const apiUrls = [];

  // List of your APIs
  const apis = [
    "https://docs.aarnalaw.com/wp-json/wp/v2/practice-areas?_embed&per_page=100",
    "https://docs.aarnalaw.com/wp-json/wp/v2/industries?_embed&per_page=100",
    "https://docs.aarnalaw.com/wp-json/wp/v2/posts?_embed&per_page=100&categories=13",
    "https://docs.aarnalaw.com/wp-json/wp/v2/posts?_embed&per_page=100&categories=9",
    "https://docs.aarnalaw.com/wp-json/wp/v2/publications?_embed&per_page=100",
    "https://docs.aarnalaw.com/wp-json/wp/v2/podcasts?_embed&per_page=100",
  ];

  // Fetch data from each API
  for (const api of apis) {
    const response = await fetch(api);
    if (response.ok) {
      const data = await response.json();
      console.log(data);
      // Extract URLs from the data and replace domain
      data.forEach((item) => {
        if (item.link) {
          // Replace the base URL with the desired URL
          const modifiedUrl = item.link.replace(
            "https://docs.aarnalaw.com",
            mainUrl,
          );
          apiUrls.push({
            url: modifiedUrl, // Use the modified URL
            lastModified: new Date(),
            changeFrequency: "daily", // Change based on your preference
            priority: 0.6, // Change based on your preference
          });
        }
      });
    }
  }

  // Combine static and dynamic URLs
  const sitemapUrls = [...staticUrls, ...apiUrls];

  return sitemapUrls;
}
