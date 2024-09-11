/** @type {import('tailwindcss').Config} */

export default {
  content: [
    './index.html',
    './src/**/*.{html,js,jsx,ts,tsx}',
    "./node_modules/@material-tailwind/react/components/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@material-tailwind/react/theme/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        similar:'#202C44',
       'similar-secondary':'#303A50',
        main:"#0D1A34",
        placeholder: "#a1a1aa",
        disabled: "#a0a0a0",
        navy: {
          400: '#202C44',
          700: '#303A50',
          900: '#0D1A34',
        }
      },
      fontFamily: {
        kaisei: ['Kaisei Tokumin'],
        notosans: ['Noto Sans JP'],
        notoserif: ['Noto Serif JP'],
      },
      screens: {
        'desktop': '1920px',
        'mobile': '768px',
      }

    },
  },
  plugins: [],
}

