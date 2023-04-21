const fs = require('fs');
const path = require('path');

const sizes = JSON.parse(
  fs.readFileSync(path.resolve('./src/styles/sizes.json')).toString()
);
const colors = JSON.parse(
  fs.readFileSync(path.resolve('./src/styles/colors.json')).toString()
);

module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    screens: sizes,
    extend: {
      gridTemplateColumns: {
        'autoFill': 'repeat(auto-fill, minmax(160px, 1fr))'
      }
    },
    colors: {
      ...colors,
      current: 'currentColor',
    },
  },
  plugins: [],
}
