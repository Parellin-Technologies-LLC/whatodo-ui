/** ****************************************************************************************************
 * File: webpack.dev.config.js
 * Project: whatodo-ui
 * @author Nick Soggin <iSkore@users.noreply.github.com> on 13-Mar-2018
 *******************************************************************************************************/
'use strict';

import { resolve } from 'path';
import Merge from 'webpack-merge';
import CommonConfig from './webpack.base.config';

export default Merge( CommonConfig, {
	context: resolve( __dirname, '../src' ),
	devServer: {
		compress: true,
		contentBase: './html',
		open: true,
		port: 3000,
		publicPath: '/'
	}
} );
