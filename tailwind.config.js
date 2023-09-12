

function withOpacity(variable) {
  return ({ opacityValue }) => {
    if (opacityValue === undefined) {
      return `rgb(var(${variable}))`
    }
    return `rgb(var(${variable}) / ${opacityValue})`
  }
}

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    colors: {
      'transparent': 'rgb(0 0 0 / 0)',
      'fg': withOpacity('--color-fg'),
      'fg-hard': withOpacity('--color-fg-hard'),
      'fg-soft': withOpacity('--color-fg-soft'),
      'bg': withOpacity('--color-bg'),
      'active': withOpacity('--color-active'),
      'inset': withOpacity('--color-inset'),
      // {
      //   '100': '#222',
      //   '200': '#333',
      //   '300': '#444',
      // }
    },
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
}
