

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
   
        'yellow':'#EDA415',
        'naviBlue':'#003F62',
        'text':'Montserrat'
      },
    },
  },
  plugins: [],
}