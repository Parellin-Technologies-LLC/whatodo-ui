/** ****************************************************************************************************
 * File: buildSidebar.js
 * Project: whatodo-ui
 * @author Nick Soggin <iSkore@users.noreply.github.com> on 26-Mar-2018
 *******************************************************************************************************/
'use strict';

import $ from 'jquery';
import { openProject } from '../renderer';

export default function() {
	return new Promise(
		res => {
			const
				sidebar    = $( '#sidebar' ),
				addProject = $( '<div>' ),
				whatTodo   = $( '<strong>' ),
				buttonIcon = $( '<i>' );
			
			buttonIcon
				.addClass( 'fa fa-plus-square' );
			
			whatTodo
				.attr( { class: 'pl-2' } )
				.text( 'Whatodo' );
			
			addProject
				.attr( { id: 'openProject' } )
				.click( openProject );
			
			addProject.append( buttonIcon );
			addProject.append( whatTodo );
			sidebar.append( addProject );
			
			res();
		}
	);
}
