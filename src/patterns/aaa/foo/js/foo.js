((($) => {
	'use strict';
	/**
	 * foo module implementation.
	 *
	 * @author ernscht <ernscht@gmail.com>
	 */
	T.Module.Foo = T.createModule({
		start(resolve) {
			/* eslint-disable */
			const $ctx = $(this._ctx);
			console.log(`${$ctx.data('t-name')} [id:${$ctx.data('t-id')}]`);
			/* eslint-enable */

			resolve();
		},
	});
})(jQuery));
