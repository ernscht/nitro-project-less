((($) => {
	'use strict';

	// import $ from 'jquery';
	// import T from 'terrific';

	/**
	 * Test module implementation.
	 *
	 * @author Pre Name <pre.name@domain.com>
	 */
	T.Module.Test = T.createModule({
		start(resolve) {
			const $ctx = $(this._ctx);

			/* eslint-disable no-console */
			console.log(`Test - start [id:${$ctx.data('t-id')}]`);
			/* eslint-enable no-console */

			resolve();
		}
	});

})(jQuery));
