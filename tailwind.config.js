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
                    teal: '#14b8a6',
                    'teal-dark': '#0d9488',
                    blue: '#0a0a0f',
                    'blue-light': '#12121a',
                    'blue-lighter': '#1c1c28',
                    gray: {
                        100: '#F5F5F5',
                        200: '#E0E0E0',
                        300: '#BDBDBD',
                        400: '#9E9E9E',
                        500: '#757575',
                        600: '#616161',
                        700: '#424242',
                        800: '#303030',
                        900: '#16161f',
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
