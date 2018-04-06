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
	
	main.loadURL(
		format( {
			pathname: join( __dirname, 'dist', 'index.html' ),
			protocol: 'file:',
			slashes: true
		} )
	);
	
	main.webContents.openDevTools();
	
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

ipcMain.on( 'ready', ( event, args ) => {
	event.sender.send( 'ready', args );
} );

ipcMain.on( 'addProject', ( event, args ) => {
	Process.addProject( args );
} );
