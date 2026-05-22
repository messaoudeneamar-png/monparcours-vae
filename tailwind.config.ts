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
        background: "rgb(var(--background) / <alpha-value>)",
        foreground: "rgb(var(--foreground) / <alpha-value>)",
        surface: "rgb(var(--surface) / <alpha-value>)",
        border: "rgb(var(--border) / <alpha-value>)",
        muted: "rgb(var(--muted) / <alpha-value>)",
        accent: {
          DEFAULT: "rgb(var(--accent) / <alpha-value>)",
          light: "rgb(var(--accent-light) / <alpha-value>)",
          dark: "rgb(var(--accent-dark) / <alpha-value>)",
        },
        orange: {
          DEFAULT: "rgb(var(--orange) / <alpha-value>)",
          light: "rgb(var(--orange-light) / <alpha-value>)",
        },
        blue: {
          DEFAULT: "rgb(var(--blue) / <alpha-value>)",
          light: "rgb(var(--blue-light) / <alpha-value>)",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      fontWeight: {
        "950": "950",
      },
      screens: {
        xs: "375px",
      },
      boxShadow: {
        "card": "0 1px 2px rgba(0,0,0,0.04), 0 4px 12px rgba(0,0,0,0.06)",
        "card-hover": "0 2px 4px rgba(0,0,0,0.06), 0 8px 24px rgba(0,0,0,0.1)",
        "button": "0 2px 8px rgba(45,106,79,0.35), 0 1px 2px rgba(45,106,79,0.2)",
        "nav": "0 -1px 0 rgba(0,0,0,0.06), 0 -4px 16px rgba(0,0,0,0.04)",
        "modal": "0 8px 32px rgba(0,0,0,0.18), 0 2px 8px rgba(0,0,0,0.08)",
      },
      backgroundImage: {
        "gradient-accent": "linear-gradient(135deg, rgb(var(--accent-dark)) 0%, rgb(var(--accent)) 60%, rgb(var(--accent-light)) 100%)",
        "gradient-warm": "linear-gradient(135deg, #F7F5F0 0%, #EEE8DB 100%)",
      },
      transitionTimingFunction: {
        "spring": "cubic-bezier(0.4, 0, 0.2, 1)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0", opacity: "0" },
          to: { height: "var(--radix-accordion-content-height)", opacity: "1" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)", opacity: "1" },
          to: { height: "0", opacity: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [],
};
export default config;
