((($) => {
	'use strict';
	/**
	 * cc module implementation.
	 *
	 * @author ernscht <ernscht@gmail.com>
	 */
	T.Module.Cc = T.createModule({
		start(resolve) {
			const $ctx = $(this._ctx);
			this.$c = $ctx;
			resolve();
		},
	});
})(jQuery));
