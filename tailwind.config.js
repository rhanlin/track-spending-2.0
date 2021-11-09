// eslint-disable-next-line @typescript-eslint/no-var-requires
const plugin = require('tailwindcss/plugin')

module.exports = {
  mode: 'jit',
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './src/index.html'],
  darkMode: false,
  theme: {
    screens: {
      md: '768px',
      mlg: '1024px',
      lg: '1366px'
    }
  },
  plugins: [
    plugin(function ({ addComponents }) {
      const ellipsisLine2 = {
        '.ellipsis-line2': {
          overflow: 'hidden',
          display: '-webkit-box',
          textOverflow: 'ellipsis',
          WebkitLineClamp: '2',
          WebkitBoxOrient: 'vertical',
          whiteSpace: 'normal'
        }
      }

      addComponents(ellipsisLine2)
    }),
    plugin(function ({ addComponents }) {
      const ellipsisLine1 = {
        '.ellipsis-line1': {
          overflow: 'hidden',
          display: '-webkit-box',
          textOverflow: 'ellipsis',
          WebkitLineClamp: '1',
          WebkitBoxOrient: 'vertical',
          whiteSpace: 'normal'
        }
      }

      addComponents(ellipsisLine1)
    })
  ]
}
