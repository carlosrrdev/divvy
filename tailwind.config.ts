import type {Config} from 'tailwindcss'

const config: Config = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
    "./views/**/*.pug"
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}

export default config;