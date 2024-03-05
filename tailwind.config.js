/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
    './app/**/*.{js,jsx}',
    './src/**/*.{js,jsx}',
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      borderRadius:{
        DEFAULT: "var(--rounded)" 
      },
      backgroundImage:{
        "gradient-principal": "linear-gradient(var(--gradient-principal))",
        "aqua-gradient": "linear-gradient(var(--aqua-gradient))",
        "blue-gradient": "linear-gradient(var(--blue-gradient))",
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        border: "var(--border)",
        "action-bg-button": "var(--action-bg-button)",
        "action-text-button": "var(--action-text-button)",
        "text-secundary": "var(--text-secundary)",
        "yellow-bg-notification": "var(--yellow-bg-notification)",
        "yellow-border-notification": "var(--yellow-border-notification)",
        "yellow-text-notification": "var(--yellow-text-notification)",
        "light-blue": "var(--light-blue)",

      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}