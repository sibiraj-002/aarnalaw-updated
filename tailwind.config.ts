import flowbite from "flowbite-react/tailwind";
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    flowbite.content(),
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Montserrat", "sans-serif"],
      },
      colors: {
        bgDark: "#22223b",
        bgDark2: "#4a4e69",
        bgDark3: "#16396e",
        bgDark4: "#0E1333",
        "custom-blue": "#1E396A",
        "custom-red": "#EE3E23",
        "custom-gray": "#7E838B",
      },
      backgroundColor: {
        "151C4A": "#151C4A",
      },
      backgroundimgColor: {
        "16396e": "#16396e",
      },
      backgrounddivColor: {
        "151C4A": "#151C4A",
      },
    },
  },
  plugins: [flowbite.plugin()],
};
export default config;
