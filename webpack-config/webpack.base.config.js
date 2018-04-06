/** ****************************************************************************************************
 * File: webpack.base.config.js
 * Project: whatodo-ui
 * @author Nick Soggin <iSkore@users.noreply.github.com> on 13-Mar-2018
 *******************************************************************************************************/
'use strict';

import { name } from '../package.json';
import { resolve } from 'path';
import webpack from 'webpack';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';

const
	extractHtml    = new HtmlWebpackPlugin( {
		title: name,
		template: 'index.html',
		filename: '../html/index.html',
		xhtml: true
	} ),
	extractModules = new webpack.ProvidePlugin( {
		$: 'jquery',
		jQuery: 'jquery',
		'window.jQuery': 'jquery',
		Popper: [ 'popper.js', 'default' ],
		AWS: 'aws-sdk'
	} ),
	extractAssests = new CopyWebpackPlugin( [
		{
			from: './assets/',
			to: '../html/assets/'
		}
	] );

export default {
	context: resolve( __dirname, '../src' ),
	entry: {
		app: [ './js/index.js' ]
	},
	output: {
		path: resolve( __dirname, '../html/' ),
		filename: 'js/bundle.js',
		publicPath: './'
	},
	module: {
		rules: [
			{
				test: /\.(jpe?g|gif|png|svg|wav|mp3)$/,
				use: {
					loader: 'file-loader',
					options: {
						outputPath: 'images/',
						publicPath: './',
						name: '[name].[ext]'
					}
				}
			},
			{
				test: /\.css$/,
				use: [
					{ loader: 'style-loader' },
					{ loader: 'css-loader' }
				]
			},
			{
				test: /\.scss$/,
				use: ExtractTextPlugin.extract( {
					fallback: 'style-loader',
					use: [ 'css-loader', 'sass-loader' ]
				} )
			},
			{
				test: /\.(ttf|woff|woff2|svg|eot)$/,
				use: {
					loader: 'file-loader?publicPath=../&name=html/fonts/[name].[ext]'
				}
			},
			{
				test: /\.js/,
				exclude: /node_modules/,
				loader: 'babel-loader'
			},
			{
				test: /\.(html)$/,
				use: {
					loader: 'html-loader'
				}
			},
			{
				test: /\.json$/,
				use: {
					loader: 'json-loader'
				}
			}
		]
	},
	plugins: [
		new ExtractTextPlugin( 'styles.css' ),
		extractHtml,
		extractModules,
		extractAssests
	]
};