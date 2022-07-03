module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx,css,md,mdx,html,json,scss}',
  ],
  darkMode: 'class',
  theme: {
    fontFamily: {
      gordita: 'Gordita',
    },
    fontWeight: {
      thin: 100,
      light: 300,
      normal: 'normal',
      medium: 500,
      bold: 700,
      black: 900,
      ultra: 1000,
    },
    extend: {
      colors: {
        primary: '#2c4f7c',

        secondary: '#335d92',

        light: '#446b9e',

        accent: '#66e6ac',

        'second-accent': '#0CDC73',
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
}
