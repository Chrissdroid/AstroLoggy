module.exports = {
	plugins: [
		require('cssnano')({
			preset: 'advanced',
			plugins: [
				'autoprefixer',
				['postcss-preset-env', {
					browsers: 'last 2 versions'
				}]
			]
		})
	]
}