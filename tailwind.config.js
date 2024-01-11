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
        "enter-right": "enterRight 2s cubic-bezier(.33,0,.07,.98) forwards",
        "enter-left": "enterLeft 2s cubic-bezier(.33,0,.07,.98) forwards",
        "enter-left-delayed": "enterLeft 2.5s cubic-bezier(.33,0,.07,.98) forwards",
        "enter-top": "enterTop 2s cubic-bezier(.33,0,.07,.98) forwards",
        "enter-bot": "enterBot 2s cubic-bezier(.33,0,.07,.98) forwards",
        "fade-in": "fadeIn 2s cubic-bezier(.33,0,.07,.98) forwards",
      },
      keyframes: {
        enterRight: {
          "0%": {opacity: 0, transform: "translateX(-15px)"},
          "100%": {opacity: 1, transform: "translateX(0)"}
        },
        enterLeft: {
          "0%": {opacity: 0, transform: "translateX(15px)"},
          "100%": {opacity: 1, transform: "translateX(0)"}
        },
        enterTop: {
          "0%": {opacity: 0, transform: "translateY(-15px)"},
          "100%": {opacity: 1, transform: "translateY(0)"}
        },
        enterBot: {
          "0%": {opacity: 0, transform: "translateY(15px)"},
          "100%": {opacity: 1, transform: "translateY(0)"}
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

