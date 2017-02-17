((($) => {
	'use strict';
	/**
	 * z module implementation.
	 *
	 * @author ernscht <ernscht@gmail.com>
	 */
	T.Module.Z = T.createModule({
		start(resolve) {
			const $ctx = $(this._ctx);
			this.$c = $ctx;
			resolve();
		},
	});
})(jQuery));
