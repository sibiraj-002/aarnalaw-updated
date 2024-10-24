"use client";
import React, { useState } from "react";
import { testimonials } from "@/utils/data";
import ModalTestimonial from "@/components/ContactUs/Modal";

function Testimonials() {
  const [selectedTestimonial, setSelectedTestimonial] = useState(null);

  const handleOpenModal = (testimonial) => {
    setSelectedTestimonial(testimonial);
  };
  console.log("selected testimonials", selectedTestimonial);
  return (
    <>
      <div className="mx-auto w-11/12 py-12">
        <p className="font-montserrat mb-4 border-b-2 border-[#EE3C23] pb-[15px] text-left text-[26px] font-semibold leading-normal tracking-[1.6px] text-[#1C386A]">
          Testimonials
        </p>
        <div className="grid grid-cols-3 gap-10">
          {testimonials.map((items, index) => (
            <div className="rounded-lg bg-white p-8 shadow-lg" key={index}>
              <h2 className="text-lg font-bold">{items.name}</h2>
              <p className="flex h-10 gap-2 py-2">{items.post}</p>
              <p className="flex h-10 items-center gap-2 py-2">
                {items.desingnation}
              </p>
              <p className="line-clamp-4 flex items-center gap-2 py-2">
                {items.fullTestimonial.slice(0, 150)}...
              </p>
              <div className="flex h-10 items-end">
                <button
                  className="text-custom-red"
                  onClick={() => handleOpenModal(items)} // Pass the current testimonial
                >
                  Read more
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Render Modal if there is a selected testimonial */}
        {selectedTestimonial && (
          <ModalTestimonial
            data={selectedTestimonial}
            onClose={() => setSelectedTestimonial(null)}
          />
        )}
      </div>
    </>
  );
}

export default Testimonials;
