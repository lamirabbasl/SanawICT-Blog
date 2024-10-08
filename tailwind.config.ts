import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        primary: "#ffffff",
        secondery: "#f3f4f6",
        secondery2: "#71717a",
      },
      fontFamily: {
        lalezar: ["Lalezar", "sans-serif"],
        zain: ["Zain", "sans-serif"],
        noto: ["Noto Naskh Arabic", "sans-serif"],
        vazir: ["Vazir", "sans-serif"],
      },
      keyframes: {
        borderExpand: {
          "0%": { width: "0%", left: "50%" },
          "100%": { width: "100%", left: "0%" },
        },
      },
      animation: {
        "border-expand": "borderExpand 1s ease-in-out forwards",
      },
    },
  },
  plugins: [],
};

export default config;
