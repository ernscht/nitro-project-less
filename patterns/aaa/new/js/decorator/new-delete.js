((($) => {
	'use strict';
	/**
	 * delete decorator implementation for the new module.
	 *
	 * @author ernscht <ernscht@gmail.com>
	 */
	T.Module.New.Delete = T.createDecorator({
		start(resolve) {
			/* eslint-disable */
			const $ctx = $(this._ctx);
			console.log(`${$ctx.data('t-name')} - ${$ctx.data('t-decorator')} [id:${$ctx.data('t-id')}]`);
			/* eslint-enable */
			this._parent.start(resolve);
		},
	});
})(jQuery));
