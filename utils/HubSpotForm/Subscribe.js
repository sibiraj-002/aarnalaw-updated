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
          formId: "b9d4ebd2-122e-4060-8077-b791b232f832",
          target: "#" + id,
        });
      }
    });
  }, []);

  return <div id={id}></div>;
}
