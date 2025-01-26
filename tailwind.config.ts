import type { Config } from "tailwindcss";
import scrollbarHide from "tailwind-scrollbar-hide";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      padding: {
        "cont-xl": "5rem",
        "cont-lg": "4rem",
        "cont-md": "2rem",
        "cont-sm": "1rem",
      },
      colors: {
        main: {
          DEFAULT: "#184508",
          light: "#7A8E17",
        },
        background: {
          DEFAULT: "#e6e6da",
          dark: "#ecedd5",
        },
        disabled: "#97ab87",
      },
      screens: {
        "2md": "860px",
      },
    },
  },
  plugins: [scrollbarHide],
} satisfies Config;
