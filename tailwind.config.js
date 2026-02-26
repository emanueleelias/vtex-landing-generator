/** @type {import('tailwindcss').Config} */
export default {
    darkMode: 'class',
    content: [
        './index.html',
        './src/**/*.{js,ts,jsx,tsx}',
    ],
    theme: {
        extend: {
            colors: {
                vtex: {
                    pink: '#F71963',
                    'pink-dark': '#D91654',
                    blue: '#142032',
                    'blue-light': '#1A2A42',
                    'blue-lighter': '#243552',
                    gray: {
                        100: '#F5F5F5',
                        200: '#E0E0E0',
                        300: '#BDBDBD',
                        400: '#9E9E9E',
                        500: '#757575',
                        600: '#616161',
                        700: '#424242',
                        800: '#303030',
                        900: '#1A1A2E',
                    },
                },
            },
            fontFamily: {
                sans: ['Inter', 'system-ui', 'sans-serif'],
            },
        },
    },
    plugins: [],
}
