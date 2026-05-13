/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Bronze ramp derived from the brand logo gradient.
        // 400/600/700 match the logo's top/mid/bottom stops.
        primary: {
          50: '#fdf6ea',
          100: '#f8e5c8',
          200: '#f1d2a3',
          300: '#e6b97c',
          400: '#d6a274',
          500: '#c89058',
          600: '#b9824f',
          700: '#9a6a3c',
          800: '#6f4a26',
          900: '#3f2916',
        },
        // Warm dark neutrals — paired with the bronze primary for a pure warm palette.
        secondary: {
          50: '#fafaf7',
          100: '#f0efea',
          200: '#dad8ce',
          300: '#b8b5a6',
          400: '#928e7d',
          500: '#6f6b5b',
          600: '#534f43',
          700: '#3a372f',
          800: '#23211c',
          900: '#0e0d0a',
        },
        // Warm-tinted neutrals to harmonize with the bronze brand identity.
        neutral: {
          50: '#faf8f4',
          100: '#f1ede5',
          200: '#e3ddd1',
          300: '#ccc6b8',
          400: '#a8a294',
          500: '#6e6a5e',
          600: '#4d4a41',
          700: '#3a3832',
          800: '#23211d',
          900: '#14130f',
        },
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'Inter', 'system-ui', '-apple-system', 'sans-serif'],
        display: ['var(--font-display)', 'Fraunces', 'Georgia', 'serif'],
      },
      fontSize: {
        base: ['1rem', { lineHeight: '1.6rem' }],
      },
      spacing: {
        '128': '32rem',
        '144': '36rem',
      },
      maxWidth: {
        '8xl': '88rem',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
  ],
}
