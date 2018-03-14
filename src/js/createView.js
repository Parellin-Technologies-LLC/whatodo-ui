/** ****************************************************************************************************
 * File: createView.js
 * Project: whatodo-ui
 * @author Nick Soggin <iSkore@users.noreply.github.com> on 13-Mar-2018
 *******************************************************************************************************/
'use strict';

export default function() {
	console.log( 'CALLED' );
	const
		grid    = $( '#grid' ),
		sidebar = $( '<div>' );
	
	sidebar
		.attr( {
			id: 'sidebar',
			class: 'col-3'
		} )
		.css( {
			position: 'absolute',
			width: '100%',
			height: '100%',
			color: '#45B5EA'
		} );
	
	grid.append( sidebar );
	
	console.log( 'createView' );
}
