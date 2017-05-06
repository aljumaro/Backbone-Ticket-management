const HtmlWebpackPlugin = require('html-webpack-plugin');
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
			}
		]
	},
	resolve: {
		alias: {
			jquery: 'jquery/src/jquery.js',
			underscore: 'underscore/underscore.js',
			backbone: 'backbone/backbone.js'
		}
	},
	plugins: [
		new webpack.optimize.UglifyJsPlugin(),
		new HtmlWebpackPlugin({template: './index.html'}),
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