((($) => {
	'use strict';
	/**
	 * bar decorator implementation for the foo module.
	 *
	 * @author ernscht <ernscht@gmail.com>
	 */
	T.Module.Foo.Bar = T.createDecorator({
		start(resolve) {
			/* eslint-disable */
			const $ctx = $(this._ctx);
			console.log(`${$ctx.data('t-name')} - ${$ctx.data('t-decorator')} [id:${$ctx.data('t-id')}]`);
			/* eslint-enable */
			this._parent.start(resolve);
		},
	});
})(jQuery));
