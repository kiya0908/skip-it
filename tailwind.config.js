/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-poppins)'],
        bangers: ['var(--font-bangers)'],
      },
      colors: {
        'navy': '#0c2461',
        'red': {
          500: '#d7263d',
          600: '#a81c2a',
        },
      },
      // 如果第一个 module.exports 中还有其他 theme.extend 下的配置，请加回到这里
    },
  },
  plugins: [],
};