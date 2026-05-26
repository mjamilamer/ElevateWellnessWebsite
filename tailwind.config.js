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
        // In the soft-clinical palette, bronze is used as accent only
        // (icons, CTAs, eyebrows, links) — not background.
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
        // Light-to-medium blue ramp. 50 = pale-blue section band (#EEF4FA).
        // 900 = deep navy (#0F1E33) used for the CTA banner and footer.
        secondary: {
          50: '#eef4fa',
          100: '#dde9f2',
          200: '#bdd1e3',
          300: '#8db2cd',
          400: '#5b8db1',
          500: '#3a6c95',
          600: '#2b557a',
          700: '#224361',
          800: '#16314a',
          900: '#0F1E33',
        },
        // Cool slate-tinted gray neutrals. Replaces the prior warm-cream
        // neutrals so the page reads as soft-clinical rather than warm-bronze.
        neutral: {
          50: '#f6f8fa',
          100: '#eef1f5',
          200: '#dde3ec',
          300: '#c2cbd9',
          400: '#94a0b3',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a',
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
