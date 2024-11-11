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
        source: "/art-as-collateral-a-growing-trend-in-secured-lending",
        destination:
          "/insights/art-as-collateral-a-growing-trend-in-secured-lending",
        permanent: true,
      },
      {
        source: "/regulatory-intervention-in-the-indian-financial-sector-analyzing-the-rbis-actions-against-the-lending-practices-of-a-few-nbfcs",
        destination:
          "/insights/regulatory-intervention-in-the-indian-financial-sector-analyzing-the-rbis-actions-against-the-lending-practices-of-a-few-nbfcs",
        permanent: true,
      },
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

      //
      {
        source: "/the-role-of-an-executive-director",
        destination:
          "/insights/the-role-of-an-executive-director",
        permanent: true,
      },
      {
        source: "/supreme-courts-clarifies-the-meaning-of-a-financial-debt-in-insolvency-proceedings",
        destination:
          "/insights/supreme-courts-clarifies-the-meaning-of-a-financial-debt-in-insolvency-proceedings",
        permanent: true,
      },
      {
        source: "/how-final-is-final-a-recent-decision-by-indias-supreme-court-has-set-out-the-special-conditions-in-which-an-arbitral-award-can-be-reviewed-because-of-a-miscarriage-of-justice`",
        destination:
          "/insights/how-final-is-final-a-recent-decision-by-indias-supreme-court-has-set-out-the-special-conditions-in-which-an-arbitral-award-can-be-reviewed-because-of-a-miscarriage-of-justice`",
        permanent: true,
      },
      {
        source: "/when-can-a-party-claim-confidentiality-for-an-arbitration",
        destination:
          "/insights/when-can-a-party-claim-confidentiality-for-an-arbitration",
        permanent: true,
      },
      {
        source: "/new-act-seeks-to-prevent-the-misuse-of-data-in-india",
        destination:
          "/insights/new-act-seeks-to-prevent-the-misuse-of-data-in-india",
        permanent: true,
      },
      {
        source: "/case-update-itc-limited-virginia-house-ors-v-britannia-industries-ltd",
        destination:
          "/insights/case-update-itc-limited-virginia-house-ors-v-britannia-industries-ltd",
        permanent: true,
      },
      {
        source: "/women-in-leadership-and-ip-ms-stuti-agarwal-of-ontum-education",
        destination:
          "/insights/women-in-leadership-and-ip-ms-stuti-agarwal-of-ontum-education",
        permanent: true,
      },
      {
        source: "/intellectual-property-in-cricket",
        destination:
          "/insights/intellectual-property-in-cricket",
        permanent: true,
      },
      {
        source: "/bharat-road-carrier-private-limited-v-rasna-private-limited",
        destination:
          "/insights/bharat-road-carrier-private-limited-v-rasna-private-limited",
        permanent: true,
      },
      {
        source: "/new-regulations-offer-opportunity-for-fast-track-and-emergency-arbitrations",
        destination:
          "/insights/new-regulations-offer-opportunity-for-fast-track-and-emergency-arbitrations",
        permanent: true,
      },
      {
        source: "/fintech-revolutionizing-lives-amid-regulatory-uncertainty",
        destination:
          "/insights/fintech-revolutionizing-lives-amid-regulatory-uncertainty",
        permanent: true,
      },
      {
        source: "/john-maxwell-morgan-v-mcmillan-investment-holdings-pty-ltd",
        destination:
          "/insights/john-maxwell-morgan-v-mcmillan-investment-holdings-pty-ltd",
        permanent: true,
      },
      {
        source: "/parekh-plastichem-distributors-llp-vs-simplex-infrastructure-limited",
        destination:
          "/insights/parekh-plastichem-distributors-llp-vs-simplex-infrastructure-limited",
        permanent: true,
      },
      {
        source: "/case-update-anupam-mittal-vs-people-interactive-india-pvt-ltd-and-others",
        destination:
          "/insights/case-update-anupam-mittal-vs-people-interactive-india-pvt-ltd-and-others",
        permanent: true,
      },
      {
        source: "/how-artificial-intelligence-can-assist-insolvency-practitioners",
        destination:
          "/insights/how-artificial-intelligence-can-assist-insolvency-practitioners",
        permanent: true,
      },
      {
        source: "/why-traditional-knowledge-needs-better-ip-protection",
        destination:
          "/insights/why-traditional-knowledge-needs-better-ip-protection",
        permanent: true,
      },
      {
        source: "/treatment-of-non-compete-non-solicitation-covenants-in-the-eyes-of-the-courts-in-singapore-and-india",
        destination:
          "/insights/treatment-of-non-compete-non-solicitation-covenants-in-the-eyes-of-the-courts-in-singapore-and-india",
        permanent: true,
      },
      {
        source: "/recent-developments-in-indian-insolvency-law",
        destination:
          "/insights/recent-developments-in-indian-insolvency-law",
        permanent: true,
      },
      {
        source: "/indian-parliament-approves-new-mediation-bill",
        destination:
          "/insights/indian-parliament-approves-new-mediation-bill",
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
