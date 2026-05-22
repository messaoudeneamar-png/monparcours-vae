import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#F7F5F0",
        foreground: "#1A1A1A",
        accent: {
          DEFAULT: "#2D6A4F",
          light: "#52B788",
          dark: "#1B4332",
        },
        orange: {
          DEFAULT: "#E76F51",
          light: "#F4A261",
        },
        blue: {
          DEFAULT: "#457B9D",
          light: "#A8DADC",
        },
        surface: "#FFFFFF",
        muted: "#6B7280",
        border: "#E5E0D8",
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      screens: {
        xs: "375px",
      },
    },
  },
  plugins: [],
};
export default config;
