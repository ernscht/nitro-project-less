((($) => {
	'use strict';
	/**
	 * map decorator implementation for the map module.
	 *
	 * @author ernscht <ernscht@gmail.com>
	 */
	T.Module.Map.Map = T.createDecorator({
		start(resolve) {
			/* eslint-disable */
			const $ctx = $(this._ctx);
			console.log(`${$ctx.data('t-name')} - ${$ctx.data('t-decorator')} [id:${$ctx.data('t-id')}]`);
			/* eslint-enable */
			this._parent.start(resolve);
		},
	});
})(jQuery));
