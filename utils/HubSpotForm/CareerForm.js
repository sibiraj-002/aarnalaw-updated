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
          formId: "de0620b8-a487-42c4-9b32-92742f227dff",
          target: "#" + id,
        });
      }
    });
  }, []);

  return <div id={id}></div>;
}
