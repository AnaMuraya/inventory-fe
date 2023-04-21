module.exports = {
  plugins: {
    'tailwindcss/nesting': {},
    tailwindcss: {},
    'postcss-focus-visible': {},
    'postcss-preset-env': {
      autoprefixer: {
        flexbox: 'no-2009'
      },
      stage: 3,
      features: {
        'nesting-rules': false,
        'custom-properties': false
      }
    }
  }
}
