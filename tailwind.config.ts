import type { Config } from "tailwindcss";

const config: Config = {
content: [
  "./app/**/*.{js,ts,jsx,tsx,mdx}",
  "./pages/**/*.{js,ts,jsx,tsx,mdx}",
  "./components/**/*.{js,ts,jsx,tsx,mdx}",
],  theme: {
    extend: {
      colors: {
        bg: "#F7F8FA",
        ink: "#0F172A",
        accent: "#38BDF8",
      },
      fontFamily: {
        sans: ["Inter", "system-ui"],
        display: ["Space Grotesk", "Inter"],
      },
    },
  },
  plugins: [],
};

export default config;
