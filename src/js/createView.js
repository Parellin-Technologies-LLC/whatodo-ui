/** ****************************************************************************************************
 * File: createView.js
 * Project: whatodo-ui
 * @author Nick Soggin <iSkore@users.noreply.github.com> on 13-Mar-2018
 *******************************************************************************************************/
'use strict';

export default function() {
	const
		container = $( '#container' ),
		grid      = $( '#grid' ),
		sidebar   = $( '<div>' );
	
	sidebar.attr( { id: 'sidebar', class: 'col-3' } );
	grid.attr( { id: 'grid', class: 'row' } );
	
	grid.append( sidebar );
	container.append( grid );
}
