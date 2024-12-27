/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    "./node_modules/flyonui/dist/js/*.js"
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require("flyonui"),
    require("flyonui/plugin") // Require only if you want to use FlyonUI JS component
  ],
}
