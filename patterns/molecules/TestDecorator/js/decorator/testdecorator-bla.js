((($) => {
	'use strict';
	/**
	 * Bla decorator implementation for the TestDecorator module.
	 *
	 * @author ernscht <ernscht@gmail.com>
	 */
	T.Module.TestDecorator.Bla = T.createDecorator({
		start(resolve) {
			/* eslint-disable */
			const $ctx = $(this._ctx);
			console.log('---------------decorator: BLA');
			/* eslint-enable */
			this._parent.start(resolve);
		},
	});
})(jQuery));
