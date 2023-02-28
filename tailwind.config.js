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
      colors: {},
    },
    colors: {
      paperColor: 'rgba(255, 255, 255, 0.94)',
      primary: '#29292999',
      secondary: '#000000aa',
      primaryGradient: '#4E55F1',
      secondaryGradient: '#9D3CFF',
    },
  },
};
