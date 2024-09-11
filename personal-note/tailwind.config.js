/** @type {import('tailwindcss').Config} */

export default {
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}',
    './node_modules/@material-tailwind/react/components/**/*.{js,ts,jsx,tsx}',
    './node_modules/@material-tailwind/react/theme/components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      keyframes: {
        spinFadeIn: {
          '0%': { opacity: 0 },
          '100%': { opacity: 0 },
        },
      },
      animation: {
        'opacity-open': 'spinFadeIn 0.3s ease-in-out forwards',
      },
      colors: {
        primary: 'orange',
        similar: '#202C44',
        'similar-secondary': '#303A50',
        main: '#1A1D20',
        placeholder: '#a1a1aa',
        disabled: '#a0a0a0',
        gray: {
          100: 'rgb(127,132,136,0.3)',
          300: '#41464B',
          500: '#2C3137',
          600: '#7F8488',
          700: '#1A1D20',
          900: '#101112',
        },
        green: '#2EC747',
        white: '#FFFFFF',
        red: '#FF4E4E',
        orange: {
          DEFAULT: '#F09F03',
          100: '#FFFFF1',
          200: '#FFF0E1',
          300: '#F9DBB2',
          400: '#F4C271',
          500: '#F09F03',
          600: '#A06A00',
        },
        yellow: '#F8E11A',
        cornflowerblue: '#5bb0ff',
        deeppink: 'rgba(251, 24, 133, 0.05)',
        dodgerblue: '#1d7cee',
      },
      fontFamily: {
        kaisei: ['Kaisei Tokumin'],
        notosans: ['Noto Sans JP'],
        notoserif: ['Noto Serif JP'],
        inter: ['Inter'],
        bigger: ['Bigger'],
        bronco: ['Bronco'],
        koku: ['Koku']
      },
      screens: {
        desktop: '1920px',
        tablet: { max: '1350px' },
        ipad: { max: '1194px' },
        mobi: { max: '852px' },
        smallMobi: { max: '630px'},
        mobile: '768px',
      },
    },
  },
  plugins: [],
};

