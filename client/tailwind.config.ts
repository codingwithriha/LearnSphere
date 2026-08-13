import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode:["class"],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#f5f0ff",
          100: "#ede2ff",
          200: "#d9c2ff",
          300: "#bd94ff",
          400: "#9d5eff",
          500: "#7c2ff5",
          600: "#6317d6",
          700: "#5311ab",
          800: "#3d0d80",
          900: "#2a0a5c",
        },
        coral: {
          50: "#fff2ee",
          100: "#ffe1d6",
          400: "#ff8a68",
          500: "#ff6b4a",
          600: "#f24c28",
          700: "#c9391a",
        },
        amber: {
          400: "#ffc94d",
          500: "#ffb020",
          600: "#e8940a",
        },
        teal: {
          400: "#2fd6a7",
          500: "#0ea37a",
          600: "#0a8262",
        },
      },
      fontFamily:{
        Poppins: ["var(--font-Poppins)"],
        Josefin: ["var(--font-Inter)"],
        Inter: ["var(--font-Inter)"],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      screens:{
        "1000px": "1000px",
        "1100px": "1100px",
        "1200px": "1200px",
        "1300px": "1300px",
        "1500px": "1500px",
        "800px": "800px",
        "400px": "400px",
      }
    },
  },
  plugins: [],
}
export default config
