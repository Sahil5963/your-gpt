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
      keyframes: {
        slideRightAnimate: {
          '0%': {
            opacity: 1,
            transform: 'translateX(0px)',
          },
          '50%': {
            opacity: 0,
            transform: 'translateX(100%)',
          },
          '51%': {
            opacity: 0,
            transform: 'translateX(-90%)',
          },

          '100%': {
            opacity: 1,
            transform: 'translateX(0px)',
          },
        },
      },
      animation: {
        slideRight: 'slideRightAnimate 0.4s ease-in-out',
      },
    },
  },
};
