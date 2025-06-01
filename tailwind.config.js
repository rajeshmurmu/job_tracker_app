/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        main: "#5664f5",
        primary: "#1c1c1c",
        secondary: "#0c7ff2",
        tertiary: "#3c3c3c",
      },
    },
  },
  plugins: [],
};
