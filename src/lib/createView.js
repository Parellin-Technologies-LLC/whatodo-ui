/** ****************************************************************************************************
 * File: createView.js
 * Project: whatodo-ui
 * @author Nick Soggin <iSkore@users.noreply.github.com> on 13-Mar-2018
 *******************************************************************************************************/
'use strict';

import $ from 'jquery';
import { bind } from './container';

// TODO: remove this function into sidebar.js and container.js
export default function( container ) {
	const
		grid          = $( '<div>' ),
		sidebar       = $( '<div>' ),
		mainContainer = $( '<div>' );
	
	sidebar
		.attr( {
			id: 'sidebar',
			class: 'col-3 pl-4 pr-2'
		} );
	
	mainContainer
		.attr( {
			id: 'mainContainer',
			class: 'col-9 p-0 justify-content-md-center'
		} );
	
	grid
		.attr( { id: 'grid', class: 'row m-0' } )
		.css( { opacity: 0 } )
		.animate( { opacity: 1 }, 1000 )
		.append( sidebar )
		.append( mainContainer );
	
	container.append( grid );
	
	bind( mainContainer );
}
