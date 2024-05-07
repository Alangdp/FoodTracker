/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,ejs}"],
  theme: {
    extend: {
      backdropFilter: {
        'blur': 'blur(5px)',
      }
    },
  },
  plugins: [
    function ({ addUtilities }) {
      const newUtilities = {
        '.back-image-blur': {
          'webkitBackdropFilter': 'blur(5px)',
          'backdropFilter': 'blur(5px)',
        }
      };
      addUtilities(newUtilities, ['responsive', 'hover']);
    }
  ],
};
