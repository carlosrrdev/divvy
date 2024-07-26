import handlebars from 'vite-plugin-handlebars';
import {resolve} from 'path'

/** @type {import('vite').UserConfig} */
export default {
  plugins: [handlebars({
    partialDirectory: resolve(__dirname, 'partials'),
  })],
}