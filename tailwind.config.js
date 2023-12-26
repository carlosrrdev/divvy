/** @type {import('tailwindcss').Config} */
import tailwindForm from "@tailwindcss/forms"

export default {
  content: [
    "./index.html",
    "./app.js",
    "./src/**/*.js"
  ],
  theme: {
    extend: {},
  },
  plugins: [
    tailwindForm()
  ],
}

