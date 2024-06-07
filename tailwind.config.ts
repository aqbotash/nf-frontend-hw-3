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
      fontFamily: {
        kanit: ['Kanit', 'sans-serif'],
      },
      fontSize: {
        'custom-48': '48px',
      },
      lineHeight: {
        'custom-120': '120px',
      },
    },
  },
  plugins: [],
  darkMode: 'class', // Enable dark mode using class names
};
export default config;
