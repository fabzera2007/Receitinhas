/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // Adicione a cor customizada aqui
      colors: {
        'vinho': '#800020',
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}