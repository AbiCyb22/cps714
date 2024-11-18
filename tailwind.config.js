/** @type {import('tailwindcss').Config} */
//slightly different than the premade one- got online.
//this is just some css fonts

module.exports = {
  content: [
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',  // Adjusted path for your app's content
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',  // If you have components
    './src/styles/**/*.{js,ts,jsx,tsx,mdx}',  // If you have global styles
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
