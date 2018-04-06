/** ****************************************************************************************************
 * File: container.js
 * Project: whatodo-ui
 * @author Nick Soggin <iSkore@users.noreply.github.com> on 06-Apr-2018
 *******************************************************************************************************/
'use strict';

import $ from 'jquery';
import { basename } from 'path';
import { convertNanoseconds, toFixed } from './util';
import Todo from './Todo';

let mainContainer = null;

const
	todoContainer = $( '<div>' )
		.addClass( 'row justify-content-md-center align-items-center pt-3 pr-0 pb-3 pl-0 m-0 position-relative' )
		.attr( { id: 'todoContainer' } );

export function bind( container ) {
	mainContainer = container;
}

export function clearContainer() {
	mainContainer.html( '' );
	todoContainer.html( '' );
	mainContainer.append( todoContainer );
}

export function addProjectTitleBar( opts ) {
	const
		titleBar   = $( '<div>' ),
		badgeBar   = $( '<div>' ),
		infoBar    = $( '<div>' ),
		infoMenu   = $( '<div>' ),
		badgeFloat = 'badge mr-2 p-2 float-right';
	
	let time = convertNanoseconds( opts.totalTime );
	
	time = opts.totalTime < 1000 ? `${ toFixed( time.nano ) } ns` :
		opts.totalTime < 1000000 ? `${ toFixed( time.micro ) } μs` :
			opts.totalTime < 1000000000 ? `${ toFixed( time.milli ) } ms` :
				`${ toFixed( time.seconds ) } s`;
	
	titleBar
		.attr( { class: 'alert alert-primary text-left ml-3 mt-3 mr-3 mb-0' } )
		.text( basename( opts.input ) );
	
	badgeBar
		.addClass( 'float-right' )
		.css( { display: 'block' } )
		.append( infoBar );
	
	infoBar
		.addClass( 'dropdown float-right' )
		.append(
			$( '<button>' )
				.addClass( 'btn btn-secondary btn-sm pt-1 pr-2 pb-1 pl-2' )
				.attr( {
					id: 'dropdownInfo',
					type: 'button',
					'data-toggle': 'dropdown',
					'aria-haspopup': 'true',
					'aria-expanded': 'false'
				} )
				.append( $( '<i>' ).addClass( 'fa fa-cog' ) )
		)
		.append( infoMenu );
	
	infoMenu
		.addClass( 'dropdown-menu dropdown-menu-right pt-1 pr-2 pb-1 pl-3' )
		.attr( { 'aria-labelledby': 'dropdownInfo' } )
		.css( { 'font-size': '0.75rem' } )
		.html(
			`<strong>Path</strong>: ${ opts.input }<br/>` +
			`<strong>Total Todos</strong>: ${ opts.total }<br/>` +
			`<strong>Files Searched</strong>: ${ opts.filesSearched }<br/>` +
			`<strong>Search Time</strong>: ${ time }<br/>` +
			`<strong>Search Pattern</strong>: ${ opts.todoPattern }<br/>` +
			`<strong>Ignore Extensions</strong>: ${ opts.ignoreExtsRx.toString() }<br/>` +
			`<strong>Ignore Patterns</strong>: ${ opts.ignoreRx.toString() }<br/>` +
			`<strong>Maximum File Size</strong>: ${ opts.maximumFileSize }<br/>`
		);
	
	!opts.unknown || badgeBar.append(
		$( '<span>' ).addClass( `${ badgeFloat } badge-secondary` ).text( opts.unknown )
	);
	
	!opts.low || badgeBar.append(
		$( '<span>' ).addClass( `${ badgeFloat } badge-success` ).text( opts.low )
	);
	
	!opts.mid || badgeBar.append(
		$( '<span>' ).addClass( `${ badgeFloat } badge-warning` ).text( opts.mid )
	);
	
	!opts.high || badgeBar.append(
		$( '<span>' ).addClass( `${ badgeFloat } badge-danger` ).text( opts.high )
	);
	
	titleBar.append( badgeBar );
	mainContainer.prepend( titleBar );
}

export function addCardToUI( ...args ) {
	console.log( args );
	return Promise.resolve( new Todo( ...args ) );
}

export function renderProject( proj ) {
	clearContainer();
	
	addProjectTitleBar( proj );
	
	console.log( proj );
	return Promise.all(
		proj.todos
			.reduce(
				( r, items ) => {
					if( items.skip ) {
						return r;
					}
					
					items.todos.forEach(
						( { priority, comment, line } ) => r.push(
							addCardToUI( items.file, priority, comment, line )
								.then( todo => todo.addToView( todoContainer ) )
						)
					);
					
					return r;
				}, []
			)
	);
}
