((($) => {
	'use strict';
	/**
	 * Text decorator implementation for the TestDecorator module.
	 *
	 * @author ernscht <ernscht@gmail.com>
	 */
	T.Module.TestDecorator.Text = T.createDecorator({
		start(resolve) {
			/* eslint-disable */
			const $ctx = $(this._ctx);
			console.log('---------------decorator: TEXT');
			/* eslint-enable */
			this._parent.start(resolve);
		},
	});
})(jQuery));
