((($) => {
	'use strict';

	// import $ from 'jquery';
	// import T from 'terrific';

	/**
	 * Blue decorator implementation for the Ex module.
	 *
	 * @author Pre Name <pre.name@domain.com>
	 */
	T.Module.Ex.Blue = T.createDecorator({
		start(resolve) {
			const $ctx = $(this._ctx);

			/* eslint-disable no-console */
			console.log(`Ex Decorator Blue - start id: [${$ctx.data('t-id')}]`);
			/* eslint-enable no-console */

			// calling original method
			this._parent.start(resolve);
		},
		sync() {
			const $ctx = $(this._ctx);

			/* eslint-disable no-console */
			console.log(`Ex Decorator Blue - sync id: [${$ctx.data('t-id')}]`);
			/* eslint-enable no-console */

			// calling original method
			this._parent.sync();
		},
	});
})(jQuery));
