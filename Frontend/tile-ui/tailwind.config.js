/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        cream: '#f5f0e6',
        cashew: '#dac6a0',
        brand: '#b59d73',
        dark: '#1a1a1a',
        light: '#f7f4ef',
      },
      fontFamily: {
        yeseva: ['"Yeseva One"', 'serif'],
        abril: ['"Abril Fatface"', 'serif'],
        lobster: ['"Lobster"', 'cursive'],
      },
      boxShadow: {
        soft: '0 4px 30px rgba(181,157,115,0.3)',
        gold: '0 10px 30px rgba(181,157,115,0.25)',
      },
      borderRadius: {
        xl: '1rem',
        '2xl': '1.5rem',
        '3xl': '2rem',
      },
      animation: {
        'fade-in': 'fadeIn 1s ease-in-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: 0, transform: 'translateY(20px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
};
