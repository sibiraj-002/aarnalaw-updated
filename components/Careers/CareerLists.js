"use client";
import React, { useState, useEffect, useCallback } from "react";
import { initFlowbite } from "flowbite";
import ContactModal from "@/components/ModalContact/page";
import configData from "../../config.json";

function PracticeLists() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(100);

  const domain = typeof window !== "undefined" ? window.location.hostname : "";

  const fetchContent = useCallback(async () => {
    setLoading(true);
    try {
      let server;
      if (domain === `${configData.LIVE_SITE_URL}`) {
        server = `${configData.LIVE_PRODUCTION_SERVER_ID}`;
      } else if (domain === `${configData.STAGING_SITE_URL}`) {
        server = `${configData.STAG_PRODUCTION_SERVER_ID}`;
      } else {
        server = `${configData.STAG_PRODUCTION_SERVER_ID}`;
      }

      const practiceAreaResponse = await fetch(
        `${configData.SERVER_URL}jobs?_embed&status[]=publish&production_mode[]=${server}&per_page=${page}`,
      );

      const practiceAreaData = await practiceAreaResponse.json();

      if (practiceAreaData.length === 0) {
        setHasMore(false);
      } else {
        const sortedData = practiceAreaData.sort(
          (a, b) => new Date(b.date) - new Date(a.date),
        );
        setData(sortedData);
        setHasMore(practiceAreaData.length === page); // Check if more pages are available
      }

      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  }, [page, domain]);

  useEffect(() => {
    fetchContent();
  }, [page, fetchContent]);

  return (
    <div>
      <div className="mx-auto w-11/12 py-12">
        <p className="py-4 text-center font-bold text-gray-500">
          CAREERS AT AARNA LAW
        </p>
        <p className="mx-auto text-center text-3xl lg:w-8/12">
          Be a part of a dynamic law practice with an <br />
          international outlook
        </p>

        <p className="pt-12">
          Aarna Law is an India-based international legal advisory rooted in
          dharmic principles of natural law, justice, and compassion. Through
          our wide range of practice areas, we provide progressive legal counsel
          to a clientele that spans Nation States, International Organisations,
          Multinational Companies, Niche Start-ups, and Individual Interests.
        </p>
        <p className="py-8 font-semibold text-custom-blue">
          RECRUITMENT FOR LEGAL AND ADMINISTRATIVE PROFESSIONALS
        </p>
        <p>
          We are always interested to hear from professionals with international
          experience, significant academic achievements, publications in
          peer-reviewed journals, or other demonstrations of astute legal
          skills. We are also interested in innovative and competent admin and
          support team members. If you are a team player with a spirit of
          service and a passion for excellence in the law, please get in touch.
        </p>

        <div className="py-12">
          <h2 className="border-b-2 border-custom-red pb-4 text-3xl font-semibold text-custom-blue">
            Current Openings
          </h2>
          <div
            id="accordion-flush"
            data-accordion="collapse"
            data-active-classes="bg-white text-gray-900"
            data-inactive-classes="text-custom-blue"
          >
            {data.map((item, index) => (
              <div key={index}>
                <h2 id={`accordion-flush-heading-${index}`}>
                  <button
                    type="button"
                    className="flex w-full items-center justify-between gap-3 border-b border-gray-200 py-5 text-lg font-medium text-custom-blue dark:border-gray-700 dark:text-gray-400"
                    data-accordion-target={`#accordion-flush-body-${index}`}
                    aria-expanded="false"
                    aria-controls={`accordion-flush-body-${index}`}
                    onClick={() =>
                      document
                        .querySelector(`#accordion-flush-body-${index}`)
                        .classList.toggle("hidden")
                    }
                  >
                    <span
                      dangerouslySetInnerHTML={{ __html: item.title.rendered }}
                    ></span>
                    <svg
                      className="size-3 shrink-0"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 10 6"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9 5 5 1 1 5"
                      />
                    </svg>
                  </button>
                </h2>
                <div
                  id={`accordion-flush-body-${index}`}
                  className="hidden"
                  aria-labelledby={`accordion-flush-heading-${index}`}
                >
                  <div className="border-b border-gray-200 py-5 dark:border-gray-700">
                    <p
                      className="careers mb-2 text-black dark:text-gray-400"
                      dangerouslySetInnerHTML={{
                        __html:
                          item.content?.rendered || "No content available.",
                      }}
                    />
                  </div>
                </div>
              </div>
            ))}

            <div className="flex w-full justify-start">
              <ContactModal
                btnName="Apply Now"
                textColor="text-custom-red"
                modalTitle="Current Openings"
                btnType="career"
                id="career"
              />
            </div>
          </div>
        </div>

        <div>
          <h2 className="border-b-2 border-custom-red pb-4 text-3xl font-semibold text-custom-blue">
            Internships
          </h2>
          <p className="pt-8">
            At Aarna, we offer an internship experience that is enriching and
            challenging. We look for more than a strong academic record; we seek
            individuals who are motivated, eager to learn, and share the same
            values as the firm. We pride ourselves in the diversity of interns
            and the opportunities we’ve offered to students from all over the
            country.
          </p>{" "}
          <p className="pt-4">
            The internship period is 4-8 weeks. Interns have the opportunity to
            work with our disputes, insolvency law as well as our corporate
            advisory teams. During the internship period, the intern has a
            unique opportunity to get a practical insight into various aspects
            of our practice areas. Each intern is assigned a supervisor;
            however, they are expected to work with all teams in order to get a
            holistic experience.
          </p>
          <p className="pt-4">
            {" "}
            Our interns are expected to be aware of recent developments in the
            law in our practice areas. Each intern is assigned a topic to
            research on and at the end of the term, the intern is expected to
            make a presentation before the partners and all associates.
          </p>
          <p className="pt-4">
            {" "}
            We do not accept internship applications from students who are in
            the first and second year of the BA LLB (Hons.) programme and the 3
            year LLB programme.
          </p>
        </div>
        <div className="flex w-full justify-start">
          <ContactModal
            btnName="Apply Now"
            textColor="text-custom-red"
            modalTitle="Internships"
            btnType="internships"
            id="internships"
          />
        </div>
      </div>
    </div>
  );
}

export default PracticeLists;
