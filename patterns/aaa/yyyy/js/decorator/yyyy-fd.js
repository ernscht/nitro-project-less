((($) => {
	'use strict';
	/**
	 * fd decorator implementation for the yyyy module.
	 *
	 * @author ernscht <ernscht@gmail.com>
	 */
	T.Module.Yyyy.Fd = T.createDecorator({
		start(resolve) {
			const $ctx = $(this._ctx);
			this.$c = $ctx;
			this._parent.start(resolve);
		},
	});
})(jQuery));
