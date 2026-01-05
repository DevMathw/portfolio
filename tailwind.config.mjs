import { Outfit } from 'next/font/google';

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        lightHover: '#fcf4ff',
        darkHover: '#1E1E2F',
        darkTheme: '#303030',
        greenPrimary: '#33C1CC'
      },
      fontFamily:{
        Outfit: ["Outfit", "sans-serif"],
        Ovo: ["Ovo", "serif"],
        Monda: ["Monda", "Monospace"],
      },
      boxShadow: {
        'black': '4px 4px 0 #000',
        'white': '4px 4px 0 #fff',
      },
      gridTemplateColumns: {
        'auto' : 'repeat(auto-fit, minmax(200px, 1fr))'
      }
    },
  },
  darkMode: 'selector',
  plugins: [],
};
