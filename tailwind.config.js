/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    
    extend: {fontFamily: {
      'sans': ['"Playwrite CU"', 'sans-serif'],
      'Poppins':['"Poppins"','sans'] ,
    },},
  },
  plugins: [],
}