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
                "primary": "#aac3d3",
                "secondary": "#4338ca",
                "accent": "#f3c786",
                "neutral": "#374151",
                "base-100": "#0f0f13",
                "info": "#22d3ee",
                "success": "#60d098",
                "warning": "#f59e0b",
                "error": "#fb7185",
            },
        }],
        darkTheme: 'divvyDark',
    }, plugins: [daisyui],
}

