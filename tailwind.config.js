/** @type {import('tailwindcss').Config} */
import tailwindForm from "@tailwindcss/forms"

export default {
  content: [
    "./index.html",
    "./app.js",
    "./src/**/*.js"
  ],
  theme: {
    extend: {
      colors: {
        "indigo-1000": "#01030A"
      },
      animation: {
        "enter-right": "enterRight 1s ease-in-out forwards",
        "enter-left": "enterLeft 1s ease-in-out forwards",
        "fade-in": "fadeIn 1s ease-in-out forwards",
      },
      keyframes: {
        enterRight: {
          "0%": {opacity: 0, transform: "translateX(-10px)"},
          "100%": {opacity: 1, transform: "translateX(0)"}
        },
        enterLeft: {
          "0%": {opacity: 0, transform: "translateX(10px)"},
          "100%": {opacity: 1, transform: "translateX(0)"}
        },
        fadeIn: {
          "0%": {opacity: 0},
          "100%": {opacity: 1}
        }
      }
    },
  },
  plugins: [
    tailwindForm()
  ],
}

