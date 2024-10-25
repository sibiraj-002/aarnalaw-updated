"use client";
import { Button, Modal } from "flowbite-react";
import { useState } from "react";

function ModalTestimonial({ btnName, textColor, data, onClose }) {
  const [openModal, setOpenModal] = useState(true);

  return (
    <>
      <button
        className={` ${textColor} mt-2 p-2 text-xs hover:border-white hover:bg-white hover:text-custom-blue md:text-base`}
        onClick={() => setOpenModal(true)}
      >
        {btnName}
      </button>

      <Modal show={openModal} onClose={onClose}>
        <Modal.Header>
          {data.name}
          <p className="text-lg text-gray-400">{data.post}</p>
          <p className="text-lg text-gray-400">{data.desingnation}</p>
        </Modal.Header>{" "}
        {/* Displaying the testimonial name */}
        <Modal.Body>
          <div className="space-y-6">
            <p
              className="text-base leading-relaxed text-gray-500 dark:text-gray-400"
              dangerouslySetInnerHTML={{ __html: data.fullTestimonial }}
            ></p>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default ModalTestimonial;
