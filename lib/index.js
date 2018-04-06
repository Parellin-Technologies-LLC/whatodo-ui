/** ****************************************************************************************************
 * File: index.js
 * Project: whatodo-ui
 * @author Nick Soggin <iSkore@users.noreply.github.com> on 13-Mar-2018
 *******************************************************************************************************/
'use strict';

import $ from 'jquery';
import splashView from './splashView';
import createView from './createView';
import buildSidebar from './buildSidebar';

$( document ).ready( () => {
	const container = $( '#container' );
	
	splashView( container )
		.then( () => createView( container ) )
		.then( () => buildSidebar() )
		.catch( console.error );
} );
