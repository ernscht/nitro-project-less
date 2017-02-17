((($) => {
	'use strict';
	/**
	 * a module implementation.
	 *
	 * @author ernscht <ernscht@gmail.com>
	 */
	T.Module.A = T.createModule({
		start(resolve) {
			const $ctx = $(this._ctx);
			this.$c = $ctx;

			resolve();
		},
	});
})(jQuery));
