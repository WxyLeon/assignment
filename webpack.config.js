const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const ESLintPlugin = require('eslint-webpack-plugin');
const { theme } = require('antd');
const { defaultAlgorithm, defaultSeed } = theme;
const mapToken = defaultAlgorithm(defaultSeed);

const DEV = process.env.NODE_ENV === 'development';

module.exports = {
	entry: './src/index.tsx',
	output: {
		path: path.join(__dirname, 'dist'),
		filename: '[name].[contenthash:8].js',
		clean: true,
	},
	devServer: {
		port: 8080,
	},
	mode: process.env.NODE_ENV,
	devtool: DEV && 'source-map',
	module: {
		rules: [
			{
				test: /\.jsx?$/,
				exclude: /node_modules/,
				loader: 'babel-loader',
			},
			{
				test: /\.tsx?$/,
				exclude: /node_modules/,
				use: [
					{
						loader: 'ts-loader',
						options: {
							transpileOnly: true,
						},
					},
				],
			},
			{
				test: /\.css$/,
				use: [
					MiniCssExtractPlugin.loader,
					{
						loader: 'css-loader', // 处理 import 语法 和 url() 路径
						options: {
							importLoaders: 1,
						},
					},
					'postcss-loader',
				],
			},
			{
				test: /\.less$/,
				use: [
					MiniCssExtractPlugin.loader,
					{
						loader: 'css-loader', // 处理 import 语法 和 url() 路径
						options: {
							importLoaders: 1,
						},
					},
					'postcss-loader',
					{
						loader: 'less-loader',
						options: {
							lessOptions: {
								modifyVars: mapToken,
								javascriptEnabled: true, // 支持js
							},
						},
					},
				],
			},
			{
				test: /\.(png|jpe?g|gif|webp)$/,
				type: 'asset',
				parser: {
					dataUrlCondition: {
						maxSize: 10 * 1024, // 小于10kb的图片会被base64处理
					},
				},
			},
			{
				test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
				use: [
					'babel-loader',
					{
						loader: '@svgr/webpack',
						options: {
							babel: false,
							icon: true,
						},
					},
				],
			},
			{
				test: /\.(woff|woff2|eot|ttf|otf)$/i,
				type: 'asset/resource',
			},
			{
				test: /\.icon$/,
				type: 'asset/inline',
			},
		],
	},
	optimization: {
		minimizer: [
			new TerserPlugin({
				parallel: false,
				terserOptions: {
					output: {
						comments: false,
					},
				},
			}),
			new CssMinimizerPlugin(),
		],
		minimize: !DEV,
		splitChunks: {
			minSize: 500000,
			cacheGroups: {
				vendors: false,
			},
		},
	},
	resolve: {
		modules: ['node_modules'],
		extensions: ['.json', '.js', '.jsx', '.ts', '.tsx', '.less'],
		alias: {
			'@': path.resolve(__dirname, './src'),
		},
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: path.join(__dirname, '/src/index.html'),
			filename: 'index.html',
		}),
		process.env.ANALYZER && new BundleAnalyzerPlugin(),
		new MiniCssExtractPlugin({
			filename: 'css/[name].css',
		}),
		new ESLintPlugin({
			extensions: ['.json', '.js', '.jsx', '.ts', '.tsx'],
		}),
		new ForkTsCheckerWebpackPlugin(),
	].filter(Boolean),
};
