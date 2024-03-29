/** ****************************************************************************************************
 * File: Process.js
 * Project: whatodo-ui
 * @author Nick Soggin <iSkore@users.noreply.github.com> on 13-Mar-2018
 *******************************************************************************************************/
'use strict';

import { join } from 'path';
import { writeFile, createWriteStream } from 'fs';
import { homedir } from 'os';

class Process
{
	constructor()
	{
		this._mainWindow = {
			titleBarStyle: 'hidden',
			width: 1200,
			height: 800
		};
		
		
		this.cwd          = process.cwd();
		this.dir          = __dirname;
		this.projectsFile = join( this.dir, 'projects.json' );
		this.projects     = require( this.projectsFile );
		this.homedir      = homedir();
		
		this.stdout = createWriteStream( __dirname + '/stdout.log', { flags: 'a' } );
		this.stderr = createWriteStream( __dirname + '/stderr.log', { flags: 'a' } );
		
		process.stdout.pipe( this.stdout );
		process.stderr.pipe( this.stderr );
	}
	
	// TODO: add remove project and add X button to project list
	
	getProjects()
	{
		return this.projects;
	}
	
	addProject( n )
	{
		if( !this.projects.includes( n ) ) {
			this.projects.push( n );
			this.save();
		}
	}
	
	save()
	{
		writeFile( this.projectsFile, JSON.stringify( this.projects ), 'utf8' );
	}
}

export default new Process();
