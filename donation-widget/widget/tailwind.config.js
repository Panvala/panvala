module.exports = {
  purge: {
    enabled: true,
    content: [
      './src/components/**/*.{js,ts,jsx,tsx}',
      './src/**/*.{js,ts,jsx,tsx}',
    ],
  },
  darkMode: 'media', // 'media' or 'class'
  theme: {
    extend: {
      colors: {
        'accent-1': '#333',
      },
    },
  },
  variants: {
    extend: {
      opacity: ['disabled'],
    },
  },
  plugins: [],
};
