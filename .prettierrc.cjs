module.exports = {
	trailingComma: 'none',
	tabWidth: 4,
	semi: false,
	singleQuote: true,
	printWidth: 80,
	useTabs: true,
	overrides: [
		{
			files: ['**/*.astro'],
			options: {
				parser: 'astro'
			}
		}
	]
}
