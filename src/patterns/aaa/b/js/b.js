((($) => {
	'use strict';
	/**
	 * b module implementation.
	 *
	 * @author ernscht <ernscht@gmail.com>
	 */
	T.Module.B = T.createModule({
		start(resolve) {
			const $ctx = $(this._ctx);
			this.$c = $ctx;
			resolve();
		},
	});
})(jQuery));
