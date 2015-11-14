(function($) {
	'use strict';
	/**
	 * deco decorator implementation for the nav-mains module.
	 *
	 * @author ernscht <ernscht@gmail.com>
	 * @namespace T.Module.NavMains
	 * @class Deco
	 * @extends T.Module
	 */
	T.Module.NavMains.Deco = T.createDecorator({
		start: function (resolve) {
			var $ctx = $(this._ctx);

			this._parent.start(resolve);
		}
	});
}(jQuery));
