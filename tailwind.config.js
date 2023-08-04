/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-custom': 'linear-gradient(30deg, rgba(0,7,66,1) 0%, rgba(77,24,101,1) 100%);',
      },
      colors: {
        primary: "#000742",
        secondary: "#4D1865",
        tertiary: "#E13858",
        inputBg: "#404188",
        textColor: "#FFFCFF"
      },
      flex: {
        '6': "6 6 0%",
      }
    },
  },
  plugins: [],
}
