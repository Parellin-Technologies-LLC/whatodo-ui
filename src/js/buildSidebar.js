/** ****************************************************************************************************
 * File: buildSidebar.js
 * Project: whatodo-ui
 * @author Nick Soggin <iSkore@users.noreply.github.com> on 26-Mar-2018
 *******************************************************************************************************/
'use strict';

export default function() {
	return new Promise(
		res => {
			const
				sidebar  = $( '#sidebar' ),
				whatTodo = $( '<strong>' );
			
			whatTodo
				.attr( { class: '' } )
				.text( 'Whatodo' );
			
			sidebar.append( whatTodo );
			
			res();
		}
	);
}
