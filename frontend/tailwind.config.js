// tailwind.config.js
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Include all JS/JSX/TS/TSX files in src
  ],
  theme: {
    extend: {
      colors: {
        primary: '#3B82F6', // Custom primary color
        secondary: '#10B981', // Custom secondary color
        danger: '#EF4444', // Custom danger color
      },
      spacing: {
        72: '18rem', // Custom spacing
        84: '21rem',
        96: '24rem',
      },
    },
  },
  plugins: [],
};