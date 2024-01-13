/** @type {import('tailwindcss').Config} */

export default {
  content: [
    "./index.html",
    "./app.js",
    "./src/**/*.js"
  ],
  theme: {
    fontSize: {
      sm: '0.750rem',
      base: '1rem',
      lg: '1.2rem',
      xl: '1.5rem',
      '2xl': '1.777rem',
      '3xl': '2.369rem',
      '4xl': '3.158rem',
      '5xl': '4.210rem',
    },
    fontFamily: {
      heading: ['Noto Sans Display', "sans-serif"],
      body: ['Lato', 'sans-serif'],
    },
    fontWeight: {
      normal: '400',
      bold: '700',
    },
    extend: {
      colors: {
        'text-light': 'hsl(199, 61%, 9%)',
        'background-light': 'hsl(195, 50%, 97%)',
        'primary-light': 'hsl(216, 90%, 34%)',
        'secondary-light': 'hsl(216, 50%, 10%)',
        'accent-light': 'hsl(176, 60%, 51%)',
        'text-dark': 'hsl(199, 61%, 91%)',
        'background-dark': 'hsl(223, 77%, 5%)',
        'primary-dark': 'hsl(216, 90%, 66%)',
        'secondary-dark': 'hsl(216, 55%, 1%)',
        'accent-dark': 'hsl(176, 60%, 49%)',
      },

    },
  },
  plugins: [],
}

