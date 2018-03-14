/** ****************************************************************************************************
 * File: webpack.config.babel.js
 * Project: whatodo-ui
 * @author Nick Soggin <iSkore@users.noreply.github.com> on 13-Mar-2018
 *******************************************************************************************************/
'use strict';

export default function( env ) {
	return require( `./webpack-config/webpack.${ env }.config.js` );
}