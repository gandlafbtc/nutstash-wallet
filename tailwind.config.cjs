/** @type {import('tailwindcss').Config} */
module.exports = {
	daisyui: {
		themes: [
			'light',
			'dark',
			{
				nutty: {
					"primary": "#C9A163",
					"secondary": "#664625",
					"accent": "#713f12",
					"neutral": "#854d0e",
					"base-100": "#ffedd5",
					"info": "#0f766e",
					"success": "#3f6212",
					"warning": "#ca8a04",
					"error": "#9a3412",
				},
			},
			'cupcake',
			'bumblebee',
			'emerald',
			'corporate',
			'synthwave',
			'retro',
			'cyberpunk',
			'valentine',
			'halloween',
			'garden',
			'forest',
			'aqua',
			'lofi',
			'pastel',
			'fantasy',
			'wireframe',
			'black',
			'luxury',
			'dracula',
			'cmyk',
			'autumn',
			'business',
			'acid',
			'lemonade',
			'night',
			'coffee',
			'winter',
			
		]
	},
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {}
	},
	plugins: [require('daisyui')]
};
