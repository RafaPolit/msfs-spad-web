/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        inconsolata: ["Inconsolata", "monospace"],
        falconded: ["Falconded", "monospace"],
        ledboard: ["Ledboard", "monospace"],
        apache: ["Apache", "monospace"],
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
