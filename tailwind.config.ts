import type { Config } from 'tailwindcss'

const config: Config = {
  variants: {
    textColor: ['responsive', 'hover', 'focus', 'group-hover'],
     },
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        main: "#F8853E",
        mainBlur: "#F8853E7D",
      },
    },
    
  },
  plugins: [],
}
export default config
