/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
	setupFilesAfterEnv: ['@testing-library/jest-dom'],
	testEnvironment: 'jsdom',
	preset: 'ts-jest',
	setupFilesAfterEnv: ['<rootDir>/setup-jest.js'],
	transform: {
		'^.+\\.(ts|tsx)?$': 'ts-jest',
		'^.+\\.(js|jsx)$': 'babel-jest',
		'\\.(less|css)$': 'jest-less-loader',
	},
};
