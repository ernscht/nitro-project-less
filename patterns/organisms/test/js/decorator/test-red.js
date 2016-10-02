((($) => {
	'use strict';

	// import $ from 'jquery';
	// import T from 'terrific';

	/**
	 * Red decorator implementation for the Test module.
	 *
	 * @author Pre Name <pre.name@domain.com>
	 */
	T.Module.Test.Red = T.createDecorator({
		start(resolve) {
			const $ctx = $(this._ctx);

			/* eslint-disable no-console */
			console.log(`Test Decorator Red - start id: [${$ctx.data('t-id')}]`);
			/* eslint-enable no-console */

			// calling original method
			this._parent.start(resolve);
		},
	});

})(jQuery));
