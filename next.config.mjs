/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "docs.aarnalaw.com",
      },
      {
        protocol: "https",
        hostname: "aarnalaw.com",
      },
      {
        protocol: "https",
        hostname: "www.aarnalaw.com",
      },
    ],
  },

  async redirects() {
    return [
      // Insights
      {
        source: "/government-alerts-ip-applicants-about-fraudulent-activities",
        destination:
          "/insights/government-alerts-ip-applicants-about-fraudulent-activities",
        permanent: true,
      },
      {
        source: "/google-loses-landmark-antitrust-case-over-search-monopoly",
        destination:
          "/insights/google-loses-landmark-antitrust-case-over-search-monopoly",
        permanent: true,
      },
      {
        source:
          "/wipo-unveils-new-treaty-on-genetic-resources-and-traditional-knowledge",
        destination:
          "/insights/wipo-unveils-new-treaty-on-genetic-resources-and-traditional-knowledge",
        permanent: true,
      },
      {
        source: "/how-mediation-is-revolutionizing-ip-disputes",
        destination: "/insights/how-mediation-is-revolutionizing-ip-disputes",
        permanent: true,
      },
      {
        source:
          "/the-union-budget-financial-year-2024-2025-the-aarna-law-perspective",
        destination:
          "/insights/the-union-budget-financial-year-2024-2025-the-aarna-law-perspective",
        permanent: true,
      },
      {
        source: "/ai-criminal-liability-and-financial-crimes",
        destination: "/insights/ai-criminal-liability-and-financial-crimes",
        permanent: true,
      },
      {
        source: "/does-copyright-exist-for-ai-generated-content",
        destination: "/insights/does-copyright-exist-for-ai-generated-content",
        permanent: true,
      },
      {
        source:
          "/a-companys-assets-cannot-be-targeted-once-it-has-gone-through-the-insolvency-process",
        destination:
          "/insights/a-companys-assets-cannot-be-targeted-once-it-has-gone-through-the-insolvency-process",
        permanent: true,
      },
      {
        source: "/emerging-trends-in-insolvency-litigation",
        destination: "/insights/emerging-trends-in-insolvency-litigation",
        permanent: true,
      },
      {
        source: "/fintech-revolutionizing-lives-amid-regulatory-uncertainty",
        destination:
          "/insights/fintech-revolutionizing-lives-amid-regulatory-uncertainty",
        permanent: true,
      },

      //Aarna News
      {
        source: "/aarna-law-is-pleased-to-announce-the-appointment-of-srihari-saranathan-as-partner",
        destination:
          "/aarna-news/aarna-law-is-pleased-to-announce-the-appointment-of-srihari-saranathan-as-partner",
        permanent: true,
      },
      {
        source: "/aarna-law-is-pleased-to-announce-the-appointment-of-meghna-talwar-as-partner",
        destination:
          "/aarna-news/aarna-law-is-pleased-to-announce-the-appointment-of-meghna-talwar-as-partner",
        permanent: true,
      },
      {
        source: "/aarna-law-brings-on-board-an-experienced-compliance-professional-and-qualified-lawyer-from-standard-chartered-bank",
        destination:
          "/aarna-news/aarna-law-brings-on-board-an-experienced-compliance-professional-and-qualified-lawyer-from-standard-chartered-bank",
        permanent: true,
      },
      {
        source: "/aarna-law-announces-new-partner",
        destination:
          "/aarna-news/aarna-law-announces-new-partner",
        permanent: true,
      },
      {
        source: "/aarna-law-celebrates-10th-anniversary",
        destination:
          "/aarna-news/aarna-law-celebrates-10th-anniversary",
        permanent: true,
      },
      {
        source: "/thank-you-for-joining-us",
        destination:
          "/aarna-news/thank-you-for-joining-us",
        permanent: true,
      },
      {
        source: "/international-trade-shipping-commodity-arbitration-arbitrability-of-corporate-disputes",
        destination:
          "/aarna-news/international-trade-shipping-commodity-arbitration-arbitrability-of-corporate-disputes",
        permanent: true,
      },
      {
        source: "/shreyas-jayasimha-speaks-at-net-zero-warriors-entrepreneurs-driving-energy-transition",
        destination:
          "/aarna-news/shreyas-jayasimha-speaks-at-net-zero-warriors-entrepreneurs-driving-energy-transition",
        permanent: true,
      },
      {
        source: "/anusha-madhusudhan-selected-for-judicial-fellowship-programme",
        destination:
          "/aarna-news/anusha-madhusudhan-selected-for-judicial-fellowship-programme",
        permanent: true,
      },


    ];
  },
};

export default nextConfig;
