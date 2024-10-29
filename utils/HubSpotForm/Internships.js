import { useEffect } from "react";

export default function InternShip({ id }) {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://js.hsforms.net/forms/v2.js";
    document.body.appendChild(script);

    script.addEventListener("load", () => {
      if (window.hbspt) {
        window.hbspt.forms.create({
          portalId: "25868325",
          formId: "f5144a2e-9917-4762-a60d-5377a973a04e",
          target: "#" + id,
        });
      }
    });
  }, []);

  return <div id={id}></div>;
}
