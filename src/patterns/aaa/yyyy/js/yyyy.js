((($) => {
	'use strict';
	/**
	 * yyyy module implementation.
	 *
	 * @author ernscht <ernscht@gmail.com>
	 */
	T.Module.Yyyy = T.createModule({
		start(resolve) {
			const $ctx = $(this._ctx);
			this.$c = $ctx;
			resolve();
		},
	});
})(jQuery));
