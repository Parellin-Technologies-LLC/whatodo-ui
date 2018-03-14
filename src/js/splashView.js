/** ****************************************************************************************************
 * File: splashView.js
 * Project: whatodo-ui
 * @author Nick Soggin <iSkore@users.noreply.github.com> on 13-Mar-2018
 *******************************************************************************************************/
'use strict';

export default function() {
	return new Promise(
		res => {
			const splashText = $( '<h1>' );
			
			splashText
				.css( {
					position: 'absolute',
					'font-size': '6rem',
					'text-align': 'center',
					left: '25%',
					width: '50%',
					color: '#F5F6FA',
					opacity: 0,
					bottom: '40%'
				} )
				.text( 'Whatodos' );
			
			splashText.animate( {
				opacity: '1',
				bottom: '50%'
			}, 1500, () => {
				setTimeout(
					() => splashText.animate(
						{ opacity: '0' },
						250,
						() => {
							res();
							splashText.remove();
						}
					), 1000
				);
			} );
			
			$( '#container' ).append( splashText );
		}
	);
}
