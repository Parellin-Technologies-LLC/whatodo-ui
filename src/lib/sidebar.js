/** ****************************************************************************************************
 * File: buildSidebar.js
 * Project: whatodo-ui
 * @author Nick Soggin <iSkore@users.noreply.github.com> on 26-Mar-2018
 *******************************************************************************************************/
'use strict';

import $ from 'jquery';
import { basename } from 'path';
import { openProject, loadProject } from '../renderer';

const
	addProject  = $( '<div>' ),
	whatTodo    = $( '<strong>' ),
	buttonIcon  = $( '<i>' ),
	projectList = $( '<div>' );

export function buildSidebar() {
	return new Promise(
		res => {
			const sidebar = $( '#sidebar' );
			
			buttonIcon
				.addClass( 'fa fa-plus-square' );
			
			whatTodo
				.attr( { class: 'pl-2' } )
				.text( 'Whatodo' );
			
			addProject
				.attr( { id: 'openProject' } )
				.click( openProject );
			
			projectList
				.attr( {
					id: 'projectList',
					role: 'tablist',
					class: 'list-group mt-2'
				} );
			
			addProject.append( buttonIcon );
			addProject.append( whatTodo );
			sidebar.append( addProject );
			sidebar.append( projectList );
			
			res();
		}
	);
}

export function addProjectToList( fpath ) {
	const item = $( '<a>' );
	
	item
		.addClass( 'list-group-item list-group-item-action text-truncate pt-1 pr-2 pb-1 pl-2' )
		.attr( {
			role: 'tab',
			'data-toggle': 'list'
		} )
		.text( basename( fpath ) )
		.click( () => loadProject( fpath ) );
	
	projectList.append( item );
}
