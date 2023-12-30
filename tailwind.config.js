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
      }
    },
  },
  plugins: [
    tailwindForm()
  ],
}

