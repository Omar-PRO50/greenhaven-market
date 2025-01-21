import type { Config } from 'tailwindcss';

export default {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      padding: {
        largeCont: '5rem',
      },
      colors: {
        main: {
          DEFAULT: '#184508',
          light: '#7A8E17',
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
