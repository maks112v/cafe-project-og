module.exports = {
  purge: ['./pages/**/*.js', './components/**/*.js'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#B09C79',
        },
        secondary: {
          light: '#868C90',
          100: '#d2d6d8',
          200: '#a6adb1',
          300: '#798489',
          400: '#4d5b62',
          DEFAULT: '#20323b',
          600: '#1a282f',
          700: '#131e23',
          800: '#0d1418',
          900: '#060a0c',
        },
        light: '#FEF6ED',
        // by name
        expresso: '#B39173',
        coffee: '#4E3017',
        border: '#ede5de',
        dark: '#1B1B1B',
        water: '#C8E6E5',
        milk: '#FAFAFA',
      },
    },
    container: {
      center: true,
      padding: '1rem',
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require('@tailwindcss/forms')],
};
