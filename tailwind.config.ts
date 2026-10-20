import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        orange: {
          deep: "#A63D12",
          DEFAULT: "#E87524",
          bright: "#F7943D",
          light: "#FFD0A6",
          pale: "#FFF0E3",
        },
        maroon: {
          deep: "#4A1025",
          DEFAULT: "#781F3A",
          rich: "#9B304B",
          light: "#C77A8D",
          pale: "#F4E4E9",
        },
        forest: {
          deep: "#153D2B",
          DEFAULT: "#26734D",
          fresh: "#3D9664",
          light: "#9AC9A7",
          pale: "#E6F3E8",
        },
        sand: {
          bg: "#FAF8F5",
          surface: "#FFFFFF",
          muted: "#F2EEE8",
          text: "#241E20",
          subtext: "#6E6466",
          border: "#E5DDD8",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "var(--font-kalpurush)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
    },
  },
  plugins: [],
};

export default config;
