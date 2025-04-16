import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    // Add './src/app/**/*.{js,ts,jsx,tsx,mdx}' if using App Router
  ],
  darkMode: 'class', // Enable class-based dark mode
  theme: {
    extend: {
      fontFamily: {
        sans: ['Manrope', 'sans-serif'], // Set Manrope as the default sans-serif font
      },
      // Potential theme extensions here
    },
  },
  plugins: [
    // Removed typography plugin
  ],
}
export default config
