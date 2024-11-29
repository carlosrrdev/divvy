import daisyui from "daisyui";

/** @type {import('tailwindcss').Config} */
export default {
    darkMode: 'selector', content: ["index.html", "src/**/*.{js,jsx,ts,tsx}",], theme: {
        extend: {},
    }, daisyui: {
        themes: [{
            divvyLight: {
                "primary": "#111827",
                "secondary": "#4338ca",
                "accent": "#7c3aed",
                "neutral": "#374151",
                "base-100": "#fefefe",
                "info": "#22d3ee",
                "success": "#34d399",
                "warning": "#f59e0b",
                "error": "#fb7185",
            },
        }, {
            divvyDark: {
                "primary": "#c4ccd9",
                "secondary": "#4338ca",
                "accent": "#ae86f3",
                "neutral": "#374151",
                "base-100": "#131317",
                "info": "#22d3ee",
                "success": "#34d399",
                "warning": "#f59e0b",
                "error": "#fb7185",
            },
        }],
        darkTheme: 'divvyDark',
    }, plugins: [daisyui],
}

