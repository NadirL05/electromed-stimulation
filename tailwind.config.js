import { orange, zinc } from 'tailwindcss/colors'

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // Palette ElectroMed : base zinc + accent orange
        electro: {
          primary: zinc[900],
          surface: zinc[100],
          muted: zinc[500],
          border: zinc[200],
          accent: orange[500],
          accentDark: orange[600],
          accentLight: orange[400],
        },
        zinc,
        orange,
      },
    },
  },
  plugins: [],
}

