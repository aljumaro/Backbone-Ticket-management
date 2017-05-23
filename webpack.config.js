const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackIncludeAssetsPlugin = require('html-webpack-include-assets-plugin');
const webpack = require('webpack');
const path = require('path');

const config = {
	entry: './src/js/index.js',
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'app.bundle.js'
	},
	module: {
		rules: [
			{
				test: /\.js$/, 
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
			        options: {
			          presets: ['es2015']
			        }
			    }
			},
			{ 
				test: /\.handlebars$/, 
				exclude: /node_modules/,
				use: {
					loader: "handlebars-loader",
					options: {
						helperDirs: [path.resolve(__dirname, 'src/js/helpers')],
						partialDirs: [path.resolve(__dirname, 'src/js/partials')]
					}
				}
			}
		]
	},
	plugins: [
		new CopyWebpackPlugin([
		    { from: 'src/css', to: 'css/' }
		]),
		new HtmlWebpackPlugin({
			template: './src/index.html'
		}),
		new HtmlWebpackIncludeAssetsPlugin({
		    assets: ['css/base.css'],
		    append: false
		}),
		new webpack.optimize.UglifyJsPlugin(),
		new webpack.ProvidePlugin({
			$: 'jquery',
			jQuery: 'jquery',
			_: 'underscore',
			Backbone: 'backbone'
		})
	],
	devtool: 'eval'
}

module.exports = config;