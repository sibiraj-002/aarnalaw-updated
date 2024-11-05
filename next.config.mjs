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
      {
        source: '/government-alerts-ip-applicants-about-fraudulent-activities',
        destination: '/insights/government-alerts-ip-applicants-about-fraudulent-activities',
        permanent: true, // Set to true for a 308 permanent redirect; false for a 307 temporary redirect
      },
      {
        source: '/google-loses-landmark-antitrust-case-over-search-monopoly',
        destination: '/insights/google-loses-landmark-antitrust-case-over-search-monopoly',
        permanent: true, // Set to true for a 308 permanent redirect; false for a 307 temporary redirect
      },
      {
        source: '/wipo-unveils-new-treaty-on-genetic-resources-and-traditional-knowledge',
        destination: '/insights/wipo-unveils-new-treaty-on-genetic-resources-and-traditional-knowledge',
        permanent: true, // Set to true for a 308 permanent redirect; false for a 307 temporary redirect
      },
      {
        source: '/how-mediation-is-revolutionizing-ip-disputes',
        destination: '/insights/how-mediation-is-revolutionizing-ip-disputes',
        permanent: true, // Set to true for a 308 permanent redirect; false for a 307 temporary redirect
      },
      {
        source: '/the-union-budget-financial-year-2024-2025-the-aarna-law-perspective',
        destination: '/insights/the-union-budget-financial-year-2024-2025-the-aarna-law-perspective',
        permanent: true, // Set to true for a 308 permanent redirect; false for a 307 temporary redirect
      },
      {
        source: '/ai-criminal-liability-and-financial-crimes',
        destination: '/insights/ai-criminal-liability-and-financial-crimes',
        permanent: true, // Set to true for a 308 permanent redirect; false for a 307 temporary redirect
      },
      {
        source: '/does-copyright-exist-for-ai-generated-content',
        destination: '/insights/does-copyright-exist-for-ai-generated-content',
        permanent: true, // Set to true for a 308 permanent redirect; false for a 307 temporary redirect
      },
      {
        source: '/a-companys-assets-cannot-be-targeted-once-it-has-gone-through-the-insolvency-process',
        destination: '/insights/a-companys-assets-cannot-be-targeted-once-it-has-gone-through-the-insolvency-process',
        permanent: true, // Set to true for a 308 permanent redirect; false for a 307 temporary redirect
      },
      {
        source: '/emerging-trends-in-insolvency-litigation',
        destination: '/insights/emerging-trends-in-insolvency-litigation',
        permanent: true, // Set to true for a 308 permanent redirect; false for a 307 temporary redirect
      },
      {
        source: '/fintech-revolutionizing-lives-amid-regulatory-uncertainty',
        destination: '/insights/fintech-revolutionizing-lives-amid-regulatory-uncertainty',
        permanent: true, // Set to true for a 308 permanent redirect; false for a 307 temporary redirect
      },
    ];
  },
};

export default nextConfig;
