const { createGlobPatternsForDependencies } = require('@nx/angular/tailwind');
const { join } = require('path');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    join(__dirname, 'src/**/!(*.stories|*.spec).{ts,html}'),
    ...createGlobPatternsForDependencies(__dirname),
  ],
  theme: {
    extend: {
      colors: {
        'primary-color': '#042A2B',
        'secondary-color': '#5EB1BF',
        'terciary-color': '#CDEDF6',
        'warning-color': '#EF7B45',
        'error-color': '#D84727',
      },
    },
  },
  plugins: [],
};
