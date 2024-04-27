/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,ejs}"],
  theme: {
    extend: {
      backdropFilter: { // Usamos backdropFilter em vez de back-image-blur
        'blur': 'blur(5px)', // Definimos o valor de desfoque desejado
      }
    },
  },
  plugins: [
    function ({ addUtilities }) {
      const newUtilities = {
        '.back-image-blur': {
          'webkitBackdropFilter': 'blur(5px)', // Aplicamos o filtro diretamente para compatibilidade com navegadores WebKit
          'backdropFilter': 'blur(5px)',
        }
      };
      addUtilities(newUtilities, ['responsive', 'hover']); // Permitimos responsividade e pseudo-classes hover
    }
  ],
};
