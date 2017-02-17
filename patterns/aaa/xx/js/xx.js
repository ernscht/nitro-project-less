((($) => {
	'use strict';
	/**
	 * xx module implementation.
	 *
	 * @author ernscht <ernscht@gmail.com>
	 */
	T.Module.Xx = T.createModule({
		start(resolve) {
			const $ctx = $(this._ctx);
			this.$c = $ctx;
			resolve();
		},
	});
})(jQuery));
