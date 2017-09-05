((($) => {
	'use strict';
	/**
	 * Map decorator implementation for the TestDecorator module.
	 *
	 * @author ernscht <ernscht@gmail.com>
	 */
	T.Module.TestDecorator.Map = T.createDecorator({
		start(resolve) {
			/* eslint-disable */
			const $ctx = $(this._ctx);
			console.log('---------------decorator: MAP');
			/* eslint-enable */
			this._parent.start(resolve);
		},
	});
})(jQuery));
