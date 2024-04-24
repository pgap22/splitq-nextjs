/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
    './containers/**/*.{js,jsx}',
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
        text: "var(--text)",
        border: "var(--border)",
        "action-bg-button": "var(--action-bg-button)",
        "action-text-button": "var(--action-text-button)",
        "text-secundary": "var(--text-secundary)",
        "yellow-bg-notification": "var(--yellow-bg-notification)",
        "yellow-border-notification": "var(--yellow-border-notification)",
        "yellow-text-notification": "var(--yellow-text-notification)",
        "light-blue": "var(--light-blue)",
        "danger-text": "var(--danger-text)",
        "danger-action": "var(--danger-action)",
        "gray-background": "var(--gray-background)",
        "gray-border": "var(--gray-border)",
        "gray-text": "var(--gray-text)",
        "green-background": "var(--green-background)",
        "green-border": "var(--green-border)",
        "green-text": "var(--green-text)",
        "red-background": "var(--red-background)",
        "red-border": "var(--red-border)",
        "red-text": "var(--red-text)",

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
  plugins: [require("tailwindcss-animate"),require('tailwind-scrollbar')({ nocompatible: true })],
}