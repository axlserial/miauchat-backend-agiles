module.exports = {
	apps: [
		{
			name: 'miauchat-backend',
			script: './dist/index.js',
			env: {
				NODE_ENV: 'production'
			}
		}
	]
};
