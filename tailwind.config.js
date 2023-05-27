/** @type {import('tailwindcss').Config} */
export default {
	content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
	darkMode: 'class',
	theme: {
		colors: {
			'background-color': '#fff',
			'foreground-color': '#d6e9ff',
			'font-color': '#38567B',
			'background-color-dark': '#2F3137',
			'foreground-color-dark': '#202125',
			'font-color-dark': '#d6e9ff',
		},
		extend: {
			backgroundImage: {
				texture: `url("./src/assets/pattern-light.svg")`,
				'texture-dark': `url("./src/assets/pattern-dark.svg")`,
			},
		},
	},
	plugins: [],
};
