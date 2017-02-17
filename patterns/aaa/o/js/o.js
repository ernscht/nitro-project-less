((($) => {
	'use strict';
	/**
	 * o module implementation.
	 *
	 * @author ernscht <ernscht@gmail.com>
	 */
	T.Module.O = T.createModule({
		start(resolve) {
			const $ctx = $(this._ctx);
			this.$c = $ctx;
			resolve();
		},
	});
})(jQuery));
