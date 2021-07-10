const tailwindcss = require('tailwindcss');

const IS_DEVELOPMENT = process.env.NODE_ENV === 'development';

const plugins = [];
plugins.push(tailwindcss);

if (!IS_DEVELOPMENT) {
  plugins.push(tailwindcss('tailwind.config.js'));
}

module.exports = { plugins };
