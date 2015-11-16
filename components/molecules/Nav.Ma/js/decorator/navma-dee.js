(function($) {
	'use strict';
	/**
	 * Dee decorator implementation for the Nav.Ma module.
	 *
	 * @author ernscht <ernscht@gmail.com>
	 * @namespace T.Module.NavMa
	 * @class Dee
	 * @extends T.Module
	 */
	T.Module.NavMa.Dee = T.createDecorator({
		start: function (resolve) {
			var $ctx = $(this._ctx);

			this._parent.start(resolve);
		}
	});
}(jQuery));
