import daisyui from "daisyui";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./partials/**/*.html", "./app.js", "./src/**/*.js"],
  theme: {
    extend: {},
  },
  daisyui: {
    themes: [{
      divvyLight: {
        "primary": "#0004ff",
        "secondary": "#cedef3",
        "accent": "#6131f3",
        "neutral": "#8a8e9b",
        "base-100": "#f3f5fc",
        "info": "#9ce3f9",
        "success": "#91da4d",
        "warning": "#d07414",
        "error": "#ff758e"
      },
      divvyDark: {
        "primary": "#8c98c0",
        "secondary": "#96bec9",
        "accent": "#a2b4ef",
        "neutral": "#696c77",
        "base-100": "#151517",
        "info": "#9ce3f9",
        "success": "#94bb8c",
        "warning": "#e1b96e",
        "error": "#e3819e"
      }
    },],
    darkTheme: "divvyDark"
  },
  plugins: [daisyui],
}

