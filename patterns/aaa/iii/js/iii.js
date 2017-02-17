((($) => {
	'use strict';
	/**
	 * iii module implementation.
	 *
	 * @author ernscht <ernscht@gmail.com>
	 */
	T.Module.Iii = T.createModule({
		start(resolve) {
			const $ctx = $(this._ctx);
			this.$c = $ctx;
			resolve();
		},
	});
})(jQuery));
