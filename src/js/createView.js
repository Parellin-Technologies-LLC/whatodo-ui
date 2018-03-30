/** ****************************************************************************************************
 * File: createView.js
 * Project: whatodo-ui
 * @author Nick Soggin <iSkore@users.noreply.github.com> on 13-Mar-2018
 *******************************************************************************************************/
'use strict';

export default function( container ) {
	return new Promise(
		res => {
			const
				grid    = $( '<div>' ),
				sidebar = $( '<div>' );
			
			sidebar
				.attr( { id: 'sidebar', class: 'col-2' } );
			
			grid
				.attr( { id: 'grid', class: 'row' } )
				.css( {
					opacity: 0
				} );
			
			grid.animate( {
				opacity: 1
			}, 1000 );
			
			grid.append( sidebar );
			container.append( grid );
			
			res();
		}
	);
}
