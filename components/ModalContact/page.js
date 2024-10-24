"use client";
import { Button, Modal } from "flowbite-react";
import { useState } from "react";

function page({ btnName, textColor, modalTitle }) {
  const [openModal, setOpenModal] = useState(false);

  return (
    <>
      <button
        className={` ${textColor} mt-8 border border-custom-red p-2 text-xs ${textColor === "text-custom-red" ? "hover:bg-custom-red hover:text-white" : "hover:border-white hover:bg-white hover:text-custom-red"}  md:px-6 md:text-base`}
        onClick={() => setOpenModal(true)}
      >
        {btnName}
      </button>
      <Modal show={openModal} onClose={() => setOpenModal(false)}>
        <Modal.Header>{modalTitle}</Modal.Header>
        <Modal.Body>
          <div className="space-y-6">
            <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
              With less than a month to go before the European Union enacts new
              consumer privacy laws for its citizens, companies around the world
              are updating their terms of service agreements to comply.
            </p>
            <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
              The European Union’s General Data Protection Regulation (G.D.P.R.)
              goes into effect on May 25 and is meant to ensure a common set of
              data rights in the European Union. It requires organizations to
              notify users as soon as possible of high-risk data breaches that
              could personally affect them.
            </p>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => setOpenModal(false)}>I accept</Button>
          <Button color="gray" onClick={() => setOpenModal(false)}>
            {btnName}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default page;
