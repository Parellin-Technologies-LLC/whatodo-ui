/** ****************************************************************************************************
 * File: global.js
 * Project: whatodo-ui
 * @author Nick Soggin <iSkore@users.noreply.github.com> on 13-Mar-2018
 *******************************************************************************************************/
'use strict';

import splashView from './splashView';
import createView from './createView';

$( document ).ready( () => {
	splashView();
		// .then( () => createView() );
} );
