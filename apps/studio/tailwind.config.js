/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      colors: {
        // Design Prototypes color scheme
        primary: '#2563eb', // Blue-600 - matches "Start Learning" button
        secondary: '#f8fafc', // Gray-50 - light background
        accent: '#8b5cf6', // Purple-500 - for "GDS" purple accent
        dark: '#1e293b', // Gray-800 - dark text
        muted: '#64748b', // Gray-500 - muted text
        page: {
          DEFAULT: '#ffffff',
          dark: '#1e293b'
        }
      },
      fontFamily: {
        sans: [
          '-apple-system',
          'BlinkMacSystemFont',
          'Segoe UI',
          'Roboto',
          'sans-serif'
        ]
      },
      fontSize: {
        hero: ['3.5rem', { lineHeight: '1.1', fontWeight: '700' }],
        'hero-sm': ['2.5rem', { lineHeight: '1.2', fontWeight: '700' }]
      },
      borderRadius: {
        xl: '1rem',
        '2xl': '1.5rem'
      },
      boxShadow: {
        soft: '0 4px 6px -1px rgb(0 0 0 / 0.07), 0 2px 4px -1px rgb(0 0 0 / 0.06)',
        button: '0 1px 2px 0 rgb(0 0 0 / 0.05)'
      },
      backgroundImage: {
        'hero-gradient': 'linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)'
      }
    }
  },
  plugins: []
}
