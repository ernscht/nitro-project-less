((($) => {
	'use strict';
	/**
	 * gfds decorator implementation for the o module.
	 *
	 * @author ernscht <ernscht@gmail.com>
	 */
	T.Module.O.Gfds = T.createDecorator({
		start(resolve) {
			const $ctx = $(this._ctx);
			this.$c = $ctx;
			this._parent.start(resolve);
		},
	});
})(jQuery));
