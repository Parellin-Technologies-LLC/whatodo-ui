/** ****************************************************************************************************
 * File: main.js
 * Project: whatodo-ui
 * @author Nick Soggin <iSkore@users.noreply.github.com> on 13-Mar-2018
 *******************************************************************************************************/
'use strict';

const
	{
		app,
		BrowserWindow
	}              = require( 'electron' ),
	{ join }       = require( 'path' ),
	{ format }     = require( 'url' ),
	{ mainWindow } = require( './config' );

if( require( 'electron-squirrel-startup' ) ) {
	app.quit();
}

let main = null;

function createWindow() {
	main = new BrowserWindow( mainWindow );
	
	main.loadURL( format( {
		pathname: join( __dirname, 'dist', 'index.html' ),
		protocol: 'file:',
		slashes: true
	} ) );
	
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
