import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        "green-200": "#ccd5ae",
        "green-100": "#e9edc9",
        "Cream": "#fefae0",
        "Tan-200": "#d4a373",
        "Tan-100": "#faedcd",
      },
    },
  },
  plugins: [],
} satisfies Config;
