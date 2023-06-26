/** @type {import('tailwindcss').Config} */
export default {
	content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
	darkMode: 'class',
	theme: {
		extend: {
			screens: {
				'3xl': '1920px',
			},
			colors: {
				'background-color': '#fff',
				'foreground-color': '#d6e9ff',
				'font-color': '#38567B',
				'font-white': '#fff',
				'font-color-2': '#0076FF',
				'dark-background-color': '#2F3137',
				'dark-foreground-color': '#202125',
				'dark-font-color': '#d6e9ff',
				'dark-font-color-2': '#B2D6FF',
			},
			boxShadow: {
				'inset-light': '0px 0px 29px 0px rgba(214,233,255,0.75) inset',
				'inset-dark': '0px 0px 29px 0px rgba(32,33,37,0.75) inset',
			},
			// backgroundImage: {
			// 	'texture-light': `url("./src/assets/images/pattern-light.svg")`,
			// 	'texture-dark': `url("./src/assets/images/pattern-dark.svg")`,
			// },
			animation: {
				'spin-fast': 'spin 2s ease-in-out infinite',
			},
		},
	},
	plugins: [],
};
