/** @type {import('tailwindcss').Config} */
export default {
    content: ["./src/**/*.{ts,tsx}"],
    container: {
        center: true,
    },
    theme: {
        extend: {
            width: {
                nine: "90%",
            },
            colors: {
                light: "#fefefe",
                "light-50": "#eee",
            },
        },
    },
    plugins: [],
};
