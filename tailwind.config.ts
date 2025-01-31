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
          lightx: "#8ba283",
        },
        background: {
          DEFAULT: "#e6e6da",
          dark: "#ecedd5",
        },
        disabled: "#97ab87",
      },
      screens: {
        "2md": "860px",
        xsm: "425px",
        navbar: "900px",
      },
      //(100% - padding - cardsNo. * gap - max(padding - 16, 60)) / cardsNo.
      minWidth: {
        "article-card": "calc((100vw - 1rem - (1 * 1rem) - 3.75rem) / 1)",
        "md-article-card": "calc((100vw - 2rem - (2 * 1rem) - 3.75rem) / 2)",
        "lg-article-card": "calc((100vw - 4rem - (3 * 1rem) - 3.75rem) / 3)",
        "xl-article-card": "calc((100vw - 5rem - (4 * 1rem) - 4rem) / 4)",
      },
      minHeight: {
        "article-card":
          "calc(((100vw - 1rem - (1 * 1rem) - 3.75rem) / 1) * 1.25)",
        "md-article-card":
          "calc(((100vw - 2rem - (2 * 1rem) - 3.75rem) / 2) * 1.25)",
        "lg-article-card":
          "calc(((100vw - 4rem - (3 * 1rem) - 3.75rem) / 3) * 1.25)",
        "xl-article-card":
          "calc(((100vw - 5rem - (4 * 1rem) - 4rem) / 4) * 1.25)",
      },
    },
  },
  plugins: [scrollbarHide],
} satisfies Config;
