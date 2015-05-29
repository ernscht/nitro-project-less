(function ($) {
	'use strict';
	/**
	 * Btn module implementation.
	 *
	 * @author Pre Name <pre.name@domain.com>
	 * @namespace T.Module
	 * @class Btn
	 * @extends T.Module
	 */
	T.Module.Btn = T.createModule({
		start: function (callback) {
			var $ctx = $(this._ctx);

			console.log('Btn - start [id:' + $ctx.data('t-id') + ']');

			callback();
		}
	});
}(jQuery));
