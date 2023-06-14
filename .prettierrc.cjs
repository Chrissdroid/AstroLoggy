module.exports = {
	plugins: [require.resolve('prettier-plugin-astro')],
	overrides: [
		{
			files: '*.astro',
			options: {
				parser: 'astro',
			},
		},
	],
	singleQuote: true,
	printWidth: 120,
	tabWidth: 4,
	useTabs: true,
	jsxSingleQuote: true,
	trailingComma: 'es5',
	bracketSpacing: true,
	bracketSameLine: true,
	arrowParens: 'avoid',
	astroAllowShorthand: true,
	semi: false,
}
