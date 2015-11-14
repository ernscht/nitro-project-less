(function($) {
	'use strict';
	/**
	 * dec decorator implementation for the NavMain module.
	 *
	 * @author ernscht <ernscht@gmail.com>
	 * @namespace T.Module.NavMain
	 * @class Dec
	 * @extends T.Module
	 */
	T.Module.NavMain.Dec = T.createDecorator({
		start: function (resolve) {
			var $ctx = $(this._ctx);

			this._parent.start(resolve);
		}
	});
}(jQuery));
