module.exports = {
  content: ['./src/renderer/index.html', './src/renderer/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
    fontFamily: {
      sans: ['Inter', 'ui-sans-serif', 'system-ui'],
    },
  },
  plugins: [require('daisyui')],
};
