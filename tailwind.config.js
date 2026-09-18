/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#f4edff",
          100: "#e6d9ff",
          200: "#cdb3ff",
          300: "#b38cff",
          400: "#a26aff",
          500: "#9146ff",
          600: "#772ce8",
          700: "#5c16c5",
          800: "#451093",
          900: "#2e0b62",
        },
        surface: {
          DEFAULT: "#18181b",
          raised: "#1f1f23",
          sunken: "#0e0e10",
        },
        hint: {
          correct: "#16a34a",
          partial: "#ea8a0c",
          wrong: "#b91c1c",
        },
      },
      fontFamily: {
        sans: ["Poppins", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      keyframes: {
        "fade-in": {
          "0%": { opacity: "0", transform: "translateY(8px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        pop: {
          "0%": { transform: "scale(0.9)", opacity: "0" },
          "60%": { transform: "scale(1.04)", opacity: "1" },
          "100%": { transform: "scale(1)" },
        },
        shake: {
          "0%, 100%": { transform: "translateX(0)" },
          "20%, 60%": { transform: "translateX(-6px)" },
          "40%, 80%": { transform: "translateX(6px)" },
        },
      },
      animation: {
        "fade-in": "fade-in 0.35s ease-out both",
        pop: "pop 0.4s ease-out both",
        shake: "shake 0.4s ease-in-out",
      },
    },
    screens: {
      xs: "375px",
      xr: "412px",
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
      "3xl": "1920px",
      "4xl": "2560px",
    },
  },
  plugins: [],
};
