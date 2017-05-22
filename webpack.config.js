const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackIncludeAssetsPlugin = require('html-webpack-include-assets-plugin');
const webpack = require('webpack');
const path = require('path');

const config = {
	entry: './app/index.js',
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
				loader: "handlebars-loader" 
			}
		]
	},
	plugins: [
		new CopyWebpackPlugin([
		    { from: 'node_modules/bootstrap/dist/css', to: 'css/' },
		    { from: 'node_modules/bootstrap/dist/fonts', to: 'fonts/' }
		]),
		new HtmlWebpackPlugin({
			template: './index.html'
		}),
		new HtmlWebpackIncludeAssetsPlugin({
		    assets: ['css/bootstrap.min.css', 'css/bootstrap-theme.min.css'],
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