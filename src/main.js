/** ****************************************************************************************************
 * File: index.js
 * Project: whatodo-ui
 * @author Nick Soggin <iSkore@users.noreply.github.com> on 13-Mar-2018
 *******************************************************************************************************/
'use strict';

import { app, ipcMain, BrowserWindow } from 'electron';
import { join } from 'path';
import { format } from 'url';
import Process from './Process';

if( require( 'electron-squirrel-startup' ) ) {
	app.quit();
}

let main = null;

function createWindow() {
	main = new BrowserWindow( Process._mainWindow );
	
	Process.mainWindow = main;
	
	console.log( Process.cwd );
	console.log( Process.dir );
	
	main.loadURL(
		format( {
			pathname: join( Process.dir, 'index.html' ),
			protocol: 'file:',
			slashes: true
		} )
	);
	
	console.log( join( Process.cwd, 'index.html' ) );
	console.log( require( 'fs' ).readdirSync( './' ) );
	
	// main.webContents.openDevTools();
	
	main.on( 'closed', function() {
		main = null;
	} );
}

app.on( 'ready', createWindow );

app.on( 'window-all-closed', function() {
	if( process.platform !== 'darwin' ) {
		app.quit();
	}
} );

app.on( 'activate', function() {
	if( main === null ) {
		createWindow();
	}
} );

ipcMain.on( 'ready', event => {
	event.sender.send( 'ready', {
		projects: Process.getProjects(),
		homedir: Process.homedir
	} );
} );

ipcMain.on( 'addProject', ( event, args ) => {
	Process.addProject( args );
} );
