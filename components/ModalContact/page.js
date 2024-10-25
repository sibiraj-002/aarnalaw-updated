"use client";
import { Button, Modal } from "flowbite-react";
import { useState } from "react";
import HubSpotCareer from "@/utils/HubSpotForm/CareerForm";
import InternShip from "@/utils/HubSpotForm/Internships";
import Subscribe from "@/utils/HubSpotForm/Subscribe";
import ContactPartner from "@/utils/HubSpotForm/ContactPartner";

function ModalContact({ btnName, textColor, modalTitle, btnType }) {
  const [openModal, setOpenModal] = useState(false);

  // Mapping btnType to the respective component
  const componentMap = {
    career: HubSpotCareer,
    internships: InternShip,
    subscribe: Subscribe,
    contactPartner: ContactPartner,
    // Add more mappings here as you add new components
  };

  // Determine the component to render based on btnType
  const SelectedComponent = componentMap[btnType] || null;

  return (
    <>
      <button
        className={` ${textColor} mt-8 border border-custom-red p-2 text-lg ${
          textColor === "text-custom-red"
            ? "hover:bg-custom-red hover:text-white"
            : "hover:border-white hover:bg-white hover:text-custom-red"
        }  md:px-6 md:text-base`}
        onClick={() => setOpenModal(true)}
      >
        {btnName}
      </button>
      <Modal show={openModal} onClose={() => setOpenModal(false)}>
        <Modal.Header>{modalTitle}</Modal.Header>
        <Modal.Body>
          {/* <InternShip /> */}
          {SelectedComponent ? (
            <SelectedComponent />
          ) : (
            <p>Component not found</p>
          )}
        </Modal.Body>
      </Modal>
    </>
  );
}

export default ModalContact;
