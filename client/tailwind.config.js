// tailwind.config.js

module.exports = {
  content: [],
  content: ["./App.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        snacPurple: "#1D0A32",
        clearPurple: "#5A2789",
        snacGreen: "#8CFFAC",
        snacPink: "#FF81FE",
      },
    },
  },
  plugins: [],
};
