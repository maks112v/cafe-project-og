module.exports = {
  purge: ['./pages/**/*.js', './components/**/*.js'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        secondary: {
          light: '#868C90',
          DEFAULT: '#374958',
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
  plugins: [],
};
