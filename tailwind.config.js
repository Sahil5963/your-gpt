/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    // './app/**/**/**/**/**/*.{js,ts,jsx,tsx}',
    // './app/**/**/**/**/**/**/*.{js,ts,jsx,tsx}',
    './app/*.{js,ts,jsx,tsx}',
    './page/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        paperColor: '#fff',
        primary: '#29292999',
        secondary: '#000000aa',
        primaryGradient: '#4E55F1',
        secondaryGradient: '#9D3CFF',
      },
    },
  },
};
