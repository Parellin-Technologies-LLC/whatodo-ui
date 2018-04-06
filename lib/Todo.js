/** ****************************************************************************************************
 * File: Todo.js
 * Project: whatodo-ui
 * @author Nick Soggin <iSkore@users.noreply.github.com> on 06-Apr-2018
 *******************************************************************************************************/
'use strict';

import $ from 'jquery';
import { homedir } from '../main/renderer';

export default class Todo
{
	constructor( file, priority, comment, line )
	{
		this.file     = file.replace( homedir, '~' );
		this.priority = priority;
		this.comment  = `<code>${ comment }</code>`;
		this.line     = line;
		
		this.card        = $( '<div>' ).addClass( 'card p-0 m-1 col-sm-12 col-md-4 col-lg-3' );
		this.header      = $( '<h5>' ).addClass( 'card-header m-0 p-0' );
		this.body        = $( '<div>' ).addClass( 'card-body mt-0 pt-1 pb-1' );
		this.fileText    = $( '<p>' ).addClass( 'card-title' );
		this.commentText = $( '<p>' ).addClass( 'card-text' );
		this.lineText    = $( '<p>' ).addClass( 'card-text' );
		
		this.priority === 'high' ? this.header.addClass( 'bg-danger' ) :
			this.priority === 'mid' ? this.header.addClass( 'bg-warning' ) :
				this.priority === 'low' ? this.header.addClass( 'bg-success' ) :
					this.header.addClass( 'bg-secondary' );
		
		this.header.text( `[${ this.priority.toUpperCase() }]` );
		this.fileText.text( this.file ).addClass( 'm-1' );
		this.commentText.html( this.comment ).addClass( 'm-1' );
		this.lineText.text( `Line: #${ this.line }` ).addClass( 'm-1' );
		
		this.card
			.append( this.header )
			.append(
				this.body
					.append( this.fileText )
					.append( this.commentText )
					.append( this.lineText )
			);
	}
	
	addToView( view )
	{
		view.append( this.card );
	}
}
