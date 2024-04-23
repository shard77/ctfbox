/** @type {import('tailwindcss').Config} */

const { nextui } = require("@nextui-org/react");

export default {
	content: [
		'./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}',
		'./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}'
	],
	theme: {
		extend: {
			fontFamily: {
				jersey: ["Jersey 25", "sans-serif"],
				micro: ["Micro 5", "sans-serif"],
			}
		},
	},
	darkMode: "class",
	plugins: [
		nextui({
			themes: {
				light: {
					colors: {
						background: "#030913",
						foreground: "#cfd6e6",
						secondary: "#7096e7",
						primary: {
							foreground: "#cfd6e6",
							DEFAULT: "#006FEE",
						},
					},
				},
				dark: {
					colors: {
						background: "#030913",
						foreground: "#cfd6e6",
						primary: {
							foreground: "#cfd6e6",
							DEFAULT: "#cfd6e6",
						},
					},
				},
			},
		}),
	],
};
