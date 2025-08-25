/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "sans-serif"], // Modern font
      },
      colors: {
        primary: "#24ab8f",
        "primary-dark": "#268d77",
        secondary: "#9333EA", // Purple accent
        accent: "#F59E0B",    // Amber accent
        background: "#F8FAFC",// Light background
        dark: "#0F172A",      // Dark text/background
      },
      boxShadow: {
        soft: "0 4px 6px rgba(0, 0, 0, 0.1)",
        card: "0 6px 15px rgba(0, 0, 0, 0.08)",
      },
      borderRadius: {
        xl: "1rem",
      },
      animation: {
        loader: "loader 1s linear infinite",
      },
      keyframes: {
        loader: {
          "0%": { transform: "rotate(0) scale(1)" },
          "50%": { transform: "rotate(180deg) scale(1.5)" },
          "100%": { transform: "rotate(360deg) scale(1)" }
        }
      }
    },
  },
  plugins: [],
}
