/** ****************************************************************************************************
 * File: renderer.js
 * Project: whatodo-ui
 * @author Nick Soggin <iSkore@users.noreply.github.com> on 08-Mar-2018
 *******************************************************************************************************/
'use strict';

import { ipcRenderer, remote } from 'electron';
import processProject from './lib/processProject';
import { addProjectToList } from './lib/sidebar';
import { renderProject } from './lib/container';
import './lib/index';

const { dialog } = remote;

export let homedir = '';

export function ready() {
	ipcRenderer.send( 'ready' );
}

export function listProjects( { projects } ) {
	projects.forEach(
		proj => addProjectToList( proj )
	);
}

export function loadProject( proj ) {
	// TODO: show loading screen here
	processProject( proj )
		.then( renderProject )
		.catch( console.error );
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
							const dir = d[ 0 ];
							ipcRenderer.send( 'addProject', dir );
							loadProject( dir );
							addProjectToList( dir );
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

ipcRenderer.on( 'ready', ( event, args ) => {
	homedir = args.homedir;
	listProjects( args );
} );
