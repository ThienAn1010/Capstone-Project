const colors = require("tailwindcss/colors")

module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        test: "#3456FF",
        footer: "#F9FAFC",
        sky: colors.sky,
        teal: colors.teal,
      },
    },
  },
  plugins: [require("@tailwindcss/line-clamp"), require("@tailwindcss/forms")],
}
