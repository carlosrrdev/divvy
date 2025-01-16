import type {Config} from 'tailwindcss'

const config: Config = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
    "./views/**/*.pug"
  ],
  theme: {
    extend: {
      colors: {
        "primary": "hsl(263, 76%, 58%)",
        "secondary": "hsl(162, 52%, 46%)"
      }
    },
  },
  plugins: [],
}

export default config;