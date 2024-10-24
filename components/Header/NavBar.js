"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { HeaderMenu } from "../../utils/data";
import SearchModal from "@/components/Header/SearchModal";

export default function NavBar() {
  const router = usePathname();

  // Define the URLs that should highlight the "News & Insights" menu
  const newsPaths = ["/aarna-news", "/insight", "/publication", "/podcast"];

  return (
    <div className="relative z-50 mx-auto w-11/12">
      <nav className="absolute z-50 mx-auto mt-10 w-full border border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-900">
        <div className="mx-auto flex max-w-screen-xl flex-wrap items-center justify-between p-4">
          <Link href="/" className="flex items-center">
            <Image
              src="/logo/logo.svg"
              className="h-6 w-48"
              alt="Aarna Law"
              width={300}
              height={300}
            />
          </Link>

          <button
            data-collapse-toggle="navbar-dropdown"
            type="button"
            className="inline-flex size-10 items-center justify-center rounded-lg p-2 text-sm text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600 md:hidden"
            aria-controls="navbar-dropdown"
            aria-expanded="false"
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="size-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>
          <div
            className="hidden w-full md:block md:w-auto"
            id="navbar-dropdown"
          >
            <ul className="mt-4 flex flex-col rounded-lg border border-gray-100 bg-gray-50 p-4 font-medium dark:border-gray-700 dark:bg-gray-800 md:mt-0 md:flex-row md:space-x-8 md:border-0 md:bg-white md:p-0 md:dark:bg-gray-900 rtl:space-x-reverse">
              {HeaderMenu.map((item, index) => (
                <li key={index}>
                  {item.subMenu ? (
                    <>
                      <button
                        id={`dropdownNavbarLink${index}`}
                        data-dropdown-toggle={`dropdownNavbar${index}`}
                        className={`flex w-full items-center justify-between rounded px-3 py-2  hover:bg-gray-100 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700 dark:focus:text-white md:w-auto md:border-0 md:p-0 md:hover:bg-transparent md:hover:text-custom-red md:dark:hover:bg-transparent md:dark:hover:text-custom-red ${
                          item.menu === "News & Insights" &&
                          newsPaths.includes(router)
                            ? " text-custom-red dark:bg-gray-700"
                            : "text-gray-900"
                        }`}
                      >
                        {item.menu}{" "}
                        <svg
                          className="ms-2.5 size-2.5"
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
                            d="m1 1 4 4 4-4"
                          />
                        </svg>
                      </button>
                      <div
                        id={`dropdownNavbar${index}`}
                        className="z-10 hidden w-44 divide-y divide-gray-100 rounded-lg bg-white font-normal shadow dark:divide-gray-600 dark:bg-gray-700"
                      >
                        <ul className="py-2 text-sm text-gray-700 dark:text-gray-400">
                          {item.subMenu.map((subItem, subIndex) => (
                            <li key={subIndex}>
                              <Link
                                href={`/${subItem.name.toLowerCase().replace(/\s+/g, "-")}`}
                                className={`block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white ${
                                  router ===
                                  `/${subItem.name.toLowerCase().replace(/\s+/g, "-")}`
                                    ? "bg-gray-100 text-custom-red dark:bg-gray-700"
                                    : ""
                                }`}
                              >
                                {subItem.name}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </>
                  ) : (
                    <Link
                      href={`${item.slug}`}
                      key={item.slug}
                      className={`block rounded px-3 py-2  hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:border-0 md:p-0 md:hover:bg-transparent md:hover:text-custom-red md:dark:hover:bg-transparent md:dark:hover:text-custom-red ${
                        router === item.slug ||
                        (item.menu === "News & Insights" &&
                          newsPaths.includes(router))
                          ? " text-custom-red dark:bg-gray-700"
                          : "text-gray-900"
                      }`}
                    >
                      {item.menu}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>
          <SearchModal />
          <Link
            href="/contact-us"
            className="mb-2 me-2 border border-custom-red bg-white px-5 py-2.5 text-sm font-medium text-custom-red hover:bg-custom-red hover:text-white focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700"
          >
            CONTACT US
          </Link>
        </div>
      </nav>
    </div>
  );
}
