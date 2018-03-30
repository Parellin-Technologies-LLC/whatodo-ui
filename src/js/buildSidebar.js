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
				sidebar    = $( '#sidebar' ),
				whatTodo   = $( '<strong>' ),
				addProject = $( '<button>' ),
				buttonIcon = $( '<i>' );
			
			whatTodo
				.attr( { class: 'pr-5' } )
				.text( 'Whatodo' );
			
			buttonIcon
				.addClass( 'fa fa-plus-square' );
			
			addProject.append( buttonIcon );
			sidebar.append( addProject );
			sidebar.append( whatTodo );
			
			res();
		}
	);
}
