/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        keppel: '#3ca1a1',
        bunker: '#131a1c',
        paradiso: '#2e7b7b',
        lochinvar: '#348c94',
        'blue-dianne': '#20535c',
        'timber-green': '#192c2d',
        spectra: '#2c4c50',
        'gable-green': '#17343c',
      },
      borderRadius: {
        'xl': '12px',
        'lg': '8px',
      },
      boxShadow: {
        'elegant': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        'soft': '0 2px 4px rgba(0, 0, 0, 0.1)',
      }
    },
  },
  plugins: [],
}