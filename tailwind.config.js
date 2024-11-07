/** @type {import('tailwindcss').Config} */

import {
  PRIMARY_COLOR_PALETTE,
} from './shared/packages/constants/colors';

export default {
  darkMode: 'class',
  content: [
    './components/**/*.vue',
    './components/*.vue',
    './layouts/*.vue',
    './pages/**/*.vue',
    './pages/*.vue',
    './app/**/*.vue',
    './shared/packages/constants/ui.ts'
  ],
  theme: {
    fontSize: {
      '3xs': '0.3125rem',
      '2xs': '0.5rem',
      xs: '0.625rem',
      sm: '0.8rem',
      md: '1rem',
      base: '1rem',
      lg: '1.15rem',
      xl: '1.25rem',
      '2xl': '1.563rem',
      '3xl': '1.953rem',
      '4xl': '2.441rem',
      '5xl': '3.052rem',
      '6xl': '3.815rem',
      '7xl': '4.768rem',
      '8xl': '5.96rem',
      '9xl': '7.451rem',
    },
    extend: {
      colors: {
        default: {
          light: '#27272a',
          dark: '#fafafa',
        },
        primary: PRIMARY_COLOR_PALETTE,
      },
      backgroundImage: {
        'gradient-circle': 'radial-gradient(circle at center, var(--tw-gradient-stops))',
      }
    }
  },
}


// function lighten (clr, val) {
//   return Color(clr).lighten(val).hex()
// };

// function darken (clr, val) {
//   return Color(clr).darken(val).hex()
// };

// function colorVariations(color) {
//   return {
//     50: lighten(color, 0.5),
//     100: lighten(color, 0.4),
//     200: lighten(color, 0.3),
//     300: lighten(color, 0.2),
//     400: lighten(color, 0.1),
//     500: color,
//     600: darken(color, 0.1),
//     700: darken(color, 0.2),
//     800: darken(color, 0.3),
//     900: darken(color, 0.4),
//     950: darken(color, 0.5),
//   };
// };
