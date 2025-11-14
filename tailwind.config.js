/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Brand colors
        brand: {
          orange: '#f08a1f',
          cream: '#efeceb',
          'cream-light': '#f1eeec',
        },
        // Hero gradient colors
        hero: {
          start: '#bfb3ac',
          mid: '#ab9f99',
          end: '#a39690',
        },
        // Grays
        gray: {
          tagline: '#777777',
          utility: '#6b6b6b',
          placeholder: '#9a9a9a',
          text: '#333333',
          card: '#1e1e1e',
          border: '#e1dfde',
          'border-light': '#e0e0e0',
          bg: '#f3f3f3',
        },
      },
      fontFamily: {
        sans: ['Montserrat', 'sans-serif'],
      },
      maxWidth: {
        container: '1300px',
      },
      boxShadow: {
        'search': '0 2px 0 rgba(0,0,0,0.06)',
        'card': '0 2px 10px rgba(0,0,0,0.08), inset 0 0 0 1px rgba(0,0,0,0.04)',
        'card-hover': '0 8px 20px rgba(0,0,0,0.12), inset 0 0 0 1px rgba(0,0,0,0.04)',
        'overlay': '0 4px 12px rgba(0, 0, 0, 0.15)',
      },
      gridTemplateColumns: {
        'search': '1fr 140px',
      },
    },
  },
  plugins: [],
}
