((($) => {
	'use strict';
	/**
	 * TestDecorator module implementation.
	 *
	 * @author ernscht <ernscht@gmail.com>
	 */
	T.Module.TestDecorator = T.createModule({
		start(resolve) {
			/* eslint-disable */
			const $ctx = $(this._ctx);
			console.log('Pappern TestDecorator');
			/* eslint-enable */
			resolve();
		},
	});
})(jQuery));
