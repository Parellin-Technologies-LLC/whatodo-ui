/** ****************************************************************************************************
 * File: processProject.js
 * Project: whatodo-ui
 * @author Nick Soggin <iSkore@users.noreply.github.com> on 05-Apr-2018
 *******************************************************************************************************/
'use strict';

import Whatodo from 'whatodo';

// TODO::: get defaults for Whatodo from Process class
// TODO::: add title to middle of main container
// TODO::: load TODO cards from Whatodo results
// TODO:: save minor project info and add badges to sidebar
// TODO: connect to GitHub by checking .git and enable click-to-issue creation
export default function( dir ) {
	return new Whatodo( {
		input: dir,
		ignore: [ 'node_modules', '.git', '.idea', 'docs', 'build' ],
		ignoreExts: [ 'json', 'html', 'css', 'md' ],
		todoPattern: '\\/\\/ ?TODO:?:?:? ?',
		outputFormat: 'JSON',
		maximumFileSize: '1 MiB'
	} )
		.initialize()
		.then( inst => inst.run() );
}
