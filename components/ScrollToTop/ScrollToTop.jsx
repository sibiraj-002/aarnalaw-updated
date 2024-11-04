"use client"
import { useEffect, useState } from "react";

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleClick = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <button
    onClick={handleClick}
    className={`fixed z-50 bottom-4 right-4 w-12 h-12 bg-custom-blue text-white rounded-full flex items-center justify-center shadow-md transition-opacity ${
      isVisible ? "opacity-100" : "opacity-0"
    }`}
    style={{ transition: "opacity 0.5s" }}
    aria-label="Scroll to top"
  >
    ⇪
  </button>
  );
};

export default ScrollToTop;
