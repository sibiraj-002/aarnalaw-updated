import { useEffect } from "react";

export default function HubSpotForm({ id }) {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://js.hsforms.net/forms/v2.js";
    document.body.appendChild(script);

    script.addEventListener("load", () => {
      if (window.hbspt) {
        window.hbspt.forms.create({
          portalId: "25868325",
          formId: "518865a6-2b7d-4689-8502-80081b2f1da7",
          target: "#" + id,
        });
      }
    });
  }, []);

  return <div id={id}></div>;
}
