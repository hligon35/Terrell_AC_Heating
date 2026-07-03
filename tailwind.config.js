module.exports = {
  content: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          900: '#0f1724',
          700: '#14243a',
          500: '#1f6feb',
          'accent-heat': '#ff4d2d',
          'accent-cool': '#00aaff'
        }
      }
    }
  },
  plugins: []
}
