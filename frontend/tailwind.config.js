const flowbite  = require("flowbite-react/tailwind")
/** @type {import('tailwindcss').Config} */

export default {
  content: [
    flowbite.content(),
    "index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'text': '#edf2f8',
        'background': '#020608',
        'primary': '#158def',
        'secondary': '#164f7e',
        'accent': '#156bb2',
       },
    },
    

  },
  plugins: [
    flowbite.plugin(),
  ],
}