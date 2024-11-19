<<<<<<< HEAD
/* @type {import('tailwindcss').Config} */
=======
// @type {import('tailwindcss').Config} */
>>>>>>> 4ae6f947f71f873242117dc3bd64a0dcb8d49b35
//slightly different than the premade one- got online.
//this is just some css fonts

module.exports = {
  content: [
    './pages//.{js,ts,jsx,tsx,mdx}',
    './components/**/.{js,ts,jsx,tsx,mdx}',
<<<<<<< HEAD
    './src/app/**/*/.{js,ts,jsx,tsx,mdx}',
=======
    './src/app/*/.{js,ts,jsx,tsx,mdx}',
>>>>>>> 4ae6f947f71f873242117dc3bd64a0dcb8d49b35
  ],
  theme: {
    extend: {
      fontFamily: {
        satoshi: ['Satoshi', 'sans-serif'],
        inter: ['inter', 'sans-serif'],
      },
      colors: {
        'primary-orange': '#FF5722',
      }
    },
  },
  plugins: [],
}