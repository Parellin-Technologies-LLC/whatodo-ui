/** ****************************************************************************************************
 * File: Process.js
 * Project: whatodo-ui
 * @author Nick Soggin <iSkore@users.noreply.github.com> on 13-Mar-2018
 *******************************************************************************************************/
'use strict';

import projects from './projects';
import { writeFile } from 'fs';

class Process
{
	constructor()
	{
		this._mainWindow = {
			titleBarStyle: 'hidden',
			width: 1200,
			height: 800
		};
		
		this.projectsFile = 'projects.json';
		this.projects = projects;
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
