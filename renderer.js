/** ****************************************************************************************************
 * File: renderer.js
 * Project: whatodo-ui
 * @author Nick Soggin <iSkore@users.noreply.github.com> on 08-Mar-2018
 *******************************************************************************************************/
'use strict';

import { ipcRenderer, remote } from 'electron';
import processProject from './lib/processProject';

const
	main       = remote.require( './main' ),
	{ dialog } = remote;

import './lib/index';

export default function() {
	ipcRenderer.send( 'ready', 1 );
	console.log( 'rendered' );
}

ipcRenderer.on( 'ready', ( event, args ) => {
	console.log( args );
	console.log( main );
} );

function loadProject( proj ) {
	processProject( proj )
		.then( console.log );
}

export function openProject() {
	return new Promise(
		( res, rej ) => {
			dialog.showOpenDialog(
				{ properties: [ 'openDirectory' ] },
				d => {
					if( d ) {
						if( d.length >= 2 ) {
							rej( 'can\'t select more than one project' );
						} else {
							ipcRenderer.send( 'addProject', d[ 0 ] );
							loadProject( d[ 0 ] );
							res();
						}
					} else {
						rej( 'nothing selected' );
					}
				}
			);
		}
	);
}
