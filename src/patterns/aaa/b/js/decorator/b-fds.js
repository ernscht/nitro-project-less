((($) => {
	'use strict';
	/**
	 * fds decorator implementation for the b module.
	 *
	 * @author ernscht <ernscht@gmail.com>
	 */
	T.Module.B.Fds = T.createDecorator({
		start(resolve) {
			const $ctx = $(this._ctx);
			this.$c = $ctx;
			this._parent.start(resolve);
		},
	});
})(jQuery));
