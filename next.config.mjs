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
        source: "/copyright-in-fashion-safeguarding-designers-creative-works",
        destination:
          "/insights/copyright-in-fashion-safeguarding-designers-creative-works",
        permanent: true,
      },
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
      {
        source: "/paschimanchal-vidyut-vitran-nigam-limited-v-raman-ispat-private-limited-others",
        destination:
          "insights/paschimanchal-vidyut-vitran-nigam-limited-v-raman-ispat-private-limited-others",
        permanent: true,
      },
      {
        source: "/women-in-leadership-and-ip-nikita-jajodia-nourish-organic-foods",
        destination:
          "insights/women-in-leadership-and-ip-nikita-jajodia-nourish-organic-foods",
        permanent: true,
      },
      {
        source: "/india-reforms-bankruptcy-code",
        destination:
          "insights/india-reforms-bankruptcy-code",
        permanent: true,
      },
      {
        source: "/aircraft-lessors-greater-protection-indian-law",
        destination:
          "insights/aircraft-lessors-greater-protection-indian-law",
        permanent: true,
      },
      {
        source: "/recover-foreign-award-debts-in-india-through-insolvency-proceedings",
        destination:
          "insights/recover-foreign-award-debts-in-india-through-insolvency-proceedings",
        permanent: true,
      },
      {
        source: "/sanket-kumar-agarwal-anr-v-apg-logistics-private-limited",
        destination:
          "insights/sanket-kumar-agarwal-anr-v-apg-logistics-private-limited",
        permanent: true,
      },
      {
        source: "/unlocking-digital-canvas-exploring-rights-transferred-sale-nfts",
        destination:
          "insights/unlocking-digital-canvas-exploring-rights-transferred-sale-nfts",
        permanent: true,
      },
      {
        source: "/macleods-pharmaceuticals-limited-vs-union-of-india-and-others",
        destination:
          "insights/macleods-pharmaceuticals-limited-vs-union-of-india-and-others",
        permanent: true,
      },
      {
        source: "/an-introduction-to-nft",
        destination:
          "insights/an-introduction-to-nft",
        permanent: true,
      },
      {
        source: "/women-in-leadership-vidya-rajarao-founder-fraudopedia",
        destination:
          "insights/women-in-leadership-vidya-rajarao-founder-fraudopedia",
        permanent: true,
      },
      {
        source: "/benefits-mediation-art-cultural-heritage-sector",
        destination:
          "insights/benefits-mediation-art-cultural-heritage-sector",
        permanent: true,
      },
      {
        source: "/m-k-rajagopalan-v-dr-periasamy-palani-gounder",
        destination:
          "insights/m-k-rajagopalan-v-dr-periasamy-palani-gounder",
        permanent: true,
      },
      {
        source: "/when-can-parties-raise-objections-on-jurisdiction",
        destination:
          "insights/when-can-parties-raise-objections-on-jurisdiction",
        permanent: true,
      },
      {
        source: "/fame-game-why-need-more-clarity-on-celebrity-rights",
        destination:
          "insights/fame-game-why-need-more-clarity-on-celebrity-rights",
        permanent: true,
      },
      {
        source: "/indias-nuclear-law-working-towards-a-more-inclusive-framework",
        destination:
          "insights/indias-nuclear-law-working-towards-a-more-inclusive-framework",
        permanent: true,
      },
      {
        source: "/protection-of-cultural-heritage-and-property",
        destination:
          "insights/protection-of-cultural-heritage-and-property",
        permanent: true,
      },
      {
        source: "/kotak-mahindra-bank-ltd-v-narendra-kumar-prajapat-manu-de-3533-2023",
        destination:
          "insights/kotak-mahindra-bank-ltd-v-narendra-kumar-prajapat-manu-de-3533-2023",
        permanent: true,
      },
      {
        source: "/emergency-arbitration-in-india-problem-enforcement",
        destination:
          "insights/emergency-arbitration-in-india-problem-enforcement",
        permanent: true,
      },
      {
        source: "/india-undertakes-review-fast-track-insolvencies",
        destination:
          "insights/india-undertakes-review-fast-track-insolvencies",
        permanent: true,
      },
      {
        source: "/latest-developments-in-insolvency-and-bankruptcy-in-india",
        destination:
          "insights/latest-developments-in-insolvency-and-bankruptcy-in-india",
        permanent: true,
      },
      {
        source: "/challenging-unilateral-appointment-arbitrator",
        destination:
          "insights/challenging-unilateral-appointment-arbitrator",
        permanent: true,
      },
      {
        source: "/world-ip-day-opportunity-celebrate-indian-women",
        destination:
          "insights/world-ip-day-opportunity-celebrate-indian-women",
        permanent: true,
      },
      {
        source: "/arbitration-regimes-applicable-small-and-medium-businesses-in-india",
        destination:
          "insights/arbitration-regimes-applicable-small-and-medium-businesses-in-india",
        permanent: true,
      },
      {
        source: "/aarna-law-contributing-to-model-clauses-for-contracting-in-asia",
        destination:
          "insights/aarna-law-contributing-to-model-clauses-for-contracting-in-asia",
        permanent: true,
      },
      {
        source: "/cti-future-corporation-v-ducgiang-chemical-detergent-powder-joint-stock-company-2",
        destination:
          "insights/cti-future-corporation-v-ducgiang-chemical-detergent-powder-joint-stock-company-2",
        permanent: true,
      },
      {
        source: "/india-must-embrace-the-benefits-of-an-open-legal-market",
        destination:
          "insights/india-must-embrace-the-benefits-of-an-open-legal-market",
        permanent: true,
      },
      {
        source: "/gujarat-benefits-collapse-silicon-valley-bank",
        destination:
          "insights/gujarat-benefits-collapse-silicon-valley-bank",
        permanent: true,
      },
      {
        source: "/why-corporate-governance-matters-for-early-stage-companies",
        destination:
          "insights/why-corporate-governance-matters-for-early-stage-companies",
        permanent: true,
      },
      {
        source: "/case-updatebank-of-baroda-vs-mbl-infrastructuredecided-on-18-january-2022-supreme-court-of-india",
        destination:
          "insights/case-updatebank-of-baroda-vs-mbl-infrastructuredecided-on-18-january-2022-supreme-court-of-india",
        permanent: true,
      },
      {
        source: "/case-update-messer-griesheim-gmbh-v-goyal-mg-gases-private-limited",
        destination:
          "insights/case-update-messer-griesheim-gmbh-v-goyal-mg-gases-private-limited",
        permanent: true,
      },
      {
        source: "/case-update-m-s-pathanjali-ayurved-ltd-anr-vs-arudra-engineers-pvt-ltd",
        destination:
          "insights/case-update-m-s-pathanjali-ayurved-ltd-anr-vs-arudra-engineers-pvt-ltd",
        permanent: true,
      },
    
      {
        source: "/india-and-bilateral-investment-treaties-a-summary-of-the-recommendations-in-the-10th-report-of-the-committee-on-external-affairs-ministry-of-external-affairs",
        destination:
          "insights/india-and-bilateral-investment-treaties-a-summary-of-the-recommendations-in-the-10th-report-of-the-committee-on-external-affairs-ministry-of-external-affairs",
        permanent: true,
      },
      {
        source: "/case-update-future-v-amazonan-overview-of-recent-legal-developments",
        destination:
          "insights/case-update-future-v-amazonan-overview-of-recent-legal-developments",
        permanent: true,
      },
      {
        source: "/case-update-ebix-singapore-private-limited-and-ors-v-committee-of-creditors-of-educomp-solutions-limited-and-ors",
        destination:
          "insights/case-update-ebix-singapore-private-limited-and-ors-v-committee-of-creditors-of-educomp-solutions-limited-and-ors",
        permanent: true,
      },
      {
        source: "/case-update-arcelor-mittal-nippon-steel-india-ltd-v-essar-bulk-terminal-ltd",
        destination:
          "insights/case-update-arcelor-mittal-nippon-steel-india-ltd-v-essar-bulk-terminal-ltd",
        permanent: true,
      },
      {
        source: "/case-update-m-s-p-n-garg-engineers-contractors-v-chief-engineer-bhopal-zone-sultania-infantry-lines-bhopal",
        destination:
          "insights/case-update-m-s-p-n-garg-engineers-contractors-v-chief-engineer-bhopal-zone-sultania-infantry-lines-bhopal",
        permanent: true,
      },
      {
        source: "/uncitral-expedited-arbitration-rules-2021",
        destination:
          "insights/uncitral-expedited-arbitration-rules-2021",
        permanent: true,
      },
      {
        source: "/gemini-bay-transcription-pvt-ltd-v-integrated-sales-service-ltd-anr-2021-scc-online-sc-572",
        destination:
          "insights/gemini-bay-transcription-pvt-ltd-v-integrated-sales-service-ltd-anr-2021-scc-online-sc-572",
        permanent: true,
      },
      {
        source: "/case-updatekay-bouvet-engineering-ltd-vs-overseas-infrastructure-alliance",
        destination:
          "insights/case-updatekay-bouvet-engineering-ltd-vs-overseas-infrastructure-alliance",
        permanent: true,
      },
      {
        source: "/case-update-the-project-director-national-highways-no-45-e-and-220-national-highways-authority-of-india-v-m-hakeem-anr",
        destination:
          "insights/case-update-the-project-director-national-highways-no-45-e-and-220-national-highways-authority-of-india-v-m-hakeem-anr",
        permanent: true,
      },
      {
        source: "/the-eus-accession-to-the-2019-convention-on-the-recognition-and-enforcement-of-foreign-judgments-in-civil-or-commercial-matters",
        destination:
          "insights/the-eus-accession-to-the-2019-convention-on-the-recognition-and-enforcement-of-foreign-judgments-in-civil-or-commercial-matters",
        permanent: true,
      },
      {
        source: "/amazon-com-nv-investment-holdings-llc-v-future-retail-ltd-and-ors",
        destination:
          "insights/amazon-com-nv-investment-holdings-llc-v-future-retail-ltd-and-ors",
        permanent: true,
      },
      {
        source: "/case-updateorator-marketing-pvt-ltd-v-samtex-desinz-pvt-ltd",
        destination:
          "insights/case-updateorator-marketing-pvt-ltd-v-samtex-desinz-pvt-ltd",
        permanent: true,
      },
      {
        source: "/case-update-m-s-imz-corporate-pvt-ltd-v-msd-telematics-pvt-ltd",
        destination:
          "insights/case-update-m-s-imz-corporate-pvt-ltd-v-msd-telematics-pvt-ltd",
        permanent: true,
      },
      {
        source: "/analysis-of-the-provisions-for-insolvency-process-against-personal-guarantors-under-the-code",
        destination:
          "insights/analysis-of-the-provisions-for-insolvency-process-against-personal-guarantors-under-the-code",
        permanent: true,
      },
      {
        source: "/case-update-steel-authority-of-india-limited-sail-v-jaldhi-overseas-pte-ltd-jopl",
        destination:
          "insights/case-update-steel-authority-of-india-limited-sail-v-jaldhi-overseas-pte-ltd-jopl",
        permanent: true,
      },
      {
        source: "/pre-package-insolvency-resolution-process",
        destination:
          "insights/pre-package-insolvency-resolution-process",
        permanent: true,
      },
      {
        source: "/comparative-analysis-of-the-conflict-between-insolvency-and-bankruptcy-laws-money-laundering-laws-for-attachment-of-properties",
        destination:
          "insights/comparative-analysis-of-the-conflict-between-insolvency-and-bankruptcy-laws-money-laundering-laws-for-attachment-of-properties",
        permanent: true,
      },
      {
        source: "/interdigital-technology-corporation-v-xiaomi-corporation",
        destination:
          "insights/interdigital-technology-corporation-v-xiaomi-corporation",
        permanent: true,
      },
      {
        source: "/simc-and-icsid-cooperation-agreement-2",
        destination:
          "insights/simc-and-icsid-cooperation-agreement-2",
        permanent: true,
      },
      {
        source: "/pasl-v-ge-power-indian-parties-choosing-foreign-seat",
        destination:
          "insights/pasl-v-ge-power-indian-parties-choosing-foreign-seat",
        permanent: true,
      },
      {
        source: "/future-v-amazon-emergency-arbitrators-award-execution",
        destination:
          "insights/future-v-amazon-emergency-arbitrators-award-execution",
        permanent: true,
      },
      {
        source: "/small-scale-industrial-manufacturers-association-regd-v-uoi",
        destination:
          "insights/small-scale-industrial-manufacturers-association-regd-v-uoi",
        permanent: true,
      },
      {
        source: "/amway-india-enterprises-ltd-v-ravindranath-rao-sindhia-anr-2",
        destination:
          "insights/amway-india-enterprises-ltd-v-ravindranath-rao-sindhia-anr-2",
        permanent: true,
      },
      {
        source: "/the-future-v-amazon-story-so-far-2",
        destination:
          "insights/the-future-v-amazon-story-so-far-2",
        permanent: true,
      },
      {
        source: "/v-m-mathew-v-nhai-ors",
        destination:
          "insights/v-m-mathew-v-nhai-ors",
        permanent: true,
      },
      {
        source: "/the-arbitration-and-conciliation-amendment-bill-2021",
        destination:
          "insights/the-arbitration-and-conciliation-amendment-bill-2021",
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
      {
        source: "/aarna-law-participates-in-inta-annual-meeting-2023-singapore",
        destination:
          "/aarna-news/aarna-law-participates-in-inta-annual-meeting-2023-singapore",
        permanent: true,
      },
      {
        source: "/shreyas-jayasimha-appointed-expert-committee",
        destination:
          "/aarna-news/shreyas-jayasimha-appointed-expert-committee",
        permanent: true,
      },
      {
        source: "/shreyas-jayasimha-speaks-on-cross-border-insolvency-for-smu-masterclass",
        destination:
          "/aarna-news/shreyas-jayasimha-speaks-on-cross-border-insolvency-for-smu-masterclass",
        permanent: true,
      },
      {
        source: "/aarna-law-participates-siac-bengaluru-conference-2023",
        destination:
          "/aarna-news/aarna-law-participates-siac-bengaluru-conference-2023",
        permanent: true,
      },
      {
        source: "/aarna-law-hosts-singapore-international-arbitration-centre-in-bangalore",
        destination:
          "/aarna-news/aarna-law-hosts-singapore-international-arbitration-centre-in-bangalore",
        permanent: true,
      },
      {
        source: "/aarna-law-contributing-to-model-clauses-for-contracting-in-asia",
        destination:
          "/aarna-news/aarna-law-contributing-to-model-clauses-for-contracting-in-asia",
        permanent: true,
      },
      {
        source: "/aarna-law-welcomes-partner-apoorva-guruprasad",
        destination:
          "/aarna-news/aarna-law-welcomes-partner-apoorva-guruprasad",
        permanent: true,
      },
     
    ];
  },
};

export default nextConfig;